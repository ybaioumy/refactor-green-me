import React, { useEffect } from 'react';
import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { message } from 'antd';

const DynamicInputs = ({
  label,
  eligibilityTestData,
  setEligibilityTestData,
  disabled = false,
}) => {
  useEffect(() => {
    if (eligibilityTestData.eligibilty.products.length === 0) {
      setEligibilityTestData((prevState) => ({
        ...prevState,
        eligibilty: {
          ...prevState.eligibilty,
          products: [{ id: 0, name: '' }],
        },
      }));
    }
  }, []);
  const handleAddProduct = () => {
    setEligibilityTestData((prevState) => {
      // Get the highest current ID and increment it for the new product
      const highestId = prevState.eligibilty.products.reduce(
        (maxId, product) => Math.max(maxId, product.id),
        -1
      );
      const newProductId = highestId + 1;

      const newProduct = { id: newProductId, name: '' };

      return {
        ...prevState,
        eligibilty: {
          ...prevState.eligibilty,
          products: [...prevState.eligibilty.products, newProduct],
        },
      };
    });
  };

  const handleRemoveProduct = (id) => {
    if (eligibilityTestData.eligibilty.products.length === 1) {
      message.warning('at least one product is required');
      return;
    }
    setEligibilityTestData((prevState) => {
      const filteredProducts = prevState.eligibilty.products.filter(
        (product) => product.id !== id
      );
      // Update the ids to be sequential again
      const updatedProducts = filteredProducts.map((product, index) => ({
        ...product,
        id: index,
      }));
      return {
        ...prevState,
        eligibilty: {
          ...prevState.eligibilty,
          products: updatedProducts,
        },
      };
    });
  };

  const handleProductChange = (id, value) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        products: prevState.eligibilty.products.map((product) =>
          product.id === id ? { ...product, name: value } : product
        ),
      },
    }));
  };

  return (
    <div className="space-y-4 px-2">
      {eligibilityTestData.eligibilty.products.map((product, index) => (
        <div key={product.id} className="flex flex-col items-start">
          <label>{`${label} ${index + 1}`}</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleProductChange(product.id, e.target.value)}
            className="border border-black p-2 rounded w-full bg-[#b9d9c0]"
            disabled={disabled}
          />
          <div className="flex gap-2 items-center">
            <button
              onClick={handleAddProduct}
              className="w-fit h-fit"
              disabled={disabled}>
              <PlusCircleFilled style={{ color: '#186129', fontSize: 20 }} />
            </button>
            <button
              disabled={disabled}
              onClick={() => handleRemoveProduct(product.id)}
              className="text-white p-2 ">
              <MinusCircleFilled style={{ color: '#D90000', fontSize: 20 }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;

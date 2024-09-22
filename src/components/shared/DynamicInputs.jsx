import React, { useEffect } from 'react';
import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { message } from 'antd';

const DynamicInputs = ({
  label,
  eligibilityTestData,
  setEligibilityTestData,
  disabled = false,
}) => {
  // Ensure eligibilityTestData and eligibilty are defined
  const products = eligibilityTestData?.eligibilty?.products || [];

  useEffect(() => {
    if (products.length === 0) {
      setEligibilityTestData((prevState) => ({
        ...prevState,
        eligibilty: {
          ...prevState?.eligibilty,
          products: [{ id: 0, name: '' }],
        },
      }));
    }
  }, [products.length, setEligibilityTestData]);

  const handleAddProduct = () => {
    setEligibilityTestData((prevState) => {
      const highestId = products.reduce(
        (maxId, product) => Math.max(maxId, product.id),
        -1
      );
      const newProductId = highestId + 1;

      const newProduct = { id: newProductId, name: '' };

      return {
        ...prevState,
        eligibilty: {
          ...prevState?.eligibilty,
          products: [...products, newProduct],
        },
      };
    });
  };

  const handleRemoveProduct = (id) => {
    if (products.length === 1) {
      message.warning('At least one product is required');
      return;
    }
    setEligibilityTestData((prevState) => {
      const filteredProducts = products.filter((product) => product.id !== id);
      const updatedProducts = filteredProducts.map((product, index) => ({
        ...product,
        id: index,
      }));
      return {
        ...prevState,
        eligibilty: {
          ...prevState?.eligibilty,
          products: updatedProducts,
        },
      };
    });
  };

  const handleProductChange = (id, value) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState?.eligibilty,
        products: products.map((product) =>
          product.id === id ? { ...product, name: value } : product
        ),
      },
    }));
  };

  return (
    <div className="space-y-4 px-2">
      {products.map((product, index) => (
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
              className="text-white p-2">
              <MinusCircleFilled style={{ color: '#D90000', fontSize: 20 }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;

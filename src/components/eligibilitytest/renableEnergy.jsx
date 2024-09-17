import React from 'react';
import Title from '../shared/Title';
import RadioButton from '../shared/RadioButton';
import DynamicInputs from '../shared/DynamicInputs';
import NumericInput from '../shared/NumericInput';

function RenewableEnergy({
  categories,
  eligibilityTestData,
  setEligibilityTestData,
}) {
  const handleParentChange = (parentId) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      criteriaId: parentId,
      SubCriteriaId: 0,
      eligibilty: {
        ...prevState.eligibilty,
        products: [{ id: 0, name: '' }],
        totalGenerationCapacity: 0,
        alignedToTheIfcperformance: false,
      },
    }));
  };

  const handleChildChange = (childId) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      SubCriteriaId: childId,
    }));
  };
  const {
    eligibilty: { alignedToTheIfcperformance },
  } = eligibilityTestData || {};
  const handleNumericInputChange = (name, value) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        [name]: value,
      },
    }));
  };
  return (
    <>
      <div className="bg-card w-full rounded-lg py-2 px-5 mt-5">
        <Title
          text={'Select Project Criteria'}
          type="h1"
          style={{ color: '#202020', fontSize: 20 }}
        />
      </div>
      <div>
        <div className="flex flex-wrap justify-between p-5 bg-card mt-5 rounded-lg gap-10">
          {categories?.map((item) => {
            const isDimmed =
              eligibilityTestData.criteriaId !== null &&
              eligibilityTestData.criteriaId !== item.id;
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-start w-full sm:w-[48%] md:w-[32%] lg:w-[22%] ${
                  isDimmed ? 'opacity-50' : ''
                }`}>
                <RadioButton
                  label={item.name}
                  value={`${item.id}`}
                  checked={eligibilityTestData.criteriaId === item.id}
                  onChange={() => handleParentChange(item.id)}
                  name="parentCategory"
                />
                <div className="bg-white p-5 rounded-tr-lg rounded-tl-lg mx-2 flex flex-col mt-3 justify-center">
                  {item.children.map((child, i) => (
                    <div
                      className={`border-b border-[#CDCDCD] ${
                        i === 0 ? 'pb-3' : 'py-3'
                      }`}
                      key={child.id}>
                      <RadioButton
                        label={child.name}
                        value={`${child.id}`}
                        checked={eligibilityTestData.SubCriteriaId === child.id}
                        onChange={() => handleChildChange(child.id)}
                        name="childCategory"
                        disabled={eligibilityTestData.criteriaId !== item.id}
                      />
                      {/* <div className="border h-[1px] border-[#CDCDCD]" /> */}
                    </div>
                  ))}
                </div>
                {item.id === 4 && (
                  <div className="p-3 mx-2 bg-white flex flex-col justify-between gap-5 rounded-bl-lg rounded-br-lg">
                    <Title text={'Total Generation Capacity (kWh)'} type="h1" />
                    <NumericInput
                      handleChange={(value) =>
                        handleNumericInputChange(
                          'totalGenerationCapacity',
                          value
                        )
                      }
                      value={
                        eligibilityTestData.eligibilty.totalGenerationCapacity
                      }
                      disabled={eligibilityTestData.criteriaId !== item.id}
                    />
                    <div className="border border-[#CDCDCD]" />
                    <Title
                      text={
                        'Is the project aligned to the IFC Performance Standards'
                      }
                      type="h1"
                    />
                    <RadioButton
                      label={'Yes'}
                      value={'Yes'}
                      checked={alignedToTheIfcperformance === 'Yes'}
                      onChange={(e) => {
                        setEligibilityTestData((prevState) => ({
                          ...prevState,
                          eligibilty: {
                            ...prevState.eligibilty,
                            alignedToTheIfcperformance: e.target.value,
                          },
                        }));
                      }}
                      disabled={eligibilityTestData.criteriaId !== item.id}
                    />
                    <RadioButton
                      label={'No'}
                      value={'No'}
                      checked={alignedToTheIfcperformance === 'No'}
                      onChange={(e) => {
                        setEligibilityTestData((prevState) => ({
                          ...prevState,
                          eligibilty: {
                            ...prevState.eligibilty,
                            alignedToTheIfcperformance: e.target.value,
                          },
                        }));
                      }}
                      disabled={eligibilityTestData.criteriaId !== item.id}
                    />
                    {/* <div className="border border-[#CDCDCD]" /> */}
                  </div>
                )}
                {item.id === 5 && (
                  <div className="px-2 bg-white mx-2 rounded-bl-lg rounded-br-lg">
                    <DynamicInputs
                      label={'Product'}
                      setEligibilityTestData={setEligibilityTestData}
                      eligibilityTestData={eligibilityTestData}
                      disabled={eligibilityTestData.criteriaId !== item.id}
                    />
                  </div>
                )}
                {/* {item.id === 6 && (
                  <div className="px-2 bg-white mx-2 rounded-bl-lg rounded-br-lg">
                    <DynamicInputs
                      label={'Product'}
                      setEligibilityTestData={setEligibilityTestData}
                      eligibilityTestData={eligibilityTestData}
                    />
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RenewableEnergy;

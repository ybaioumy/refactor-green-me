import RadioButton from '../shared/RadioButton';
import Title from '../shared/Title';

function GreenBuildings({
  categories,
  eligibilityTestData,
  setEligibilityTestData,
}) {
  
  return (
    <div className="flex flex-wrap gap-10 bg-card rounded-lg p-5 min-h-[400px] w-full">
      {categories.map((item, idx) => (
        <div
          className={`flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] ${
            eligibilityTestData.criteriaId !== item.id && 'opacity-50'
          }`}
          key={item.id}>
          <RadioButton
            label={item.name}
            value={`${item.id}`}
            checked={eligibilityTestData.criteriaId === item.id}
            onChange={(e) => {
              setEligibilityTestData((prevState) => ({
                ...prevState,
                criteriaId: Number(e.target.value),
                SubCriteriaId: 0,
              }));
            }}
          />
          <div className="bg-white p-5 rounded-tr-lg rounded-tl-lg mx-2 flex flex-col mt-3 justify-center">
            {item.children.map((child, i) => (
              <div
                key={child.id}
                className={`border-b border-[#CDCDCD] ${
                  i === 0 ? 'pb-3' : 'py-3'
                }`}>
                <RadioButton
                  label={child.name}
                  value={`${child.id}`}
                  checked={eligibilityTestData.SubCriteriaId === child.id}
                  onChange={(e) => {
                    setEligibilityTestData((prevState) => ({
                      ...prevState,
                      SubCriteriaId: Number(e.target.value),
                    }));
                  }}
                  key={child.id}
                  disabled={eligibilityTestData.criteriaId !== item.id}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GreenBuildings;

export const ProjectStandards = ({
  eligibilityTestData,
  setEligibilityTestData,
}) => {
  const certifications = [  
    { id: 1, label: 'LEED silver or above' },
    { id: 2, label: 'BREEAM good or above' },
    { id: 3, label: 'Estidama 2 Pearls or above' },
    { id: 4, label: 'HQE good or above' },
    { id: 5, label: 'CASBEE B+ good or above' },
    { id: 6, label: 'Green Star 4 star or above' },
    { id: 7, label: 'WELL – Certified or above' },
    { id: 8, label: 'Fitwel – 1 star or above' },
    { id: 9, label: 'NABERS 4 star or above' },
    { id: 10, label: 'Verified/certified as net zero carbon by a third party' },
  ];

  const {
    eligibilty: {
      projectStandardsCertification,
      energyDemand,
      carbonIntensity,
      improvementActivitiesFossilFuel,
      involvedInTheExplorationExtraction,
    },
  } = eligibilityTestData || {};

  const handleCertificationChange = (value) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        projectStandardsCertification: value,
      },
    }));
  };

  const handlePedChange = (e) => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        energyDemand: e.target.value,
      },
    }));
  };
  const handleCarbonIntensityChange = (e) =>
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        carbonIntensity: e.target.value,
      },
    }));
  const handleFossilFuelChange = (e) =>
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        improvementActivitiesFossilFuel: e.target.value,
      },
    }));
  const handleExplorationChange = (e) =>
    setEligibilityTestData((prevState) => ({
      ...prevState,
      eligibilty: {
        ...prevState.eligibilty,
        involvedInTheExplorationExtraction: e.target.value,
      },
    }));
  return (
    <div className="w-full">
      {eligibilityTestData.criteriaId === 8 ? (
        <>
          <div className=" bg-card rounded-lg py-2 px-5 mb-5">
            <Title
              text={'Project Standards/Certification'}
              type="h1"
              style={{ fontSize: 20 }}
            />
          </div>
          <div className="bg-card p-5 rounded-lg">
            <div className="mb-8 bg-white p-6 rounded-lg w-full sm:w-[80%]">
              <div className="flex flex-wrap">
                {certifications.map((certification) => (
                  <div className="w-full sm:w-1/2 py-2" key={certification.id}>
                    <RadioButton
                      label={certification.label}
                      name="certification"
                      value={certification.label}
                      checked={
                        projectStandardsCertification === certification.label
                      }
                      onChange={() =>
                        handleCertificationChange(certification.label)
                      }
                    />
                    <div className="border mt-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className=" bg-card  rounded-lg py-2 px-5 mb-5 mt-5">
        <Title text={'Project Impact'} type="h1" style={{ fontSize: 20 }} />
      </div>
      <div className="bg-card p-5 rounded-lg">
        <div className="mb-4 bg-white w-full sm:w-[80%] p-6 rounded-lg">
          <p className="mb-2 text-[#1E4A28] font-semibold">
            What is your expected Primary Energy Demand (PED) after subject
            upgrades:
          </p>
          <div className="space-y-2">
            {['> 30% / kWh/m2 per year', '> 20% / kWh/m2 per year'].map(
              (value) => (
                <RadioButton
                  key={value}
                  label={value}
                  name="ped"
                  value={value}
                  checked={energyDemand === value}
                  onChange={handlePedChange}
                />
              )
            )}
          </div>
          <div className="border my-5" />
          <div>
            <p className="mb-2 text-[#1E4A28] font-semibold">
              What is your expected Carbon Intensity after subject upgrades:
            </p>
            <div className="space-y-2">
              {['> 20% / kgCO2e/m2/year', '> 30% / kgCO2e/m2/year'].map(
                (value) => (
                  <RadioButton
                    key={value}
                    label={value}
                    name="carbonIntensity"
                    value={value}
                    checked={carbonIntensity === value}
                    onChange={handleCarbonIntensityChange}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {eligibilityTestData.criteriaId === 9 ? (
        <>
          <div className=" bg-card  rounded-lg py-2 px-5 mb-5 mt-5">
            <Title text={'Exclusions'} type="h1" style={{ fontSize: 20 }} />
          </div>
          <div className="bg-card p-5 rounded-lg">
            <div className="mb-8 bg-white p-6 rounded-lg w-full sm:w-[80%]">
              <p className="mb-2 text-[#1E4A28] font-semibold">
                Do improvement activities lead to the use of fossil fuel
                technologies:
              </p>
              <div className="space-y-2">
                {['Yes', 'No'].map((value) => (
                  <RadioButton
                    key={value}
                    label={value}
                    name="fossilFuel"
                    value={value}
                    checked={improvementActivitiesFossilFuel === value}
                    onChange={handleFossilFuelChange}
                  />
                ))}
              </div>
              <div className="border my-5" />
              <div>
                <p className="mb-2 text-[#1E4A28] font-semibold">
                  Is the improved building directly involved in the exploration,
                  extraction, refining and/or distribution of fossil fuels:
                </p>
                <div className="space-y-2">
                  {['Yes', 'No'].map((value) => (
                    <RadioButton
                      key={value}
                      label={value}
                      name="exploration"
                      value={value}
                      checked={involvedInTheExplorationExtraction === value}
                      onChange={handleExplorationChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

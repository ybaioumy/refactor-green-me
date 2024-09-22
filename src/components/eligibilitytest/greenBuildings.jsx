import RadioButton from '../shared/RadioButton';
import Title from '../shared/Title';
import { useFormContext, Controller } from 'react-hook-form';

function GreenBuildings({ categories }) {
  const { control, setValue, watch } = useFormContext();
  const eligibilityTestData = watch();

  return (
    <div className="flex flex-wrap gap-10 bg-card rounded-lg p-5 min-h-[400px] w-full">
      {categories.map((item) => (
        <div
          className={`flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] ${
            eligibilityTestData?.criteriaId !== item.id && 'opacity-50'
          }`}
          key={item.id}>
          <Controller
            name="criteriaId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioButton
                label={item.name}
                value={`${item.id}`}
                checked={value === item.id}
                onChange={(e) => {
                  onChange(Number(e.target.value));
                  setValue('SubCriteriaId', 0);
                }}
              />
            )}
          />
          <div className="bg-white p-5 rounded-tr-lg rounded-tl-lg mx-2 flex flex-col mt-3 justify-center">
            {item.children.map((child, i) => (
              <div
                key={child.id}
                className={`border-b border-[#CDCDCD] ${
                  i === 0 ? 'pb-3' : 'py-3'
                }`}>
                <Controller
                  name="SubCriteriaId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioButton
                      label={child.name}
                      value={`${child.id}`}
                      checked={value === child.id}
                      onChange={(e) => onChange(Number(e.target.value))}
                      disabled={eligibilityTestData?.criteriaId !== item.id}
                    />
                  )}
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

export const ProjectStandards = () => {
  const certifications = [
    { id: 1, label: 'LEED silver or above' },
    { id: 2, label: 'BREEAM good or above' },
    { id: 3, label: 'Estidama 2 Pearls or above' },
    { id: 4, label: 'HQE good or above' },
    { id: 5, label: 'CASBEE B+ good or above' },
    { id: 6, label: 'Green Star 4 star or above' },
    { id: 7, label: 'WELL-Certified or above' },
    { id: 8, label: 'Fitwel-1 star or above' },
    { id: 9, label: 'NABERS 4 star or above' },
    { id: 10, label: 'Verified/certified as net zero carbon by a third party' },
  ];
  const { control, watch } = useFormContext();
  const eligibilityTestData = watch();

  return (
    <div className="w-full">
      {eligibilityTestData?.criteriaId === 8 && (
        <>
          <div className="bg-card rounded-lg py-2 px-5 mb-5">
            <Title text="Project Standards/Certification" type="h1" />
          </div>
          <div className="bg-card p-5 rounded-lg">
            <div className="mb-8 bg-white p-6 rounded-lg w-full sm:w-[80%]">
              <div className="flex flex-wrap">
                {certifications.map((certification) => (
                  <div className="w-full sm:w-1/2 py-2" key={certification.id}>
                    <Controller
                      name="eligibilty.projectStandardsCertification"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <RadioButton
                          label={certification.label}
                          value={certification.label}
                          checked={value === certification.label}
                          onChange={() => onChange(certification.label)}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="bg-card rounded-lg py-2 px-5 mb-5 mt-5">
        <Title text="Project Impact" type="h1" />
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
                <Controller
                  key={value}
                  name="eligibilty.energyDemand"
                  control={control}
                  render={({ field: { onChange, value: fieldValue } }) => (
                    <RadioButton
                      label={value}
                      value={value}
                      checked={fieldValue === value}
                      onChange={onChange}
                    />
                  )}
                />
              )
            )}
          </div>
          <div className="border my-5" />
          <p className="mb-2 text-[#1E4A28] font-semibold">
            What is your expected Carbon Intensity after subject upgrades:
          </p>
          <div className="space-y-2">
            {['> 20% / kgCO2e/m2/year', '> 30% / kgCO2e/m2/year'].map(
              (value) => (
                <Controller
                  key={value}
                  name="eligibilty.carbonIntensity"
                  control={control}
                  render={({ field: { onChange, value: fieldValue } }) => (
                    <RadioButton
                      label={value}
                      value={value}
                      checked={fieldValue === value}
                      onChange={onChange}
                    />
                  )}
                />
              )
            )}
          </div>
        </div>
      </div>

      {eligibilityTestData?.criteriaId === 9 && (
        <>
          <div className="bg-card rounded-lg py-2 px-5 mb-5 mt-5">
            <Title text="Exclusions" type="h1" />
          </div>
          <div className="bg-card p-5 rounded-lg">
            <div className="mb-8 bg-white p-6 rounded-lg w-full sm:w-[80%]">
              <p className="mb-2 text-[#1E4A28] font-semibold">
                Do improvement activities lead to the use of fossil fuel
                technologies:
              </p>
              <div className="space-y-2">
                {['Yes', 'No'].map((value) => (
                  <Controller
                    key={value}
                    name="eligibilty.improvementActivitiesFossilFuel"
                    control={control}
                    render={({ field: { onChange, value: fieldValue } }) => (
                      <RadioButton
                        label={value}
                        value={value}
                        checked={fieldValue === value}
                        onChange={onChange}
                      />
                    )}
                  />
                ))}
              </div>
              <div className="border my-5" />
              <p className="mb-2 text-[#1E4A28] font-semibold">
                Is the improved building directly involved in the exploration,
                extraction, refining and/or distribution of fossil fuels:
              </p>
              <div className="space-y-2">
                {['Yes', 'No'].map((value) => (
                  <Controller
                    key={value}
                    name="eligibilty.involvedInTheExplorationExtraction"
                    control={control}
                    render={({ field: { onChange, value: fieldValue } }) => (
                      <RadioButton
                        label={value}
                        value={value}
                        checked={fieldValue === value}
                        onChange={onChange}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

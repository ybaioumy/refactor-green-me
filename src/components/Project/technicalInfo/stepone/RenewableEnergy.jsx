import { useFormContext, Controller } from 'react-hook-form';
import NumericInput from '../../../shared/NumericInput';
import RadioButton from '../../../shared/RadioButton';
import Icon from '../../../shared/Icon';
import { useGetProjectDropDownsQuery } from '../../../../redux/features/project';
import Loader from '../../../shared/Loader';
import EmptyList from '../../../shared/EmptyList';
function RenewableEnergy() {
  const { control } = useFormContext();
  const {
    data: dropDowns,
    isLoading,
    isError,
  } = useGetProjectDropDownsQuery('technicalInfo');
  if (isLoading) return <Loader />;
  if (isError) return <EmptyList />;
  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <div className="flex flex-col gap-10 md:w-1/3">
        <div>
          <h3 className="text-lg font-bold text-[#1E4A28]">
            Renewable Energy Technology
          </h3>
          <div className="w-full flex flex-col gap-6 p-4 rounded-2xl mt-5 bg-card shadow-md">
            {dropDowns?.renewableEnergyTechnology?.map((card, cardIndex) => (
              <div className="flex gap-3 items-center" key={cardIndex}>
                <Controller
                  name="technicalInfo.renewableEnergyTechnologyId"
                  control={control}
                  render={({ field }) => (
                    <RadioButton
                      variant="green"
                      label={card.name}
                      key={card.id}
                      checked={field.value === card.id}
                      onChange={() => field.onChange(card.id)}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1E4A28]">
            Utilities Available
          </h3>
          <div className="w-full flex flex-col gap-6 p-4 rounded-2xl mt-5 bg-card shadow-md">
            {dropDowns?.utilitiesAvailable?.map((item, index) => (
              <div className="flex gap-3 items-center" key={index}>
                <Controller
                  name="utilitiesAvailablesIds"
                  control={control}
                  render={({ field }) => (
                    <label key={index} className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={field?.value?.includes(item.id)}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...field.value, item.id]
                            : field.value.filter((item) => item !== item.id);
                          field.onChange(newValue);
                        }}
                      />
                      <p>{item.name}</p>
                    </label>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-l border-gray-500 hidden md:block h-auto" />

      <div className="flex flex-col items-center justify-center gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-2">Installed Capacity</h3>
          <div className="bg-card px-8 h-20 gap-6 rounded-md flex justify-center items-center mb-10">
            <Controller
              name="technicalInfo.installedCapacity"
              control={control}
              render={({ field }) => <NumericInput {...field} unit={'MW'} />}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Capacity Factor</h3>
          <div className="bg-card px-8 h-20 gap-6 rounded-md flex justify-center items-center mb-10">
            <Controller
              name="technicalInfo.capacityFactor"
              control={control}
              render={({ field }) => <NumericInput {...field} unit={'%'} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenewableEnergy;

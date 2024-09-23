import Icon from '../../../shared/Icon';
import NumericInput from '../../../shared/NumericInput';
import { useFormContext, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import RadioButton from '../../../shared/RadioButton';
const RenewableEnergy = ({ title, project }) => {
  const { control, watch, setValue } = useFormContext();
  const dispatch = useDispatch();

  // Watch for the selected interconnection type (the boolean values)
  const technicalInfo = watch('technicalInfo');

  const interconnectionOptions = [
    {
      key: 'offGrid',
      label: 'Off-Grid',
      costKey: 'offGridAlternativeElectricityCost',
      costLabel: 'Alternative Electricity Cost',
    },
    {
      key: 'netMeteringGride',
      label: 'Grid Connected, Net-metering',
      costKey: 'netMeteringGridElectricityCost',
      costLabel: 'Grid Electricity Cost',
    },
    {
      key: 'gridConnected',
      label: 'Grid Connected, PPA',
      costKey: 'gridConnectedPpasellingTariff',
      costLabel: 'Selling Tariff',
    },
    {
      key: 'wheeling',
      label: 'Grid Connected, Wheeling',
      costKeys: [
        {
          key: 'wheelingGridAccessCharges',
          label: 'Grid Access Charges ($/kWh)',
        },
        { key: 'wheelingSellingTariff', label: 'Selling Tariff ($/kWh)' },
        {
          key: 'gridElectricityCost',
          label: 'Grid Electricity Cost',
        },
      ],
    },
  ];

  // Handle resetting and disabling
  const handleRadioChange = (selectedKey) => {
    // Iterate through interconnectionOptions and reset other fields
    interconnectionOptions.forEach(({ key, costKey, costKeys }) => {
      if (key !== selectedKey) {
        // Reset the boolean to false for other radio buttons
        setValue(`technicalInfo.${key}`, false);

        // Reset the associated numeric values to 0
        if (costKey) {
          setValue(`technicalInfo.${costKey}`, 0);
        }
        if (costKeys) {
          costKeys.forEach(({ key: innerKey }) => {
            setValue(`technicalInfo.${innerKey}`, 0);
          });
        }
      }
    });
  };

  return (
    <>
      {interconnectionOptions.map(
        ({ key, label, costKey, costLabel, costKeys }) => (
          <div className="flex flex-col w-full gap-10 px-4 my-6" key={key}>
            <div className="flex flex-col md:flex-row items-center md:gap-6">
              {/* Radio Button */}
              <div className="z-10 border border-[#c7c7c7] rounded-[28px] w-full md:w-[355px] h-[70px] flex items-center px-[20px]">
                <Controller
                  name={`technicalInfo.${key}`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <RadioButton
                        label={label}
                        variant="green"
                        className={'text-[#1E4A28] flex items-center gap-2 cursor-pointer'}
                        name="Interconnection"
                        checked={technicalInfo?.[key] || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          field.onChange(isChecked);
                          if (isChecked) {
                            handleRadioChange(key); // Reset others when selected
                          }
                        }}
                      />
                    </>
                  )}
                />
              </div>

              {/* Cost Inputs */}
              <div
                className={`flex ${
                  costKeys ? 'flex-col gap-2' : 'flex-row'
                } items-center justify-between rounded-[28px] ${
                  technicalInfo[key] ? 'bg-[#B0D0A64D]' : 'bg-[#e7e7e7]'
                } w-full py-[40px] mt-4 md:mt-0 md:ml-[-40px] px-4 md:pl-[30px] transition-colors duration-150`}>
                {costKeys ? (
                  costKeys.map(({ key: innerKey, label: innerLabel }) => (
                    <div
                      className="flex flex-col md:flex-row items-center justify-between w-full mt-4 md:mt-0 gap-2 md:gap-0"
                      key={innerKey}>
                      {/* Label */}
                      <p className="text-center md:text-left w-full md:w-auto flex-1">
                        {innerLabel}
                      </p>

                      {/* Line separator */}
                      <hr
                        className={`hidden md:block w-[30%] bg-[#B5B5B5] md:mx-4 hr-transition ${
                          technicalInfo[key] ? 'active' : ''
                        }`}
                      />

                      {/* Numeric Input */}
                      <Controller
                        name={`technicalInfo.${innerKey}`}
                        control={control}
                        render={({ field }) => (
                          <NumericInput
                            {...field}
                            className="w-full md:w-auto"
                            disabled={!technicalInfo?.[key] || false}
                          />
                        )}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <p className="text-center md:text-left flex-1">
                      {costLabel}
                    </p>

                    <hr
                      className={`hidden md:block  w-[30%] bg-[#B5B5B5] md:mx-4 hr-transition ${
                        technicalInfo[key] ? 'active' : ''
                      }`}
                    />
                    <Controller
                      name={`technicalInfo.${costKey}`}
                      control={control}
                      render={({ field }) => (
                        <NumericInput
                          {...field}
                          className="w-full md:w-auto"
                          disabled={!technicalInfo?.[key] || false}
                        />
                      )}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RenewableEnergy;

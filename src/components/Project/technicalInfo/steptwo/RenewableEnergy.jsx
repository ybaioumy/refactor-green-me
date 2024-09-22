import { useFormContext, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  changeInProjectTechnicalInfo,
  changeInProjectTechnicalInfoInterconnection,
} from '../../../../redux/slices/project'; // update the path
import Icon from '../../../shared/Icon';
import NumericInput from '../../../shared/NumericInput';
const RenewableEnergy = ({ title, project }) => {
  const { control, watch } = useFormContext();
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
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col mb-5 px-4">
        <p className="text-[#1E4A28] text-[19px] font-[700]">{title}</p>
        <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
      </div>

      {interconnectionOptions.map(
        ({ key, label, costKey, costLabel, costKeys }) => (
          <div className="flex flex-col w-full gap-6 px-4 pt-[40px]" key={key}>
            <div className="flex flex-col md:flex-row items-center md:gap-6">
              {/* Radio Button */}
              <div className="z-10 border border-[#c7c7c7] rounded-[28px] w-full md:w-[355px] h-[70px] flex items-center px-[20px]">
                <Controller
                  name={`technicalInfo.${key}`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        id={key}
                        type="radio"
                        name="Interconnection"
                        className="w-4 h-4 text-gray-500 bg-gray-200"
                        checked={field.value || false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <label
                        htmlFor={key}
                        className="text-[12px] font-[700] text-[#1E4A28] ml-[15px]">
                        {label}
                      </label>
                    </>
                  )}
                />
              </div>

              {/* Cost Inputs */}
              <div
                className={`md:px-[70px] flex ${
                  costKeys && 'flex-col justify-between gap-4'
                } items-center justify-between rounded-[28px] bg-[#e7e7e7] w-full py-[40px] mt-4 md:mt-0 md:ml-[-40px]`}>
                {costKeys ? (
                  costKeys.map(({ key: innerKey, label: innerLabel }) => (
                    <div
                      className="flex items-center  justify-between w-full  mt-4 md:mt-0"
                      key={innerKey}>
                      <p>{innerLabel}</p>
                      <div className="w-[40%] h-[2px] bg-[#B5B5B5] md:mx-4"></div>
                      <Controller
                        name={`technicalInfo.${innerKey}`}
                        control={control}
                        render={({ field }) => (
                          <NumericInput
                            {...field}
                            disabled={!technicalInfo?.[key] || false}
                          />
                        )}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <p>{costLabel}</p>
                    <div className="w-[40%] h-[2px] bg-[#B5B5B5] md:mx-4"></div>
                    <Controller
                      name={`technicalInfo.${costKey}`}
                      control={control}
                      render={({ field }) => (
                        <NumericInput
                          {...field}
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

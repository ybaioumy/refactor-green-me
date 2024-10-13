import { useFormContext, Controller } from 'react-hook-form';
import NumericInput from '../../shared/NumericInput';

function StepFourECO() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="text-[#1E4A28] text-[19px] font-[700] px-4">
              General Assumptions
            </p>
            <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
          </div>
        </div>
        <div className=" md:flex w-full p-8 gap-12">
          <div className="md:w-[50%] flex flex-col gap-12">
            {/* OPEX Annual Escalation */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                OPEX Annual Escalation (%/year)
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF] p-[37px] rounded-[15px] mt-1">
                <Controller
                  name="economicViabilty.opexAnnualEscalation"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericInput {...field} unit="%/year" />
                  )}
                />
              </div>
            </div>

            {/* Annual General Inflation */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                Annual General Inflation (%/year)
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF] p-[37px] rounded-[15px] mt-1">
                <Controller
                  name="economicViabilty.annualGeneralInflation"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericInput {...field} unit="%/year" />
                  )}
                />
              </div>
            </div>

            {/* Tax Rate */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                Tax Rate (Year)
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF] p-[37px] rounded-[15px] mt-1">
                <Controller
                  rules={{
                    required: 'Tax Rate is required',
                    validate: (value) =>
                      value !== 0 || 'Tax Rate cannot be zero',
                  }}
                  name="economicViabilty.taxRate"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericInput {...field} unit="%" decimals />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepFourECO;

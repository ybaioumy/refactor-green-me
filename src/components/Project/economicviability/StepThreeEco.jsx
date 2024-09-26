import { useFormContext, Controller } from 'react-hook-form';
import NumericInput from '../../shared/NumericInput';

function StepThreeECO() {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="text-[#1E4A28] text-[19px] font-[700] px-4">
              Financing Assumptions
            </p>
            <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
          </div>
        </div>
        <div className=" md:flex w-full p-2 md:p-8 gap-12">
          <div className="md:w-[50%] flex flex-col gap-12">
            {/* Loan to Cost Ratio */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                Loan to Cost Ratio
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF]  p-2 md:p-[30px] rounded-[15px] mt-1">
                <Controller
                  rules={{
                    required: 'Loan to Cost Ratio is required',
                  }}
                  name="economicViabilty.loanToCostRatio"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <NumericInput {...field} />}
                />
              </div>
            </div>

            {/* Target Interest Rate */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                Target Interest Rate (%)
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF] p-2 md:p-[30px] rounded-[15px] mt-1">
                <Controller
                  name="economicViabilty.targetInterestRate"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <NumericInput {...field} unit="%" />}
                />
              </div>
            </div>
          </div>

          <div className="md:w-[50%] flex flex-col gap-12">
            {/* Target Loan Term */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                Target Loan Term (Year)
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF] p-2 md:p-[30px] rounded-[15px] mt-1">
                <Controller
                  name="economicViabilty.targetLoanTerm"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumericInput {...field} unit="Year" />
                  )}
                />
              </div>
            </div>

            {/* Target Equity Return */}
            <div className="w-full">
              <p className="text-[#1e4a28] text-[20px] font-[700]">
                Target Equity Return (%)
              </p>
              <div className="w-full flex items-center gap-4 bg-[#EFEFEF] p-2 md:p-[30px] rounded-[15px] mt-1">
                <Controller
                  name="economicViabilty.targetEquityReturn"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <NumericInput {...field} unit="%" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepThreeECO;

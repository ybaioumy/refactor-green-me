import { Empty, Spin, Result } from 'antd';
import { useGetProjectFinancialModelQuery } from '../../../redux/features/project';
import ExportAsExcelButton from '../../shared/ExcelButton';
import ExportAsPdf from '../../shared/ExportPDF';
import CustomerNetCashFlowTable from './components/CustomerNetCashFlowTable';
import ParametersTable from './components/ParametersTable';
import VerticalBarChart from './components/VerticalBarChart';
import Loader from '../../shared/Loader';
import Button from '../../shared/Button';
function FinancialSharedSavings({ project }) {
  const {
    data: projectFinancialData,
    isLoading: isLoadingFinancial,
    isError: isErrorFinancial,
    error: errorFinancial,
  } = useGetProjectFinancialModelQuery(project.id);

  console.table(
    // projectImpactViabilityData,
    // projectEnergyAudtData,
    projectFinancialData
  );
  if (isLoadingFinancial) return <Loader />;
  if (errorFinancial)
    return (
      <Result
        status="error"
        title="Calculations Failed"
        subTitle={errorFinancial.message}
      />
    );
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <div className="md:flex justify-between items-center mb-2">
              <p className="py-2 capitalize  text-[#1E4A28] text-[20px] font-bold">
                Viability Indicators / Cash Flow
              </p>
              <div className="flex gap-8">
                <ExportAsPdf />
                <ExportAsExcelButton />
              </div>
            </div>
            <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
          </div>
        </div>
        <div className=" flex flex-col w-full  gap-12">
          <div className="md:flex w-full gap-10">
            <div className="grid grid-cols-2 gap-10">
              <MetricCard
                title={'DSCR'}
                subtitle={'(Expected Debt Service Coverage Ratio)'}
                unit={'%'}
                value={projectFinancialData.averageDSCR}
              />

              <MetricCard
                title={'NPV'}
                subtitle={'(Expected Net Present Value)'}
                unit={'AED'}
                value={projectFinancialData.npv}
              />

              <MetricCard
                title={'IRR'}
                subtitle={'(Expected Internal Rate of Return)'}
                unit={'Years'}
                value={projectFinancialData.irr}
              />
              <MetricCard
                title={'PBP'}
                subtitle={' (Expected Payback Period)'}
                unit={'Years'}
                value={projectFinancialData.paybackPeriod}
              />
            </div>
            <div className="md:w-[20%] bg-[#BFE0C6] p-6 flex flex-col gap-8 rounded-[11px] border border-dashed border-[#bfe0c6]">
              <div className="flex items-end gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="32"
                  viewBox="0 0 49 64"
                  fill="none">
                  <path
                    d="M32.6667 0V16H49L32.6667 0ZM28.5833 16V0H6.125C2.74221 0 0 2.68625 0 6V58C0 61.3125 2.74221 64 6.125 64H42.875C46.2578 64 49 61.3138 49 58V20H32.7815C30.4081 20 28.5833 18.2125 28.5833 16ZM34.7083 52H14.2917C13.1688 52 12.25 51.1 12.25 50C12.25 48.9 13.1688 48 14.2917 48H34.7083C35.8358 48 36.75 48.8952 36.75 50C36.75 51.1 35.8313 52 34.7083 52ZM34.7083 44H14.2917C13.1688 44 12.25 43.1 12.25 42C12.25 40.9 13.1688 40 14.2917 40H34.7083C35.8358 40 36.75 40.8952 36.75 42C36.75 43.1 35.8313 44 34.7083 44ZM36.75 34C36.75 35.1 35.8313 36 34.7083 36H14.2917C13.1688 36 12.25 35.1 12.25 34C12.25 32.9 13.1688 32 14.2917 32H34.7083C35.8313 32 36.75 32.9 36.75 34Z"
                    fill="#1E4A28"
                  />
                </svg>
                <p className="text-[#1E4A28] font-abel text-[12px] font-[400]">
                  Economic Viability.pdf
                </p>
              </div>
              <div className="flex justify-center gap-6">
                <button
                  type="button"
                  className="bg-gradient-to-b from-white to-[#D8F992] flex flex-col items-center justify-center rounded-full w-[60px] h-[60px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="18"
                    viewBox="0 0 51 37"
                    fill="none">
                    <path
                      d="M25.2273 25.228C28.9426 25.228 31.9545 22.2161 31.9545 18.5007C31.9545 14.7853 28.9426 11.7734 25.2273 11.7734C21.5119 11.7734 18.5 14.7853 18.5 18.5007C18.5 22.2161 21.5119 25.228 25.2273 25.228Z"
                      fill="#1E4A28"
                    />
                    <path
                      d="M50.3529 17.9282C48.3748 12.8115 44.9408 8.38658 40.4753 5.20033C36.0097 2.01407 30.7084 0.206145 25.2266 0C19.7447 0.206145 14.4434 2.01407 9.97785 5.20033C5.51231 8.38658 2.07828 12.8115 0.100194 17.9282C-0.0333979 18.2977 -0.0333979 18.7023 0.100194 19.0718C2.07828 24.1885 5.51231 28.6134 9.97785 31.7997C14.4434 34.9859 19.7447 36.7939 25.2266 37C30.7084 36.7939 36.0097 34.9859 40.4753 31.7997C44.9408 28.6134 48.3748 24.1885 50.3529 19.0718C50.4865 18.7023 50.4865 18.2977 50.3529 17.9282ZM25.2266 29.4318C23.0644 29.4318 20.9509 28.7907 19.1532 27.5895C17.3554 26.3883 15.9543 24.681 15.1269 22.6834C14.2995 20.6859 14.083 18.4879 14.5048 16.3673C14.9266 14.2467 15.9678 12.2989 17.4966 10.77C19.0254 9.24119 20.9733 8.20004 23.0939 7.77823C25.2144 7.35643 27.4125 7.57291 29.41 8.40032C31.4075 9.22772 33.1148 10.6289 34.316 12.4266C35.5172 14.2243 36.1584 16.3379 36.1584 18.5C36.1539 21.3979 35.0008 24.1759 32.9516 26.225C30.9025 28.2742 28.1245 29.4274 25.2266 29.4318Z"
                      fill="#1E4A28"
                    />
                  </svg>
                  <p className="text-[#1E4A28] font-abel text-[10px] font-[400]">
                    View
                  </p>
                </button>
                <button
                  type="button"
                  className="bg-gradient-to-b from-white to-[#D8F992] flex flex-col items-center justify-center rounded-full w-[60px] h-[60px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 44 44"
                    fill="none">
                    <path
                      d="M24.3 3.4998C24.3 2.00637 23.0934 0.799805 21.6 0.799805C20.1066 0.799805 18.9 2.00637 18.9 3.4998V23.9776L12.7069 17.7845C11.6522 16.7298 9.93938 16.7298 8.88469 17.7845C7.83 18.8392 7.83 20.552 8.88469 21.6067L19.6847 32.4067C20.7394 33.4614 22.4522 33.4614 23.5069 32.4067L34.3069 21.6067C35.3616 20.552 35.3616 18.8392 34.3069 17.7845C33.2522 16.7298 31.5394 16.7298 30.4847 17.7845L24.3 23.9776V3.4998ZM5.4 30.4998C2.42156 30.4998 0 32.9214 0 35.8998V38.5998C0 41.5782 2.42156 43.9998 5.4 43.9998H37.8C40.7784 43.9998 43.2 41.5782 43.2 38.5998V35.8998C43.2 32.9214 40.7784 30.4998 37.8 30.4998H29.2359L25.4138 34.322C23.3044 36.4314 19.8872 36.4314 17.7778 34.322L13.9641 30.4998H5.4ZM36.45 35.2248C36.9871 35.2248 37.5021 35.4382 37.8819 35.8179C38.2617 36.1977 38.475 36.7127 38.475 37.2498C38.475 37.7869 38.2617 38.3019 37.8819 38.6817C37.5021 39.0615 36.9871 39.2748 36.45 39.2748C35.9129 39.2748 35.3979 39.0615 35.0181 38.6817C34.6383 38.3019 34.425 37.7869 34.425 37.2498C34.425 36.7127 34.6383 36.1977 35.0181 35.8179C35.3979 35.4382 35.9129 35.2248 36.45 35.2248Z"
                      fill="#1E4A28"
                    />
                  </svg>
                  <p className="text-[#1E4A28] font-abel text-[10px] font-[400]">
                    Download
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <VerticalBarChart />
          </div>
          <div className="flex flex-col">
            <div className="md:flex justify-between items-center mb-2">
              <p className="text-[#1E4A28] text-[19px] font-[700] px-4">
                Financial Projections (Guaranteed Savings)
              </p>
              <div className="flex gap-8">
                <ExportAsPdf />
                <ExportAsExcelButton />
              </div>
            </div>
            <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="md:flex items-center md:w-[70%]">
              <p className="mr-2 text-[#1E4A28] text-[20px] font-[600]">
                Client Upfront Investment
              </p>
              <div className="flex-grow h-[2px] bg-[#B5B5B5]"></div>
              <div className="md:w-[30%] flex text-[#1e4a28] text-[17px] font-[600] justify-end gap-2 px-4  items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                <p className="text-[#1e4a28] text-[20px] font-[700] ">
                  $ 626,000
                </p>
              </div>
            </div>
            <div className="md:flex items-center md:w-[70%]">
              <p className="mr-2 text-[#1E4A28] text-[20px] font-[600]">
                Client average energy savings share
              </p>
              <div className="flex-grow h-[2px] bg-[#B5B5B5]"></div>
              <div className="md:w-[30%] flex text-[#1e4a28] text-[17px] font-[600] justify-end gap-2 px-4  items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                <p className="text-[#1e4a28] text-[20px] font-[700] ">100 %</p>
              </div>
            </div>
            <div className="md:flex items-center md:w-[70%]">
              <p className="mr-2 text-[#1E4A28] text-[20px] font-[600]">
                Retained savings (total years)
              </p>
              <div className="flex-grow h-[2px] bg-[#B5B5B5]"></div>
              <div className="md:w-[30%] flex text-[#1e4a28] text-[17px] font-[600] justify-end gap-2 px-4  items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                <p className="text-[#1e4a28] text-[20px] font-[700] ">
                  $ 1,287,000
                </p>
              </div>
            </div>
            <div className="md:flex items-center md:w-[70%]">
              <p className="mr-2 text-[#1E4A28] text-[20px] font-[600]">
                Total Cash-flow (total years)
              </p>
              <div className="flex-grow h-[2px] bg-[#B5B5B5]"></div>
              <div className="md:w-[30%] flex text-[#1e4a28] text-[17px] font-[600] justify-end gap-2 px-4  items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                <p className="text-[#1e4a28] text-[20px] font-[700] ">
                  $ 789,000
                </p>
              </div>
            </div>
          </div>
          <div>
            <CustomerNetCashFlowTable />
          </div>
          <div>
            <ParametersTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialSharedSavings;

const MetricCard = ({ title, subtitle, value, unit }) => {
  return (
    <div className="w-full col-span-1 place-items-stretch">
      <p className="text-[#000] font-abel text-[20px] font-[400] block">
        {title}{' '}
        <span className="text-[#000] font-abel text-[15px] font-[400]">
          {subtitle}
        </span>
      </p>
      <div className="w-full flex text-[#1e4a28] text-[17px] font-[600] justify-start gap-2 px-2 flex-row-reverse items-center rounded-[15px] border border-dotted border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
        <p className="border-l border-[#000000] pl-2 text-[#1e4a28] text-[14px] font-[400]">
          {unit}
        </p>
        <p className="text-[#1e4a28] text-[20px] font-[700] ">{value}</p>
      </div>
    </div>
  );
};

import React from 'react';
import LineChart from './dashboard/LineChart';
import SustainabilityDash from './dashboard/SustainablityDash';
import { ReadyForBundlingList, OpportunitiesList } from './dashboard/SideTable';
import DisbursedPie from './dashboard/PieChart';
import ProjectSwiper from '../shared/ProjectsSwiper';
import {
  useGetAllProjectsQuery,
  useGetAllOpportunitiesQuery,
} from '../../redux/features/project';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
const Dashboard = () => {
  const intialSearchState = {
    categoryId: 0,
    economicSectorId: 0,
    servedCountryId: 0,
    projectStatusId: 0,
    pageNumber: 0,
    pageSize: 0,
  };

  const { data, isLoading, isError } =
    useGetAllProjectsQuery(intialSearchState);

  const {
    data: opportunities,
    isLoading: isOpportunitiesLoading,
    error: opportunitiesError,
  } = useGetAllOpportunitiesQuery(intialSearchState);

  const omData = [];
  const bundlingData = [
    { name: 'Project 001', finance: 'Not Allocated', status: 'ESCO: Required' },
  ];

  const pipelineData = {
    labels: ['25%', '15%', '45%'],
    datasets: [
      {
        data: [25, 15, 45],
        backgroundColor: ['#4B68B3', '#203D87', '#7B94D5'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
    text: '122',
    text2: 'Total',
    text3: 'Portfolio',
    tabs: ['Shared Savings', 'Guaranteed Savings', 'Turnkey Contracts'],
    headline1: 'Portfolios',
    headline2: 'By Contract',
  };
  const portfolioData = {
    labels: ['25%', '15%', '45%'],
    datasets: [
      {
        data: [25, 15, 45],
        backgroundColor: ['#5F8709', '#1E4A28', '#9BB75F'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
    text: '37',
    text2: 'Total',
    text3: 'Pipeline',
    tabs: [
      'ESCO Actions Needed',
      'Awaiting Loan Approval ',
      'Sponsor Actions Needed',
    ],
    headline1: 'Projects’ pipeline',
    headline2: 'overview',
  };
  if (isLoading || isOpportunitiesLoading) return <Loader />;
  if (isError) return <EmptyList message={'Something went wrong'} />;
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 transition-all duration-150">
      {/* Line Chart (spanning two columns) */}
      <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1 py-4">
        <LineChart />
      </div>

      <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 p-4 rounded-lg ">
        <DisbursedPie data={pipelineData} />
      </div>

      <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 p-4 rounded-lg ">
        <DisbursedPie data={portfolioData} />
      </div>

      <div className="lg:col-span-1 md:col-span-1 sm:col-span-1  p-4 rounded-lg ">
        <OpportunitiesList data={opportunities.data} />
      </div>
      <div className="xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1  p-4 rounded-lg ">
        <ProjectPipline data={data} isLoading={isLoading} />
      </div>

      <div className="lg:col-span-1 md:col-span-1 sm:col-span-1  p-4 rounded-lg ">
        <OMCenter omData={omData} />
      </div>
      <div className="lg:col-span-1 md:col-span-1 sm:col-span-1  p-4 rounded-lg ">
        <ReadyForBundlingList bundlingData={bundlingData} />
      </div>
      <div className="xl:col-span-5 lg:col-span-3 md:col-span-3 sm:col-span-1  p-4 rounded-lg ">
        <SustainabilityDash />
      </div>
    </div>
  );
};

export default Dashboard;

const ProjectPipline = ({ data, loading }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className=" text-[24px] font-bold text-[#1E4A28]">
          Projects pipeline
        </label>
        <Button
          hasIcon
          iconName={'addProject'}
          iconPosition="left"
          // size="sm"
          type="link"
          to={'/new-project'}
          className={'font-semibold w-[170px]'}>
          New Project{' '}
        </Button>
      </div>
      <div className="bg-[#F3F3F3] p-4 rounded-2xl h-full min-h-[400px] shadow">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="link"
            to={'/projects'}
            className={'w-[120px]'}>
            See All
          </Button>
          <Button
            className={'w-[120px]'}
            hasIcon
            iconName={'filter-vertical'}
            iconPosition="right"
            variant="secondary">
            Filters
          </Button>
        </div>
        <ProjectSwiper projects={data} slidePerView={2} isLoading={loading} />
      </div>
    </div>
  );
};

const OMCenter = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className=" text-[#1E4A28] text-[24px] font-bold">
          O&M Center
        </label>
        <Button
          hasIcon
          iconName={'addProject'}
          iconPosition="left"
          size="sm"
          className={'font-semibold w-[170px]'}>
          New OM{' '}
        </Button>
      </div>
      <div className="bg-[#F3F3F3] p-4 rounded-2xl min-h-full">
        <div className="flex gap-2">
          {/* <Button variant="secondary" className={'w-[120px]'}>
            See All
          </Button>
          <Button
            className={'w-[120px]'}
            hasIcon
            iconName={'filter-vertical'}
            iconPosition="right"
            variant="secondary">
            Filters
          </Button> */}
        </div>
        {/* <ProjectSwiper projects={[]} /> */}
      </div>
    </div>
  );
};

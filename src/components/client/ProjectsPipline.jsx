import ProjectSwiper from '../shared/ProjectsSwiper';
import Button from '../shared/Button';
import { useGetAllProjectsQuery } from '../../redux/features/project';
const ProjectsPipline = ({ slidePerView }) => {
  const initialSearchObject = {
    categoryId: 0,
    economicSectorId: 0,
    servedCountryId: 0,
    projectStatusId: 0,
    pageNumber: 0,
    pageSize: 0,
  };

  const { data, isLoading, error } =
    useGetAllProjectsQuery(initialSearchObject);
  return (
    <div className="flex flex-col w-full h-full">
      <label className="block text-[#1E4A28] text-[24px] mb-2 font-bold">
        Projects pipeline
      </label>
      <div className="flex flex-col w-full bg-[#F3F3F3] flex-1 p-5 gap-5 rounded-lg shadow h-full">
        <div className="flex justify-between gap-3 flex-wrap ">
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              className={'md:min-w-[120px] w-full'}
              hasIcon
              iconName={'filter-vertical'}
              iconPosition="right"
              variant="secondary">
              Filters
            </Button>
            <Button
              variant="secondary"
              className={'md:min-w-[120px] w-full truncate'}
              type="link"
              to={'/projects'}>
              See all
            </Button>
          </div>
          <div className="w-full md:w-auto">
            <Button
              hasIcon
              iconPosition="left"
              iconName="addProject"
              className="w-full font-semibold"
              type="link"
              to={'/new-project'}>
              New project
            </Button>
          </div>
        </div>
        <ProjectSwiper
          projects={data}
          slidePerView={slidePerView}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProjectsPipline;

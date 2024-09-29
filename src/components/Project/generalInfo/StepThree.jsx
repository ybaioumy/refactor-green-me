import MapComponent from '../../shared/Map';
import Button from '../../shared/Button';
import { useSelector } from 'react-redux';
import {
  useGetProjectDropDownsQuery,
  useGetAllCategoriesWithCrietriaQuery,
} from '../../../redux/features/project';
import EmptyList from '../../shared/EmptyList';
import Loader from '../../shared/Loader';
import { useStep } from '../../../context/formContext';
const ProjectSummary = ({ onEdit }) => {
  const { handleNext, handlePrevious, setCurrentChildIndex } = useStep();

  const { projectObject } = useSelector((state) => state.project);
  const {
    data: dropDowns,
    isLoading: isLoadingDropDowns,
    isError: isErrorLoadingDropDowns,
    error: errorDropDowns,
  } = useGetProjectDropDownsQuery('generalInfo');

  const {
    data: categories,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useGetAllCategoriesWithCrietriaQuery();

  const selectedCategory =
    categories?.find((cat) => cat?.id === projectObject?.categoryId)?.name ||
    '';

  const selectedSector =
    dropDowns?.economicSector?.find(
      (cri) => cri?.id === projectObject?.economicSectorId
    )?.name || '';
  const siteType =
    dropDowns?.siteType.find((item) => item.id === projectObject?.siteTypeId)
      ?.name || '';
  if (isLoadingCategory || isErrorLoadingDropDowns) return <Loader />;
  if (!projectObject || isErrorLoadingDropDowns || isLoadingCategory)
    return <EmptyList />;
  return (
    <>
      <DetailsRow onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow label="Project Name" value={projectObject?.projectName} />
        <ProjectRow label="Project Beneficiary" value="Fujairah Hold." />
      </DetailsRow>
      <DetailsRow onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow label="Project Category" value={selectedCategory} />
        <ProjectRow label="Economic Sector" value={selectedSector} />
      </DetailsRow>

      <DetailsRow onEdit={() => setCurrentChildIndex(1)}>
        {/* <LocationDetail projectObject={projectObject} /> */}
      </DetailsRow>
      <DetailsRow onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow
          label="Site Description"
          value={`${projectObject.description}` || ''}
        />
      </DetailsRow>
      <DetailsRow onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow label="Site Type" value={siteType || ''} />
        <ProjectRow
          label="Multi-Location"
          value={projectObject.multiLocation ? 'Yes' : 'No' || ''}
        />
      </DetailsRow>
      <DetailsRow onEdit={() => setCurrentChildIndex(1)} noBorder>
        <ProjectRow
          label="Site Area"
          value={`Land Area (sqm): ${projectObject?.landArea}` || ''}
        />
        <ProjectRow
          label=""
          value={`Gross Built-Up Area (sqm): ${projectObject.grossArea}` || ''}
        />
      </DetailsRow>
    </>
  );
};
const DetailsRow = ({ children, onEdit, noBorder = false }) => {
  return (
    <div
      className={`flex gap-2 items-center border-b border-[#CBCBCB] py-2 ${
        noBorder && 'border-b-0'
      }`}>
      <div className="flex gap-2 flex-1">{children}</div>
      <Button
        variant="secondary"
        className={'w-[40px] h-[40px] '}
        hasIcon
        iconName={'edit'}
        onClick={onEdit}></Button>
    </div>
  );
};
const ProjectRow = ({ label, value }) => {
  return (
    <div className="flex items-end justify-between w-full my-3">
      <div className="flex-1 w-full md:mr-10">
        <h2 className="text-[16px] md:text-[22px] text-[#1E4A28] font-bold">
          {label}
        </h2>
        <div className="bg-[#E6E6E6] overflow-hidden rounded-lg">
          <p className="text-gray-700  p-1 pl-3  w-full line-clamp-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

// const LocationDetail = ({ projectObject }) => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       if (projectObject.lat && projectObject.long) {
//         const response = await getCityName(projectObject.lat, projectObject.long);
//         setLocation(response);
//       }
//     };

//     fetchLocation();
//   }, [projectObject.lat, projectObject.long]);
//   const { city, country } = location || {};
//   return (
//     <div className="flex items-center justify-between w-full py-2 ">
//       <div className="flex-1">
//         <ProjectRow label="Location" value="Region: Middle East / GCC" />
//         <ProjectRow value={`Country: ${country || ''}`} />
//         <ProjectRow value={`City: ${city || ''}`} />
//       </div>
//       <div className="h-full flex-1 mx-10">
//         <MapComponent
//           viewOnly
//           positionValue={{ lat: projectObject.lat, long: projectObject.long }}
//         />
//       </div>
//     </div>
//   );
// };

export default ProjectSummary;

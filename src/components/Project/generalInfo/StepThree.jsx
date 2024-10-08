import { useEffect, useState } from 'react';
import MapComponent, { getCityName } from '../../shared/Map';

import Button from '../../shared/Button';
import { useSelector } from 'react-redux';
import {
  useGetProjectDropDownsQuery,
  useGetAllCategoriesWithCrietriaQuery,
} from '../../../redux/features/project';
import EmptyList from '../../shared/EmptyList';
import Loader from '../../shared/Loader';
import { useStep } from '../../../context/formContext';
const ProjectSummary = ({ onEdit, canEdit }) => {
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
      <DetailsRow canEdit={canEdit} onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow label="Project Name" value={projectObject?.projectName} />
        <ProjectRow label="Project Beneficiary" value="Fujairah Hold." />
      </DetailsRow>
      <DetailsRow canEdit={canEdit} onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow label="Project Category" value={selectedCategory} />
        <ProjectRow label="Economic Sector" value={selectedSector} />
      </DetailsRow>

      <DetailsRow canEdit={canEdit} onEdit={() => setCurrentChildIndex(1)}>
        <LocationDetail projectObject={projectObject} />
      </DetailsRow>
      <DetailsRow canEdit={canEdit} onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow
          label="Site Description"
          value={projectObject.description}
        />
      </DetailsRow>
      <DetailsRow canEdit={canEdit} onEdit={() => setCurrentChildIndex(1)}>
        <ProjectRow label="Site Type" value={siteType || ''} />
        <ProjectRow
          label="Multi-Location"
          value={projectObject.multiLocation ? 'Yes' : 'No' || ''}
        />
      </DetailsRow>

      <DetailsRow
        canEdit={canEdit}
        onEdit={() => setCurrentChildIndex(1)}
        noBorder>
        <ProjectRow
          label="Site Area"
          description={'Land Area (sqm):'}
          value={projectObject?.landArea}
        />
        <ProjectRow
          label=""
          description={'Gross Built-Up Area (sqm):'}
          value={projectObject.grossArea}
        />
        <ProjectRow
          label=""
          description={'Number of floors: '}
          value={projectObject.noOfFloors}
        />
      </DetailsRow>
    </>
  );
};
const DetailsRow = ({ children, onEdit, noBorder = false, canEdit }) => {
  return (
    <div
      className={`flex gap-2 items-center border-b border-[#CBCBCB] py-2 md:max-w-[1100px] ${
        noBorder && 'border-b-0'
      }`}>
      <div className="flex gap-2 flex-1">{children}</div>
      {canEdit && (
        <Button
          variant="secondary"
          className={'w-[40px] h-[40px] '}
          hasIcon
          iconName={'edit'}
          onClick={onEdit}></Button>
      )}
    </div>
  );
};
const ProjectRow = ({ label, value, description }) => {
  return (
    <div className="flex items-end justify-between w-full  my-3">
      <div className="flex-1 w-full md:mr-10">
        <h2 className="text-[16px] md:text-[22px] text-[#1E4A28] font-bold">
          {label}
        </h2>
        <div className="bg-[#E6E6E6] overflow-hidden rounded-lg">
          <p className="text-gray-700  p-1 pl-3  w-full line-clamp-1">
            <span className="mr-2">{description || null}</span>
            {value ? value : 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
};

const LocationDetail = ({ projectObject }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (projectObject.lat && projectObject.long) {
        const response = await getCityName(
          projectObject.lat,
          projectObject.long
        );
        setLocation(response);
      }
    };

    fetchLocation();
  }, [projectObject.lat, projectObject.long]);
  const { city, country } = location || {};
  return (
    <div className="flex items-center justify-between w-full py-2 ">
      <div className="flex-1">
        <ProjectRow label="Location" value="Region: Middle East / GCC" />
        <ProjectRow value={`Country: ${country || 'Not Available'}`} />
        <ProjectRow value={`City: ${city || 'Not Available'}`} />
      </div>
      <div className="h-full flex-1 mx-10">
        <MapComponent
          viewOnly
          positionValue={{ lat: projectObject.lat, long: projectObject.long }}
        />
      </div>
    </div>
  );
};

export default ProjectSummary;

import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPageNumber, setPageSize } from '../../../redux/slices/filtersSlice';
const CustomPaginationComponent = React.memo((props) => {
  const { totalRecords } = props; // Assuming totalRecords is passed as a prop

  const location = useLocation();
  const dispatch = useDispatch();

  const isAddMembersOrMissions =
    location.pathname.includes('add-members') ||
    location.pathname.includes('add-mission');

  const pageSize = useSelector((state) => state.search.pageSize);
  const currentPage = useSelector((state) => state.search.pageNumber);

  // Calculate total pages based on total records and page size
  const totalPages = useMemo(() => {
    if (pageSize <= 0 || totalRecords <= 0) {
      return 0;
    }
    return Math.ceil(totalRecords / pageSize);
  }, [totalRecords, pageSize]);

  const handleFirstPage = useCallback(
    () => dispatch(setPageNumber(1)),
    [dispatch]
  );

  const handlePreviousPage = useCallback(
    () => dispatch(setPageNumber(currentPage > 1 ? currentPage - 1 : 1)),
    [dispatch, currentPage]
  );

  const handleNextPage = useCallback(
    () =>
      dispatch(
        setPageNumber(currentPage < totalPages ? currentPage + 1 : totalPages)
      ),
    [dispatch, currentPage, totalPages]
  );

  const handleLastPage = useCallback(
    () => dispatch(setPageNumber(totalPages)),
    [dispatch, totalPages]
  );

  const handlePageSizeChange = useCallback(
    (event) => {
      dispatch(setPageSize(Number(event.target.value)));
      dispatch(setPageNumber(1)); // Reset to page 1 when page size changes
    },
    [dispatch]
  );

  const renderPages = useMemo(() => {
    const pages = [];
    if (totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  }, [totalPages]);

  const startRecord = useMemo(() => {
    return (currentPage - 1) * pageSize + 1;
  }, [currentPage, pageSize]);

  const endRecord = useMemo(() => {
    return Math.min(currentPage * pageSize, totalRecords);
  }, [currentPage, pageSize, totalRecords]);
  if (totalPages <= 0) {
    return null; // Or render a message indicating no data is available
  }
  return (
    <div
      className={`custom-pagination ${
        isAddMembersOrMissions ? 'membersPagination' : ''
      }`}>
      <p className="mr-3 hidden md:block">
        {`Showing ${startRecord} to ${endRecord} of ${totalRecords} Records`}
      </p>

      <button
        className="navigation"
        onClick={handleFirstPage}
        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        disabled={currentPage === 1}>
        <svg
          width="27"
          height="11"
          viewBox="0 0 37 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-5.02681e-07 10.5L17.25 0.54071L17.25 20.4593L-5.02681e-07 10.5Z"
            fill="#1E4A28"
          />
          <path
            d="M19 10.5L36.25 0.54071L36.25 20.4593L19 10.5Z"
            fill="#1E4A28"
          />
        </svg>
      </button>
      <button
        className="navigation"
        onClick={handlePreviousPage}
        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        disabled={currentPage === 1}>
        <svg
          width="26"
          height="11"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-6.77526e-07 13.5L23.25 0.0766057L23.25 26.9234L-6.77526e-07 13.5Z"
            fill="#1E4A28"
          />
        </svg>
      </button>
      {renderPages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => dispatch(setPageNumber(page))}>
          {page}
        </button>
      ))}
      <button
        className="navigation"
        onClick={handleNextPage}
        style={{
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
        disabled={currentPage === totalPages}>
        <svg
          width="26"
          height="11"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 13.5L0.749997 26.9234L0.749998 0.0766048L24 13.5Z"
            fill="#1E4A28"
          />
        </svg>
      </button>
      <button
        className="navigation"
        onClick={handleLastPage}
        style={{
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
        disabled={currentPage === totalPages}>
        <svg
          width="27"
          height="11"
          viewBox="0 0 37 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M37 10.5L19.75 20.4593L19.75 0.540707L37 10.5Z"
            fill="#1E4A28"
          />
          <path
            d="M18 10.5L0.749997 20.4593L0.749998 0.540707L18 10.5Z"
            fill="#1E4A28"
          />
        </svg>
      </button>
      <div className="ml-3 ">
        <label htmlFor="pageSize">Page Size: </label>
        <select
          id="pageSize"
          className="border border-green-500"
          value={pageSize}
          onChange={handlePageSizeChange}>
          <option value={5}>5 /page</option>
          <option value={10}>10 /page</option>
          <option value={20}>20 /page</option>
          <option value={50}>50 /page</option>
        </select>
      </div>
    </div>
  );
});

export default CustomPaginationComponent;

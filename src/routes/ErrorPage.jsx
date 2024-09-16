import { useRouteError, useNavigate, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page flex flex-col justify-center items-center h-dvh">
      <div className="bg-gray-300 p-4 flex flex-col gap-3 rounded-lg">
        <h1 className="text-[20px] text-[#000] font-bold">
          Oops , Page Not Found!
        </h1>
        {error.status === 404 ? (
          <p className="text-[20px] text-[#000]">
            Looks like you followed a broken link or entered a URL that does not
            exist on this site
          </p>
        ) : (
          <p>Sorry, an unexpected error has occurred.</p>
        )}
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to={'/'} className="text-blue-500">
          Back Home
        </Link>
      </div>
    </div>
  );
}

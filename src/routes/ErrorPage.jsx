import { useRouteError, useNavigate, Link } from 'react-router-dom';
import Button from '../components/shared/Button';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page flex flex-col justify-center items-center h-dvh text-center">
      <div className=" p-4 flex flex-col gap-3 rounded-lg">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          {error.status || 404}
        </h1>

        <h1 className="text-[20px] text-[#000] font-bold">
          Oops , {error.error.message || error.statusText || error.message}
        </h1>
        {error.status === 404 ? (
          <p className="text-[20px] text-[#000]">
            Looks like you followed a broken link or entered a URL that does not
            exist on this site
          </p>
        ) : (
          <p>Sorry, an unexpected error has occurred.</p>
        )}
        <p className="italic">
          <i>{error.statusText || error.message}</i>
        </p>
        <Button type="link" to={'/'} className="text-blue-500">
          Back Home
        </Button>
      </div>
    </div>
  );
}

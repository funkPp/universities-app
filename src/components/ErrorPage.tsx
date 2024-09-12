import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.hasOwnProperty("message") ? error.message : "Yes"}</i>
        </p>
      </div>
    );
  } else {
    return <h1>Don't know the error type</h1>;
  }
}

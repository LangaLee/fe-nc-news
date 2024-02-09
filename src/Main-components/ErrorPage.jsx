import Topics from "./Topics";
const ErrorPage = ({ error }) => {
  return (
    <div className="text-5xl m-10">
      <h2>{error}</h2>
      {error === "Topic not found" ? (
        <Topics value={"Availabe Topics"} />
      ) : null}
    </div>
  );
};

export default ErrorPage;

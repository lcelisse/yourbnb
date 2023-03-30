import { Redirect } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div>
      <div className="page-not-found">404 Page Not Found</div>
      <Redirect to="/" />
    </div>
  );
};

export default PageNotFound;

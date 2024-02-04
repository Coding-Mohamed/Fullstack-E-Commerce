import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Something went wrong</h1>
      <p className="lead">Please go back to the Expolore Collections</p>
      <Link to="/" className="btn btn-primary">
        Expolore
      </Link>
    </div>
  );
}

export default NotFoundPage;

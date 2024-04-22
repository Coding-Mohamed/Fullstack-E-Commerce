import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LoginMessage = ({ isSuccess }) => {
  return (
    <div className="mx-5 text-center" style={{ maxWidth: "500px" }}>
      {isSuccess ? <h2>Welcome back</h2> : <h2>Failed to login, Please check your internet connection and try again.</h2>}
      <div className="mt-2">
        <Link to="/orders">
          <button className="btn btn-primary">View Order Details</button>
        </Link>
        <Link to="/cart">
          <button className="btn btn-primary">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginMessage;

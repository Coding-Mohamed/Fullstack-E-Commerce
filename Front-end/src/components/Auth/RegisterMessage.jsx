import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RegisterMessage = ({ isSuccess }) => {
  return (
    <div className="container col-7 mt-5">
      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          <h5 className="alert-heading">You have created an account successfully!</h5>
          <p>You can now login into your account.</p>
          <hr />
          <NavLink to="/login" className="btn btn-primary fs-4">
            Login
          </NavLink>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          Something went wrong, please try again.
        </div>
      )}
    </div>
  );
};

export default RegisterMessage;

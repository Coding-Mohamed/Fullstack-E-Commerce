import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 px-3">
      <div className="login-hide">
        {<p className="fs-5 mt-2"></p>}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

import Input from "../../Common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import loginUser from "../../Services/loginService";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router";
import {
  useAuth,
  useAuthAction,
} from "../../Context/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required(
    "Email is required!!!"
  ),
  password: Yup.string().required(
    "password is required"
  ),
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(
    () => new URLSearchParams(search),
    [search]
  );
}

const Login = () => {
  const setAuth = useAuthAction();
  const navigate = useNavigate();
  const userData = useAuth();
  const [error, setError] = useState(null);

  const query = useQuery();
  const redirect = query.get("redirect");

  useEffect(() => {
    if (userData) navigate("/checkout");
  }, [redirect, userData]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setError(null);
      setAuth(data);
      // localStorage.setItem(
      //   "auth",
      //   JSON.stringify(data)
      // );
      navigate(`${redirect}`);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className='signupContainer'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          name='email'
          label='Email'
        />
        <Input
          formik={formik}
          name='password'
          label='Password'
          type='password'
        />
        <button
          className='btn'
          style={{
            width: "30%",
            marginTop: "20px",
          }}
          type='submit'
          disabled={!formik.isValid}>
          Login
        </button>
        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}
        <Link to={`/signup?redirect=${redirect}`}>
          <p style={{ marginTop: "20px" }}>
            Not Signup Yet?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;

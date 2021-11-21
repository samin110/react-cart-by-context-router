import Input from "../../Common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";
import { Link } from "react-router-dom";
import signupUser from "../../Services/signupUser";
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
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid Email Form")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required ")
    .matches(
      /^[0-9]{11}$/,
      "Invalid Phone Number"
    )
    .nullable(),
  password: Yup.string().required(
    "Password is required"
  ),
  passwordConfirm: Yup.string().required(
    "Password Confirm is required"
  ),
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(
    () => new URLSearchParams(search),
    [search]
  );
}

const SignupFrom = () => {
  const setAuth = useAuthAction();
  let navigate = useNavigate();
  const userData = useAuth();

  const [err, setErr] = useState(null);

  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  useEffect(() => {
    if (userData) navigate("/checkout"); // checkout Later !!!!!!!!!!!!!!!!!
  }, [redirect, userData]);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } =
      values;
    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      // localStorage.setItem(
      //   "auth",
      //   JSON.stringify(data)
      // );
      navigate(`/${redirect}`);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className='signupContainer'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          name='name'
          label='Name'
        />
        <Input
          formik={formik}
          name='email'
          label='Email'
          type='email'
        />
        <Input
          formik={formik}
          name='phoneNumber'
          label='Phone Number'
          type='tel'
        />
        <Input
          formik={formik}
          name='password'
          label='Password'
          type='password'
        />
        <Input
          formik={formik}
          name='passwordConfirm'
          label='Password Confirmation'
          type='password'
        />
        <button
          type='submit'
          className='btn btnSubmit'
          disabled={!formik.isValid}>
          submit
        </button>

        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "20px" }}>
            Already SignUp?
          </p>
        </Link>
      </form>
    </div>
  );
};
export default SignupFrom;

const Message = ({ err }) => {
  return (
    <div>
      {err ? (
        <p style={{ color: "red" }}>{err}</p>
      ) : (
        <p style={{ color: "green" }}>
          User Added
        </p>
      )}
    </div>
  );
};

// export default Message;

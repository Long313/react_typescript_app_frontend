import React from "react";
import style from "./login.module.scss";
import { Field, Form, Formik } from "formik";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import * as Configs from "../../config/index";
import * as AccountService from "../../services";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function Login() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const handleSubmit = (values: any) => {
    loginUser(values, dispatch, navigate);
  };
  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <div className={style.login}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            return (
              <Form className={style.form}>
                <div className={style.container_group}>
                  <div className={style.title_input}>Email</div>
                  <div className={style.container_field}>
                    <div className={style.container_icon}>
                      <AiOutlineMail />
                    </div>
                    <div className={style.field}>
                      <Field
                        type="email"
                        name="email"
                        className={style.input}
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  {errors.email && touched.email ? (
                    <div className={style.notify_error}>{errors.email}</div>
                  ) : null}
                </div>
                <div className={style.container_group}>
                  <div className={style.title_input}>Password</div>
                  <div className={style.container_field}>
                    <div className={style.container_icon}>
                      <AiOutlineLock />
                    </div>
                    <div className={style.field}>
                      <Field
                        type="password"
                        name="password"
                        className={style.input}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  {errors.password && touched.password ? (
                    <div className={style.notify_error}>{errors.password}</div>
                  ) : null}
                </div>
                <button type="submit" className={style.btn_signup}>
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={style.link_signin}>
        <span> Do not have an account? </span>
        <Link to="/register" className={style.link_signin}>
          Signup now
        </Link>
      </div>
    </div>
  );
}

export default Login;

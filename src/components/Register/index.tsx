import style from "./signup.module.scss";
import { Field, Form, Formik } from "formik";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be less than 15 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const handleSubmit = (values: any) => {
    registerUser(values, dispatch, navigate);
  };
  return (
    <div className={style.container}>
      <h1 className={style.title}>Register</h1>
      <div className={style.register}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(formikProps) => {
            // do something here ...
            const { values, errors, touched } = formikProps;
            return (
              <Form className={style.form}>
                <div className={style.container_group}>
                  <div className={style.title_input}>UserName</div>
                  <div className={style.container_field}>
                    <div className={style.container_icon}>
                      <FiUser />
                    </div>
                    <div className={style.field}>
                      <Field
                        name="username"
                        className={style.input}
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  {errors.username && touched.username ? (
                    <div className={style.notify_error}>{errors.username}</div>
                  ) : null}
                </div>
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
                  Signup
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={style.link_signin}>
        <span>Already have an account ? </span>
        <Link to="/login" className={style.link_signin}>
          Signin
        </Link>
      </div>
    </div>
  );
}

export default Register;

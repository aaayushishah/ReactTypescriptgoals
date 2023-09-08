import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { userLogin } from "../actions/loginAction";
import { ILoginSuccess } from "../helpers/loginInterface";
import Storage from "../services/storage";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Header from "./Header/Header";
import { useToast } from "../providers/ToastProvider";
interface FormikValues {
  email: string;
  password: string;
}
const LoginComponent = (props: any) => {
  const { openToast } = useToast();
  
  return (
    <Formik
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values: FormikValues) => {
        props.userLogin(values).then((val: ILoginSuccess) => {
          Storage.set("token", val.token);
          if (openToast) {
            openToast("Login Successfull", {
              type: "success"
            });
          }
          props.history.push("/");
        }).catch((err:any) => {
          if (openToast) {
            openToast("Invalid username/password", {
              type: "error"
            });
          }
        });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Enter valid email")
          .required("Email required"),
        password: Yup.string().required("Password Required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isValid,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <>
              <Container component="main" maxWidth="sm">
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      px: 4,
                      py: 6,
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.email && touched.email ? errors.email : ""
                        }
                        error={errors.email && touched.email ? true : false}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        placeholder={"Enter Password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Password"
                        type="password"
                        id="password"
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : ""
                        }
                        error={
                          errors.password && touched.password ? true : false
                        }
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isValid && dirty ? false : true}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Container>
          </>
        );
      }}
    </Formik>
  );
};
export default connect(null, {
  userLogin,
})(Header(LoginComponent));
// export default LoginComponent;

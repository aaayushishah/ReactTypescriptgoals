import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { userRegister } from "../actions/loginAction";
import { IRegisterSuccess } from "../helpers/loginInterface";
import { Button, TextField, Typography, Box, Container, Switch, FormGroup, FormControlLabel } from "@mui/material";
import Storage from "../services/storage";
import Header from "./Header/Header";
interface FormikValues {
  email: string;
  password: string;
  name: string;
  age: string;
  confirmPassword: string;
  address: address;
  isAdmin: boolean;
}
interface address {
  addressLine: string;
  area: string;
}
const RegisterComponent = (props: any) => {
  return (
    <Formik
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        age: "",
        address: {
          addressLine: "",
          area: "",
        },
        isAdmin: false
      }}
      onSubmit={(values: FormikValues) => {
        props.userRegister(values).then((val: IRegisterSuccess) => {
          Storage.set("token", val.token);
          props.history.push("/");
        });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Enter valid email")
          .required("Email required"),
        name: Yup.string()
          .required("Name required")
          .min(3, "Min 3 char required"),
        password: Yup.string()
          .required("Password Required")
          .min(8, "Must be 8 chars")
          .matches(/[A-Z]/, "Must contain upper case")
          .matches(/[a-z]/, "Must contain lower case")
          .matches(/[!@#$%^&*]/, "Must contain special char")
          .matches(/[0-9]/, "Must contain digit"),
        confirmPassword: Yup.string()
          .required("Confirm Password required")
          .min(8, "Must be 8 chars")
          .matches(/[A-Z]/, "Must contain upper case")
          .matches(/[a-z]/, "Must contain lower case")
          .matches(/[!@#$%^&*]/, "Must contain special char")
          .matches(/[0-9]/, "Must contain digit")
          .oneOf([Yup.ref("password")], "Your passwords do not match."),
        age: Yup.number()
          .min(1, "Enter age > 0")
          .max(105, "Enter proper age")
          .required("Age is required"),
        address: Yup.object().shape({
          addressLine: Yup.string().required("Name required"),
          area: Yup.string().required("Name required"),
        }),
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
            <Container component="main" maxWidth="lg" sx={{ width: "50%" }}>
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
                    Register User
                  </Typography>
                  <Box sx={{ mt: 1 }}>
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
                      id="password"
                      label="Password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ""
                      }
                      error={errors.password && touched.password ? true : false}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      id="confirmPassword"
                      label="Re-type password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.confirmPassword && touched.confirmPassword
                          ? errors.confirmPassword
                          : ""
                      }
                      error={
                        errors.confirmPassword && touched.confirmPassword
                          ? true
                          : false
                      }
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.name && touched.name ? errors.name : ""
                      }
                      error={errors.name && touched.name ? true : false}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.age && touched.age ? errors.age : ""}
                      error={errors.age && touched.age ? true : false}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="address.addressLine"
                      label="Address"
                      name="address.addressLine"
                      value={values.address.addressLine}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.address?.addressLine &&
                        touched.address?.addressLine
                          ? errors.address.addressLine
                          : ""
                      }
                      error={
                        errors.address?.addressLine &&
                        touched.address?.addressLine
                          ? true
                          : false
                      }
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="address.area"
                      label="Area"
                      name="address.area"
                      value={values.address.area}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.address?.area && touched.address?.area
                          ? errors.address.area
                          : ""
                      }
                      error={
                        errors.address?.area && touched.address?.area
                          ? true
                          : false
                      }
                    />
                    <FormGroup row>
                      <FormControlLabel
                        control={<Switch aria-label="Switch-component" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.isAdmin}
                        name="isAdmin"
                        defaultChecked={false} />}
                        label="isAdmin"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isValid && dirty ? false : true}
                    >
                      Register
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
  userRegister,
})(Header(RegisterComponent));
// export default LoginComponent;

import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { addProducts } from "./../../actions/productsAction";
import { IProductSuccess } from "../../helpers/productInterface";
import Header from "../Header/Header";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
interface FormikValues {
  name: string;
  price: string;
  description: string;
}
const CreateProduct = (props: any) => {
  return (
    <Formik
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{
        name: "",
        price: "",
        description: "",
      }}
      onSubmit={(values: FormikValues) => {
        props.addProducts(values).then((val: IProductSuccess) => {
          props.history.push("/products");
        });
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("Name required")
          .min(3, "Min 3 char required"),
        price: Yup.number().required("Price required").min(1, "Should be > 0"),
        description: Yup.string(),
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
                    Add Product
                  </Typography>
                  <Box sx={{ mt: 1 }}>
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
                      id="price"
                      label="Price"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.price && touched.price ? errors.price : ""
                      }
                      error={errors.price && touched.price ? true : false}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.description && touched.description ? errors.description : ""
                      }
                      error={errors.description && touched.description ? true : false}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isValid && dirty ? false : true}
                      >
                        Create
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
  addProducts,
})(Header(CreateProduct));

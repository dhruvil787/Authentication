import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";

const Login = () => {
  // Css using variables
  const paperstyle = {
    padding: 20,
    width: 400,
    margin: "20px auto",
  };
  const avtarStyle = {
    backgroundColor: "#21b5c0",
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Use Formik to handle form state and validation
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          // kminchelle
          // 0lelplR
        });

        if (response.ok) {
          const data = await response.json();
          // Simulate token generation (replace with your actual token logic)
          const token = data.token;
          // Store the token in localStorage
          localStorage.setItem("token", token);
          toast.success("Successfully login");
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100 min-vh-100">
        <Grid>
          <Paper elevation={10} style={paperstyle}>
            <Grid align="center">
              <Avatar style={avtarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4 mb-2">
                <div className="">
                  <TextField
                    label="Username"
                    placeholder="Enter Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    fullWidth
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    label="Password"
                    placeholder="Enter Password "
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    fullWidth
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </div>
              </div>
              <FormControlLabel
                control={
                  <Checkbox name="remember" color="primary" defaultChecked />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                className="mt-2"
                color="primary"
                fullWidth
              >
                Sign in
              </Button>
              <Typography className="mt-2">
                <Link>Forgot Password</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default Login;

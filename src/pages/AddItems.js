import React, { useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Row,
  Col,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useFormik, Field } from "formik";

import * as Yup from "yup";
import axios from "axios";

const AddItems = () => {
  const talukaList = [
    "Pernem",
    "Bardez",
    "Bicholim",
    "Satari",
    "Tiswadi",
    "Ponda",
    "Murmgao",
    "Salcete",
    "Sanguem",
    "Quepem",
    "Dharbandora ",
    "Canacona",
  ];
  const [taluka, setTaluka] = useState(talukaList[0]);

  const [alert, setAlert] = useState(false)

  const formik = useFormik({
    initialValues: {
      sitename: "",
      description: "",
      village: "",
      sno: "",
      subdiv: "",
      ps: "",
      // owner: "2",
    },
    validationSchema: Yup.object({
      // email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      sitename: Yup.string().max(255).required("Name is required"),
      description: Yup.string().max(255).required("Description is required"),
      // image: Yup.string().max(255).required("Image is required"),
    }),
    onSubmit: () => {
      console.log("submitted", formik.values);

      axios
        .post("http://localhost:5000/api/v1/monument", {
          site: formik.values.sitename,
          village: formik.values.village,
          taluka: taluka,
          sno: formik.values.sno,
          subdiv: formik.values.subdiv,
          owner: formik.values.owner,
          ps: formik.values.ps,
          description: formik.values.description,
        })
        .then((res) => {
          console.log(res.data);
          window.location.href = "/";
          setAlert(true)
        });
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              ADD MONUMENT
            </Typography>
          </Box>

          <TextField
            error={Boolean(formik.touched.sitename && formik.errors.sitename)}
            fullWidth
            helperText={formik.touched.sitename && formik.errors.sitename}
            label="Site Name"
            margin="normal"
            name="sitename"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.sitename}
            variant="outlined"
          />

          <TextField
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            fullWidth
            helperText={formik.touched.description && formik.errors.description}
            label="Description"
            margin="normal"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.description}
            variant="outlined"
          />

          <TextField
            error={Boolean(formik.touched.village && formik.errors.village)}
            fullWidth
            helperText={formik.touched.village && formik.errors.village}
            label="Village"
            margin="normal"
            name="village"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.village}
            variant="outlined"
          />

          <TextField
            error={Boolean(formik.touched.Sno && formik.errors.Sno)}
            fullWidth
            helperText={formik.touched.Sno && formik.errors.Sno}
            label="Sno"
            margin="normal"
            name="sno"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.Sno}
            variant="outlined"
          />

          <TextField
            error={Boolean(formik.touched.subdiv && formik.errors.subdiv)}
            fullWidth
            helperText={formik.touched.subdiv && formik.errors.subdiv}
            label="Sub Div"
            margin="normal"
            name="subdiv"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.subdiv}
            variant="outlined"
          />

          <TextField
            error={Boolean(formik.touched.ps && formik.errors.ps)}
            fullWidth
            helperText={formik.touched.ps && formik.errors.ps}
            label="Police Station"
            margin="normal"
            name="ps"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.ps}
            variant="outlined"
          />

          {/* <TextField
            error={Boolean(
              formik.touched.owner && formik.errors.owner
            )}
            fullWidth
            helperText={formik.touched.owner && formik.errors.owner}
            label="Owner"
            margin="normal"
            name="owner"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.owner}
            variant="outlined"
          /> */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Taluka</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taluka}
              label="Taluka"
              onChange={(e) => {
                setTaluka(e.target.value);
              }}
            >
              {talukaList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <RadioGroup name="lol">
              <FormControlLabel value="lewl" control={<Radio />} label="lol" />
              <FormControlLabel value="lewl" control={<Radio />} label="lol" />
              <FormControlLabel value="lewl" control={<Radio />} label="lol" />
              <FormControlLabel value="lewl" control={<Radio />} label="lol" />
            </RadioGroup> */}

          {/* <Field component={RadioGroup} name="activity"> */}

          <br />
          <br />

          <RadioGroup defaultValue="Yes">
            <div style={{ flexDirection: "row" }}>
              <h3>Featured</h3>
              <FormControlLabel
                value="Yes"
                control={<Radio disabled={formik.isSubmitting} />}
                label="Yes"
                disabled={formik.isSubmitting}
                name="featured"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FormControlLabel
                value="No"
                control={<Radio disabled={formik.isSubmitting} />}
                label="No"
                disabled={formik.isSubmitting}
                name="featured"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
          </RadioGroup>

          <RadioGroup defaultValue="Government">
            <div style={{ flexDirection: "row" }}>
              <h3>Owner</h3>
              <FormControlLabel
                value="Government"
                control={<Radio disabled={formik.isSubmitting} />}
                label="Government"
                disabled={formik.isSubmitting}
                name="owner"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FormControlLabel
                value="Private"
                control={<Radio disabled={formik.isSubmitting} />}
                label="Private"
                disabled={formik.isSubmitting}
                name="owner"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
          </RadioGroup>

          <br />

          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              ADD
            </Button>
          </Box>
          </form>
        </Container>
        {alert && <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        The data has been added!
      </Alert>}
      </Box>
    </>
  );
};

export default AddItems;

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Validation Library
import * as yup from "yup";
import { object } from "yup/lib/locale";

let schema = yup.object().shape({
  name: yup.string().required("Name is a Required Field"),
  // age: yup.number().required().positive().integer(),
  email: yup.string().required("Email is a Required Field").email(), // dont need .email error message as mui handling it
  //  number: yup.number().max(20) // highest length
  number: yup
    .string()
    .required("Favorite Number is a Required Field")
    .max(3, "max 3 characters for favorite number"), // max is 3 char.
  // website: yup.string().url(),
  // createdOn: yup.date().default(function () {
  //   return new Date();
  // }),
});

export default function BasicTextFields() {

  // Form Submit Handler
  const save = (event) => {
    event.preventDefault();
    const validateNestedSchema = async () => {
      await schema
        .validate(
          {
            name: name,
            email: email,
            number: number,
          },
          { abortEarly: false, context: object } // returns context object of just what was in Schema. ex: no phone in this case
        ).then(validInfo => {
           setValidationResults([])
           alert(`Thanks ${validInfo.name}! Your form has been submitted.`)
        })
        .catch((err) => {
          var messageArray = [];
          err.inner.forEach((e) => {
            messageArray.push(e.message) 
            //console.log(e.message, e.path);
          });
          setValidationResults(messageArray)

        });
    };
    validateNestedSchema()
  };

  // Name Field
  const [name, setName] = useState("");
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [tel, setTel] = useState("");
  const onTelChange = (e) => {
    setTel(e.target.value);
  };

  const [number, setNumber] = useState("");
  const onNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const [validationResults, setValidationResults] = useState([]);

  // schema
  //   .isValid({
  //     name: name
  //   })
  //   .then(function (valid) {
  //     valid; // => true
  //   });

  return (
    <Box
      component="div"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "whitesmoke",
      }}
      noValidate
      autoComplete="off"
    >
      <form
        //method="POST"
        onSubmit={(event) => {
          save(event);
        }}
        style={{
          width: 300,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          margin: "0px auto",
          minHeight: 400,
          borderRadius: 20,
          background: "white",
          boxShadow: "0px 0px 10px rgba(0,0,0,.3)",
        }}
        id="basic-form"
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={name}
          onChange={onNameChange}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="standard"
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          id="tel"
          label="Phone Number"
          type="tel"
          variant="standard"
          value={tel}
          onChange={onTelChange}
        />
        <TextField
          id="number"
          label="Favorite Number"
          type="number"
          variant="standard"
          value={number}
          onChange={onNumberChange}
        />
        <Button
          type="submit"
          variant="extended"
          id="save-button"
          color="promary"
          style={{
            padding: 10,
            background: "navy",
            color: "white",
            width: 160,
            borderRadius: 40,
            marginTop: 20,
          }}
        >
          Save
        </Button>

        {validationResults.map((validationMessage)=>{
          return <p style={{margin: 3, color: "firebrick"}}>{validationMessage}</p>
        }
        )}
      </form>
    </Box>
  );
}

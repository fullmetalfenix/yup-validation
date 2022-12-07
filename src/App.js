import * as React from "react";
import { useState, useRef } from "react";
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

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  // const telRef = useRef(null); // dont need, not validating - would need if actually submitting a form though
  const numberRef = useRef(null);

  const [validationResults, setValidationResults] = useState([]);


  // Form Submit Handler
  const save = (event) => {
    event.preventDefault();
    const validateNestedSchema = async () => {
      await schema
        .validate(
          {
            name: nameRef.current.value,
            email: emailRef.current.value,
            number: numberRef.current.value,
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
          inputRef={nameRef} // NOT ref - inputRef in MUI
          id="name"
          label="Name"
          variant="standard"

        />
        <TextField
          inputRef={emailRef} // NOT ref - inputRef in MUI
          id="email"
          label="Email"
          type="email"
          variant="standard"
        />
        <TextField
          id="tel"
          label="Phone Number"
          type="tel"
          variant="standard"
        />
        <TextField
          inputRef={numberRef} // NOT ref - inputRef in MUI
          id="number"
          label="Favorite Number"
          type="number"
          variant="standard"
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

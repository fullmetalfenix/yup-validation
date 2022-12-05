import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';





export default function BasicTextFields() {
  
  const save = (event) => {
  event.preventDefault();
  alert('hello world')
}

  return (
    <Box
      component="div"
      style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' , alignItems: 'center'}}
      noValidate
      autoComplete="off"
    >
      <form
      //method="POST"
      onSubmit={(event) => {save(event)}}
      style={{
        width: 300,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0px auto',
        height: 400,
      }}
      id="basic-form"
      >
        <TextField required id="standard-basic" label="Name" variant="standard" />
        <TextField required  id="standard-basic" label="Email" type="email" variant="standard" />
        <TextField required id="standard-basic" label="Phone Number" type="tel" variant="standard" />
        <TextField required id="standard-basic" label="Favorite Number" type="number" variant="standard" />
        <Button type="submit" variant="extended" id="save-button" color="promary"
        style={{
          "padding": 10,
          "background": "navy",
          color: 'white',
          width: 160,
          borderRadius: 40
        }}
        
        >Save</Button>
      </form>
    </Box>
  );
}
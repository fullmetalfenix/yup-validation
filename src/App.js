import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Validation Library
import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
//  number: yup.number().max(20) // highest length
    number: yup.string().required().max(3) // max is 3 char.
// website: yup.string().url(),
  // createdOn: yup.date().default(function () {
  //   return new Date();
  // }),
});


  
export default function BasicTextFields() {
  
// Form Submit Handler
  const save = (event) => {
  event.preventDefault();
    schema.isValid({
      name: name,
      email: email,
      number: number
      }).then(function(valid){
        if(valid){
          alert(`name!: ${name}, email: ${email}, Phone: ${tel}, Favorite Number: ${number}`)
        }else{
          alert('nope')
        }
      }).catch(function(){
        console.log('whatever')
      })

}

// Name Field
const [name, setName] = useState('')
const onNameChange = (e) => {
  setName(e.target.value)
}

const [email, setEmail] = useState('')
const onEmailChange = (e) => {
  setEmail(e.target.value)
}

const [tel, setTel] = useState('')
const onTelChange = (e) => {
  setTel(e.target.value)
}

const [number, setNumber] = useState('')
const onNumberChange = (e) => {
  setNumber(e.target.value)
}



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
      style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center' , alignItems: 'center', background: 'whitesmoke'}}
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
        borderRadius: 20,
        background: 'white',
        boxShadow: "0px 0px 10px rgba(0,0,0,.3)"
      }}
      id="basic-form"
      >
        <TextField  id="name" label="Name" variant="standard" value={name} onChange={onNameChange}/>
        <TextField  id="email" label="Email" type="email" variant="standard" value={email} onChange={onEmailChange}/>
        <TextField  id="tel" label="Phone Number" type="tel" variant="standard" value={tel} onChange={onTelChange}/>
        <TextField  id="number" label="Favorite Number" type="number" variant="standard" value={number} onChange={onNumberChange}/>
        <Button type="submit" variant="extended" id="save-button" color="promary"
        style={{
          "padding": 10,
          "background": "navy",
          color: 'white',
          width: 160,
          borderRadius: 40, 
          marginTop: 20
        }}
        
        >Save</Button>
      </form>
    </Box>
  );
}
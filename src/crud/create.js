import React, { useEffect } from "react";
import {Form,Button, Checkbox } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// url import
import { API_URL } from "../constent/URL";
// boostrap import

import ".//crud.css";

// toaster alert import 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState([]);
  const [fetchError,setFetcherror]=useState("")

  //  navigate

  // const navigate = useNavigate();

  const postData = async () => {

  const error={}

      // Name valid 
       const letterValid=/[a-zA-Z]/;
       if(Name==="" || !letterValid.test(Name)){
        error.name="Fill the blank ,only letter !"
       }else{
        error.name=""
       }

      // email valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if( Name.length==="" || !emailRegex.test(Email) ){
        error.email="Enter valid Email!"
        setError(error)
      }else{
        error.email=""
        setError(error)
        try {
        
          await axios.post(API_URL, {
            Name,
            Email,
            checked,
          });

           // toaster
          toast.success("Data save");
         
          setName('')
          setEmail('')
          // navigate("/read");
        } catch (error) {
           // toaster
          setFetcherror(toast.warning(error.message));
        }
      }
    
  };


  return (
   <div className="card">
    <h3 className="heading">CRUD APPLICATION</h3>
    <h4 className="title">ADD PAGE</h4>
    {/* <span className="network">
      {
      fetchError ? fetchError:""
      }
    </span> */}
     <Form className="form">
      {/* toaster */}
     <ToastContainer/>
        <div>
       <label for='Name' className="label">Name</label>
        <input
          value={Name}
          className="input"
          onChange={(event) => setName(event.target.value.toUpperCase())}
          placeholder=" Name"
        />
        <br></br>
        <label className="error">{error.name}</label>
          </div>
      <br></br>

      <div>
      <label for='Email' className="label">Email</label>
        <input
          value={Email}
          className="input"
          onChange={(event) => setEmail(event.target.value.toLowerCase())}
          placeholder="Email"
        />
        <br></br>
        <label className="error">{error.email}</label>
      </div>

      <div>
        <Checkbox
          className="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          label="Agree the terms & conditions"
        />

        <Button className="btn btn-primary" onClick={postData}>
          Submit
        </Button>
      </div>
      <Link to="/read" className="read-btn">
        READ DETAILS
      </Link>
    </Form>
   </div>
  );
}

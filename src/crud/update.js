import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import {Form, Button,Checkbox} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import ".//crud.css";

// toastify alert messagge
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Update(){

    const navigate = useNavigate();

    const [Name, setName] = useState("")
     const [Email, setEmail] = useState("")
     const [id,setId]=useState("")
     const [checked, setChecked] = useState(false)
     const [error,setError]=useState([])

     const updateUser = async ()=>{
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
      if( Name==="" || !emailRegex.test(Email) ){
        error.email="Enter valid Email!"
        setError(error)
      }else{
        error.email=""
        setError(error)
        try{
          await axios.put(`https://6517abfe582f58d62d350da8.mockapi.io/user/${id}`,{
            Name:Name,
            Email:Email,
            checked:checked
        });
        navigate('/read')
        }catch(error){
          toast.warning(error.message)
        }
      }
      }

    useEffect(()=>{
        setId((localStorage.getItem("id")));
        setName((localStorage.getItem("Name")));
        setEmail((localStorage.getItem("Email")));
        setChecked((localStorage.getItem("checked")));
    },[])

    return(
        <div className='card'>

          {/* toaster */}
          <ToastContainer/>

          <h3 className="heading">CRUD APPLICATION</h3>
       <h4 className="title">UPDATE PAGE</h4>
           <Form className="form">
          <div>
          <label for='Name' className="label">Name</label>
            <input 
            value={Name}
            className="input"
            onChange={event=>setName(event.target.value.toUpperCase())}
            placeholder="Enter first name"/>
            <br></br>
            <label className="error">{error.name}</label>
          </div><br></br>
        
        <div>
        <label for='Email' className="label">Email</label>
            <input 
            value={Email}
            className="input"
            onChange={event=>setEmail(event.target.value.toLowerCase())}
            placeholder="Enter last name"/>
            <br></br>
            <label className="error">{error.email}</label>
          </div><br></br>
          
          <div>
            <Checkbox 
            checked={checked} 
            className="checkbox" 
            onChange={()=>setChecked(!checked)} 
            label='Agree the terms & conditions'/>
          </div><br></br>
          <Button className="update-btn btn" onClick={updateUser}>Update</Button>
          <br></br>
          <Link to="/read" className="read-btn">
        READ DETAILS
          </Link>
        </Form>
        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constent/URL";
import ".//crud.css";
// axios 
import axios from "axios";

// icons import
import { MdDeleteForever } from "react-icons/md";

import { BiSolidEdit } from "react-icons/bi";

export default function Read() {
  const navigate = useNavigate();

  const [apiData, setApidata] = useState([]);
  const [error, setError] = useState("");

  //delet row
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://6517abfe582f58d62d350da8.mockapi.io/user/${id}`
      );
      cellGetApi();
    } catch (error) {
      setError(error.message);
    }
  };

  //fetch data from api
  const cellGetApi = async () => {
    try {
      const resp = await axios.get(API_URL);
      setApidata(resp.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    cellGetApi();
  }, []);

  //update row
  const userUpdate = ({ Name, Email, id, checked }) => {
    localStorage.setItem("Name", Name);
    localStorage.setItem("Email", Email);
    localStorage.setItem("id", id);
    localStorage.setItem("checked", checked);

    navigate("/update");
  };

  return (
    <div className="card-read">
      
      {
      error ? <span className="network-error">{error}<br></br><p>check the internet connection</p></span> : ""
      
      }<br></br>
      <h3 className="heading">CRUD APPLICATION</h3>
       <h4 className="title">READ PAGE</h4>
      <div className="form-read">
        <Link to="/CRUD-application" className="add-btn">
          ADD
        </Link>

        <table className='table'>
          <thead>
            <tr className="">
              {/* <td>No</td> */}
              <td>Name</td>
              <td>Email</td>
              <td>Checked</td>
              <td>Delete</td>
              <td>Update</td>
            </tr>
          </thead>
          {
            apiData.length===0 ? <p className="Loading-tag">{error ? error :"Loading.."}</p>
            
            :
            
            <tbody>
            {
            apiData.map((data,index) => (
              <tr key={index}>
                {/* <th>{data.id}</th> */}
                <th>{data.Name}</th>
                <th>{data.Email}</th>
                <th>
                  {data.checked ? "true" : "false"}
                </th>
                <th>
                  <MdDeleteForever onClick={() => deleteUser(data.id)} className='btn-red' />
                </th>
                <th>
                  <BiSolidEdit onClick={() => userUpdate(data)} className='btn-green' />
                </th>
              </tr>
            ))}
          </tbody>          }
        </table>
      </div>
    </div>
  );
}

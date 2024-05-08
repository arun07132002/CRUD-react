import React from "react";
import { Link } from "react-router-dom";
import Create from "./create";
// import Read from "../crud/read";
// import Update from "../crud/update";
// import Delete from "../crud/delete";

export default function Crud(){
    return(
        <div>
            <h2>Crud page</h2>
            <ul>
            <li> <Link to='/'>Back to home</Link></li>
            <li><Link to='/read'>Read page</Link></li>
           </ul>
           <Create/>

        </div>
    )
}
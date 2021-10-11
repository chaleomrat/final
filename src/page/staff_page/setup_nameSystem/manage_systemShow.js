import React, { useState, useEffect } from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, Badge, CardBody, Breadcrumb, BreadcrumbItem, FormGroup, Label, Input, Form } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import RightContent from "../../../component/structure_global/right_content";


const title = 'ชื่อเว็บและโลโก้ทุนการศึกษา';

const Manage_systemShow = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    

    const [LogoShow, setLogoShow] = useState([]);


    const page = () => {
        axios.get("http://localhost:8080/Mback/public/Setup_system")
            .then((response) => {
                setLogoShow(response.data);
            });
   
     


    };

    useEffect(() => {
        page();
    }, []);
    
  
    
    return (
        <>  {LogoShow.map((LogoShow) => {
            return (
                <>
                {/* <Helmet key={result.result_id}> */}
                <title>{title}</title>
            {/* </Helmet> */}

 <img className="header-1-Icon" src={LogoShow.sst_logo}/>
                           <label>{LogoShow.sst_name}</label>
                                   
                                
                                
                         
                    

                    

                
            
   </>
            );
        })}
        </>   
     
    )
}

export default Manage_systemShow ;
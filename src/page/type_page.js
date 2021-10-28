import React, { useState, useEffect } from 'react';
import RightContent from "../component/structure_global/right_content";
import { Container, Card, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import NavBar from "../component/structure_global/navbar";

const Type_page = () => {
    const [Scholarname, setScholarname] = useState([]);
    const scholarlist = () => {

        axios.get("https://flashworkbackend.xyz/Mback/public/scholarTypeshow").then((response) => {
            setScholarname(response.data);
        }); 
     };
        useEffect(() => {
            scholarlist();
        }, []);
    

   
        return (
            <>
               <Helmet>
               <title>รายชื่อประเภททุนการศึกษา</title>
                 </Helmet>
     
                 <NavBar />
     
                 <Container className="container-fluid TZS-Container">
                     <Row>
                         <Col lg="3" className="col-ContentSetting">
                             <RightContent />
                         </Col>
                         <Col lg="9" className="col-ContentSetting">
     
                             <Card className="HeaderShadow">
                                 <nav aria-label="breadcrumb">
                                     <ol className="breadcrumb BreadcrumbStyle">
                                         <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                         <li className="breadcrumb-item"><a href="/AllType">รายชื่อหน่วยงาน</a></li>
                                       
                                     </ol>
                                 </nav>
                                 <Card className="CardHeaderStyle">
                                     <h5 style={{ margin: '0px' }}>
                                     <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind.png" />
                                     รายชื่อประเภททุนการศึกษา 
                                     </h5>
                                 </Card>
                             </Card>
                             <div className="CardHeaderDetail">
                                 <CardBody className="CardBody">
                                     
                                 </CardBody>
                             </div>
     
                             <Card className="CardBackground-1">
                                 <CardBody className="CardBody-WithBoxContent">
                                 รายชื่อประเภททุนการศึกษา
                                     <div className="borderline" />
                                     {Scholarname == "" ?
         
                                         <div className="NotFoundTxtInBox">
                                             <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                             ไม่พบข้อมูล
                                         </div>
                                         :
                                         <div className="EdgeRow-1">
                                            
                                            {Scholarname.map((sname) => {
                                                return (
                                                    < > 
                                                        <div key={sname.msch_id}  >
                                                            
                                                            <a href={"/allResult_forthis_Type/" + sname.type_id} >{sname.sch_typename} </a>
                                                          <br/>
                                                        </div>
                                                        
                                                    </>
                                                 );
                                            })}    
                                         </div>
         }
     
                                 </CardBody>
                             </Card>
     
                         </Col>
                     </Row>
                 </Container></>
        )
}

export default Type_page

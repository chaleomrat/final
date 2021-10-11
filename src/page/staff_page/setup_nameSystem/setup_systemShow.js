import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../../component/staff_page/left_menu';
import { Container, Card, CardHeader, Button, Row, Col, CardBody, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import DelectSetupNameLogo from './DelectSetupNameLogo';
import NavBar from "../../../component/structure_global/navbar";

const title = 'ชื่อเว็บและโลโก้ทุนการศึกษา - ระบบผู้ดูแล';

const Setup_systemShow = () => {
    const [Setup_system, setSetup_system] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/Setup_system")
            .then((response) => {
                setSetup_system(response.data);
            });
    }, []);

    /////////////////////////////Modal/////////////////////////////////////////

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    ////////////////////////////////////////////////////////

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>

                    <Col lg="3" className="col-ContentSetting">
                        <StaffLeftMenu />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">ชื่อเว็บและโลโก้ทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    ชื่อเว็บและโลโก้ทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                จัดการเกี่ยวกับเว็บและโลโก้ทุนการศึกษา
                                <div className="borderline" />
                               
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ชื่อเว็บและโลโก้ทุนการศึกษา
                                <div className="borderline" />
                                {Setup_system == "" ?
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
:                                <div className="EdgeRow-1">
                                    <Row>
                                        {Setup_system.map((scholar) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                        <div key={scholar.sst_id}  >
                                                            <Card className="CardBackground-2" style={{ minHeight: '100px' }}>
                                                             
                                                                    <CardHeader className="" style={{ background: "white", borderRadius: "10px", borderBottom: "0px" }}>
                                                                         <img className="header-1-Icon" src={scholar.sst_logo}/>{scholar.sst_name}<h6 className="text-dark" style={{color: "#f8813a" }}>
                                                                        
                                                                        </h6>
                                                                    </CardHeader>
                                                                    
                                                                            <div className="borderline" />
                                                                    <div align="left">
                                                                        {/* ------------------ */}
                                                                        <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href={"/staff/MainEditSunsholar/" + scholar.sst_id} >
                                                                            <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/edit_white.png" />
                                                                        </Button>
                                                                        <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px", marginRight: "5px" }} href={"/staff/EditSutup_system/" + scholar.sst_id} >
                                                                            แก้ไขข้อมูล
                                                                            </Button>
                                                                       
                                                                      
                                                                    </div>
                                                                    <div className="borderline" />
                                                                    <div align="left">
                                                                        {/* ------------------ */}
                                                                        <DelectSetupNameLogo scholar={scholar} />
                                                                        {/* ------------------ */}
                                                                    </div>
                                                                   
                                                               
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </Row>
                                </div>
}
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default Setup_systemShow;

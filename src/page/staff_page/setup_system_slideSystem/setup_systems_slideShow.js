import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../../component/staff_page/left_menu';
import { Container, Card, CardHeader, Button, Row, Col, CardBody, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import DelectSetupslide from '../setup_system_slideSystem/DelectSetupslide';
import NavBar from "../../../component/structure_global/navbar";

const title = 'ทุนการศึกษา - ระบบผู้ดูแล';

const SlideShow = () => {
    const [Setup_slide, setSetup_slide] = useState([]);
    useEffect(() => {
        axios.get("https://flashworkbackend.xyz/Mback/public/Setup_slide")
            .then((response) => {
                setSetup_slide(response.data);
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
                                    <li className="breadcrumb-item active" aria-current="page">รูปสไลด์ทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    รูปสไลด์ทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                จัดการเกี่ยวกับรูปสไลด์ทุนการศึกษา
                                <div className="borderline" />
                                <Button className="Button-Style headerButton" outline color="info" size="sm" href="/staff/Manage_system_silde">
                                    + เพิ่มรูปสไลด์ทุนการศึกษา
                                </Button>
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                            รูปสไลด์ทุนการศึกษา
                                <div className="borderline" />
                                {Setup_slide == "" ?
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
:                                <div className="EdgeRow-1">
                                    <Row>
                                        {Setup_slide.map((slide) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                        <div key={slide.sst_id}  >
                                                            {slide.ssd_name}
                                                            <Card className="CardBackground-2" style={{ minHeight: '100px' }}>
                                                             
                                                                    <CardHeader className="" style={{ background: "white", borderRadius: "10px", borderBottom: "0px" }}>
                                                                       
                                                                        <div className="borderline" /><img src={slide.ssd_slide} alt={slide.ssd_name}  style={{ height: '200px', width: '300px' }} />
                                                                        
                                                                    </CardHeader>
                                                                     <div className="borderline" />
                                                                            
                                                                    <div align="left">
                                                                        {/* ------------------ */}
                                                                        
                                                                        
                                                                        <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href={"/staff/EditSilde_system/" + slide.ssd_id} >
                                                                            <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/edit_white.png" />
                                                                        </Button>
                                                                        <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px", marginRight: "5px" }} href={"/staff/EditSilde_system/" + slide.ssd_id} >
                                                                            แก้ไขรูปสไลด์
                                                                            </Button>
                                                                       
                                                                      
                                                                    </div>
                                                                    <div className="borderline" />
                                                                    <div align="left">
                                                                        {/* ------------------ */}
                                                                        <DelectSetupslide slide={slide} />
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

export default SlideShow;

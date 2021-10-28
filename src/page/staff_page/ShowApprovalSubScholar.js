import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardHeader, Button, Row, Col, CardBody, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import ShowApprovalScholar from '../component/ShowApprovalScholar';
import NotShowApprovalScholar from '../component/NotShowApprovalScholar';

import ShowApprovalScholarMain from '../component/ShowApprovalScholarMain';
import NotShowApprovalScholarMain from '../component/NotShowApprovalScholarMain';
import NavBar from "../../component/structure_global/navbar";

const title = 'ทุนการศึกษา - ระบบผู้ดูแล';

const Scholarship = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [ses, setSes] = useState(session);
    if (ses.status == "นักเรียน") {
        window.location.assign("/");

    }
const [Mscholar, setMscholar] = useState([]);
    useEffect(() => {
        axios.get("https://flashworkbackend.xyz/Mback/public/Mshcholarship")
            .then((response) => {
                setMscholar(response.data);
            });
    }, []);

    const [Sscholar, setSscholar] = useState([]);
    useEffect(() => {
        axios.get("https://flashworkbackend.xyz/Mback/public/endshcholarship")
            .then((response) => {
                setSscholar(response.data);
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
                                    <li className="breadcrumb-item active" aria-current="page">ทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    ทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        
                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ทุนการศึกษาหลัก
                                <div className="borderline" />
                                {Mscholar == "" ?
                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    : <div className="EdgeRow-1">
                                        <Row>
                                            {Mscholar.map((scholar) => {
                                                return (
                                                    <>
                                                    
                                                        <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                            <div key={scholar.msch_id}  >
                                                                <Card className="CardBackground-2" style={{ minHeight: '215px' }}>
                                                                    <a href={"/scholarshipMain/" + scholar.msch_id}>
                                                                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                                <b> {scholar.msch_name}</b>
                                                                            </h6>
                                                                        </CardHeader>
                                                                    </a>
                                                                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                            <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                           สถานะทุนการศึกษา : {scholar.status}
                                                                        </h6>
                                                                        
                                                                        <h6 style={{ margin: '0px' }}>
                                                                            <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                            สร้างเมื่อ : {scholar.timeadd}
                                                                        </h6>
                                                                        <h6 style={{ margin: '0px' }}>
                                                                            <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/timeline.png" />
                                                                            ปีงบประมาณ : {scholar.msch_year}
                                                                        </h6>
                                                                        
                                                                      
                                                                       
                                                                        <div className="borderline" />
                                                                        <div align="left">
                                                                            {/* ------------------ */}
                                                                            <ShowApprovalScholarMain scholar={scholar} />
                                                                            {/* ------------------ */}
                                                                        </div>
                                                                        <br/>
                                                                        <div align="left">
                                                                            {/* ------------------ */}
                                                                            <NotShowApprovalScholarMain scholar={scholar} />
                                                                            {/* ------------------ */}
                                                                        </div>
                                                                    </CardBody>
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

                              {/* ทุนการศึกษาหมดอายุ */}
                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ทุนการศึกษาทุนย่อย(หมดอายุ)
                                <div className="borderline" />
                                {Mscholar == "" ?
                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    : <div className="EdgeRow-1">
                                        <Row>
                                            {Sscholar.map((scholar) => {
                                                return (
                                                    <>
                                                    
                                                        <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                            <div key={scholar.msch_id}  >
                                                                <Card className="CardBackground-2" style={{ minHeight: '215px' }}>
                                                                    <a href={"/scholarshipMain/" + scholar.ssch_id}>
                                                                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                                {/* <Badge color="danger">ใหม่</Badge> */}
                                                                                <b> {scholar.ssch_name}</b>
                                                                            </h6>
                                                                        </CardHeader>
                                                                    </a>
                                                                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        {/* <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" /> */}
                                                                        ทุนการศึกษาหมดอายุ : {scholar.sst_status}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                        ช่วงเวลาเพิ่มทุน : {scholar.timeadd}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/receipt_long.png" />
                                                                        ช่วงเวลารับสมัครทุน : {scholar.ssch_dopen} ถึง {scholar.ssch_dclose}
                                                                    </h6>
                                                                   
                                                                        <div className="borderline" />
                                                                      
                                                                        <div className="borderline" />
                                                                        <div align="left">
                                                                            {/* ------------------ */}
                                                                            <ShowApprovalScholar scholar={scholar} />
                                                                            {/* ------------------ */}
                                                                        </div>
                                                                        <br/>
                                                                        <div align="left">
                                                                            {/* ------------------ */}
                                                                            <NotShowApprovalScholar scholar={scholar} />
                                                                            {/* ------------------ */}
                                                                        </div>
                                                                    </CardBody>
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

export default Scholarship;

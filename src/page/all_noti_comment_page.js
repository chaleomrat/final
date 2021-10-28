import React, { useState, useEffect } from 'react';
import Slide from '../component/home-slide';
import { Container, Card, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import RightContent from "../component/structure_global/right_content";
import axios from 'axios';
import Allcmlist from './all_cm_list_student'

const Allcomment_page = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    const [FollowCommet, setFollowCommet] = useState([]);


    useEffect(() => {

        axios.get("https://flashworkbackend.xyz/Mback/public/nottiflyfollowcomment/" + status.id)
            .then((response) => {
                setFollowCommet(response.data);
            });

    }, []);
    return (
        <>
            <Helmet>
                <title>การแจ้งเตือน</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col lg="12" className="col-ContentSetting" style={{ marginBottom: '20px' }}>
                        <Slide />
                    </Col>

                    <Col lg="3" className="col-ContentSetting">
                        <RightContent />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">
                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">การแจ้งเตือน</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/notification_important.png" />
                                    การแจ้งเตือน
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">

                                {FollowCommet.message == "fail" ?
                                    <div className="text-danger" align="center" >
                                        <div className="NotFoundTxtInBox text-muted" style={{ marginTop: '175px', marginBottom: '180px' }}>
                                            ไม่มีการแจ้งเตือน
                                        </div>
                                    </div>
                                    :
                                    <div className="EdgeRow-1">
                                        <Row>
                                            <Allcmlist />
                                        </Row>
                                    </div>
                                }
                            </CardBody>
                        </div>
                    </Col>

                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default Allcomment_page

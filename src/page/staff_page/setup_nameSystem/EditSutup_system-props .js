import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import Editimg from './Editimg';
import NavBar from "../../../component/structure_global/navbar";

const title = 'เเก้ไขชื่อเว็บไซต์และโลโก้ทุนการศึกษา - ระบบผู้ดูแล';

const EditSutup_system = ({ id }) => {
    ///////////////////////////agen//////////////////////////
    const [Setup_system, setSetup_system] = useState([]);

    
    useEffect(() => {
       
        axios.get("https://flashworkbackend.xyz/Mback/public/getSetup_system/"+ id)
            .then((response) => {
                setSetup_system(response.data);
            });
    }, [id]);
    ////////////////////////type/////////////////////

    // ////////////////
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }



    const inputdata = (event) => {
        let { name, value } = event.target;
        setSetup_system({ ...Setup_system, [name]: value });


    }


    const savesetSetup_system = (e) => {
        e.preventDefault()

        var data = {
           
            sst_name: Setup_system.name,
            
            sst_by: session.id,
           


        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
            if (data['sst_name'] == "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.put("https://flashworkbackend.xyz/Mback/public/Setup_systemEdit/" + id, data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(
                                'แก้ไขชื่อเว็บไซต์และโลโก้สำเร็จ',
                                'สามารถจัดการเกี่ยวกับชื่อเว็บไซต์และโลโก้',
                                'success'
                            )
                                .then(() => window.location.assign("/staff/Manage_system_show"))

                        } else if (res.data.message == "duplicate") {

                            Swal.fire(
                                'แก้ไขชื่อเว็บไซต์และโลโก้ล้มเหลว',
                                'ชื่อเว็บไซต์และโลโก้นี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อเว็บไซต์และโลโก้ แล้วลองใหม่อีกครั้ง',
                                'error'
                            )


                        } else if (res.data.message == "error") {

                            Swal.fire(
                                'แก้ไขชื่อเว็บไซต์และโลโก้ล้มเหลว',
                                'กรุณากรอกชื่อหน่วยงาน หรือ กรุณากรอกชื่อประเภทของทุน  แล้วลองใหม่อีกครั้ง',
                                'error'
                            )

                        }

                    })

                    .catch((error) => {
                        console.log("error");
                    });//ใช้ ดัก Error

            };
    }

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

                    <Col md="9" className="col-ContentSetting">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb CardBackground-1">
                                <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarship">ทุนการศึกษา</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarshipMain">{Setup_system.name}</a></li>
                                <li className="breadcrumb-item active" aria-current="page">เเก้ไขข้อมูล</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/edit.png" />
                                    เเก้ไขชื่อและโลโก้
                                </h5>
                                <h6 className="text-secondary" style={{ margin: '0px', marginLeft: "35px" }}>
                                    {Setup_system.name}
                                </h6>
                                <div className="borderline" />
                                <div align="center">
                                    <img src={Setup_system.content} alt="รูปทุนหลัก" style={{ height: '150px', width: '150' }} />
                                    <br />
                                    <Editimg sst_id={id} />

                                    <form style={{ maxWidth: '700px' }} onSubmit={savesetSetup_system} >
                                        <FormGroup align="left">
                                            <Label for="ssch_name_main">ชื่อเว็บไซต์ทุนการศึกษา</Label>
                                            <Input type="text" name="name" id="sst_name" value={Setup_system.name} onChange={inputdata} required />
                                        </FormGroup>
                                      
                                        <div className="borderline" />
                                        <div style={{ maxWidth: "300px" }} align="left">
                                            <Button className="Button-Style" block color="success" size="md" >
                                                <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default EditSutup_system;

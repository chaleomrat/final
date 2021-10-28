import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import Editfile from './modal/Editfile';
import NavBar from "../../component/structure_global/navbar";

const title = 'เเก้ไขข้อมูลทุนการศึกษา - ระบบผู้ดูแล';

const Editresult = ({ id }) => {
    ///////////////////////////agen//////////////////////////
    const [Editresult, setEditresult] = useState([]);

    
    useEffect(() => {
        
            axios.get("https://flashworkbackend.xyz/Mback/public/allSubscholarship")
            .then((response) => {
                setType(response.data);
            });
        axios.get("https://flashworkbackend.xyz/Mback/public/findresultshcholarship/" + id)
            .then((response) => {
                setEditresult(response.data);
            });
    }, [id]);
    ////////////////////////type/////////////////////
    const [type, setType] = useState([]);
    // ////////////////
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }



    const inputdata = (event) => {
        let { name, value } = event.target;
        setEditresult({ ...Editresult, [name]: value });


    }


    const saveStudent = (e) => {
        e.preventDefault()

        var data = {
            result_name: Editresult.name,
            result_detail: Editresult.content,
            main_scholar_id: Editresult.namescholar,
          
            addby: session.id,
           



        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
        if (data['result_name'] === "" || data['result_detail'] === "" || data['main_scholar_id'] === "" || data['sch_type_id'] === "" || data['addby'] === "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.put("https://flashworkbackend.xyz/Mback/public/editresult/"+id, data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(
                                'แก้ไขทุนสำเร็จ',
                                'สามารถจัดการเกี่ยวกับทุนได้ในหน้า ทุนการศึกษา',
                                'success'
                            )
                                .then(() => window.location.assign("/staff/scholarship"))

                        } else if (res.data.message == "duplicate") {

                            Swal.fire(
                                'แก้ไขทุนล้มเหลว',
                                'ชื่อทุนนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุน แล้วลองใหม่อีกครั้ง',
                                'error'
                            )


                        } else if (res.data.message == "error") {

                            Swal.fire(
                                'แก้ไขทุนล้มเหลว',
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

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                    <li className="breadcrumb-item"><a href="/staff/resultpagestaff">ประกาศรายชื่อผู้ได้รับทุนการศึกษา</a></li>
                                    <li className="breadcrumb-item"><a href="/staff/scholarshipMain">{Editresult.name}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">เเก้ไขข้อมูล</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/campaign.png" />
                                    ประกาศรายชื่อผู้ได้รับทุนการศึกษา
                                </h5>
                                <h6 style={{ margin: '0px', marginLeft: '37px', marginTop: '5px', opacity: '0.7' }}>
                                    เเก้ไขข้อมูล {Editresult.name}
                                </h6>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                <div align="center" style={{ marginTop: '10px' }}>
                                    
                                    <div style={{ maxWidth: '700px' }}>
                                        <div className="borderline" />
                                        <h6 style={{ margin: '0px', marginBottom: '20px', opacity: '0.7' }} align="left">
                                            ไฟล์เอกสาร
                                        </h6>
                                        <div style={{ maxWidth: '600px' }}>
                                            {Editresult.file == "" ?
                                                <div className="NotFoundTxtInBox" style={{ marginBottom: '10px' }}>
                                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                                    ไม่มีไฟล์เอกสาร
                                                </div>
                                                :
                                                <Button className="Button-Style" color="secondary" href={Editresult.file} block>ดาวน์โหลดไฟล์เอกสาร</Button>
                                            } 
                                            <br />
                                            <Editfile result_id={id} />
                                        </div>
                                        <div className="borderline" />
                                    </div>
                                    

                                    <form style={{ maxWidth: '700px' }} onSubmit={saveStudent} >
                                        <h6 style={{ margin: '0px', marginBottom: '20px', opacity: '0.7' }} align="left">
                                            รายละเอียดประกาศรายชื่อผู้ได้รับทุนการศึกษา
                                        </h6>
                                        <div style={{ maxWidth: '600px' }}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup align="left">
                                                        <Label for="ssch_name_main">
                                                            ชื่อประกาศรายชื่อผู้ได้รับทุนการศึกษา
                                                        </Label>
                                                        <Input type="text" name="name" id="result_name" value={Editresult.name} onChange={inputdata} required />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <FormGroup align="left">
                                                                <Label for="category">ชื่อทุนการศึกษา</Label>
                                                                <Input type="select" name="namescholar" id="category" onChange={inputdata} value={Editresult.namescholar} required>
                                                                    <option >กรุณาเลือกชื่อทุนการศึกษา</option>

                                                                    {type.map((stype) => {

                                                                        return (

                                                                            <option key={stype.ssch_id} value={stype.ssch_id}>{stype.ssch_name}</option>

                                                                        );

                                                                    })}
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <FormGroup align="left">
                                                <Label for="first_name">รายละเอียดเพิ่มเติม</Label>
                                                <Input type="textarea" rows="8" name="content" id="content"  value={Editresult.content} onChange={inputdata} required />
                                            </FormGroup>
                                        </div>
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
                        </div>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default Editresult;

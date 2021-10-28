import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import EditShfile from './modal/edit_sub_scholar_img';
import NavBar from "../../component/structure_global/navbar";

const title = 'เเก้ไขข้อมูลทุนการศึกษา - ระบบผู้ดูแล';

const Shedit = ({ id }) => {
    ///////////////////////////agen//////////////////////////
    const [Mscholar, setMscholar] = useState([]);

   
    useEffect(() => {
       
            axios.get("https://flashworkbackend.xyz/Mback/public/findSshcholarshippage/" + id)
            .then((response) => {
                setMscholar(response.data);
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
        setMscholar({ ...Mscholar, [name]: value });


    }


    const saveStudent = (e) => {
        e.preventDefault()

        var data = {
            ssch_name: Mscholar.name,
            ssch_detail: Mscholar.content,
            ssch_dopen: Mscholar.opday,
            ssch_dclose: Mscholar.edday,
            ssch_web: Mscholar.web,
            ssch_budget: Mscholar.badget,
            Budget_per_capital: Mscholar.badgetfor1,
            ssch_amount: Mscholar.amount,
            // ssch_file: fileURL,
            by_st_id: session.id,



        };//เอาค่าที่รับจาก form มาใส่ใน json
      
        if (data['ssch_name'] === "" || data['ssch_detail'] === "" || data['ssch_budget'] === ""
        || data['Budget_per_capital'] === "" || data['ssch_amount'] === "" || data['ssch_dopen'] === "" || data['ssch_dclose'] === "" || data['ssch_web'] === ""
        || data['msch_id'] === "" || data['by_st_id'] === "") {//ถ้าฟิลไหนเป็นค่าว่างจะไม่สมารถเพิ่มได้
        Swal.fire(

            'เกิดข้อผิดพลาด',
            'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
            'error'
        )

    } else {
        axios.put("https://flashworkbackend.xyz/Mback/public/editSubshcholarship/" + id, data)//ส่งค่าไปแอดใน DB
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                    ////ต่อตรงนี้
                    Swal.fire(

                        'เพิ่มทุนย่อยสำเร็จ',
                        'สามารถจัดการเกี่ยวกับทุนย่อยได้ในหน้า ทุนการศึกษา',
                        'success'
                    )
                        .then(() => window.location.assign("/staff/scholarship"))

                } else {

                    Swal.fire(
                        'เพิ่มทุนย่อยล้มเหลว',
                        'ชื่อทุนย่อยนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุนย่อย แล้วลองใหม่อีกครั้ง',
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
                                <li className="breadcrumb-item"><a href="/staff/scholarshipMain">{Mscholar.name}</a></li>
                                <li className="breadcrumb-item active" aria-current="page">เเก้ไขข้อมูล</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/edit.png" />
                                    เเก้ไขข้อมูล
                                </h5>
                                <h6 className="text-secondary" style={{ margin: '0px', marginLeft: "35px" }}>
                                    {Mscholar.name}
                                </h6>
                                <div className="borderline" />
                                <div align="center">
                                
                                {Mscholar.file == "" ?
                                    <div className="NotFoundTxtInBox" style={{ marginBottom: '10px' }}>
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบเอกสาร
                                    </div>
                                    :
                                    <Button className="Button-Style" color="secondary" href={Mscholar.file} block>ดาวน์โหลดไฟล์เอกสาร</Button>

                                } 
                                
                                <EditShfile ssch_id={id} /> 

                                    {/* <img src={Mscholar.m_img} alt="รูปทุนหลัก" style={{ height: '300px', width: '350' }} />
                                    <br />*/}
                                   

                                    <form style={{ maxWidth: '700px' }} onSubmit={saveStudent} >
                                        <FormGroup align="left">
                                            <Label for="ssch_name_main">ชื่อทุนการศึกษา</Label>
                                            <Input type="text" name="name" id="ssch_name" value={Mscholar.name} onChange={inputdata} required />

                                        </FormGroup>
                                    
                                        <div className="borderline" />
                                        <h6 align="left">ช่วงเวลาเปิดรับสมัคร</h6>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="open_date">วันที่เริ่ม</Label>
                                                    <Input type="date" name="ssch_dopen" id="open_date"  value={Mscholar.edday} onChange={inputdata} required />
                                                    
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="close_date">วันที่สิ้นสุด</Label>
                                                    <Input type="date" name="ssch_dclose" id="close_date"  value={Mscholar.opday} 
                                                        onChange={inputdata} required />
                                                    
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <div className="borderline" />
                                        <h6 align="left">งบประมาณของทุนการศึกษา</h6>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="total_budget">งบประมาณทั้งหมด</Label>
                                                    <Input type="number" min="0" name="ssch_budget" id="total_budget" value={Mscholar.badget}  onChange={inputdata} required />
                                                    
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="budget_ssch">งบประมาณต่อทุน</Label>
                                                    <Input type="number" min="0" name="Budget_per_capital" id="budget_ssch" value={Mscholar.badgetfor1} onChange={inputdata} required />
                                                   

                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <div className="borderline" />
                                        <FormGroup align="left">
                                            <Label for="open_count">จำนวนที่เเปิดรับ</Label>

                                            <Input type="number" min="0" name="ssch_amount" id="open_count"value={Mscholar.amount} onChange={inputdata} required />
                                        </FormGroup>
                                        <FormGroup align="left">
                                            <Label for="first_name">รายละเอียดเพิ่มเติม</Label>
                                            <Input type="textarea" rows="8" name="content" id="first_name" value={Mscholar.content} onChange={inputdata} required />
                                        </FormGroup>
                                      <FormGroup align="left">
                                            <Label for="first_name">เว็บไซต์</Label>
                                            <Input type="textarea" rows="8" name="web" id="first_name" value={Mscholar.web} onChange={inputdata} required />
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

export default Shedit;

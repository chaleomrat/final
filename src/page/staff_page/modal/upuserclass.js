
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Uplevel = ({ classroom }) => {
    const {
        className
    } = classroom;

    // const newclass = {
    //     class: "",
    // }

    // const [Uplevel, setUplevel] = useState(newclass);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const s_class = classroom

    const newclass = parseInt(s_class) + 1;
    // const handleInputChange = (event) => {
    //     let { name, value } = event.target;
    //     setUplevel({ ...Uplevel, [name]: value });

    // }


    const saveEdit = (e) => {
        e.preventDefault()
        var data = {
            s_class: Uplevel.class


        };//เอาค่าที่รับจาก form มาใส่ใน array
        if (data.s_class == "") {
            Swal.fire(
                'เตือน',
                'กรุณาเลือกชั้นปี',
                'alert'
            )
        } else {
            axios.put("https://flashworkbackend.xyz/Mback/public/UpuserClass/" + s_class, data)//ส่งid และ dataค่าไปแอดใน DB
                .then((response) => {

                    Swal.fire(

                        'แก้ไข',
                        'ข้อมูลสำเร็จ',
                        'success'

                    )
                        .then(() => setModal(!modal))
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    if (s_class == "6") {
        return (
            <div>
                <Button className="Button-Style headerButton" outline color="primary" size="sm" onClick={toggle}>
                    มัธยมศึกษาปีที่ {s_class}
                </Button>

                <Form align="right" onSubmit={saveEdit}>

                    <Modal isOpen={modal} toggle={toggle} className={s_class}>
                        <ModalHeader toggle={toggle}> เลื่อนระดับชั้นเรียน นักเรียนชั้นปีที่ {s_class}</ModalHeader>
                        <ModalBody>
                            <FormGroup align="left">
                                <label>กรุณาเลือกชั้นปี</label>
                                {/* <Input type="number" name="class" value={Uplevel.class} onChange={handleInputChange} /> */}
                                <label>จบการศึกษา</label>
                                <ModalFooter>
                                    <Button color="primary" className="Button-Style" size="md" onClick={saveEdit}>ตกลง</Button>
                                    <Button color="danger" className="Button-Style" size="md" onClick={toggle}>ยกเลิก</Button>
                                </ModalFooter>
                            </FormGroup>
                            <div align="right">
                                <div style={{ maxWidth: "100px" }}>

                                </div>
                            </div>

                        </ModalBody>

                    </Modal>
                </Form>
            </div>

        )
    }

    else {
        return (
            <div>
                <Button className="Button-Style headerButton" outline color="primary" size="sm" onClick={toggle}>
                    มัธยมศึกษาปีที่ {s_class}
                </Button>

                <Form align="right" onSubmit={saveEdit}>

                    <Modal isOpen={modal} toggle={toggle} className={s_class}>
                        <ModalHeader toggle={toggle}> เลื่อนระดับชั้นเรียน นักเรียนชั้นปีที่ {s_class}</ModalHeader>
                        <ModalBody>
                            <FormGroup align="left">

                                <label>กรุณาเลือกชั้นปี</label>

                                {/* <Input type="number" name="class" value={Uplevel.class} onChange={handleInputChange} /> */}
                                {/* <Input type="select" name="class" id="category" placeholder="กรุณาเลือกหมวดหมู่" onChange={handleInputChange} required>
                                    <option></option>
                                    <option value="2">นักเรียนชั้นปีที่ 2</option>
                                    <option value="3">นักเรียนชั้นปีที่ 3</option>
                                    <option value="4">นักเรียนชั้นปีที่ 4</option>
                                    <option value="5">นักเรียนชั้นปีที่ 5</option>
                                    <option value="6">นักเรียนชั้นปีที่ 6</option>
                                </Input> */}
                                <label>เลื่อนชั้นมัธยมศึกษาปีที่{s_class} เป็นปีที่ {newclass}</label>

                                <ModalFooter>
                                    <Button color="primary" className="Button-Style" size="md" onClick={saveEdit} >ตกลง</Button>
                                    <Button color="danger" className="Button-Style" size="md" onClick={toggle}>ยกเลิก</Button>
                                </ModalFooter>


                            </FormGroup>
                            <div align="right">
                                <div style={{ maxWidth: "100px" }}>

                                </div>
                            </div>

                        </ModalBody>

                    </Modal>
                </Form>
            </div>

        )
    }



}

export default Uplevel

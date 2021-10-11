
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form, } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
const ShowApprovalScholar = ({ scholar }) => {
    const {
        className
    } = scholar;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    //////////////////delect///////////////////////
    // const Delect = (e) => {
    //     e.preventDefault();

    //     axios.put("http://localhost:8080/Mback/public/ScholarEndEdit/" + scholar.ssch_id, data)//ส่งค่าไปแอดใน DB
    //         .then((res) => {
    //             console.log(res.data.message);
    //             if (res.data.message == "success") {
    //                 ////ต่อตรงนี้
    //                 Swal.fire(
    //                     'ลบทุนสำเร็จ',
    //                     'ทุนหลังและทุนลองที่อยู่ในทุนนี้จะลบทั้งหมด',
    //                     'success'
    //                 )
    //                     .then(() => window.location.reload())

    //             }

    //         })

    //         .catch((error) => {
    //             console.log("error");
    //         });//ใช้ ดัก Error

    // }
    const Delect = (e, a) => {
        e.preventDefault()

        const setendscholar = a;

        console.log(setendscholar)

        if (setendscholar === "Show") {
            var data = {
                sst_status: setendscholar,
                by_st_id: session.id,

            };


            axios.put("http://localhost:8080/Mback/public/ApprovalSubScholar/" + scholar.ssch_id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'อนุมัติแสดงทุนการศึกษาที่หมดอายุสำเร็จ',


                        )
                        .then(() => window.location.reload())

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        } else {

            var data = {
                sst_status: setendscholar,
                by_st_id: session.id,

            };

            axios.put("http://localhost:8080/Mback/public/ApprovalSubScholar/" + scholar.ssch_id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'ไม่อนุมัติให้แสดงทุนการศึกษาที่หมดอายุ',


                        )
                        .then(() => window.location.reload())

                    }
                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        }
    }
    return (
        <>
            <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href="" onClick={toggle} >
                <img className="Button-icon" style={{ height: "17px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/delete_forever_white.png" />
            </Button>
            <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px" }} href="" onClick={toggle} >
            อนุมัติในแสดงทุนการศึกษาที่หมดอายุ
            </Button>

            <Form >
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}> คำเตือน </ModalHeader>
                    <ModalBody>
                        <FormGroup align="left">
                            <Label for="more_detail">
                                คุณต้องการอนุมัติในการแสดงทุนการศึกษาหมดอายุ <b>"{scholar.ssch_name}"</b> หรือไม่?
                            </Label>
                        </FormGroup>
                        <div align="right">
                            <div style={{ maxWidth: "250px" }}>

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button className="Button-Style" color="success" outline onClick={(e, a) => Delect(e, "Show")} style={{ marginRight: "5px" }}>
                            ตกลง
                        </Button>
                        <Button color="secondary" className="Button-Style" size="md" onClick={toggle}>
                            ยกเลิก
                        </Button>
                        {/* <Button className="Button-Style" color="danger" outline onClick={(e, a) => Delect(e, "Off")} style={{ marginRight: "5px" }}>
                            ปฎิเสธในแสดงทุนการศึกษาที่หมดอายุ
                        </Button> */}
                    </ModalFooter>
                </Modal>
            </Form>
        </>
    )
}

export default ShowApprovalScholar

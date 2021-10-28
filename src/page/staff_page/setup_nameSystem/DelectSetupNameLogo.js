
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form, } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
const DelectSetupNameLogo = ({ scholar }) => {
    const {
        className
    } = scholar;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    //////////////////delect///////////////////////
    const Delect = (e) => {
        e.preventDefault();

        axios.delete("https://flashworkbackend.xyz/Mback/public/Setup_systemdelect/" + scholar.sst_id)//ส่งค่าไปแอดใน DB
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                    ////ต่อตรงนี้
                    Swal.fire(
                        'ลบชื่อและโลโก้สำเร็จ',
                        'ชื่อและโลโก้หลังและชื่อและโลโก้ลองที่อยู่ในชื่อและโลโก้นี้จะลบทั้งหมด',
                        'success'
                    )
                        .then(() => window.location.reload())

                }

            })

            .catch((error) => {
                console.log("error");
            });//ใช้ ดัก Error

    }
    return (
        <>
            <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href="" onClick={toggle} >
                <img className="Button-icon" style={{ height: "17px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/delete_forever_white.png" />
            </Button>
            <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px" }} href="" onClick={toggle} >
                ลบชื่อและโลโก้
            </Button>

            <Form >
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}> คำเตือน </ModalHeader>
                    <ModalBody>
                        <FormGroup align="left">
                            <Label for="more_detail">
                                คุณต้องการลบ <b>"{scholar.sst_name}"</b> ชื่อและโลโก้นี้ หรือไม่?
                            </Label>
                        </FormGroup>
                        <div align="right">
                            <div style={{ maxWidth: "250px" }}>

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button className="Button-Style" outline color="danger" size="md" onClick={Delect} >
                            ลบข้อมูล
                        </Button>
                        <Button color="secondary" className="Button-Style" size="md" onClick={toggle}>
                            ยกเลิก
                        </Button>
                    </ModalFooter>
                </Modal>
            </Form>
        </>
    )
}

export default DelectSetupNameLogo

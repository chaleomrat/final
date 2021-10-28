
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form, } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
const DelectMs = ({ scholar }) => {
    const {
        className
    } = scholar;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    //////////////////delect///////////////////////
    const Delect = (e) => {
        e.preventDefault();

        axios.delete("https://flashworkbackend.xyz/Mback/public/delectresult/" + scholar.result_id)//ส่งค่าไปแอดใน DB
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                    ////ต่อตรงนี้
                    Swal.fire(
                        'ลบประกาศทุนสำเร็จ',
                        '',
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
                ลบประกาศ ฯ
            </Button>

            <Form >
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>
                        แจ้งเตือน
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup align="left">
                            <Label for="more_detail">
                                การลบข้อมูลจะทำให้ข้อมูลหายไปถาวร และไม่สามารถย้อนกลับได้<br/>
                                คุณต้องการลบ <b>"{scholar.result_name}"</b> หรือไม่?
                            </Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="Button-Style"  color="danger" size="md" onClick={Delect} >
                            ลบข้อมูล
                        </Button>
                        <Button color="secondary" outline className="Button-Style" size="md" onClick={toggle}>
                            ยกเลิก
                        </Button>
                    </ModalFooter>
                </Modal>
            </Form>
        </>
    )
}

export default DelectMs

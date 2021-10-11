
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Progress } from 'reactstrap';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../../firebase/index"
import axios from 'axios';
import Swal from 'sweetalert2';
const EditShfile = ({ ssch_id }) => {

    const {
        className
    } = ssch_id;

    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status'),

        file: localStorage.getItem('file')
    }
    const [ses, setSes] = useState(session);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    const [Mscholar, setMscholar] = useState([]);
    const page = () => {
        axios.get("http://localhost:8080/Mback/public/findSshcholarshippage/" + ssch_id)
            .then((response) => {
                setMscholar(response.data);
            }, []);
    }

    useEffect(() => {
        page();
    }, []);

    ////////////////////////////////////upload img///////////////////////////////
    const initScholarsub = {
        file: ""
    }
    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = ssch_id;
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = ssch_id + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`ssch_file/${newName}`).put(file);//firebase storeage
        //ref เลือกfolder
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                //สร้าง % ในการอัพ โหลด
                setProgress(uploadProgress);
            },
            (error) => {
                console.log(error);

            },
            () => {
                storage.ref('ssch_file').child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveScholar(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "application/pdf",
    ]
    const formik = useFormik({
        initialValues: initScholarsub,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้
                file: yup.mixed().test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุลPDF", (file) => {
                    if (file) {
                        return SUPPORTED_TYPE.includes(file.type);
                    } else {
                        return true;
                    }
                }),

            }),
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file)
            }
            else {
                saveScholar("")
            }
        },
    });

    const saveScholar = (fileURL) => {
        var data = {
            ssch_file: fileURL,
            by_st_id: ses.id

        };
        if (data.file == "") {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                'error'
            )
                .then(() => window.location.reload())
        } else {
            axios.put("http://localhost:8080/Mback/public/editSubshcholarshipfile/" + ssch_id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'แก้ไขไฟล์ทุนย่อยสำเร็จ',
                            'สามารถจัดการเกี่ยวกับทุนย่อยได้ในหน้า ทุนการศึกษา',
                            'success'
                        )
                            .then(() => window.location.reload())
                    } else {

                        Swal.fire(
                            'แก้ไขไฟล์ทุนย่อยล้มเหลว',
                            'ชื่อทุนย่อยนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุนย่อย แล้วลองใหม่อีกครั้ง',
                            'error'
                        )

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error


        }


    }


    return (
        <>
            <br />
            <Button className="Button-Style headerButton" outline color="primary" size="sm" onClick={toggle}>
                เปลี่ยนทุนการศึกษา
            </Button>

            <Form align="right" >

                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>เอกสารประกอบทุนการศึกษา</ModalHeader>
                    <Form onSubmit={formik.handleSubmit}>

                        <ModalBody>
                            <FormGroup align="left">

                                <img src={Mscholar.ssch_file} alt="" style={{ maxWidth: "470px" }} />

                                <div class="mb-3">
                                    <br />
                                    <Input type="file" name="file" id="ssch_file" onChange={(e) => {
                                        formik.setFieldValue("file", e.currentTarget.files[0]);
                                    }} />
                                    <br />
                                    {progress !== 0 && (
                                        <Progress value={progress}>{progress}%</Progress>
                                    )}
                                    {formik.errors.file && formik.touched.file && (
                                        <p style={{ color: "red" }}>{formik.errors.file}</p>
                                    )}

                                </div>

                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" className="Button-Style" size="md">ตกลง</Button>
                            <Button color="danger" className="Button-Style" size="md" onClick={toggle}>ยกเลิก</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Form>
        </>
    )
}

export default EditShfile

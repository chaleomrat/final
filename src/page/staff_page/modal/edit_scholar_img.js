
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Progress } from 'reactstrap';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../../firebase/index"
import axios from 'axios';
import Swal from 'sweetalert2';
const Editimg = ({ msch_id }) => {

    const {
        className
    } = msch_id;

    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status'),

        img: localStorage.getItem('img')
    }
    const [ses, setSes] = useState(session);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    const [Mscholar, setMscholar] = useState([]);
    const page = () => {
        axios.get("http://localhost:8080/Mback/public/findMshcholarship/" + msch_id)
            .then((response) => {
                setMscholar(response.data);
            }, []);
    }

    useEffect(() => {
        page();
    }, []);

    ////////////////////////////////////upload img///////////////////////////////
    const initImg = {
        file: ""
    }
    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = msch_id;
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = msch_id + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`m_img/${newName}`).put(file);//firebase storeage
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
                storage.ref('m_img').child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveImg(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "image/jpeg",
        "image/png"]
    const formik = useFormik({
        initialValues: initImg,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้
                file: yup.mixed().test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุลjpeg", (file) => {
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
                saveImg("")
            }
        },
    });

    const saveImg = (fileURL) => {
        var data = {
            m_img: fileURL,
            id: ses.id

        };
        if (data.img == "") {
            Swal.fire(
                'กรุณาเลือกรูปก่อน',
                '',
                'warning'
            )
                .then(() => window.location.reload())
        } else {
            axios.put("http://localhost:8080/Mback/public/editMshcholarship_img/" + msch_id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'อัพรูปภาพ',
                            'สำเร็จ',
                            'success'
                        )
                            .then(() => window.location.reload())
                    } else {

                        Swal.fire(
                            'อัพรูปภาพ',
                            'ล้มเหลว',
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
                เปลี่ยนรูปทุนการศึกษา
            </Button>

            <Form align="right" >

                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}> เปลี่ยนรูปทุนการศึกษา</ModalHeader>
                    <Form onSubmit={formik.handleSubmit}>

                        <ModalBody>
                            <FormGroup align="left">

                                <img src={Mscholar.m_img} alt="" style={{ maxWidth: "470px" }} />

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

export default Editimg

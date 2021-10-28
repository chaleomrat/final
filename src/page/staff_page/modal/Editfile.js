
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Progress } from 'reactstrap';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../../firebase/index"
import axios from 'axios';
import Swal from 'sweetalert2';
const Editfile= ({ result_id }) => {

    const {
        className
    } = result_id;

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
        axios.get("https://flashworkbackend.xyz/Mback/public/findresultshcholarship/" + result_id)
            .then((response) => {
                setMscholar(response.data);
            }, []);
    }

    useEffect(() => {
        page();
    }, []);

    ////////////////////////////////////upload img///////////////////////////////
    const initfile = {
        file: "",
      
           
    }
    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = result_id;
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = result_id + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`file/${newName}`).put(file);//firebase storeage
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
                storage.ref('file').child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    savefile(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
         ]
    const formik = useFormik({
        initialValues: initfile,
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
                savefile("")
            }
        },
    });

    const savefile = (fileURL) => {
        var data = {
            file: fileURL,
            addby: session.id,

        };
        if (data.file == "") {
            Swal.fire(
                'ดำเนินการล้มเหลว',
                'ยังไม่ได้เลือกไฟล์ใด โปรดเลือกไฟล์ก่อนอัพโหลด',
                'warning'
            )
                .then(() => window.location.reload())
        } else {
            axios.put("https://flashworkbackend.xyz/Mback/public/editresultfile/" + result_id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'ดำเนินการสำเร็จ',
                            'อัพโหลดไฟล์สำเร็จแล้ว',
                            'success'
                        )
                            .then(() => window.location.reload())
                    } else {

                        Swal.fire(
                            'ดำเนินการล้มเหลว',
                            'อัพโหลดไฟล์ล้มเหลว โปรดลองใหม่อีกครั้ง',
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
                เปลี่ยนเอกสาร
            </Button>

            <Form align="right" >

                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}> เปลี่ยนไฟล์เอกสารประกาศรายชื่อผู้ได้รับทุนการศึกษา</ModalHeader>
                    <Form onSubmit={formik.handleSubmit}>

                        <ModalBody>
                            <FormGroup align="left">
                                *รองรับนามสกุลไฟล์ .docs .pdf

                                <img src={Mscholar.file} alt="" style={{ maxWidth: "470px" }} />

                                <div class="mb-3">
                                    <br />
                                    <Input type="file" name="file" id="file" onChange={(e) => {
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
                            <Button color="primary" className="Button-Style" size="md">
                                อัพโหลดไฟล์
                            </Button>
                            <Button color="secondary" outline className="Button-Style" size="md" onClick={toggle}>ยกเลิก</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Form>
        </>
    )
}

export default Editfile

import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Progress, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../../firebase/index"
import NavBar from "../../../component/structure_global/navbar";

const title = 'รูปภาพสไลด์ - ระบบผู้ดูแล';

const ScholarshipCreateMain = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }

    // ///////////////////////////agen///////////////
    // const [Agen, setAgen] = useState([]);
    // useEffect(() => {
    //     axios.get("http://localhost:8080/Mback/public/addAgency")
    //         .then((response) => {
    //             setAgen(response.data);
    //         });
    //     axios.get("http://localhost:8080/Mback/public/scholarTypeshow")
    //         .then((response) => {
    //             setType(response.data);
    //         });
    // }, []);
    // ////////////////////////type/////////////////////
    // const [type, setType] = useState([]);
    /////////////////////////////////////////////////////
    const initScholar = {

        ssd_silde: "",
        ssd_name: "",




    };

    const [Scholarsub, setScholarsub] = useState(initScholar);

    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = "ssd_slide";
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = mId + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`ssd_slide/${newName}`).put(file);//firebase storeage
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
                storage.ref("ssd_slide").child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveStudent(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "image/jpeg",
        "image/png"
    ]
    const formik = useFormik({
        initialValues: initScholar,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้

                file: yup.mixed().test("fileSize", "ไฟล์รูปใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุล jpeg,png เท่านั้น", (file) => {
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

                const fileURL = "https://firebasestorage.googleapis.com/v0/b/fileupload-89d50.appspot.com/o/m_img%2F4_1628189027?alt=media&token=7179a67c-841e-47d1-8a6c-467ca99026df"
                saveStudent(fileURL)
            }
        },
    });

    const handleInputChange = (event) => {
        let { name, value } = event.target;

        if (name === "tags") {
            value = value.split(",");
        }
        setScholarsub({ ...Scholarsub, [name]: value })
    };
    const saveStudent = (fileURL) => {
        var data = {
            ssd_name: Scholarsub.ssd_name,
            ssd_slide: fileURL,
            ssd_by: session.id,

        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
            if (data['ssd_slide'] === "" || data['ssd_name'] === "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'กรุณากรอกชื่อสไลด์ โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.post("http://localhost:8080/Mback/public/Setup_slide", data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////s
                            Swal.fire(
                                'เพิ่มโลโก้',
                                'สามารถจัดการเพิ่มโลโก้',
                                'success'
                            )
                                .then(() => window.location.assign("/staff_page/"))

                        } else {

                            Swal.fire(
                                'เพิ่มโลโก้',
                                'ชื่อทุนนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุน แล้วลองใหม่อีกครั้ง',
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

                                <li className="breadcrumb-item active" aria-current="page">ชื่อและโลโก้</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/add_circle.png" />
                                    รูปภาพสไลด์
                                </h5>
                                <div className="borderline" />
                                <div align="center">
                                    <Form style={{ maxWidth: '700px' }} onSubmit={formik.handleSubmit} >

                                        <FormGroup align="left">
                                            ชื่อสไลด์
                                            <Input type="text" name="ssd_name" id="open_date" placeholder="ชื่อสไลด์" value={Scholarsub.sst_name}
                                                onChange={handleInputChange} />

                                            <Input type="file" name="file" id="ssd_slide" onChange={(e) => {
                                                formik.setFieldValue("file", e.currentTarget.files[0]);

                                            }} />
                                            <br />
                                            {progress !== 0 && (
                                                <Progress value={progress}>{progress}%</Progress>
                                            )}
                                            {formik.errors.file && formik.touched.file && (
                                                <p style={{ color: "red" }}>{formik.errors.file}</p>
                                            )}
                                        </FormGroup>
                                        <div className="borderline" />
                                        <div style={{ maxWidth: "300px" }} align="left">
                                            <Button className="Button-Style" block color="success" size="md" >
                                                <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>



        </>
    )
}

export default ScholarshipCreateMain;

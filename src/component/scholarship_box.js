import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, CardBody, CardHeader } from "reactstrap";

const Scholarship_Box = ({ id }) => {
   var D = id;
   
    const [Mscholar, setMscholar] = useState([]);
    const updateUserlist = () => {
        axios.get("http://flashworkbackend.xyz/Mback/public/findMshcholarship/" + D)
            .then((response) => {
                setMscholar(response.data);
            });
    };
    useEffect(() => {
        updateUserlist();
    }, []);
  
      return (
        <>
                <div style={{  }}>
                    <img src={Mscholar.m_img} alt="" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', width: '100%', marginBottom: '-10px' }}/>
                </div>
                <Card className="CardBackground-2" style={{ minHeight: '200px' }}>
                    <a href={"/scholarshipMain/" + Mscholar.id}>
                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                <b>{Mscholar.name} ปี {Mscholar.year}</b>
                            </h6>
                        </CardHeader>
                    </a>
                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                    <div className="borderline" />
                       {Mscholar.content}
                        <div className="borderline" />
                        <Button href={"/scholarshipMain/" + Mscholar.id} className="Button-Style" outline >อ่านทั้งหมด</Button>
                    </CardBody>
                </Card>

              
        </>
    )
}

export default Scholarship_Box;

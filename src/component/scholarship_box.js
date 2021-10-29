import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, CardBody, CardHeader } from "reactstrap";

const Scholarship_Box = ( {id} ) => {
   
    const [Mscholar, setMscholars] = useState([]);
    useEffect(() => {
        axios.get("http://flashworkbackend.xyz/Mback/public/findMshcholarship/" + id)
            .then((response) => {
                setMscholars(response.data);
            });
    }, [id]);
    
                                            
                                                                           </Row>
      return (
        <> {Mscholar.map((Mainscholars) => {return (
                <div style={{  }}>
                    <img src={Mainscholars.m_img} alt="" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', width: '100%', marginBottom: '-10px' }}/>
                </div>
                <Card className="CardBackground-2" style={{ minHeight: '200px' }}>
                    <a href={"/scholarshipMain/" + Mainscholars.id}>
                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                <b>{Mainscholars.name} ปี {Mainscholars.year}</b>
                            </h6>
                        </CardHeader>
                    </a>
                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                    <div className="borderline" />
                       {Mainscholars.content}
                        <div className="borderline" />
                        <Button href={"/scholarshipMain/" + Mainscholars.id} className="Button-Style" outline >อ่านทั้งหมด</Button>
                    </CardBody>
                </Card>
 );
              })}
        </>
    )
                                       

     
}

export default Scholarship_Box;

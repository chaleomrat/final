import React, { useState, useEffect } from 'react';
import { Container, Row } from "reactstrap";
import Resultbox from "../component/sch_notify_box";
import axios from 'axios';
import ReactPaginate from "react-paginate";

const title = 'ประกาศทุนการศึกษาทั้งหมด';


const AllcmlistStaff = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    const [pageNumber, setPageNumber] = useState(0);

    const [Resultlist, setResultlist] = useState([]);
    useEffect(() => {

        axios.get("https://flashworkbackend.xyz/Mback/public/nottiflyfollowcommentStaffAll/" + status.id)
            .then((response) => {
                setResultlist(response.data);
            });

    }, []);
    <></>

    if (Resultlist.message == "fail") {
        return (<> </>
        )
    } else {
        const usersPerPage = 10;
        const pagesVisited = pageNumber * usersPerPage;
        const displayUsers = Resultlist.slice(pagesVisited, pagesVisited + usersPerPage).map((Commet) => {
            return (
                <>
                    <div className="col-12 col-BoxContentSetting">
                        <a href={"/scholarshipSub/" + Commet.ssch_id}>
                            <div className="buttonMenu" key={Commet.ssch_id}>
                                <b>{Commet.s_fname}{Commet.st_fname}</b>  ได้แสดงความคิดเห็นใน  <b>{Commet.ssch_name}</b>
                            </div>
                        </a>
                        <small>{Commet.Cm_time}</small>

                    </div>



                </>
            );
        });
        const pageCount = Math.ceil(Resultlist.length / usersPerPage);

        const changePage = ({ selected }) => {
            setPageNumber(selected);
        };
        return (
            <>
                <Container className="container-fluid TZS-Container">

                    <Row>
                        {displayUsers}
                    </Row>
                    <div className="borderline" />
                    <br />
                    <center>
                        <ReactPaginate
                            className="pagination"
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                            color="primary"
                            count={pageCount}
                        />
                    </center>

                </Container>
            </>
        )
    }

}
export default AllcmlistStaff;

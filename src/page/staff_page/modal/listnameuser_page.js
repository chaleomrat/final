import React, { useState, useEffect } from 'react';
import { Container, Row, Table, Button } from "reactstrap";
import axios from 'axios';
import ReactPaginate from "react-paginate";

const title = 'ทุนการศึกษาทั้งหมด';


const Listnameuser = ({ id }) => {

    const [pageNumber, setPageNumber] = useState(0);

    const [listname, setlistname] = useState([]);
    const page = () => {
        axios.get("http://localhost:8080/Mback/public/userlistbyclasspage/" + id)
            .then((response) => {
                setlistname(response.data);
            }, []);
    }

    useEffect(() => {
        page();
    }, []);


    <></>

    const usersPerPage = 15;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = listname.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => {


        return (
            <>

                <Table borderless hover size="sm">
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody key={user.s_id} >

                        <tr>
                            <td>{user.s_id}</td>
                            <td>{user.s_title}</td>
                            <td>{user.s_fname}</td>
                            <td>{user.s_lname}</td>
                            <td> <Button outline color="info" size="sm" href={"/userinfo/" + user.s_id}>รายละเอียด</Button></td>
                        </tr>
                        {/* <a href={"/userinfo/" + user.s_id}> {user.s_title}{" "}{user.s_fname}{" "} {user.s_lname}</a> */}

                    </tbody>




                </Table>



            </>
        );
    });
    const pageCount = Math.ceil(listname.length / usersPerPage);

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
                    /></center>

            </Container>
        </>
    )
}
export default Listnameuser;

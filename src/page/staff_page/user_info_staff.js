import React  from 'react';


import NavBar from "../../component/structure_global/navbar";
import Userinfopropstaff from "./user_info_props_starff"
const title = 'อนุมัติผู้ใช้งาน - ระบบผู้ดูแล';

const userinfostaff = (props) => {

    return (
        <>
        <NavBar />
        <Userinfopropstaff id={props.match.params.id} />
       
    </>
     
    )
}

export default userinfostaff;

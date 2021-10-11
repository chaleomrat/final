import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FullPaageLoader from './component/FullPageLoader';
import Home from "./page/home-all";
import ShowschMain from "./page/sch_main-show";
import ShowschSub from "./page/sch_sub-show";
import Login from "./page/login-register/login-all";
import Register from './page/login-register/register-all';
import Profile from "./page/profile";
import StaffPage from "./page/staff_page/home-staff";
import ApproveUser from "./page/staff_page/approve_user";
import ApproveUserDetail from "./page/staff_page/approve_user_detail";
import Approprop from "./page/staff_page/approveprop"
import ManageUser from "./page/staff_page/manage_user";
import Scholarship from "./page/staff_page/m_sch_main-show";

import ShowApprovalSubScholar from "./page/staff_page/ShowApprovalSubScholar";
// import ApprovalSubScholar from "./page/staff_page/ApprovalSubScholar";

import ScholarshipCreateMain from "./page/staff_page/m_sch_main-create";
import ManageCategory from "./page/staff_page/manage_category";
import ManageAgency from "./page/staff_page/manage_agency";
import MaddSsholar from "./page/staff_page/m_sch_main-add_sub";
//import choseMsch from "./page/staff_page/choose_main_scholarship";
import editMscholar from "./page/staff_page/m_sch_main-edit";
import editShscholar from "./page/staff_page/m_sch_sub-show";
import editDataShscholar from "./page/staff_page/m_sch_sub-edit";
import Follow from "./page/followpage";
import AllSchollarpage from "./page/sch_main-showAll";
import Newresult from "./page/staff_page/sch_notify-create";
import Allresutpage from "./page/sch_notify-showAll";
import Result_pagestaff from "./page/staff_page/sch_notify-show";
import result_showpage  from "./page/sch_notify-page";
import editrelt from './page/staff_page/Editresult-props';
import userinfo  from "./page/staff_page/user_info";
import userinfostaff  from "./page/staff_page/user_info_staff";
import agen_tag_page from "./page/tag/agen_tag_page";
import Typepage from "./page/tag/type_tag_page";
import Yearpage from './page/tag/year_tag_page';

import Manage_system from './page/staff_page/setup_nameSystem/manage_system';   //เพิ่มเว็บและโลโก้ทุนการศึกษา
import Manage_system_show from'./page/staff_page/setup_nameSystem/setup_systemShow';  //จัดการเกี่ยวกับเว็บและโลโก้ทุนการศึกษา
import EditSutup_system from './page/staff_page/setup_nameSystem/EditSutup_system';   //แก้ไขชื่อและโลโก้

import Manage_system_slide from './page/staff_page/setup_system_slideSystem/manage_system_slide';  //เพิ่มรูปสไลด์  
import slideShow from './page/staff_page/setup_system_slideSystem/setup_systems_slideShow';  //จัดการเกี่ยวกับรูปสไลด์
import EditSlide from './page/staff_page/setup_system_slideSystem/EditSilide_system';   //แก้ไขรูปสไลด์
import AllMainscholar_commentStaff_page from './page/all_noti_mainscholar_comment_staff_page';
import AllcommentStaff_page from './page/all_noti_comment_staff_page';
import Allcomment_page from './page/all_noti_comment_page';

import Agency_page from './page/agency_page';
import Type_page from './page/type_page';
import Year_page from './page/year_page';

const App = () => {
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 0)
    }, []);
    return (
        loading ? <FullPaageLoader /> : [
            <Router>
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/allscholarship" component={AllSchollarpage} />
                    <Route path="/scholarshipMain/:id" component={ShowschMain} />
                    <Route path="/scholarshipSub/:id" component={ShowschSub} />

                    <Route path="/allScholarshipNotify" component={Allresutpage} />
                    <Route path="/ScholarshipNotify/:id" component={result_showpage} />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile/" component={Profile} />

                    <Route path="/staff_page" component={StaffPage} />
                    <Route path="/staff/approve_user" component={ApproveUser} />
                    <Route path="/staff/approve_user_detail/:id" component={Approprop} />
                    <Route path="/staff/manage_user" component={ManageUser} />
                    <Route path="/staff/scholarship" component={Scholarship} />

                    

                    <Route path="/staff/scholarship_create-main" component={ScholarshipCreateMain} />
                    {/* <Route path="/staff/scholarship_create-sub" component={ScholarshipCreateSub} /> */}
                    <Route path="/staff/manage_category" component={ManageCategory} />
                    <Route path="/staff/manage_agency" component={ManageAgency} />
                    {/* <Route path="/staff/scholarship_create/choose_main_scholarship" component={choseMsch} /> */}
                    <Route path="/staff/MainAddSunsholar/:id" component={MaddSsholar} />
                    <Route path="/staff/MainEditSunsholar/:id" component={editMscholar} />
                    <Route path="/staff/ShEditSunsholar/:id" component={editShscholar} />
                    <Route path="/staff/editDataShscholar/:id" component={editDataShscholar} />

                    <Route path="/staff/ShowApprovalSubScholar" component={ShowApprovalSubScholar} />
                    
                    {/* <Route path="/staff/ApprovalSubScholar/:id" component={ApprovalSubScholar} /> */}
                    
                    <Route path="/staff/NewResultpage" component={Newresult} />
                    <Route path="/followpage" component={Follow} />
                    <Route path="/staff/resultpagestaff" component={Result_pagestaff} />
                    <Route path="/staff/editresult/:id" component={editrelt}/>
                    <Route path="/userinfo/:id" component={userinfo} />
                    <Route path="/userinfostaff/:id" component={userinfostaff} />
                    <Route path="/allResult_forthis_agen/:id" component={agen_tag_page} />
                    <Route path="/allResult_forthis_Type/:id" component={Typepage} />
                    <Route path="/allResult_forthis_year/:id" component={Yearpage} /> 

                    <Route path="/staff/Manage_system" component={Manage_system} /> {/* เพิ่มเว็บและโลโก้ทุนการศึกษา */}
                    <Route path="/staff/Manage_system_show" component={Manage_system_show} /> {/*  จัดการเกี่ยวกับเว็บและโลโก้ทุนการศึกษา */}
                     <Route path="/staff/EditSutup_system/:id" component={EditSutup_system} /> {/*แก้ไขชื่อและโลโก้ */}

                    <Route path="/staff/Manage_system_silde" component={Manage_system_slide} />  {/* เพิ่มรูปสไลด์ */}
                    <Route path="/staff/EditSilde_system/:id" component={EditSlide} />{/* แก้ไขรูปสไลด์ */}
                    <Route path="/staff/slideShow" component={slideShow} />{/* จัดการเกี่ยวกับรูปสไลด์ */}

                    <Route path="/allMainscholarnotificationStaff" component={AllMainscholar_commentStaff_page} />
                    <Route path="/allnotificationStaff" component={AllcommentStaff_page} />
                    <Route path="/allnotification" component={Allcomment_page} />

                    <Route path="/AllAgency" component={Agency_page} />
                    <Route path="/AllType" component={Type_page} />
                    <Route path="/AllYear" component={Year_page} />
                </Switch>
            </Router>
        ]

    );
}

export default App;
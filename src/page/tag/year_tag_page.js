import React from 'react'
import Yearprops from './year_tag_props';
const Yearpage = (props) => {
    return (
        <>
            <Yearprops id={props.match.params.id}/>
        </>
    )
}

export default Yearpage;

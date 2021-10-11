import React from 'react'
import Typeprops from './type_tag_props';
const Typepage = (props) => {
    return (
        <>
            <Typeprops id={props.match.params.id}/>
        </>
    )
}

export default Typepage;

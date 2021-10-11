import React from 'react'
import Agenprops from './agen_tag_props';
const agen_tag_page = (props) => {
    return (
        <>
            <Agenprops id={props.match.params.id}/>
        </>
    )
}

export default agen_tag_page;

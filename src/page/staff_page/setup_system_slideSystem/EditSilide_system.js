
import React from 'react';

import Edit_system from "./EditSlide-props "

const EditSilde_system = (props) => {

    return (
        <>

            <Edit_system id={props.match.params.id} />

        </>
    )
}

export default EditSilde_system;

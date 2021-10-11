
import React from 'react';

import Edit_system from "./EditSutup_system-props "

const editMscholar = (props) => {

    return (
        <>

            <Edit_system id={props.match.params.id} />

        </>
    )
}

export default editMscholar;

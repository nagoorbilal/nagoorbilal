import React from 'react';
import Button from "../CustomButtons/Button";
import Add from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

export default function SaveButton(props){ 
    const submit = (e) => { 
        props.onClick(e) }
    return (
       
        <Tooltip title="Add" placement="top">
                <Button 
                     color="smartblue" 
                     onClick={submit}
                     size={props.size && 'sm'}
                     startIcon={<Add className="AddBtnIcon"/>}
                     className="AddBtnCommon"
                     style={{visibility: props.disabled ? 'hidden' : 'visible'}}
                     disabled={props.disabled} >
                     Add</Button>
                     </Tooltip>
    )
}


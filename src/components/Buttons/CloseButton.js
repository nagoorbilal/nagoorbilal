import React from 'react';
import Button from "../CustomButtons/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';

export default function SaveButton(props){ 
    const submit = (e) => { 
        props.onClick(e) }
    return (
       
        <Tooltip title="Close" placement="top">
                <Button 
                     color="smartblue" 
                     onClick={submit}
                     size={props.size && 'sm'}
                     startIcon={<CancelPresentationOutlinedIcon className="CloseBtnIcon"/>}
                     className="CloseBtnCommon"
                     disabled={props.disabled} >
                     Close</Button>
                     </Tooltip>
    )
    // return (
    //     <Button
    //         className="CloseBtnCommon" 
    //         name="Close"
    //         disabled ={props.disabled}
    //         onClick={props.onClick}
    //         startIcon = {<CancelPresentationOutlinedIcon className="CloseBtnIcon"/>}
    //     /> 
    // )
}
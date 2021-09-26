import React from 'react';
import Button from '../_helperComponents/Button.js';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

export default function SaveButton(props){ 
    return (
        <Button
            className="SaveBtnCommon" 
            name={props.label}
            disabled ={props.disabled}
            onClick={props.onClick}
            startIcon = {<AssignmentTurnedInOutlinedIcon className="SubmitBtnIcon"/>}
        /> 
    )
}
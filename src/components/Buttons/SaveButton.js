import React from 'react';
import Button from '../_helperComponents/Button.js';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'; 

export default function SaveButton(props){ 
    return (
        <Button
            className="SaveBtnCommon" 
            name={props.label}
            disabled ={props.disabled}
            onClick={props.onClick}
            startIcon = {<SaveOutlinedIcon className="SubmitBtnIcon"/>}
        /> 
    )
}
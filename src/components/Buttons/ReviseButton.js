import React from 'react';
import Button from '../_helperComponents/Button.js';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';

export default function SaveButton(props){ 
    return (
        <Button
            className="SaveBtnCommon" 
            name="Revise"
            disabled ={props.disabled}
            onClick={props.onClick}
            startIcon = {<SystemUpdateAltOutlinedIcon className="SubmitBtnIcon"/>}
        /> 
    )
}
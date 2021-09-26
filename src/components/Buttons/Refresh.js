import React from 'react';
import Button from '../_helperComponents/Button.js';
import RefreshIcon from '@material-ui/icons/Refresh';

export default function SaveButton(props){ 
    return (
        <Button
            className="SaveBtnCommon" 
            name={props.label}
            disabled ={props.disabled}
            onClick={props.onClick}
            startIcon = {<RefreshIcon className="SubmitBtnIcon"/>}
        /> 
    )
}
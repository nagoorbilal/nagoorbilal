import React from 'react';
import Button from '../_helperComponents/Button.js';
import PrintIcon from '@material-ui/icons/Print';

export default function SaveButton(props){ 
    return (
        <Button
            className="SaveBtnCommon" 
            name="Print"
            disabled ={props.disabled}
            onClick={props.onClick}
            startIcon = {<PrintIcon className="SubmitBtnIcon"/>}
        /> 
    )
}
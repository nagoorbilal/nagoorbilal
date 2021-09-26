import React, { useState } from "react";
import Button from "../CustomButtons/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default function Buttons(props) {

    const submit = (e) => { 
        props.onClick(e) }

    return (
       
            <Button 
             color="smartblue" 
             onClick={submit}
             size={props.size && 'sm'}
             startIcon={props.startIcon}
             className={props.className}
             disabled={props.disabled} >
             {props.name}</Button>
    )

}
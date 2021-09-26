import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { orange } from '@material-ui/core/colors';


const GreenCheckbox = withStyles({
  root: {
    color: '#02B152',
    '&$checked': {
      color: '#02B152',
      
    },
    padding:'0px',
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function Checkboxs(props) {
     
    const changeCheck = event =>{
        props.onClick(event.target.checked);   
    }

    return (
        <FormControlLabel
        control={
          <GreenCheckbox
            checked={props.checked}
            onChange={changeCheck}
            disabled={props.disabled}
          />
        }
        label={props.label}
      />
       
    )

}

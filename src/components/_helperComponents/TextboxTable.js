import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import { green } from '@material-ui/core/colors';

const color = "#4992F9";
const theme = createMuiTheme({
//   palette: {
//     // common: { black: color, white: color },
//     primary: { main: color, dark: color, light: color },
//     text: { primary: color, secondary: color }
//   }
        palette: {
            primary: {
                main: '#4992F9'
            },
            // text:{
            //     primary: '#4992F9',
            //     error:'#e34463'
            // }
        }
});



// const GreenTextField = withStyles({
//     overrides: {
//     MuiInput:{
//         underline: {
//             '&:before': {
//                 // borderBottom:'1px solid #e34463'
//         },
//         '&:after': {
//             borderBottom:'2px solid #4992F9'
//         }
//         }
//     }
// },
// })(props => <TextField color="default" {...props} />);

export default function CustomTextField(props) {
     
    const changeEvent = e => {
        if(props.onChange){
            props.onChange(e.target.value) 
        }
    }
 
    const onInputEvent = (e) => {
        if(props.onINPUT){
        props.onInput(e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4))
        }
    }

    const keyPressEvent = e => { 
        if(props.keyPress){
             props.onKeyPress(e) 
        }
    }

    return (
        <MuiThemeProvider theme={theme}>

          <TextField
          InputProps={{
            maxLength: props.maxLength,
            readOnly: props.readOnly,
        }}
        placeholder={props.defaultPlaceholder}
        autoFocus={props.autoFocus}
        onInput={onInputEvent}
        multiline={props.multiline}
        rowsMax={props.multiline && "2"}
        fullWidth={!props.fullWidth ? true:false}
        onBlur={props.onBlur}
        id={props.id}
        label={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={changeEvent} 
        onKeyPress={keyPressEvent}
        disabled= {props.disabled}
        helperText={props.helperText}
        // color={props.color}
        error={props.error}
          />
        </MuiThemeProvider>
    )

}

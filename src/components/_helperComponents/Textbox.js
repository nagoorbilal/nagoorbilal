import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
  // Redux Imports
import { useDispatch, useSelector } from "react-redux";
const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#4992F9'
        },
        text:{
            secondary: '#4992F9',
            error:'#e34463'
        }
      },
      overrides: {
            MuiInputLabel:{
                root: {
                    color:'#4992F9'
                }
            },MuiInput:{
                // colorSecondary :{
                //     borderBottom:'2px solid #0095FB'
                // },
                        underline: {
                        '&:after': {
                            borderBottom:'2px solid #0095FB'
                        }
                        }
                }
        },
   
});

export default function Textbox(props) {
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 

    const changeEvent = e => {
        if(props.onChange){
          
            props.onChange(e.target.value.length == 1 ? e.target.value.trim() : e.target.value) 
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
            readOnly: props.readOnly,
            maxLength: props.maxLength,
        }}
        placeholder={props.defaultPlaceholder}
        onInput={onInputEvent}
        autoFocus={props.autoFocus}
        multiline={props.multiline ? true : false}
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
        color={props.color}
        error={props.error}
        />
         </MuiThemeProvider>
    );
}
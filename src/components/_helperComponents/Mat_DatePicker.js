import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useState } from "react";
import {  format,differenceInMinutes } from 'date-fns'

import DateFnsUtils from "@date-io/date-fns"; // import
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const theme1 = createMuiTheme({
//     overrides: {
//         MuiInput:{
//             underline: {
//                 '&:before': {
//                     borderBottom:'2px solid red'
//             },
//             '&:after': {
//                 borderBottom:'2px solid #34ace0'
//         }
//     },
// },
//     },
      
    });
const theme2 = createMuiTheme({
      overrides: {
          MuiInput:{
              underline: {
                  '&:before': {
                      borderBottom:'2px solid #34ace0'
              },
              '&:after': {
                  borderBottom:'2px solid #34ace0'
          }
      },
  },
      },
        
      });
function BasicDatePicker(props) {
    const [newdate, setNewdate] =useState(null)

  const handleChange = val => {

    if((val == 'Invalid Date') || (val == null) ){
      props.onChange(val);
    }else{
      props.onChange(format(val, 'yyyy-MM-dd'));
      // console.log(format(val, 'yyyy-MM-dd'))
    }
    
   }

  return (
    <MuiThemeProvider >
    <MuiPickersUtilsProvider utils={DateFnsUtils}> 
    <KeyboardDatePicker
      id={props.id}
      autoOk
      label={props.label}
      fullWidth={!props.fullWidth ? true:false}
      value={props.value ? props.value :null }   //should be YYYY-MM-dd format
      variant={props.variant ? props.variant : "inline"}
      InputAdornmentProps={{ position: "end" }}
      // onChange={date => fromDatecalc(date)}
      format={props.format ? props.format : "dd-MM-yyyy"}
      maxDate={props.maxDate && new Date(props.maxDate)}  //should be YYYY-MM-dd format eg : new Date('2020-03-31')
      minDate={props.minDate && new Date(props.minDate)}
      onChange={props.change ? props.change : handleChange}
      // color={!props.value ? 'primary' : 'secondary'}
      disabled={props.disabled ? props.disabled : false}
    />
    {/* <DatePicker 
    id={props.id}
    openTo={props.view && (props.view[0] === "year" ? "month" : "date")}
    autoOk
    // clearable={true}
    allowKeyboardControl
    fullWidth={!props.fullWidth ? true:false}
    placeholder={props.placeholder}
    label={props.label}
    variant={props.variant ? props.variant : "inline"}
    value={props.value ? props.value :null }   //should be YYYY-MM-dd format
    format={props.format ? props.format : "dd-MM-yyyy"}
    maxDate={props.maxDate && new Date(props.maxDate)}  //should be YYYY-MM-dd format eg : new Date('2020-03-31')
    minDate={props.minDate && new Date(props.minDate)}
    onChange={props.change ? props.change : handleChange}
    onClose={props.onClose}
    animateYearScrolling
    color={'primary'}
    disabled={props.disabled ? props.disabled : false}
    views={props.view ? props.view : ["date"]}
    
  /> */}
  </MuiPickersUtilsProvider>
   </MuiThemeProvider>
  );
}

export default BasicDatePicker;


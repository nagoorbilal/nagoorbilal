import React, { useState,useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../../assets/css/select.css'; 

const theme = createMuiTheme({
  palette: {
      secondary: {
          main: '#0095FB'
      },
      text:{
          secondary: '#0095FB',
          error:'#e34463'
      }
    },
});

export default function Select(props) {
    const [titles , setTitle] = useState('');
    const [text, setText] = useState('');

        const changeText = (e, value) =>{
            if(!e){
                setText(value);
                return false;
            }
            setText(e.target.value);   
        }

    useEffect(() =>{
        setTitle(props.title); 
        setText(props.value);
        // console.log('title',props.title)
    },[])

      
      function onSelectEvent(value){     
        if(!value){ 
          props.onCloseIcon(null);
        }
        props.onChange(value);
        props.onClose(value);
      }
     
       
    return ( 
      <MuiThemeProvider theme={theme}>
      <Autocomplete  
      id="autocomplete"
      options={props.option} 
      getOptionLabel={ option => option[titles]}
      inputValue={text}
      onOpen={() => {props.open()}}
      onInputChange={changeText}
      onChange={onSelectEvent.bind(this)} 
      renderInput={params => <TextField {...params} 
      placeholder={props.placeholder}      
      error={props.error} 
      color={props.color}  
      helperText={props.helperText}      
      margin="normal" fullWidth />}
    />
    </MuiThemeProvider>

    )

}

import React, { useState,useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomInput from "../CustomInput/CustomInput";
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

    useEffect(() =>{
        setTitle(props.title);
        setText(props.text);
    },[])

    function onSelectEvent(e,value){  
      //  console.log(value)
            if(value != null){
               
            }            
            props.onChange(value);
            props.onClose(value ? value[props.title] : value);
    }
     
    const onfilter = (e, value) =>{ 
            if(!e){
                setText(value);
                return false;
            }
            setText(e.target.value);            
            props.onInputChange(e.target.value);

            if(!e.target.value)
            props.onCloseIcon(null);           
    }


      
    return (
       <MuiThemeProvider theme={theme}>
       <Autocomplete
        id="autocomplete"
        size="small"
        options={props.option}
        onInputChange={onfilter} 
        inputValue={text}
       // onOpen={() => props.open() ? props.open() : ''}
        onChange={onSelectEvent.bind(this)}
        onClose={text ? () => props.onClose(text) : ''}
        getOptionLabel={ option => option[titles]}
        value={props.value}
        renderInput={params => <TextField  {...params}
        label={props.placeholder} error={props.error}  color={props.color}  
        helperText={props.helperText}
        margin="normal" fullWidth 
        />}
      />
     </MuiThemeProvider>

        
    )
}
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
 
export default function DropDown(props){ 
    const [value, setValue] = React.useState(props.value);

    const handleChange = (event) => {
        let value = event.target.value;
        setValue(value);
        props.onChange(value);
      };
      
    let data = props.data; 
    return(
      <MuiThemeProvider theme={theme}>
        <FormControl fullWidth disabled={props.disabled}>
        <InputLabel id="demo-simple-select-label">{props.placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={handleChange} 
          color={'secondary'}
        >{
            data.map((value)=>{
                return <MenuItem value={value.value}>{value.label}</MenuItem>
            })
        }
        </Select>
      </FormControl>
      </MuiThemeProvider>

    );
}
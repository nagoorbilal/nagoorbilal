import React, { useState } from "react";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";

export default function DateTimePic(props){

  const [newdate, setNewdate] =useState('')
  

    function handleChange(newdate){
     setNewdate(newdate);
      
      let d = new Date(newdate)
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear();

      props.onChange(datestring);
    }
    
    var yesterday = Datetime.moment().subtract(1, 'day'); 
    const valid = (current, selected) =>{
      if(props.minDate){
        return current.isAfter( yesterday ); 
      }else{
        return true;
      }        
    }
    return(
        <FormControl fullWidth>
        <Datetime
        id={props.id}
        timeFormat={false}
        dateFormat={false}
        closeOnSelect={true}
        isValidDate={valid}
        onChange={handleChange}
        value={newdate ? newdate :props.value}
        viewDate={new Date('2020-03-18')}
        inputProps={{ placeholder: props.placeholder, disabled: props.disabled }}
        />
      </FormControl>
    );
}
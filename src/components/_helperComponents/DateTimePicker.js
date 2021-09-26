import React, { useState } from "react";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";

export default function DateTimePic(props){

  const [newdate, setNewdate] =useState('')
  

    function handleChange(newdate){
      setNewdate(newdate);
      
      let d = new Date(newdate)
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + formatAMPM(d);

      props.onChange(datestring);
    }

    function formatAMPM(date){
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

   
    return(
        <FormControl fullWidth>
        <Datetime
        id={props.id}
        dateFormat={false}
        onChange={handleChange}
        value={newdate ? newdate :props.value}
        dateFormat="DD-MM-YYYY"
        inputProps={{ placeholder: props.placeholder }}
        closeOnSelect={true}
        />
      </FormControl>
    );
}
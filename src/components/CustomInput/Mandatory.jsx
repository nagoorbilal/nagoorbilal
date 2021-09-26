import React from 'react';
import FormControl from '@material-ui/core/FormControl'; 
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default function MandatoryInput(){
    return(<FormControl error>
            <InputLabel htmlFor="component-error">Name</InputLabel>
            <Input
            id="component-error" 
            aria-describedby="component-error-text"
            /> 
            </FormControl>)
}
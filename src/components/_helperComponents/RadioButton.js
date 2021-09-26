import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import regularFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

function Checkboxs(props) {
    const { classes } = props;
    const [selectedEnabled, setselectedEnabled] = useState("b");
     
    const handleChange = (e) =>{
    //    console.log(e.target.value)
      
           setselectedEnabled(e.target.value );
         
        // setCheck(!check);
        // props.onClick(check);   
    }
    return (


        <div
        className={
          classes.checkboxAndRadio +
          " " +
          classes.checkboxAndRadioHorizontal
        }
      >
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === props.value}
              onChange={handleChange}
              value={props.value}
              name="radio button enabled"
              aria-label={props.aria_label}
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord
                  className={classes.radioChecked}
                />
              }
              classes={{
                checked: classes.radio,
                root: classes.radioRoot
              }}
            />
          }
          classes={{
            label: classes.label,
            root: classes.labelRoot
          }}
          label={props.label}
        />
      </div>
       
        // <div
        //               className={
        //                 classes.checkboxAndRadio +
        //                 " " +
        //                 classes.checkboxAndRadioHorizontal
        //               }
        //             >
        //               <FormControlLabel
        //                 control={
        //                   <Radio
        //                     checked={selectedEnabled === props.value}
        //                     onChange={handleChange}
        //                     value={props.value}
        //                     name="radio button demo"
        //                     aria-label={props.aria_label}
        //                     icon={
        //                       <FiberManualRecord
        //                         className={classes.radioUnchecked}
        //                       />
        //                     }
        //                     checkedIcon={
        //                       <FiberManualRecord
        //                         className={classes.radioChecked}
        //                       />
        //                     }
        //                     classes={{
        //                       checked: classes.radio,
        //                       root: classes.radioRoot
        //                     }}
        //                   />
        //                 }
        //                 classes={{
        //                   label: classes.label,
        //                   root: classes.labelRoot
        //                 }}
        //                 label={props.label}
        //               />
        //             </div>
    )

}
Checkboxs.propTypes = {
    classes: PropTypes.object
  };


export default withStyles(regularFormsStyle)(Checkboxs);
import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Today from "@material-ui/icons/Today";

import {tooltip} from "../../assets/jss/material-dashboard-pro-react.jsx";

const styles = {
    tooltip,
    cardIconTitle: {
     
      marginTop: "14px",
      marginBottom: "0px"
    }
  };

function Tooltipp(props){
    const { classes } = props;
    return(
        <div>
        {/* <Tooltip
        id="tooltip-top"  
        title="View"
        placement="top"
        classes={{ tooltip: classes.tooltip }}>  
          
        </Tooltip>       */}
     </div>
      
    )
}


Tooltipp.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Tooltipp);
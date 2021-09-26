import React, { useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      zIndex:"1000"
    },
  }));
  

  export default function CustomizedSnackbars(props) {
    const classes = useStyles();
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
     props.onClose()
    };
  
    return (
      <div className={classes.root}>
        <Snackbar 
         anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={props.open}
        autoHideDuration={2000}
        onClose={handleClose}>
          <Alert color={props.color}>
            {props.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
  
import React,{useState, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
// url config file
import {config} from '../../config.js'; 
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";
  
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import Notification from '../../components/_helperComponents/Notification'; 
import Loading from '../../components/_helperComponents/Loading';
// common core component  
import Textbox from '../../components/_helperComponents/Textbox'
import Button from '../../components/_helperComponents/Button'
import Checkbox from '../../components/_helperComponents/Checkbox'
import Select from '../../components/_helperComponents/Select'
import Datetime from '../../components/_helperComponents/DateTimePicker'
import Datepicker from '../../components/_helperComponents/DatePicker'
import Timepicker from '../../components/_helperComponents/TimePicker'
import Tooltip from '../../components/_helperComponents/Tooltip'
import Radios from "../../components/_helperComponents/RadioButton"

import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import AssessmentIcon from "@material-ui/icons/Assessment";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Slide from "@material-ui/core/Slide";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

import ChartRegmonthwise from "./ChartRegmonthwise";
// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// import PropTypes from "prop-types";
// import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import regularFormsStyle from "../../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";


// import Charts from '../../views/Chart'
// import Maps from '../../views/Map'

// @styles
import divStyle from "../../assets/css/divStyles.js"
import extendedFormsStyle from "../../assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const useStyles = makeStyles(theme => ({
  ...extendedFormsStyle,
  ...divStyle
}));

function HomeScreen(props){
  const classes = useStyles();
  const content = useSelector(state => state.form);
  const dispatch = useDispatch(); 
  const [Message, setMessage] = React.useState({ open: false,color: '',message: '' });
  const [selectedEnabled, setselectedEnabled] = useState('b')
  const [userID] = useState(localStorage.getItem('userid'));
  const [Todaydate, setTodaydate] = useState('')
  const [currentmonth, setcurrentmonth] = useState('')
  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ConsumerCount, setConsumerCount] = useState('')
  const [Meter1, setMeter1] = useState({MeterTypeName: '',MeterTypeCount: ''})
  const [Meter2, setMeter2] = useState({MeterTypeName: '',MeterTypeCount: ''})
  const [Meter3, setMeter3] = useState({MeterTypeName: '',MeterTypeCount: ''})

  useEffect(()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var currentmonth = monthNames[today.getMonth()];
    var currentdate = dd + '-' + mm + '-' + yyyy;
    setTodaydate(currentdate)
    setcurrentmonth(currentmonth)
   // dispatch(tokenFunction()); 
    
  },[]);

  
  

  const handleClose = () => {
    setopen(false)
  };

  function handleChange(e){
  }

  const handleChangeEnabled = (event) => {
    setselectedEnabled(event.target.value);
  }

  // function submit(){
  //   setToast({ open:true,color:'success',message:'Only one snackbar may be displayed at a time.'})
  // }

  function handleToggle(value){
}

 function handleChangeDTPicker(value){
 }


// const handleClose = () => { setToast({open:false,color:toast.color}) };

 const getDashboardCount = () => {

 }

 useEffect(()=> {
  //testfunc()
 },[])

 const testfunc = () => {
  let url = config.Api+"salesreport"
  let data = {
      "customer_id": "1",
      "from_date":"2020-10-01",
      "to_date":"2020-10-18"
  }
  console.log("data",data)

  fetch(url, {
      method: "POST",
      headers: { 
          "Accept": "application/json",
      },
      body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {  
//setLoading(false)

console.log(res)
        if(res.Output.data.length > 0){

          let obj = {};

          res.Output.data.map(val => {
            obj[val.bill_no] = {
              "bill_no": val.bill_no,
              "date": val.date,
              "customer_name": val.customer_name,
              "less_amount": val.less_amount,
              "total_amount":val.total_amount,
              "old_opening_balance": val.old_opening_balance
            };
            obj[val.bill_no]["items"] ={};
            obj[val.bill_no]["items"][val.item_name]={
              "item_name": val.item_name,
              "qty": val.qty,
              "rate": val.rate,
              "amount": val.amount
            }
            
          })

          console.log("test",JSON.stringify(obj))
        }
      

  })
  
}


    return(
        <div> 
           <Notification open={Message.open} color={Message.color} message={Message.message} onClose={()=>setMessage({open: false,color:Message.color})}/>

         <Card className={classes.homeCard}>
         <Loading loading={loading} />
            <CardBody style={{height:'81vh'}}>
            <h1 style={{fontSize: '20px',marginTop: '15px',color: 'currentColor'}}>Status as on {Todaydate} for the month of {currentmonth}</h1>

<GridContainer>

  <GridItem xs={12} sm={12} md={3} className={classes.assetgridpadding}>
          <Card className={classes.cardmarginCount}>
              <CardHeader color="info" icon>
                <CardIcon color="info" >
                    <AssessmentIcon />
                </CardIcon>
              </CardHeader>
          <CardBody> 
            <p style={{marginTop: '-20px',fontSize: '20px'}}>{ConsumerCount}</p>
            <h5 className={classes.cardIconTitle}>Customers </h5>
            
            
          </CardBody>
          
          </Card>
  </GridItem>


 <GridItem xs={12} sm={12} md={3} className={classes.assetgridpadding}>
        <Card className={classes.cardmarginCount}>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                  <AssessmentIcon />
              </CardIcon>
            </CardHeader>
        <CardBody> 
          <p style={{marginTop: '-20px',fontSize: '20px'}}>{Meter1.MeterTypeCount}</p>
          <h5 className={classes.cardIconTitle}>{Meter1.MeterTypeName}</h5>
          
          
        </CardBody>
        
        </Card>
</GridItem>


<GridItem xs={12} sm={12} md={3} className={classes.assetgridpadding}>
        <Card className={classes.cardmarginCount}>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                  <AssessmentIcon />
              </CardIcon>
            </CardHeader>
        <CardBody> 
          <p style={{marginTop: '-20px',fontSize: '20px'}}>{Meter2.MeterTypeCount}</p>
          <h5 className={classes.cardIconTitle}>{Meter2.MeterTypeName}</h5>
          
        </CardBody>
        
        </Card>
</GridItem>

<GridItem xs={12} sm={12} md={3} className={classes.assetgridpadding}>
        <Card className={classes.cardmarginCount}>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                  <AssessmentIcon />
              </CardIcon>
            </CardHeader>
        <CardBody> 
          <p style={{marginTop: '-20px',fontSize: '20px'}}>{Meter3.MeterTypeCount}</p>
          <h5 className={classes.cardIconTitle}>{Meter3.MeterTypeName}</h5>
          
        </CardBody>
        
        </Card>
</GridItem>

<GridItem xs={12} sm={12} md={12} className={classes.assetgridpadding}>
        <Card className={classes.cardmargin}>
        <CardHeader color="info" icon>
        <GridContainer>
          <GridItem xs={10} sm={10} md={10}>
            <h5 className={classes.cardIconTitle} style={{paddingTop:'10px'}}>Recent Orders</h5>

          </GridItem>
        </GridContainer>
        
        </CardHeader>
        <CardBody> 
          <ChartRegmonthwise value={[]}/>
          
        </CardBody>
        
        </Card>
</GridItem>


</GridContainer>

{/* first chart 30 days  VwDFeedbackMonthSummary */}

<Dialog  
 fullWidth={true}
 maxWidth={'lg'}
open={open} 
onClose={handleClose} 
aria-labelledby="max-width-dialog-title">
  
  <Card className={classes.cardmargin}>
      <div style={{margin: '10px 17px',color: '#3f95fc',textAlign: 'right'}}>
        
        <CloseIcon  onClick={handleClose} />
        
        </div>

            {/* <CardHeader color="rose"  style={{width:'max-content',fontWeight:'500'}}> */}
            <h5 className={classes.cardIconTitle} style={{paddingLeft:'20px'}}>  Last 30 days status </h5>  
            {/* </CardHeader> */}
            
        <CardBody> 

        {/* {
    this.state.fbMonthSum ? 

    <Monthwise value={this.state.fbMonthSum}/> 

    : <PiechartMonth value={this.state.pieChartMon}/>
  } */}
          
  </CardBody>

  </Card>
   
    {/* </DialogContent> */}
   


</Dialog>
            </CardBody>
            </Card> 
        </div>
    );

}

  export default HomeScreen;

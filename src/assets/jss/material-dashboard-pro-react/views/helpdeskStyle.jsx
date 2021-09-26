import {
    cardTitle,
    grayColor,
    successColor,
    tooltip
} from "../../material-dashboard-pro-react.jsx";
import {
    dangerColor,
    infoColor,
    primaryColor,
    roseColor,
    warningColor,
} from "../../material-dashboard-pro-react.jsx";

import hoverCardStyle from "../../material-dashboard-pro-react/hoverCardStyle.jsx";

const dashboardStyle = {
    ...hoverCardStyle,
    tooltip,
    cardTitle: {
      ...cardTitle,
      marginTop: "0px",
      marginBottom: "0px",
      fontSize:"16px"
    },
    daysgrid:{
      width: "calc(100% + 15px)"
    },
    filterpadding:{
      padding:"0 !important"
    },
    iconfont:{
      fontSize:"10px !important"
    },
    openTitle:{
      marginTop: "5px !important",
      textAlign: "left",
      marginBottom: "8px !important",
      fontSize:"16px",
      color: "red",
      fontWeight: "bold",
      cursor: "pointer"
    },
    trendTitle:{
      
      textAlign: "left",
      marginLeft: "10px",
      
      fontSize:"16px",
      color: "#343a40",
      fontWeight: "bold"
    },
   
    trendgrid:{
      padding : "0 !important"
    },
    assetgridpadding:{
      paddingTop: "18px !important",
     
  
    },
    gridpadding:{
      padding : "0 !important",
      paddingTop: "20px !important"
    },
  
    closedTitle:{
      marginTop: "5px !important",
      marginBottom: "8px !important",
      fontSize:"16px",
      color: "green",
      textAlign: "left",
      fontWeight: "bold"
    },
    UnAssignedTitle:{
      marginTop: "5px !important",
      marginBottom: "8px !important",
      fontSize:"16px",
      textAlign: "left",
      fontWeight: "bold"
    },
    footer:{
      marginTop: "8px",
      marginBottom: "0px",
      fontSize:"10px",
    },
    tablefooter:{
      marginTop: "8px",
      marginBottom: "0px",
      fontSize:"10px",
      color: "#F94340",
      fontWeight:"bold",
    },
    footerpercent:{
      marginTop: "8px !important",
      marginBottom: "0px !important",
      fontSize:"14px",
      fontWeight:"bold",
      color: "#2163dd"
  
    },
    wofooterpercent:{
      marginTop: "8px !important",
      marginBottom: "0px !important",
      fontSize:"14px",
      fontWeight:"bold",
      marginLeft:"-14px !important",
      color: "#2163dd"
  
    },
  
    overdueTitle:{
      marginTop: "5px !important",
      marginBottom: "8px !important",
      fontSize:"16px",
      textAlign: "left",
      fontWeight: "bold",
      cursor: "pointer"
    },
    overduepopTitle:{ 
      marginTop: "5px !important",
      marginBottom: "8px !important",
      fontSize:"16px",
      textAlign: "center",
      fontWeight: "bold"
  
    },
    totalTitle:{
      marginTop: "5px !important",
      marginBottom: "10px !important",
      fontSize:"16px",
      color: "#03b6fc",
      textAlign: "left",
      fontWeight: "bold"
    },
    totalContract:{
      marginTop: "5px !important",
      marginBottom: "0px !important",
      fontSize:"16px",
      color: "#03b6fc",
      textAlign: "left",
      fontWeight: "bold"
    },
    legendsub:{
      textAlign: "center"
    },
    cardwidth:{
      width: "25vw"
    },
    legendTitle: {
      color: grayColor[0],
      margin: "10px 0 !important",
      display: "flex",
      fontSize:"10px"
    },
   
  
  
    filtercard:{
      marginTop:"0px",
      marginBottom: "0px"
    },
    padding:{
      paddingRight: "10px !important",
      paddingLeft: "10px !important"
    },
    cardbody:{
    padding: "-0.0625rem 20px !important",
    },
    gridBorder:{
      borderBottom: "1px solid #e1eded"
    },
    marginTop:{
      marginTop:"-50px"
    },
    primary: {
      color: primaryColor[0]
    },
    warning: {
      color: warningColor[0]
    },
    danger: {
      color: dangerColor[0]
    },
    success: {
      color: successColor[0]
    },
    info: {
      color: infoColor[0],
  
  
    },
  
    rose: {
      color: roseColor[0]
    },
    gray: {
      color: grayColor[0]
    },
    cardFooter: {
      display: "block"
    },
  
    cardIconTitle: {
      ...cardTitle,
      marginTop: "5px",
      marginBottom: "0px",
      color: "#343a40",
      fontSize: "16px",
      fontWeight:"500"
    },
    summaryTitle: {
      ...cardTitle,
      marginTop: "5px",
      paddingTop: "10px",
      paddingBottom: "10px",
      marginBottom: "0px",
      color: "#343a40",
      fontSize: "16px"
    },
    summarydayTitle:{ 
      textAlign: "left",
      marginLeft: "15px",
      
      fontSize:"16px",
      color: "#343a40",
      fontWeight: "bold"
    },
    cardProductTitle: {
      ...cardTitle,
      marginTop: "0px",
      marginBottom: "3px",
      textAlign: "center"
    },
    cardheader:{
      background:"#40BAD2"
    },
    cardheader2:{
      background:"#e34507"
    },
    cardheader3:{
      background:"#28d106"
    },
    cardheader4:{
      background:"#3681eb"
    },
    cardheader5:{
      background:"#6b04ba"
    },
    cardbodypadding:{
      padding: "0 14px"
    },
    cardicon:{
      width:"3vw",
      height:"6vh",
      // marginLeft:"25px !important",
      marginTop:"-15px !important",
      float: "left !important"
    },
    filtericon:{
      ['@media (max-width:600px)'] :{
        display: "none !important"  
      },
      color:"black",
      marginTop:"-32px !important",
      float: "right !important",
      fontSize:"15px !important",
      marginRight: "-20px",
      cursor: "pointer"
    },
  
    
    icon:{
      fontSize:"25px !important",
      marginTop:"-25px !important",
      marginLeft:"-23px !important"
    },
    totalreg: {
      color: grayColor[0],
      fontSize: "12px",
      
      lineHeight: "30px !important",
      paddingTop: "0px",
  
      marginBottom: "0",
      marginTop: "0"
     },
  
    cardCategory: {
      color: grayColor[0],
      fontSize: "12px",
      paddingTop: "0px",
  
      marginBottom: "0",
      marginTop: "0"
      
    },
    overdueCategory: {
      color: grayColor[0],
      fontSize: "12px",
      paddingTop: "0px",
      textAlign: "center",
      marginBottom: "0",
      marginTop: "0"
      
    },
    cardhead:{
      color: "#343a40",
      fontSize: "20px",
  
      fontWeight:"bold",
      paddingTop: "0px",
      float: "left",
      marginBottom: "0",
      marginTop: "0",
      margin: "0px"
  
    },
    cardProductDesciprion: {
      textAlign: "center",
      color: grayColor[0]
    },
  
    stats: {
      color: grayColor[0],
      fontSize: "12px",
      lineHeight: "0px",
      fontWeight:"bold",
      paddingTop: "0px",
      paddingBotton: "15px",
    },
    productStats: {
      paddingTop: "7px",
      paddingBottom: "7px",
      margin: "0"
    },
    successText: {
      color: successColor[0]
    },
    upArrowCardCategory: {
      width: 14,
      height: 14
    },
    underChartIcons: {
      width: "17px",
      height: "17px"
    },
    price: {
      color: "inherit",
      "& h4": {
        // marginBottom: "0px",
        // marginTop: "0px"
      }
    },
  complaints:{
                stroke:"#010A26"
  },
  // Assets CSS
  
  titlepara:{
    fontWeight: "bold",
    fontSize: "9px",
  },
  paravalue:{
    fontWeight: "bold",
    fontSize: "16px",
    color: "#6AD199"
  },
  paranotin:{
    fontWeight: "bold",
    fontSize: "16px",
    color: "#1F497D"
  },
  paraexpired:{
    fontWeight: "bold",
    fontSize: "16px",
    color: "#C0504D"
  },
  paravalueper:{
    fontWeight: "bold",
    fontSize: "11px",
    color: "#6AD199"
  },
  paranotinper:{
    fontWeight: "bold",
    fontSize: "11px",
    color: "#1F497D"
  },
  paraexpiredper:{
    fontWeight: "bold",
    fontSize: "11px",
    color: "#C0504D"
  },
  progresstitle:{
    fontWeight: "bold",
    textAlign: "center",
  },
  progressvalue:{
    textAlign: "center",
  },
  progressperc:{
    fontWeight: "bold",
    float: "right"
  },
  cardbg:{
    marginTop:"1px",
      marginBottom:"8px",
      background: "#E3E3E3"
  },
  circlemargin:{
    marginTop:"35px",
  },
  // PPM Css
  borderppm:{
    border: "2px solid #aeb72c",
  },
  borderppmbg:{
    border: "2px solid #aeb72c",
    background: "#aeb72c",
    color: "antiquewhite",
      fontSize: "bold",
      fontWeight: "500"
  },
  borderppm2:{
    border: "2px solid #F0853B",
  },
  borderppmbg2:{
    border: "2px solid #F0853B",
    background: "#F0853B",
    color: "antiquewhite",
      fontSize: "bold",
      fontWeight: "500"
  },
  borderppm3:{
    border: "2px solid #1BACC1",
  },
  borderppmbg3:{
    border: "2px solid #1BACC1",
    background: "#1BACC1",
    color: "antiquewhite",
      fontSize: "bold",
      fontWeight: "500"
  },
  borderppm4:{
    border: "2px solid #555555",
  },
  borderppmbg4:{
    border: "2px solid #555555",
    background: "#555555",
    color: "antiquewhite",
      fontSize: "bold",
      fontWeight: "500"
  },
  borderppm5:{
    border: "2px solid #F4443E",
  },
  borderppmbg5:{
    border: "2px solid #F4443E",
    background: "#F4443E",
    color: "antiquewhite",
      fontSize: "bold",
      fontWeight: "500"
  },
  ppmpadding:{
    paddingBottom: "15px !important"
  } ,
  appBar: {
    position: 'relative',
    background:'#3f95fc'
  },
  title: {
    marginLeft: '8px',
    color:'#fff',
    fontSize:'15px',
    flex: 1,
  },
  
  };
  
  export default dashboardStyle;
  
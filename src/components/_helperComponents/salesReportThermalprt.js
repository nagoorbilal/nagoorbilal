import React,{useEffect, useRef, forwardRef,useImperativeHandle,useState} from 'react';
import Buttons from '../CustomButtons/Button'
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle";
import Tooltip from "@material-ui/core/Tooltip";

import ReactToPrint from 'react-to-print';
// import PrintScreen from './PrintScreen.jsx'
import '../../HomePage/print.css'
import ComputerIcon from '@material-ui/icons/Computer';
import {format} from 'date-fns';
// import GridContainer from "../../components/Grid/GridContainer.jsx";
// import GridItem from "../../components/Grid/GridItem.jsx";

class PrintScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state={
      name:localStorage.getItem('username'),
      printDs: '',
    };
  
    this.today = new Date();
    this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    this.time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
    this.dateTime = this.date+' '+this.time; 
  }
  render() {

  
    return (

      <div id="invoice-POS">

        <center id="top">
          <div className="info" style={{textAlign: 'center'}}> 
            <span className="font9bold" style={{fontSize: '15px'}}>ARM BROTHERS</span>
          </div>
        </center>

    <div id="mid">
      <div className="info" style={{textAlign: 'center'}}>
            <span className= 'font9bold'> Fish Merchant & All Fish Commission Agent </span><br></br>
            <span className= 'font9bold'>29, Kangayam Road, Tirupur - 4 </span><br></br>
            {/* <span className= 'font9bold'>Thennampalayam, Tirupur-641 604</span><br></br> */}
            <span className= 'font9bold' style={{paddingTop: '2%'}}>8220468448, 8300022602, 9940806009, 8344772175</span>
            {/* <span className= 'font9bold' style={{paddingTop: '2%'}}>E-mail: mcsons.tirupur@gmail.com</span>                  */}

      </div>
    </div>

    <center id="top">
          <div className="info" style={{textAlign: 'center'}}> 
            <span className="font9bold" style={{fontSize: '14px'}}>Sales Report</span>
          </div>
    </center>


    <div style={{padding: '0% 6%'}}>
            <div style={{width: "50%",float:"left",textAlign:'left',padding: '1em 0em' }}>
              
              <span className="font9bold">குறியீடு&nbsp;&nbsp;&nbsp;: {this.props.CustomerCode}</span><br></br>
            </div>

            <div style={{width: "50%",float:"left",textAlign:'left',padding: '1em 0em' }}>
              
              <span className="font9bold">பெயர் : </span>
              <span className="font9bold">{this.props.CustomerName}</span><br></br>
            </div>
      </div>


    <div>
     <table >
      <thead>
        
          <tr className="trcss">
             
             <th className="theadtrth trth ttablewid">பெயர்</th>
             <th className="theadtrth trth ttablewid">அளவு</th>
            <th className="theadtrth trth ttablewid">தொகை</th>
             <th className="theadtrth trth ttablewid">மொ.தொகை</th>
             <th className="theadtrth trth ttablewid">தேதி</th>
           </tr>
         </thead>
         {
           this.props.data
         }
        
       </table>

       <div className="totAmtSales" style={{width:'90%'}}>
       <GridContainer>
       <GridItem xs={6} sm={6} md={6} lg={6} className="removePadd">
       <span className= "font9bold ">விற்பனை தொகை</span><br></br>
       </GridItem>
       <GridItem xs={4} sm={4} md={4} lg={4} >
       <span className= "font9bold"><span style={{float:'left'}}>:</span> {this.props.TotAmt}</span><br></br>
       </GridItem>
       </GridContainer>

       <GridContainer>
       <GridItem xs={6} sm={6} md={6} lg={6} className="removePadd">
       <span className= "font9bold">பாக்கி தொகை</span><br></br>
       </GridItem>
       <GridItem xs={4} sm={4} md={4} lg={4} >
       <span className= "font9bold"><span style={{float:'left'}}>:</span>  {this.props.OpenAmt}</span><br></br>
       </GridItem>
       </GridContainer>

       <GridContainer>
       <GridItem xs={6} sm={6} md={6} lg={6} className="removePadd">
       <span className= "font9bold">வரவு தொகை</span><br></br>
       </GridItem>
       <GridItem xs={4} sm={4} md={4} lg={4} >
       <span className= "font9bold"><span style={{float:'left'}}>:</span> {this.props.TotCollectAmt}</span><br></br>
       </GridItem>
       </GridContainer>
       
       {/* <GridContainer>
       <GridItem xs={6} sm={6} md={6} lg={6} className="removePadd">
       <span className= "font9bold">மொத்த தொகை </span><br></br>
       </GridItem>
       <GridItem xs={4} sm={4} md={4} lg={4} >
       <span className= "font9bold"><span style={{float:'left'}}>:</span>  {parseFloat(parseFloat(this.props.TotAmt) + parseFloat(this.props.OpenAmt)).toFixed(2)}</span><br></br>
       </GridItem>
       </GridContainer> */}

     { /* // <hr style={{border: "1px dashed black",marginTop: '0px', marginBottom: '0px'}} /> */}
       {/* <span className= "font9bold">மொத்த தொகை  : {this.props.TotAmt + this.props.OpenAmt}.00</span> */}
       
       </div>
       
       
       
     </div> 


    </div>

      
    );
  }
}

const Export_Print = forwardRef((props, ref) => {
    const { classes } = props; 
    const componentRef = useRef(); 
    const refPrint = useRef();
    const [IsPrint, setIsPrint] = useState('')
    const [PrintDs, setPrintDs] = useState('')

    useImperativeHandle(ref, () => {
      return {
       PrintValue: PrintValue
      }
   });

   const Funcday = (data) => {

   let reverse = data.split("-").reverse().join("-");

    let newdate = new Date(reverse).toString();


    data = newdate.split(' ').splice(0, 1).join(' ');
    if(data == 'Sun'){
      return "ஞாயிறு"
    }
    if(data == 'Mon'){
      return "திங்கள்"
    }
    if(data == 'Tue'){
      return "செவ்வாய்"
    }
    if(data == 'Wed'){
      return "புதன்"
    }
    if(data == 'Thu'){
      return "வியாழன்"
    }
    if(data == 'Fri'){
      return "வெள்ளி"
    }
    if(data == 'Sat'){
      return "சனி"
    }

   }

   
   const PrintValue = (data) => {

    
     if(IsPrint){
      const stateValues = Object.values(data);
      const tableBody =  stateValues.map((state, index) => {

       
        const itemValues = Object.values(state.items);
        const itemRows = itemValues.map((item, i) => {
        
          const dates =
            i === 0 ? (
              <td className="theadtrth trth ttablewid" rowSpan={itemValues.length + 1}>
              <div >{state.date}</div>  
              <div style={{marginTop:"7px"}}>{Funcday(state.date)}</div>
              <div style={{marginTop:"10px"}}>{state.total_amount}</div>
              </td>
            ) : null;
          
          return (
            <tr key={i}>
             
              <td className="theadtrth trth ttablewid">{item.item_name}</td>
              <td className="theadtrth trth ttablewid">{item.qty+" "+item.uom}</td>
              <td className="theadtrth trth ttablewid">{item.rate}</td>
              <td className="theadtrth trth ttablewid">{item.amount}</td>

              {dates}
            </tr>
          );
        });
        return (
          <tbody key={index} className={state.name}>
            {itemRows}
          </tbody>
        );
      });
    
       setPrintDs(tableBody)
     //  this.setState({ printDs: tableBody})
    
      
      refPrint.current.click();
     }
    
  };


    return (
        <div>
            <GridContainer>
                            <GridItem sm={12} xs={12}>  

                            <div style={{ display:"none" }}>     

                              <PrintScreen 
                                ref={componentRef} 
                                data={PrintDs} 
                                index={props.Items}
                                columnTitle={props.columnIndex}
                                Title={props.title}
                                OpenAmt={props.OpenAmt}
                                TotAmt={props.TotAmt}
                                CustomerCode={props.CustomerCode}
                                CustomerName={props.CustomerName}
                                TotCollectAmt={props.TotCollectAmt}
                              />     
                                            
                          </div>                          
                              <div>
                            <div>

                            <Buttons  
                                color ="info"
                                className={classes.exportBtn}
                                simple
                                disabled={props.Printdisabled}
                                onClick={()=> { props.triggerApi();setIsPrint(true)} }
                                style={{display: props.Printdisabled ? 'none' : 'unset'}}
                                       >
                                   <Tooltip
                                       id="tooltip-top"
                                       title="Thermal Print"
                                       placement="top"
                                       classes={{ tooltip: classes.tooltip }}>  
                                    <ComputerIcon />
                                    </Tooltip>
                                        <i
                                          className={
                                            classes.socialButtonsIcons +
                                            " " +
                                            classes.marginRight +
                                            ""
                                          }
                                        />{" "}
                                        
                                      </Buttons>
                   
                                  <ReactToPrint
                                    trigger={() => 
                                      <Buttons style={{display:'none'}}
                                      ref={refPrint} 
                                     > Print
                                     </Buttons>                                      
                                  }
                                    content={() => componentRef.current}
                                  />

                          
                                  </div> 
                            

                              </div>            
                            </GridItem>
                          </GridContainer>
            
        </div>
    )
});

// export default Export_Print
export default withStyles(sweetAlertStyle)(Export_Print);

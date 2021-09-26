import React,{useEffect, useRef, forwardRef,useImperativeHandle,useState} from 'react';
import Buttons from '../CustomButtons/Button'
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import CachedIcon from '@material-ui/icons/Cached';
import RefreshIcon from '@material-ui/icons/Refresh';
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle";
import Tooltip from "@material-ui/core/Tooltip";

import ReactExport from "react-export-excel";
import PrintIcon from '@material-ui/icons/Print'; 
import ReactToPrint from 'react-to-print';
// import '../../assets/css/salesPrint.css'
import '../../HomePage/print.css'
import PrintBtn from '../Buttons/PrintButton';
import ComputerIcon from '@material-ui/icons/Computer';

class PrintScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state={
      name:localStorage.getItem('username'),
    };
  
    this.today = new Date();
    this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    this.time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
    this.dateTime = this.date+' '+this.time; 
  }
  render() {

      if(this.props.data.length > 0){

        let kgtot = [];
        let boxtot = [];

        this.props.data.map(val => {
          if(parseInt(val.UoM) == 1){
            kgtot.push(parseInt(val.Qty))
          }else{
            boxtot.push(parseInt(val.Qty))
          }
          
        })

        this.TotKg = kgtot.reduce((a, b) => a + b, 0);
        this.Boxtot = boxtot.reduce((a, b) => a + b, 0);
        
      }
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
                      <span className= 'font9bold'>29, Kangayam Road, Tirupur - 4  </span><br></br>
                      {/* <span className= 'font9bold'>Thennampalayam, Tirupur-641 604</span><br></br> */}
                      <span className= 'font9bold' style={{paddingTop: '2%'}}>8220468448, 8300022602, 9940806009, 8344772175 </span><br></br>
                      {/* <span className= 'font9bold' style={{paddingTop: '2%'}}>E-mail: mcsons.tirupur@gmail.com</span>                  */}
		      </div>
  
        </div>

        <center id="top">
          <div className="info" style={{textAlign: 'center'}}> 
            <span className="font9bold" style={{fontSize: '14px'}}>{this.props.Title}</span>
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
 
    <table >
                <thead >
                     <tr className="trcss"> 
                      {
                          (this.props.columnTitle.length == 0) ? null :

                          this.props.columnTitle.map((header)=>{
                            return (
                                <th className="theadtrth trth ttablewid">{header}</th>
                            )})
                      }
                      </tr>
                </thead>
                <tbody>
                    {
                            (this.props.data.length == 0) ? null :

                            this.props.data.map((value,index) => { 
                                return (<tr key={index}>
                                    {
                                        this.props.index.map((val)=>{
                                            return (<td className="theadtrth trth ttablewid">{value[val]}</td>)
                                        })
                                    }
                                         </tr>
                                       )
                              })

                        }  
                </tbody>
            </table>

            {
              this.props.Title == "Summary Report" &&

              <div className="totAmt" style={{marginRight: '11%'}}>
                <p className="alignright font9bold marginbottom0px">மொத்த விற்பனை<span>:</span> <span className="divsplit1">{this.props.TotAmt}</span></p>
                <p className="alignright font9bold marginbottom0px">பாக்கி தொகை<span>:</span> <span className="divsplit1">{this.props.OpenAmt}</span></p>
                <p className="alignright font9bold marginbottom0px">வரவு தொகை<span>:</span> <span className="divsplit1">{this.props.CollectAmt}</span></p>
                 {/* <span className= 'font9bold'>மொத்த விற்பனை : {this.props.TotAmt}</span><br></br>
                 <span className= 'font9bold'>பாக்கி தொகை &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.OpenAmt}</span><br></br>
                 <span className= 'font9bold'>வரவு தொகை &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.CollectAmt}</span><br></br> */}
              </div>
            }

            

  </div>

    );
  }
}


const Export_Print = forwardRef((props, ref) => {
    const { classes } = props; 
    const componentRef = useRef(); 
    const refPrint = useRef();
    const [IsPrint, setIsPrint] = useState('')

    useImperativeHandle(ref, () => {
      return {
       PrintValue: PrintValue
      }
   });

   
   const PrintValue = () => {
    refPrint.current.click();
    
  };

    return (
        <div>
            <GridContainer>
                            <GridItem sm={12} xs={12}>  

                            <div style={{ display:"none" }}>     

                              <PrintScreen 
                                ref={componentRef} 
                                index={props.Items}
                                data={props.data}
                                columnTitle={props.columnIndex}
                                Title={props.title}
                                CustomerCode={props.CustomerCode}
                                CustomerName={props.CustomerName}
                                TotAmt={props.TotAmt}
                                OpenAmt={props.OpenAmt}
                                CollectAmt={props.CollectAmt}
                               />     
                                            
                          </div>                          
                              <div>
                               {/* // {(props.data.length) ?  */}
                            <div>

                            { <Buttons  
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
                                    <ComputerIcon/>
                                    </Tooltip>
                                        <i
                                          className={
                                            classes.socialButtonsIcons +
                                            " " +
                                            classes.marginRight +
                                            ""
                                          }
                                        />{" "}
                                        
                                      </Buttons> }

                                    
                   
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
                                
                              {/* : //  null } */}

                              </div>            
                            </GridItem>
                          </GridContainer>
            
        </div>
    )
});

// export default Export_Print
export default withStyles(sweetAlertStyle)(Export_Print);

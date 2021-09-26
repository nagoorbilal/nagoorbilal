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

    console.log('this.props',this.props)
  }
  render() {

      if(this.props.data.length > 0){
       
        let kgtot = [];
        let boxtot = [];
        let pockettot = [];

        this.props.data.map(val => {
          if(parseInt(val.UoM) == 1){
            kgtot.push(parseFloat(val.Qty))
          }else if(parseInt(val.UoM) == 2){
            boxtot.push(parseFloat(val.Qty))
          }else if(parseInt(val.UoM) == 3){
            pockettot.push(parseFloat(val.Qty))
          }
          
        })

        this.TotKg = parseFloat(kgtot.reduce((a, b) => a + b, 0)).toFixed(2);
        this.Boxtot = parseFloat(boxtot.reduce((a, b) => a + b, 0)).toFixed(2);
        this.Packettot = parseFloat(pockettot.reduce((a, b) => a + b, 0)).toFixed(2);
        
      }
    return (
      <div id="invoice-POS">

      		<center id="top">
		      <div className="info" style={{textAlign: 'center'}}> 
		        <span className="font9bold" style={{fontSize: '15px'}}>ARM BROTHERS</span>
		      </div>
    		</center>

    		<div id="mid">
		      <div className="info" style={{textAlign: 'center',paddingBottom: '3%'}}>
			       <span className= 'font9bold'> Fish Merchant & All Fish Commission Agent </span><br></br>
                      <span className= 'font9bold'>29, Kangayam Road, Tirupur - 4  </span><br></br>
                      {/* <span className= 'font9bold'>Thennampalayam, Tirupur-641 604</span><br></br> */}
                      <span className= 'font9bold' style={{paddingTop: '2%'}}>8220468448, 8300022602, 9940806009, 8344772175 </span><br></br>
                      {/* <span className= 'font9bold' style={{paddingTop: '2%'}}>E-mail: mcsons.tirupur@gmail.com</span> */}
		      </div>

 		{/* <div className="flex">
		        <div className="flex-item" style={{textAlign: 'left'}}>
			        <span> <sm className="font9bold">பில் எண்</sm><br/><span className= "font9">{this.props.billNo}</span><br/>
			            <sm className="font9bold">குறியீடு</sm><br/><span className= "font9">{this.props.customerCode}</span><br/>
			        </span>
		        </div>

		        <div className="flex-item">
		         <span> <sm className="font9bold">பில் தேதி</sm><br/><span className= "font9">{this.props.billDate}</span><br/>
		            <sm className="font9bold">பெயர்</sm><br/><span className= "font9">{this.props.customerName}</span><br/>
		        </span>
		        </div>
      </div> */}


      <center id="top">
          <div className="info" style={{textAlign: 'center',paddingBottom: '1em'}}> 
            <span className= 'font9bold' style={{fontSize: '14px'}}>Sales Registry</span>
          </div>
        </center>

      <div style={{padding: '0% 3%'}}>
            <div style={{width: "40%",float:"left",textAlign:'left',paddingBottom: '1em'}}>
              <span className="font9bold">பில் எண் : {this.props.billNo}</span><br></br>
              <span className="font9bold">குறியீடு&nbsp;&nbsp;&nbsp;: {this.props.customerCode}</span><br></br>
            </div>

            <div style={{width: "60%",float:"left",textAlign:'left'}}>
              <span className="font9bold">தேதி &nbsp;&nbsp;: {this.props.billDate}</span><br></br>
              <span className="font9bold">பெயர் : </span>
              <span className="font9bold">{this.props.customerName}</span><br></br>
            </div>
      </div>

     	 
      
    </div>

    <div>

    <table >
                <thead >
                    <tr >
                        <th className="theadtrth">பெயர்</th>
                        <th className="theadtrth">அளவு</th>
                        <th className="theadtrth">தொகை</th>
                        <th className="theadtrth">மொ.தொகை</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            (this.props.data.length == 0) ? null :

                            this.props.data.map((value,index) => { 
                                return (<tr key={index} >
                                    {
                                        this.props.index.map((val)=>{
                                            return (<td className="theadtrth">{value[val]}</td>)
                                        })
                                    }
                                         </tr>
                                       )
                              })

                              

                        }  
                        
                        {
                         
                          this.TotKg ? 
                          <tr className='tdremoveborder'>
                          <th colspan="2" className="marginPad tdremoveborder font9bold" style={{textAlign: 'right'}}>{this.TotKg} Kg</th>
                          </tr>
                          :
                          null
                        }
                        {
                          this.Boxtot ? 
                          <tr className='tdremoveborder'>
                          <th colspan="2" className='marginPad tdremoveborder font9bold' style={{textAlign: 'right'}}>{this.Boxtot} Box</th>
                          </tr>
                          :
                          null
                         
                        }
                        {
                          this.Packettot ? 
                          <tr className='tdremoveborder'>
                          <th colspan="2" className='marginPad tdremoveborder font9bold' style={{textAlign: 'right'}}>{this.Packettot} Packet</th>
                          </tr>
                          :
                          null
                         
                        }
                       
                </tbody>
            </table>

            </div>  
            
            <div style={{marginTop:'2%'}}> 
                        <div style={{textAlign: 'left',marginLeft: '37.3%'}}>
                      
                        {/* <div >
                          <>
                          {
                              this.TotKg ? <span className= "font9">{this.TotKg} Kg</span> : null
                          }
                          </>
                            <br></br>
                          <>
                          {                          
                              this.Boxtot ? <span className= "font9">{this.Boxtot} Box</span> : null
                          }
                          </>
                          
                         
                          </div> */}

                        </div>

                        <div style={{padding: '0% 0% 0% 33%'}}>

                            <div style={{width:'60%',float: 'left',textAlign: 'right'}}>
                              <span className= "font9bold" >விற்பணை தொகை :</span>
                            </div>
                            <div style={{width:'35%',float: 'right'}}>
                              <span className= "font9bold" >{this.props.currentAmt}</span>
                            </div>

                            <div style={{width:'60%',float: 'left',textAlign: 'right'}}>
                              <span className= "font9bold" >பாக்கி தொகை :</span>
                            </div>
                            <div style={{width:'35%',float: 'right'}}>
                              <span className= "font9bold" >{this.props.openingBal}</span>
                            </div>

                            <div style={{width:'60%',float: 'left',textAlign: 'right'}}>
                              <span className= "font9bold" >குறைந்த தொகை :</span>
                            </div>
                            <div style={{width:'35%',float: 'right'}}>
                              <span className= "font9bold" >{this.props.lessAmt ? parseFloat(this.props.lessAmt).toFixed(2) : 0.00}</span>
                            </div>

                  {/* commission */}
                        { this.props.commission ?
                          <>
                            <div style={{width:'60%',float: 'left',textAlign: 'right'}}>
                              <span className= "font9bold" >கமிஷன் :</span>
                            </div>
                            <div style={{width:'35%',float: 'right'}}>
                              <span className= "font9bold" >{this.props.commission ? parseFloat(this.props.commission).toFixed(2) : 0.00}</span>
                            </div>
                          </>
                          : null
                        }

                             <div style={{width:'60%',float: 'left',textAlign: 'right'}}>
                              <span className= "font9bold" >நிகர தொகை :</span>
                            </div>
                            <div style={{width:'35%',float: 'right'}}>
                              <span className= "font9bold" >{this.props.netAmt}</span>
                            </div>

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
                                billNo={props.billNo}
                                billDate={props.billDate}
                                customerCode={props.customerCode}
                                customerName={props.customerName}
                                currentAmt={props.currentAmt}
                                openingBal={props.openingBal}
                                lessAmt={props.lessAmt}
                                netAmt={props.netAmt}
                                commission={props.commission}
                              />     
                                            
                          </div>  


                                <div>

                                  <PrintBtn  
                                    disabled={false}
                                    onClick={()=> { props.triggerApi() } }
                                    /> 
                   
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

                            </GridItem>
                          </GridContainer>
            
        </div>
    )
});

// export default Export_Print
export default withStyles(sweetAlertStyle)(Export_Print);

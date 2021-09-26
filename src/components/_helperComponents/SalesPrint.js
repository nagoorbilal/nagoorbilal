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
import '../../assets/css/salesPrint.css'
// import Logo from '../../assets/img/logoNobck.png'
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
      <div class="book">
              <div class="page">
                  <div class="subpage">
                    <div style={{textAlign: 'center'}}>
                      <img src={''}  style={{width: '20%',marginTop:'5px'}}/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                       <span> Fish Merchant & All Fish Commission Agent </span><br></br>
                      <span>29, Kangayam Road, Tirupur - 4  </span><br></br>
                      {/* <span>Thennampalayam, Tirupur-641 604</span> */}
                    </div>
                    <div style={{marginTop: '10px',textAlign: 'center'}}>
                      <p className="ptagAdd"><span >8220468448, 8300022602, 9940806009, 8344772175 </span></p>
                      
                    </div>

                    <div style={{marginTop: '15px', textAlign: 'center'}} >
                      <span className="Addspan" style={{fontSize:'14px'}}>{"Current Bill Receipt"}</span>
                    </div>

                    <div style={{marginTop: '15px'}}>
                          <div style={{width: "50%",float:"left"}}>
                            <span>பில் எண் : {this.props.billNo}</span><br></br>
                            <span>வாடிக்கையாளர் குறியீடு : {this.props.customerCode}</span><br></br>
                          </div>

                          <div style={{float:"right"}}>
                            <span>பில் தேதி : {this.props.billDate}</span><br></br>
                            <span>வாடிக்கையாளர் பெயர் : {this.props.customerName}</span><br></br>
                          </div>
                    </div>

                    <div>
                    <table id="yearCustomer">
                      <tr className="print_td"> 
                      
                        <th className="print_td">{"பொருளின் பெயர்"}</th>
                        <th className="print_td">{"அளவு"}</th>
                        <th className="print_td">{"தொகை"}</th>
                        <th className="print_td">{"மொத்த தொகை"}</th>
                        
                      </tr>
                        {
                            (this.props.data.length == 0) ? null :

                            this.props.data.map((value,index) => { 
                                return (<tr key={index}>
                                    {
                                        this.props.index.map((val)=>{
                                            return (<td className="print_td">{value[val]}</td>)
                                        })
                                    }
                                         </tr>
                                       )
                              })

                        }                          

          {/* <tr>
            <td className="print_td">data 1</td>
            <td className="print_td">data 2</td>
            <td className="print_td">data 3</td>
            <td className="print_td">data 3</td>
          </tr> */}

                    </table>
                    </div>

                      <div style={{marginTop:'10%'}}> 
                        <div style={{width:'65%',float: 'left'}}>
                      
                        <div style={{textAlign: 'center'}}>
                          <>
                          {
                              this.TotKg ? <span>{this.TotKg} Kg</span> : null
                          }
                          </>
                            <br></br>
                          <>
                          {                          
                              this.Boxtot ? <span>{this.Boxtot} Box</span> : null
                          }
                          </>
                          
                         

                            
                           
                         
                            
                           
                          </div>

                        </div>

                        <div style={{width:'35%',float: 'right'}}>

                          <div style={{width:'70%',float: 'left'}}>
                            <span style={{fontWeight: 'bold'}}>தற்போதைய தொகை</span>
                          </div>
                          <div style={{width:'30%',float: 'right'}}>
                            <span>{this.props.currentAmt}</span>
                          </div>

                          <div style={{width:'70%',float: 'left'}}>
                            <span style={{fontWeight: 'bold'}}>பாக்கி தொகை</span>
                          </div>
                          <div style={{width:'30%',float: 'right'}}>
                            <span>{this.props.openingBal}</span>
                          </div>

                          <div style={{width:'70%',float: 'left'}}>
                            <span style={{fontWeight: 'bold'}}>குறைந்த தொகை</span>
                          </div>
                          <div style={{width:'30%',float: 'right'}}>
                            <span>{this.props.lessAmt}</span>
                          </div>

                          <div style={{width:'70%',float: 'left'}}>
                            <span style={{fontWeight: 'bold'}}>நிகர தொகை</span>
                          </div>
                          <div style={{width:'30%',float: 'right'}}>
                            <span>{this.props.netAmt}</span>
                          </div>

                        </div>
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
                                billNo={props.billNo}
                                billDate={props.billDate}
                                customerCode={props.customerCode}
                                customerName={props.customerName}
                                currentAmt={props.currentAmt}
                                openingBal={props.openingBal}
                                lessAmt={props.lessAmt}
                                netAmt={props.netAmt}
                                // Title={props.title}
                              />     
                                            
                          </div>                          
                              <div>
                               {/* // {(props.data.length) ?  */}
                            <div>

                            {/* <Buttons  
                                color ="info"
                                className={classes.exportBtn}
                                simple
                                disabled={props.Printdisabled}
                                onClick={()=> { props.triggerApi();setIsPrint(true)} }
                                style={{display: props.Printdisabled ? 'none' : 'unset'}}
                                       >
                                   <Tooltip
                                       id="tooltip-top"
                                       title="Print"
                                       placement="top"
                                       classes={{ tooltip: classes.tooltip }}>  
                                    <PrintIcon/>
                                    </Tooltip>
                                        <i
                                          className={
                                            classes.socialButtonsIcons +
                                            " " +
                                            classes.marginRight +
                                            ""
                                          }
                                        />{" "}
                                        
                                      </Buttons> */}

                                      <PrintBtn  
                                        disabled={false}
                                        onClick={()=> { props.triggerApi();setIsPrint(true)} }
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
                                
                              {/* : //  null } */}

                              </div>            
                            </GridItem>
                          </GridContainer>
            
        </div>
    )
});

// export default Export_Print
export default withStyles(sweetAlertStyle)(Export_Print);

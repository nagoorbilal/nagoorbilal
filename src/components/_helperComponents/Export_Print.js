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
// import PrintScreen from './PrintScreen.jsx'
import '../../assets/css/salesPrint.css'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


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

    if(this.props.Title == "Summary Report"){
      let total = [];
      if(this.props.data.length > 0){
        this.props.data.map(val => {
          total.push(parseFloat(val.total_amount ? val.total_amount : 0))
        })
        this.summValue = total.reduce((a, b) => a + b, 0);
      }
    }

     
    return (
      <div class="book">
              <div class="page">
                  <div class="subpage">
                    <div style={{textAlign: 'center'}}>
                      {/* <img src={Logo}  style={{width: '20%',marginTop:'5px'}}/> */}
                      <span className="font9bold" style={{fontSize: '15px',paddingTop:'20px'}}>ARM BROTHERS</span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                       <span className="fontprintB"> Fish Merchant & All Fish Commission Agent </span><br></br>
                      <span className="fontprintB">29, Kangayam Road, Tirupur - 4  </span><br></br>
                      {/* <span className="fontprintB">Thennampalayam, Tirupur-641 604</span> */}
                    </div>
                    <div style={{marginTop: '6px',textAlign: 'center'}}>
                      <p className="ptagAdd fontprintB"><span >8220468448, 8300022602, 9940806009, 8344772175 </span></p>
                      {/*<span className= 'font9bold' >E-mail: mcsons.tirupur@gmail.com</span>*/}  
                    </div>

                    <div style={{marginTop: '15px', textAlign: 'center'}} >
                      <span className="Addspan fontprintB" style={{fontSize:'14px'}}>{this.props.Title}</span>
                    </div>

                    <div style={{marginTop: '15px'}}>

                    <table id="yearCustomer">
                      <tr className="print_td printheaderbg" > 
                      
                      {
                          (this.props.columnTitle.length == 0) ? null :

                          this.props.columnTitle.map((header)=>{
                            return (
                                <th className="print_td fontprintB" >{header}</th>
                            )})
                      }
                        
                      </tr>
                        {
                            (this.props.data.length == 0) ? null :

                            this.props.data.map((value,index) => { 
                                return (<tr key={index}>
                                    {
                                        this.props.index.map((val)=>{
                                            return (<td className="print_td fontprintB">{value[val]}</td>)
                                        })
                                    }
                                         </tr>
                                       )
                              })

                        }     

                        {
                          this.props.Title == "Summary Report" &&
                              <tfoot>
                                <tr>
                                     <td></td>
                                      <td></td>
                                      <td className="fontprintB" style={{textAlign: 'left'}}>மொத்தம்: {this.summValue}</td>
                                  </tr>
                              </tfoot>
                        }                     

                    </table>
                         
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
    const refExcel = useRef();
    const [IsPrint, setIsPrint] = useState('')

    useImperativeHandle(ref, () => {
      return {
       PrintValue: PrintValue
      }
   });

   
   const PrintValue = () => {

     if(IsPrint){
      refPrint.current.click();
     }else{
      refExcel.current.click();
     }
    
  };

    return (
        <div>
            <GridContainer>
                            <GridItem sm={12} xs={12}>  

                            <div style={{ display:"none" }}>     

                              <PrintScreen 
                                ref={componentRef} 
                                data={props.data} 
                                index={props.Items}
                                columnTitle={props.columnIndex}
                                Title={props.title}
                              />     
                                            
                          </div>                          
                              <div>
                               {/* // {(props.data.length) ?  */}
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

                            <Buttons
                                color ="info"
                                className={classes.exportBtn}
                                simple
                                disabled={props.Exceldisabled}
                                onClick={()=> { props.triggerApi();setIsPrint(false)}} 
                                style={{display: props.Exceldisabled ? 'none' : 'unset'}}
                                >
                                <Tooltip
                                       id="tooltip-top"
                                       title="Excel Export"
                                       placement="top"
                                       classes={{ tooltip: classes.tooltip }}>  
                                <PresentToAllIcon/>
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


                          <ExcelFile 
                               filename={props.title} 
                               element={
                                
                                <Buttons style={{display:'none'}}
                                ref={refExcel} 
                               > Excel Export
                               </Buttons>
                                 }>
                                   <ExcelSheet dataSet={props.exportData} name={props.title}/>
                               </ExcelFile>  


                               <Buttons  
                                color ="info"
                                className={classes.exportBtn}
                                simple
                                onClick={props.Refresh}
                                >
                                <Tooltip
                                    id="tooltip-top"
                                    title="Refresh"
                                    placement="top"
                                    classes={{ tooltip: classes.tooltip }}>  
                                  <RefreshIcon/>
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

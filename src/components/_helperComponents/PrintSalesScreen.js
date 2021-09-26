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
import '../../assets/css/customiseSalesPrint.css'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


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
                      {/* <span className="fontprintB" >Thennampalayam, Tirupur-641 604</span> */}
                    </div>
                    <div style={{marginTop: '6px',textAlign: 'center'}}>
                      <p className="ptagAdd fontprintB"><span >8220468448, 8300022602, 9940806009, 8344772175 </span></p>
                      {/*<span className= 'font9bold' >E-mail: mcsons.tirupur@gmail.com</span>*/}                    

                    </div>

                    <div style={{marginTop: '15px', textAlign: 'center'}} >
                      <span className="Addspan fontprintB" style={{fontSize:'14px'}}>{this.props.Title}</span>
                    </div>


                    <div>
      <table style={{marginBottom: '48px'}}>
        <thead className="fontbold">
          <tr>
            {/* <th colSpan="4">Metro Areas by State</th>

            // {tbodies} */}
          </tr>
          <tr>
            <th className="fontbold">பில் எண்</th>
            <th className="fontbold">தேதி</th>
            <th className="fontbold">பெயர்</th>
            <th className="fontbold">பொருளின் பெயர்</th>
            <th className="fontbold">அளவு</th>
            <th className="fontbold">தொகை</th>
            <th className="fontbold">மொ.தொகை</th>
            <th className="fontbold">குறைந்த தொகை</th>
            <th className="fontbold">விற்பனை தொகை</th>
          </tr>
        </thead>
        {
          this.props.data
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
    const [PrintDs, setPrintDs] = useState('')

    useImperativeHandle(ref, () => {
      return {
       PrintValue: PrintValue
      }
   });

   
   const PrintValue = (data) => {

    console.log(data)

     if(IsPrint){
      const stateValues = Object.values(data);
      const tableBody =  stateValues.map((state, index) => {

        console.log("index",state.bill_no);
        const itemValues = Object.values(state.items);
        const itemRows = itemValues.map((item, i) => {
          const billno =
            i === 0 ? <td className="font12" rowSpan={itemValues.length + 1}>{state.bill_no}</td> : null;
          const dates =
            i === 0 ? (
              <td className="font12" rowSpan={itemValues.length + 1}>{state.date}</td>
            ) : null;
            const customer =
            i === 0 ? (
              <td className="font12" rowSpan={itemValues.length + 1}>{state.customer_name}</td>
            ) : null;
            const openingBalance =
            i === 0 ? (
              <td className="font12" rowSpan={itemValues.length + 1}>{state.old_opening_balance}</td>
            ) : null;
            const lessAmount =
            i === 0 ? (
              <td className="font12" rowSpan={itemValues.length + 1}>{state.less_amount}</td>
            ) : null;
            const currentAmount =
            i === 0 ? (
              <td className="font12" rowSpan={itemValues.length + 1}>{state.total_amount}</td>
            ) : null;
          return (
            <tr key={i}>
              {billno}
              {dates}
              {customer}
              
              <td className="font12">{item.item_name}</td>
              <td className="font12">{item.qty+" "+item.uom}</td>
              <td className="font12"> {item.rate}</td>
              <td className="font12">{item.amount}</td>
              {lessAmount}
              {currentAmount}
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

                            {/* <Buttons
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
                                
                              </Buttons> */}


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

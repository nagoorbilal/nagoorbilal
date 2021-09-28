import React,{useEffect, forwardRef, useRef, useImperativeHandle,useState} from "react";
import PropTypes from "prop-types";    
import { Table, Popconfirm} from 'antd';   

// url config file
import {config} from '../../config.js'; 

import moment from "moment";
import $ from 'jquery';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from "@material-ui/core/Tooltip"; 
import { Typography } from '@material-ui/core';

// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DoneIcon from '@material-ui/icons/Done'; 
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Clear";
import { FilterOutlined } from '@ant-design/icons';

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle";
import Mat_DatePicker from "../../components/_helperComponents/Mat_DatePicker";
// import SmartInput from "../../components/_helperComponents/Textbox.js";
import CheckboxTable from "../../components/_helperComponents/Checkboxtable.js";
import AddBtn from '../../components/Buttons/AddButton'
import CloseBtn from '../../components/Buttons/CloseButton';
import SubmitBtn from '../../components/Buttons/SubmitButton';
import SaveBtn from '../../components/Buttons/SaveButton';

import UpdateBtn from '../../components/Buttons/UpdateButton';
// import Select from '../../DropDown/SpecialDropDown';
import Select from "../../components/_helperComponents/dropdown.js";


// common core component  
import Button from '../../components/_helperComponents/Button'
import Checkbox from '../../components/_helperComponents/Checkbox'
import Textbox from '../../components/_helperComponents/Textbox';
import Notification from '../../components/_helperComponents/Notification'; 
import Loading from '../../components/_helperComponents/Loading';
// import DropDown from '../../components/_helperComponents/Select';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PrintSalesScreen from '../../components/_helperComponents/PrintSalesScreen';
import '../../assets/css/salesRep.css'
import ThermalPrinter from '../../components/_helperComponents/salesReportThermalprt';

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
const userID = localStorage.getItem('userid');
const useStyles = makeStyles(theme => ({ ...sweetAlertStyle }));
const EditableContext = React.createContext(); 

function SalesReport(props) {
  const ref = useRef(null);
  const refNew = useRef(null);
  const custCodeRef = React.useRef();

      // Dispatch Initialized
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [Message, setMessage] = useState({ open: false,color: '',message: '' });
    const [SortType, setSortType] = useState("desc");
    const [BillCount, setBillCount] = useState("")
    const [totalRecord, setTotalRecord] = useState('')

    const [Customer, setCustomer] = useState({ Id: '',Code: '', Name: ''})
    const [FromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"))
    const [ToDate, setToDate] = useState(moment().format("YYYY-MM-DD"))
    const [SalesRpt,setSalesRpt] = useState("")

    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [FilteredColumn, setFilteredColumn] = useState([]);
    const [CustomerData, setCustomerData] = useState([])
     const [TableBody, setTableBody] = useState("");
     const [TableBodyNew, setTableBodyNew] = useState("");
    const [TotAmt, setTotAmt] = useState("");
    const [OpenAmt,setOpenAmt] = useState("");
    const [TotlessAmt,setTotlessAmt]=useState("")
    const [Openingbalance,setOpeningbalance] = useState('')
    const [TotcollectAmt, setTotcollectAmt] = useState('')
    const [Amount, setAmount] = useState('')
    const [Totqty,setTotqty] = useState('');
    const [Boxval, setBoxval] = useState([]);
    const [Boxqty,setBoxqty] =useState('')
    const [Pocketsqty,setPocketsqty] =useState('')
    const [KGQty,setKGQty] =useState('')

    const [TotCommissionAmt,setTotCommissionAmt]=useState("")
  


    
 
     // Table Header
   let columnIndex = ["Bill No", "Date","Customer", "Open Amt" ,"Item Name","Qty",
  "Rate","Amount","Less Amt","Total Amt"]; 
   // Table Row
   const Items = ["bill_no","date","customer_name","old_opening_balance","item_name",
  "qty","rate","amount","less_amount","total_amount"]; 
   // Excel Export
   const exportData = [
    {
      columns: columnIndex,
      data: ExportData
    }
  ];

  useEffect(()=> {
    getCustomerData();
    custCodeRef.current.focus();
  },[])

  const clear = () => {
    setCustomer({ Id: '',Code: '', Name: ''})
    setFromDate(moment().format("YYYY-MM-DD"))
    setToDate(moment().format("YYYY-MM-DD"))
  }


   // function for pass the search parameter to the function of table data fetch
   const searchText = (confirm, vals,column) => {

    let newData = SalesRpt.filter((val)=> val.customer_name == vals); 
    if(newData.length > 0) {
      setSalesRpt(newData)
      confirm();
      return false;
    }else{
        SalesReportApi();
    }

    confirm();
   }




const custNameChange = (val) =>{

    if(val != null){
        setCustomer({Id: val.customer_idpk,Code: val.customer_code, Name: val.customer_name})
        setOpeningbalance(val.opening_balance)
    } else{
        setCustomer({Id: '',Code: '', Name: ''})
        setOpeningbalance('')
    }
  }


    const submitConfirmation = () => {

        if(!Customer.Id){
            setMessage({  open: true, color: "error", message: "Please Select the Customer" });
            return false;
        }

        if(!FromDate){
            setMessage({  open: true, color: "error", message: "Please Select the FromDate" });
            return false;
        }

        if(!ToDate){
            setMessage({  open: true, color: "error", message: "Please Select the ToDate" });
            return false;
        }

        SalesReportApi()

    }

    const SalesReportApi = () => {
      if(!Customer.Id){
        return false;
      }
        setLoading(true)
        let url = config.Api+"salesreport"
        let data = {
            "customer_id": Customer.Id,
            "from_date":FromDate,
            "to_date":ToDate
        }
        

        fetch(url, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {  
            setLoading(false)

            if(res.Output.status.message == "Failed"){
              setSalesRpt("")
              //logPrints("");
              clearval()
              setTableBody("")
              setTableBodyNew("")
              
              setMessage({  open: true, color: "error", message: "Data Not Found" });
            }else{

              var arr = res.Output.data.sales_report[0];
              var arr2 = res.Output.data.sales_report[1].collections_details;

              console.log('arr',arr.length,'arr2',arr2.length)
              
              setSalesRpt(res.Output.data.sales_report[0]);
              logPrints(res.Output.data.sales_report[0]);
              
             
            }

           
          
        
        })
        
    }
    const clearval = () =>{

      setKGQty("");
      setBoxqty("");
      setOpenAmt("");
      setTotAmt("");
      setTotlessAmt("");
      setTotCommissionAmt("");
      setTotcollectAmt("");
      setTableBody("");
    }

  const getAllDataPrint = () => {
  
    setLoading(true); 
   
    let url = config.Api+"salesreport"
        let data = {
            "customer_id": Customer.Id,
            "from_date":FromDate,
            "to_date":ToDate
        }
        

        fetch(url, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {  
      setLoading(false); 
        if(res.Output.data){ 
            // let result = res.Output.data; 
            // if(result.length > 0){
              setPrintData(Object.values(res.Output.data.sales_report[0]))
              
              ref.current.PrintValue(res.Output.data.sales_report[0])
              return false;
              
             
            // }
        }
    }); 
  }

  const getAllDataPrintNew = async() => {
  
    setLoading(true); 
   
    let url = config.Api+"salesreport"
        let data = {
            "customer_id": Customer.Id,
            "from_date":FromDate,
            "to_date":ToDate
        }
        

      await  fetch(url, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {  
      setLoading(false); 
        if(res.Output.data){ 

          var collection = res.Output.data.sales_report[1].collections_details;
          let arrcollect = [];
          if(collection.length > 0){
            collection.map(v => {
              arrcollect.push(parseFloat(v.collection_amount));
            })
            setTotcollectAmt(arrcollect.reduce((a, b) => a + b, 0))
            console.log('collection_amount',arrcollect.reduce((a, b) => a + b, 0))
          }
        
              setPrintData(Object.values(res.Output.data.sales_report[0]))
              refNew.current.PrintValue(res.Output.data.sales_report[0])

            
              return false;
              
        }
    }); 
  }


   // Fetch Data for getCustomerData
   const getCustomerData = () => {

    setLoading(true); 

    let url = config.Api+"customerselect"
    let data ={
      "customer_idpk":"",
      "customer_code":"",
      "customer_name":"",
      "mobile_no":"",
      "place":"",
      "opening_balance":"",
      "pageindex_int": 0,     
      "pagesize_int": 500
  }
  
    
    fetch(url, {
        method: "POST",
        headers: { 
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {  
      setLoading(false); 
        if(res.Output.status.code == 200){ 
          if(res.Output.status.message == "No Record"){
            setCustomerData([])
            return false;
          }else{
            let result = res.Output.data; 
           
            if(result.length > 0){
                setCustomerData(result)
                
            }
          }
        }
    }); 
   
  } 



  function logPrints(data){


    if(!data){
      setTableBody(null)
      setTableBodyNew(null)
    }


 const stateValues = Object.values(data);
    console.log("stateValues",stateValues)
  
  let arrtot = [];
  // let arropen = [];
  let arrless =  [];
  // let arrcollect = [];
  let boxqty =  [];
  let kgqty =  [];
  let pocketqty = [];
  let arramount = [];
  let arrcomm = [];

  const tableBody =  stateValues.map((state, index) => {
    
   
    arrtot.push(parseFloat(state.total_amount));
    // arropen.push(parseFloat(state.opening_balance));
    arrless.push(parseFloat(state.less_amount));
    // arrcomm.push(parseFloat(state.commission));
    // arrcollect.push(parseFloat(state.collection_amount));
    
    const itemValues = Object.values(state.items);
    const itemRows = itemValues.map((item, i) => {

      arramount.push(parseFloat(item.amount));

      if(item.uom == 'KG'){
        kgqty.push(parseFloat(item.qty));
      }else if(item.uom == 'BOX'){
        boxqty.push(parseFloat(item.qty));
      }
      else if(item.uom == 'Packet'){
        pocketqty.push(parseFloat(item.qty));
      }

      const billno =
        i === 0 ? <td rowSpan={itemValues.length + 1}>{state.bill_no}</td> : null;
      const dates =
        i === 0 ? (
        
          <td rowSpan={itemValues.length + 1}>{state.date}</td>
          
        ) : null;
        const customer =
        i === 0 ? (
          <td rowSpan={itemValues.length + 1}>{state.customer_name}</td>
        ) : null;
        const openingBalance =
        i === 0 ? (
          <td rowSpan={itemValues.length + 1}>{state.old_opening_balance}</td>
        ) : null;
        const lessAmount =
        i === 0 ? (
          <td rowSpan={itemValues.length + 1}>{state.less_amount}</td>
        ) : null;
       
        const currentAmount =
        i === 0 ? (
          <td rowSpan={itemValues.length + 1}>{state.total_amount}</td>
        ) : null;
        // const commissionAmt = 
        // i === 0 ? (
        //   <td rowSpan={itemValues.length + 1}>{state.commission}</td>
        // ) : null;
        // const collectionDate =
        // i === 0 ? (
        //   <td rowSpan={itemValues.length + 1}>{state.collection_date}</td>
        // ) : null;
        // const collectionAmount =
        // i === 0 ? (
        //   <td rowSpan={itemValues.length + 1}>{state.collection_amount}</td>
        // ) : null;

       

      return (
        <tr key={i}>
          {billno}
          {dates}
          {customer}
          {openingBalance}
          <td>{item.item_name}</td>
          <td>{item.qty}</td>
          <td>{item.uom}</td>
          <td>{item.rate}</td>
          <td>{item.amount}</td>
          {lessAmount}
          {currentAmount}
          {/* {collectionDate}
          {collectionAmount} */}
        </tr>
      );
    });
    return (
      <tbody key={index} className={state.name}>
        {itemRows}
      </tbody>
    );
   
  });

     
  
    // var uniqueTot = [];
    // $.each(arrtot, function(i, el){
    //     if($.inArray(el, uniqueTot) === -1) uniqueTot.push(el);
    // });

    // var uniqueOPn = [];
    // $.each(arropen, function(i, el){
    //     if($.inArray(el, uniqueOPn) === -1) uniqueOPn.push(el);
    // });
   
  setKGQty(kgqty.reduce((a, b) => a + b, 0))
  setBoxqty(boxqty.reduce((a, b) => a + b, 0))
  setPocketsqty(pocketqty.reduce((a, b) => a + b, 0))
  // setOpenAmt(uniqueOPn.reduce((a, b) => a + b, 0));
  setTotAmt(arrtot.reduce((a, b) => a + b, 0))
  setTotlessAmt(arrless.reduce((a, b) => a + b, 0))
  setTotCommissionAmt(arrcomm.reduce((a, b) => a + b, 0))
  // setTotcollectAmt(arrcollect.reduce((a, b) => a + b, 0))
  setAmount(arramount.reduce((a, b) => a + b, 0));
  setTableBody(tableBody)


  const tableBodyNew =  stateValues.map((state, index) => {

    const itemValues = Object.values(state.items);
    const itemRows = itemValues.map((item, i) => {
      const dates =
        i === 0 ? (
          <td rowSpan={itemValues.length + 1}>{state.date}</td>
        ) : null;
       
      return (
        <tr key={i}>
          {dates}
          <td>{item.item_name}</td>
          <td>{item.qty}</td>
          <td>{item.rate}</td>
          <td>{item.amount}</td>
        </tr>
      );
    });
    return (
      <tbody key={index} className={state.name}>
        {itemRows}
      </tbody>
    );
  });

  setTableBodyNew(tableBodyNew)

  }


  

    

    return (
        <div>
        <Notification open={Message.open} color={Message.color} message={Message.message} 
          onClose={()=>setMessage({open: false,color:Message.color})}/>
        <Card>
           <CardBody>
               <Loading loading={loading} />
               <GridContainer >
        
                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                   <Autocomplete
                            options= {CustomerData}
                            value={null}
                            autoHighlight
                            getOptionLabel= {(option) => option.customer_code}
                            onChange={(e,val)=>{custNameChange(val)}}
                            inputValue={Customer.Code}
                            onInputChange={(e,val)=>{e.target.value.length == 0 && setOpeningbalance('');setCustomer({...Customer, Code: e.target.value})}}
                            id="debug"
                            onBlur={()=>{!Customer.Code && setCustomer({Id: '',Code: '', Name: ''});  }}
                            renderInput={(params) => 
                            <TextField {...params} label="Customer Code" 
                            inputRef={custCodeRef}
                            margin="normal" />}
                        />
                   </GridItem>

                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                  
                   <Autocomplete
                            options= {CustomerData}
                            value={null}
                            autoHighlight
                            getOptionLabel= {(option) => option.customer_name}
                            onChange={(e,val)=>{custNameChange(val)}}
                            inputValue={Customer.Name}
                            onInputChange={(e,val)=>{e.target.value.length==0 && setOpeningbalance('');setCustomer({...Customer, Name: e.target.value})}}
                            id="debug"
                            onBlur={()=>{!Customer.Name  && setCustomer({Id: '',Code: '', Name: ''}) }}
                            renderInput={(params) => 
                            <TextField {...params} label="Customer Name" 
                            margin="normal" />}
                        />
                      
                   </GridItem>

                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                       <Mat_DatePicker
                       value={FromDate} 
                       label={'From Date'}
                       maxDate={ToDate} 
                       onChange={(val)=>{setFromDate(val)}}/>  

                   </GridItem>


                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                       <Mat_DatePicker
                       value={ToDate} 
                       label={'To Date'}
                       minDate={FromDate} 
                       onChange={(val)=>{setToDate(val)}}/>  

                   </GridItem>

                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                       <Textbox
                       value={Openingbalance} 
                       placeholder={'Opening balance'}
                       disabled={true}
                       />  

                   </GridItem>

                   <GridItem sm={2} md={2} xs={2} lg={2} align="right"> 
                     
                   <SubmitBtn  
                        label="Submit"
                       disabled={false}
                       onClick={() => {submitConfirmation()}}
                       />
                   </GridItem>
            
            <GridContainer style={{marginTop:'10px',padding: '0px 15px'}}>
            <div style={{position: "absolute",top: "55px",right: "7%"}}>
              <ThermalPrinter 
               title={'Sales Report'}
               data={TableBody}
               Items={Items}
               columnIndex={columnIndex}
               triggerApi={()=>{getAllDataPrintNew(Filter.val, Filter.column)}}
               Refresh={()=>{clear();getCustomerData();}}
               Printdisabled={false}
              //  OpenAmt={isNaN(OpenAmt) ? "" : parseFloat(OpenAmt).toFixed(2)}
              OpenAmt={isNaN(Openingbalance) ? "" : parseFloat(Openingbalance).toFixed(2)}
              TotAmt={isNaN(TotAmt) ? "" : parseFloat(TotAmt).toFixed(2)}
               TotCollectAmt={isNaN(TotcollectAmt) ? "" : parseFloat(TotcollectAmt).toFixed(2)}
               CustomerCode={Customer.Code}
               CustomerName={Customer.Name}
               ref={refNew}
              />
              </div>
            <div className="add-export-btn" style={{top: "55px"}}>  
                    <PrintSalesScreen 
                      title={'Sales Report'}
                      data={TableBody}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{getCustomerData();setExportData([]);setExportData([]);setTableBody("");setTableBodyNew("");SalesReportApi()}}
                      Printdisabled={false}
                      ref={ref}
                    />
                  </div>
          
               <GridItem sm={12} md={12} xs={12} lg={12} style={{marginTop:'10px'}}>

               <div>
      <table style={{marginBottom: '48px'}}>
        <thead>
          <tr>
            {/* <th colSpan="4">Metro Areas by State</th>

            // {tbodies} */}
          </tr>
          <tr>
            <th>Bill No</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Opening Amount</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>UoM</th>
            <th>Rate per KG/BOX</th>
            <th>Total Amount</th>
            <th>Expense</th>
            <th>Current Amount</th>
            {/* <th>Collection Date</th>
            <th>Collection Amount</th> */}
          </tr>
        </thead>
        {
          TableBody
        }
        
      </table>
    </div>
    <div className='divrelative'>
      
    <Typography className="totalRecords" gutterBottom>
             {"Total"} {TableBody ? TableBody.length : 0} {"Records"}
    </Typography> 

    {KGQty != 0 &&
      <>
      <Typography className="salclskgQtyval" gutterBottom>{parseFloat(KGQty).toFixed(2)}</Typography> 
      <Typography className="salclskgQty" gutterBottom>Kg</Typography> 
      </>
    }
 
    {TableBody.length > 0 &&
    <>
      <Typography className="saltotallessAmt" gutterBottom>{TotlessAmt && parseFloat(TotlessAmt).toFixed(2) == 0 ? 0.00 : parseFloat(TotlessAmt).toFixed(2)}</Typography> 
      {/* <Typography className="sptotalcommAmt" gutterBottom>{TotCommissionAmt && parseFloat(TotCommissionAmt).toFixed(2) == 0 ? 0.00 : parseFloat(TotCommissionAmt).toFixed(2)}</Typography>  */}
      <Typography className="saltotalAmtof" gutterBottom>{Amount && parseFloat(Amount).toFixed(2)}</Typography>
      <Typography className="saltotalCurrAmt" gutterBottom>{TotAmt && parseFloat(TotAmt).toFixed(2)}</Typography>
  </>
    }

    {/* <Typography className="clscolAmt" gutterBottom>{TotcollectAmt && parseFloat(TotcollectAmt).toFixed(2) == 0 ? 0.00 : parseFloat(TotcollectAmt).toFixed(2)}</Typography>  */}

    </div>

    <div className='divrelative'>
    {Boxqty != 0 &&
      <>
      <Typography className="salclsboxQtyval" gutterBottom>{parseFloat(Boxqty).toFixed(2)}</Typography> 
      <Typography className="salclsboxQty" gutterBottom>Box</Typography> 
      </>
    }

    </div> 
    <div className='divrelative paddtop15px'>
    {Pocketsqty != 0 &&
      <>
      <Typography className="salclspocQtyval" gutterBottom>{parseFloat(Pocketsqty).toFixed(2)}</Typography> 
      <Typography className="salclspocQty" gutterBottom>Packet</Typography> 
      </>
    }

    </div>
               
               {/* <Table
                   className="DocWeeklyTable"
                   columns={columns} 
                   dataSource={SalesRpt} 
                   pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}

                 
                   scroll={{y: 300}}
               />   
*/}
                   {/* <Typography className="totalRecords" gutterBottom>
                       {"Total"} {totalRecord} {"Records"}
                   </Typography>  */}
               </GridItem> 
               </GridContainer>
          

       </GridContainer>
           </CardBody>
       </Card>
   </div>
    )
}

export default SalesReport

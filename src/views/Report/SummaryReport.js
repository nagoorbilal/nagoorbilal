import React,{useEffect, forwardRef, useRef, useImperativeHandle,useState} from "react";
import PropTypes from "prop-types";    
import { Table, Popconfirm} from 'antd';   

// url config file
import {config} from '../../config.js'; 

import moment from "moment";

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
import Export_Print from '../../components/_helperComponents/Export_Print.js';
import ThermalPrint from '../../components/_helperComponents/newTherimal.js';

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
const userID = localStorage.getItem('userid');
const useStyles = makeStyles(theme => ({ ...sweetAlertStyle }));
const EditableContext = React.createContext(); 

function WeeklyReport(props) {
  const ref = useRef(null);
  const refNew = useRef(null);
  const custCodeRef = React.useRef();

    // Dispatch Initialized
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [Message, setMessage] = useState({ open: false,color: '',message: '' });
    const [FilteredColumn, setFilteredColumn] = useState([]);
    const [SortType, setSortType] = useState("desc");

    const [Customer, setCustomer] = useState({ Id: '',Code: '', Name: ''})
    const [FromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"))
    const [ToDate, setToDate] = useState(moment().format("YYYY-MM-DD"))
    const [SummaryRpt,setSummaryRpt] = useState([])
    const [TotAmt,setTotAmt] = useState('');
    const [OpenAmt, setOpenAmt] = useState('');
    const [CollectionAmt, setCollectionAmt] = useState('');
    const [GrossAmt, setGrossAmt] = useState('')

    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [CustomerData, setCustomerData] = useState([])

    

     // Table Header
   let columnIndex = ["பில் எண்", "பில் தேதி", "நிகர தொகை","வரவு தேதி","வரவு தொகை"]; 
    // Table Row
    const Items = ["bill_no","bill_date","total_amount","collection_date","collection_amount"]; 
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

        //customize functionality of table column search(text)
  const getColumnSearchProps = (dataIndex,Column, disabled ) => ({
    filterDropdown: ({
      confirm
    }) => (
      <div>
        {
          disabled !== 'disabled' ?
          <div style={{ padding: 8, width: 230 }}>
          <Autocomplete
          options={SummaryRpt}
          getOptionLabel={(option) => option[Column]}
          id="debug"          
          //autoHighlight
          // onBlur={(e)=>searchText(confirm, e.target.value, Column)}
          onChange={(e,value)=>{searchText(confirm, value == null ? '' :value['bill_no'], Column)}}
          renderInput={(params) => <TextField {...params} label={dataIndex} margin="normal" />}
        />
        </div>
        : null
        }
       
       </div>
    ),
    filterIcon: filtered => {
      let isFiltered = FilteredColumn.find(val => val== Column); 
      return(
      <Tooltip title={"Search"} placement="top" disableHoverListener={disabled !== 'disabled' ? false : true}> 
         {        
        (isFiltered) ? (
          <FilterOutlined  className="filteredColumn" />
        ):(
          <FilterOutlined  className="tableSearch" />
        )
      }
      </Tooltip>
    )
  },
    onFilterDropdownVisibleChange: () =>{
     // columnList(Column, primaryTable, primaryColumn, secondaryTable, secondaryColumn)
    }
  });    

   // function for pass the search parameter to the function of table data fetch
   const searchText = (confirm, vals,column) => {

    let newData = SummaryRpt.filter((val)=> val.bill_no == vals); 
    if(newData.length > 0) {
      setSummaryRpt(newData)
      confirm();
      return false;
    }else{
        SummaryRptApi();
    }

    confirm();
   }


//    Column option for table
   const columns = [
    {
        title: () => {return (
          <div>
              {"Bill No"}
              {(SummaryRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = SummaryRpt.sort(CompareValues('bill_no',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setSummaryRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "bill_no",
        className: "left",
       ...getColumnSearchProps('Bill No',"bill_no",""),
      },
      {
        title: () => {return (
          <div>
              {"Date"}
              {(SummaryRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = SummaryRpt.sort(CompareValues('bill_date',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setSummaryRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "bill_date",
        className: "left",
       ...getColumnSearchProps('Date',"bill_date",""),
      },
      {
        title: () => {return (
          <div>
              {"Current Amount"}
              {(SummaryRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = SummaryRpt.sort(CompareValues('total_amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setSummaryRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "total_amount",
        footer: (data) => {
          return <div>Summary: {100}</div>
        },
        className: "left",
       ...getColumnSearchProps('Current Amount',"total_amount",""),
      },
      {
        title: () => {return (
          <div>
              {"Collection Date"}
              {(SummaryRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = SummaryRpt.sort(CompareValues('collection_date',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setSummaryRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "collection_date",
        className: "left",
       ...getColumnSearchProps('Collection Amount',"collection_amount",""),
      },
      {
        title: () => {return (
          <div>
              {"Collection Amount"}
              {(SummaryRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = SummaryRpt.sort(CompareValues('collection_amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setSummaryRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "collection_amount",
        className: "left",
       ...getColumnSearchProps('Collection Amount',"collection_amount",""),
      }
      
     
];


    
// Sort Table Columns
function CompareValues(key, order) {
    return function innerSort(a, b) {  
       setLoading(true); 
       setSummaryRpt([])     
        setSortType(order);
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        } 
        setTimeout(function(){setLoading(false) }, 1000);                    
  
        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];
    
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
    };
  }


const custNameChange = (val) =>{

    if(val != null){
        setCustomer({Id: val.customer_idpk,Code: val.customer_code, Name: val.customer_name})
        setOpenAmt(val.opening_balance)
    } else{
        setCustomer({Id: '',Code: '', Name: ''})
        setOpenAmt('')
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

        SummaryRptApi()
    }

    const SummaryRptApi = () => {
      if(!Customer.Id){
        return false;
    }
        setLoading(true)
        let url = config.Api+"summaryreport"
        let data = {
            "customer_id": Customer.Id,
            "from_date":FromDate,
            "to_date":ToDate
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
            setLoading(false)

            if(res.Output.status.message == "Failed"){
              setSummaryRpt([])
              setMessage({  open: true, color: "error", message: "Data Not Found" });
            }else{
              if(res.Output.data.summary_report.length > 0){ 

                var arr = res.Output.data.summary_report[0].summary_details;
                var arr2 = res.Output.data.summary_report[1].collections_details;
                var newArr1 = [];
                var newArr2 = [];
                if(arr.length >= arr2.length){
                   newArr1 = arr.map((v,j) => ({...v, 
                    collection_date: arr2.length > 0 ? arr2[j].collection_date : '',
                    collection_amount: arr2.length > 0 ? arr2[j].collection_amount : '',
                  
                  }))
                  setSummaryRpt(newArr1);

                  let totAmt = [];
                  let colAmt = [];

                  newArr1.map(val =>{
                    totAmt.push(parseFloat(val.total_amount ? val.total_amount : 0));
                    colAmt.push(parseFloat(val.collection_amount ? val.collection_amount : 0))
                  })

                  setTotAmt(totAmt.reduce((a, b) => a + b, 0))
                  setCollectionAmt(colAmt.reduce((a, b) => a + b, 0))
                  console.log('if',totAmt.reduce((a, b) => a + b, 0),colAmt.reduce((a, b) => a + b, 0))

                }else{
                  
                
                 
                  newArr2 = arr2.map((v,k) => ({...v, 
                    bill_no: arr.length > k ? arr[k].bill_no : '',
                    bill_date: arr.length > k ? arr[k].bill_date : '',
                    total_amount: arr.length > k ? arr[k].total_amount : '',
                    collection_date: v.collection_date,
                    collection_amount: v.collection_amount
                  
                  }))

                 setSummaryRpt(newArr2.filter(f => f.collection_amount != '0.00' || f.total_amount != '0.00' ));

                  let totAmt = [];
                  let colAmt = [];

                  newArr2.map(val =>{
                    totAmt.push(parseFloat(val.total_amount ? val.total_amount : 0));
                    colAmt.push(parseFloat(val.collection_amount ? val.collection_amount : 0))
                  })

                  setTotAmt(totAmt.reduce((a, b) => a + b, 0))
                  setCollectionAmt(colAmt.reduce((a, b) => a + b, 0))
                  console.log('else',newArr2,totAmt.reduce((a, b) => a + b, 0),colAmt.reduce((a, b) => a + b, 0))

                }
                
                return false;

                // let data = [];
                // let totAmt = [];
                // let colAmt = [];
                // let report = res.Output.data.summary_report;
                // report.map(val => {
                //     data.push({
                //         bill_no: val.bill_no.toString(),
                //         bill_date: val.bill_date,
                //         total_amount: val.total_amount,
                //         collection_amount: val.collection_amount
                //     })
                //     totAmt.push(parseFloat(val.total_amount));
                //     colAmt.push(parseFloat(val.collection_amount))
                // })

                // console.log(colAmt.reduce((a, b) => a + b, 0),colAmt)
                
                // setSummaryRpt(data)
                // setTotAmt(totAmt.reduce((a, b) => a + b, 0))
                // setCollectionAmt(colAmt.reduce((a, b) => a + b, 0))

                // console.log(totAmt.reduce((a, b) => a + b, 0),totAmt)
                // console.log(colAmt.reduce((a, b) => a + b, 0),colAmt)
            }else{
                setSummaryRpt([])
                setMessage({  open: true, color: "error", message: "Data Not Found" });
            }
            }

            
            
        })
        
    }


  const getAllDataPrint = async() => {
    setLoading(true); 
   
    let url = config.Api+"summaryreport"
    let data = {
        "customer_id": Customer.Id,
        "from_date":FromDate,
        "to_date":ToDate
    }
    console.log("data",data)

   await fetch(url, {
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
            let result = res.Output.data.summary_report; 
            if(result.length > 0){

              var arr = res.Output.data.summary_report[0].summary_details;
              var arr2 = res.Output.data.summary_report[1].collections_details;
              var newArr1 = [];
              var newArr2 = [];
              if(arr.length >= arr2.length){
                 newArr1 = arr.map((v,j) => ({...v, 
                  collection_date: arr2.length > 0 ? arr2[j].collection_date : '',
                  collection_amount: arr2.length > 0 ? arr2[j].collection_amount : '',
                
                }))
                setPrintData(newArr1);

                let exportItem=[];  

                newArr1.map((value) => {
                  exportItem.push([
                    
                    value.bill_no,
                    value.bill_date,
                    value.total_amount,
                    value.collection_date,
                    value.collection_amount,
                    
                    ]);
              });
                setExportData(exportItem); 
                ref.current.PrintValue()

              }else{
               
                newArr2 = arr2.map((v,k) => ({...v, 
                  bill_no: arr.length > k ? arr[k].bill_no : '',
                  bill_date: arr.length > k ? arr[k].bill_date : '',
                  total_amount: arr.length > k ? arr[k].total_amount : '',
                  collection_date: v.collection_date,
                  collection_amount: v.collection_amount
                
                }))
                const sortarr = newArr2.filter(f => f.collection_amount != '0.00' || f.total_amount != '0.00' )
                setPrintData(sortarr);

                // setPrintData(newArr2);

                let exportItem=[];  

                sortarr.map((value) => {
                  exportItem.push([
                    
                    value.bill_no,
                    value.bill_date,
                    value.total_amount,
                    value.collection_date,
                    value.collection_amount,
                    
                    ]);
              });
                setExportData(exportItem); 
                ref.current.PrintValue()

              }


              
            }
        }
    }); 
  }


const getAllDataPrintNew = () => {
    setLoading(true); 
   
    let url = config.Api+"summaryreport"
    let data = {
        "customer_id": Customer.Id,
        "from_date":FromDate,
        "to_date":ToDate
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
      setLoading(false); 
        if(res.Output.data){ 
            let result = res.Output.data.summary_report; 
            if(result.length > 0){

              var arr = res.Output.data.summary_report[0].summary_details;
              var arr2 = res.Output.data.summary_report[1].collections_details;
              var newArr1 = [];
              var newArr2 = [];
              if(arr.length >= arr2.length){
                 newArr1 = arr.map((v,j) => ({...v, 
                  collection_date: arr2.length > 0 ? arr2[j].collection_date : '',
                  collection_amount: arr2.length > 0 ? arr2[j].collection_amount : '',
                
                }))
                setPrintData(newArr1);
                refNew.current.PrintValue()
                

              }else{
               
                newArr2 = arr2.map((v,k) => ({...v, 
                  bill_no: arr.length > k ? arr[k].bill_no : '',
                  bill_date: arr.length > k ? arr[k].bill_date : '',
                  total_amount: arr.length > k ? arr[k].total_amount : '',
                  collection_date: v.collection_date,
                  collection_amount: v.collection_amount
                
                }))
                setPrintData(newArr2);
                refNew.current.PrintValue()
               

              }

            }
        }else{
          setMessage({  open: true, color: "error", message: "Data Not Found" });
        }
    }); 
    setLoading(false); 
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
                
            }else{
              setCustomerData([])
            }
          }
        }
    }); 
   
  } 
  const filteredObj = (obj) =>
  Object.entries(obj)
    .filter(([_, value]) => !!value || typeof value === "boolean")
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});


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
                            onInputChange={(e,val)=>{setCustomer({...Customer, Code: e.target.value})}}
                            id="debug"
                            onBlur={()=>{!Customer.Code && setCustomer({Id: '',Code: '', Name: ''})  }}
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
                            onInputChange={(e,val)=>{setCustomer({...Customer, Name: e.target.value})}}
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

                   <GridItem sm={4} md={4} xs={4} lg={4} align="right"> 
                     
                   <SubmitBtn  
                        label="Submit"
                       disabled={false}
                       onClick={() => {submitConfirmation()}}
                       />
                   </GridItem>
            <div>
            <GridContainer style={{marginTop:'10px',padding: '0px 15px'}}>

            <div style={{position: "absolute",top: "55px",right: "9%"}}>

            <ThermalPrint 
                      title={'Summary Report'}
                      data={PrintData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrintNew(Filter.val, Filter.column)}}
                      Printdisabled={false}
                      CustomerCode={Customer.Code}
                      CustomerName={Customer.Name}
                      TotAmt={ isNaN(TotAmt) ? "" : parseFloat(TotAmt).toFixed(2)}
                      OpenAmt={isNaN(OpenAmt) ? "" : parseFloat(OpenAmt).toFixed(2)}
                      CollectAmt={isNaN(CollectionAmt) ? "" : parseFloat(CollectionAmt).toFixed(2)}
                      ref={refNew}
                      
            />
            </div>
            

            <div className="add-export-btn" style={{top: "55px"}}>  
            
                    <Export_Print 
                      title={'Summary Report'}
                      data={PrintData}
                      exportData={exportData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{getCustomerData();setSummaryRpt([]);setPrintData([]);setExportData([]);SummaryRptApi();}}
                      Exceldisabled={false}
                      Printdisabled={false}
                      ref={ref}
                    />
                  </div>

               <GridItem sm={12} md={12} xs={12} lg={12} style={{marginTop:'10px'}}>
               <Table
                   className="DocSummaryTable"
                   columns={columns} 
                   dataSource={SummaryRpt}
                   pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}

                   // pagination={{total: '', current:Pagination.current,showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}                                    
                   // onChange={handleTableChange}
                   scroll={{y: 245}}
               />   

                   <Typography className="summaryRecords" gutterBottom>
                       {"Total"} {SummaryRpt.length} {"Records"}
                   </Typography>
               </GridItem> 
               </GridContainer>
               </div>

               <GridContainer style={{marginBottom:'10px',padding: '0px 15px'}}>

                <GridItem sm={3} md={3} xs={3} lg={3}> 
                    <Textbox placeholder={"Total Amount"}
                        type="number"
                        value={parseFloat(TotAmt).toFixed(2)}
                        // onChange={(val)=>{setNumber(val);setNumberExist('');}}
                        color={'secondary'}
                        disabled={true}
                    />   
                </GridItem>

               


                <GridItem sm={3} md={3} xs={3} lg={3}> 
                    <Textbox placeholder={"Collection Amount"}
                        type="number"
                        value={parseFloat(CollectionAmt).toFixed(2)}
                        // onChange={(val)=>{setNumber(val);setNumberExist('');}}
                        color={'secondary'}
                        disabled={true}
                    />   
                </GridItem>

                 <GridItem sm={3} md={3} xs={3} lg={3}> 
                    <Textbox placeholder={"Opening Balance"}
                        type="number"
                        value={OpenAmt}
                        // onChange={(val)=>{setNumber(val);setNumberExist('');}}
                        color={'secondary'}
                        disabled={true}
                    />   
                </GridItem>

               { /*<GridItem sm={3} md={3} xs={3} lg={3}> 
                                           <Textbox placeholder={"Net Amount"}
                                               type="number"
                                               value={ parseFloat(TotAmt) + parseFloat(OpenAmt) - parseFloat(CollectionAmt)+".00" }
                                               // onChange={(val)=>{setNumber(val);setNumberExist('');}}
                                               color={'secondary'}
                                               disabled={true}
                                           />   
                               </GridItem> */}

                
                </GridContainer>    
          

       </GridContainer>
           </CardBody>
       </Card>
   </div>
    )
}

export default WeeklyReport

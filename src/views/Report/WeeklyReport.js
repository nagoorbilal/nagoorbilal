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


// Redux Imports
import { useDispatch, useSelector } from "react-redux";
const userID = localStorage.getItem('userid');
const useStyles = makeStyles(theme => ({ ...sweetAlertStyle }));
const EditableContext = React.createContext(); 

function WeeklyReport(props) {
  const ref = useRef(null);
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
    const [WeeklyRpt,setWeeklyRpt] = useState([])

    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [CustomerData, setCustomerData] = useState([])


       // Table Header
   let columnIndex = ["பெயர்", "பா.தொகை", "மொ.விற்பனை தொகை" ,"மொ.தொகை" ]; 
   // Table Row
   const Items = ["customer_name","opening_balance","weekly_total_amount","gross_amount" ]; 
   // Excel Export
   const exportData = [
    {
      columns: columnIndex,
      data: ExportData
    }
  ];

  useEffect(()=> {
    getCustomerData();
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
          options={WeeklyRpt}
          getOptionLabel={(option) => option[Column]}
          id="debug"          
          //autoHighlight
          // onBlur={(e)=>searchText(confirm, e.target.value, Column)}
          onChange={(e,value)=>{searchText(confirm, value == null ? '' :value['customer_name'], Column)}}
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

    let newData = WeeklyRpt.filter((val)=> val.customer_name == vals); 
    if(newData.length > 0) {
      setWeeklyRpt(newData)
      confirm();
      return false;
    }else{
        weeklyReportApi();
    }

    confirm();
   }


//    Column option for table
   const columns = [
    {
      title: () => {return (
        <div>
            {"Customer Name"}
            {(WeeklyRpt.length > 0) &&
                  <Tooltip title={"Sort"} placement="top"> 
                      <ImportExportIcon className="tableSort"
                        onClick={() => {                                               
                          let data = WeeklyRpt.sort(CompareValues('customer_name',((SortType === "asc") ? "desc" : "asc")));                                        
                          setTimeout(function(){ setWeeklyRpt(data)}, 1000);                         
                        }}
                      />
                  </Tooltip>
            }
        </div>
      )},
      dataIndex: "customer_name",
      className: "left",
     ...getColumnSearchProps('Customer Name',"customer_name",""),
    },
    {
        title: () => {return (
          <div>
              {"Opening Balance"}
              {(WeeklyRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = WeeklyRpt.sort(CompareValues('opening_balance',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setWeeklyRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "opening_balance",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Opening Balance',"opening_balance","disabled"),
      },
    {
        title: () => {return (
          <div>
              {"Weekly Total Sale Amount"}
              {(WeeklyRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = WeeklyRpt.sort(CompareValues('weekly_total_amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setWeeklyRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "weekly_total_amount",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Weekly Total Sale Amount',"weekly_total_amount","disabled"),
      },
    {
        title: () => {return (
          <div>
              {"Gross Amount"}
              {(WeeklyRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = WeeklyRpt.sort(CompareValues('gross_amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setWeeklyRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "gross_amount",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Gross Amount',"gross_amount","disabled"),
      }
];

   
    
// Sort Table Columns
function CompareValues(key, order) {
    return function innerSort(a, b) {  
       setLoading(true); 
       setWeeklyRpt([])     
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
    } else{
        setCustomer({Id: '',Code: '', Name: ''})
    }
  }


    const submitConfirmation = () => {

      

        // if(!Customer.Id){
        //     setMessage({  open: true, color: "error", message: "Please Select the Customer" });
        //     return false;
        // }

        if(!FromDate){
            setMessage({  open: true, color: "error", message: "Please Select the FromDate" });
            return false;
        }

        if(!ToDate){
            setMessage({  open: true, color: "error", message: "Please Select the ToDate" });
            return false;
        }

        weeklyReportApi()

    }

    const weeklyReportApi = () => {
        setLoading(true)
        let url = config.Api+"weeklyreport"
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
              setWeeklyRpt([])
              setMessage({  open: true, color: "error", message: "Data Not Found" });
            }else{
              if(res.Output.data.weekly_report.length){ 
                console.log(res.Output.data.weekly_report)
               setWeeklyRpt(res.Output.data.weekly_report)
            }else{
                setWeeklyRpt([])
                setMessage({  open: true, color: "error", message: "Data Not Found" });
            }
            }
            
            
        })
        
    }



  const getAllDataPrint = () => {
    setLoading(true); 
   
    let url = config.Api+"weeklyreport"
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
            let result = res.Output.data.weekly_report; 
            if(result.length > 0){
              setPrintData(res.Output.data.weekly_report)
              let exportItem=[];  

              res.Output.data.weekly_report.map((value) => {
                exportItem.push([
                  
                  value.customer_name,
                  value.opening_balance,
                  value.weekly_total_amount,
                  value.gross_amount
                  
                  ]);
            });
              setExportData(exportItem); 
              ref.current.PrintValue()
            }
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

    return (
        <div>
        <Notification open={Message.open} color={Message.color} message={Message.message} 
          onClose={()=>setMessage({open: false,color:Message.color})}/>
        <Card>
           <CardBody>
               <Loading loading={loading} />
               <GridContainer >
        
                   <GridItem sm={3} md={3} xs={3} lg={3}> 
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
                            margin="normal" />}
                        /> 
                   </GridItem>

                   <GridItem sm={3} md={3} xs={3} lg={3}> 
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

                   <GridItem sm={3} md={3} xs={3} lg={2}> 
                       <Mat_DatePicker
                       value={FromDate} 
                       label={'From Date'}
                       maxDate={ToDate} 
                       onChange={(val)=>{setFromDate(val)}}/>  

                   </GridItem>


                   <GridItem sm={3} md={3} xs={3} lg={2}> 
                       <Mat_DatePicker
                       value={ToDate} 
                       label={'To Date'}
                       minDate={FromDate} 
                       onChange={(val)=>{setToDate(val)}}/>  

                   </GridItem>

                   <GridItem sm={2} md={2} xs={2} lg={2} align="right"> 
                     
                   <SubmitBtn  
                       disabled={false}
                       onClick={() => {submitConfirmation()}}
                       />
                   </GridItem>
            
            <GridContainer style={{marginTop:'10px',padding: '0px 15px'}}>

            <div className="add-export-btn" style={{top: "55px"}}>  
                    <Export_Print 
                      title={'Weekly Report'}
                      data={PrintData}
                      exportData={exportData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{getCustomerData();setWeeklyRpt([]);setExportData([]);setPrintData([]);weeklyReportApi();}}
                      Exceldisabled={false}
                      Printdisabled={false}
                      ref={ref}
                    />
                  </div>

               <GridItem sm={12} md={12} xs={12} lg={12} style={{marginTop:'10px'}}>
               <Table
                   className="DocWeeklyTable"
                   columns={columns} 
                   dataSource={WeeklyRpt} 
                   pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}

                   // pagination={{total: '', current:Pagination.current,showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}                                    
                   // onChange={handleTableChange}
                   scroll={{y: 300}}
               />   

                   <Typography className="totalRecords" gutterBottom>
                       {"Total"} {WeeklyRpt.length} {"Records"}
                   </Typography>
               </GridItem> 
               </GridContainer>
          

       </GridContainer>
           </CardBody>
       </Card>
   </div>
    )
}

export default WeeklyReport

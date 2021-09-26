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
import IconButton from '@material-ui/core/IconButton';
import Export_Print from '../../components/_helperComponents/Export_Print.js';


// Redux Imports
import { useDispatch, useSelector } from "react-redux";
const userID = localStorage.getItem('userid');
const useStyles = makeStyles(theme => ({ ...sweetAlertStyle }));
const EditableContext = React.createContext(); 

function CustomerBillFind(props) {
  const ref = useRef(null);
      // Dispatch Initialized
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [Message, setMessage] = useState({ open: false,color: '',message: '' });
    const [FilteredColumn, setFilteredColumn] = useState([]);
    const [SortType, setSortType] = useState("desc");
    const [confirmationAlert, setConfirmationAlert] = useState(null);

    const [Customer, setCustomer] = useState({ Id: '',Code: '', Name: ''})
    const [FromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"))
    const [ToDate, setToDate] = useState(moment().format("YYYY-MM-DD"))
    const [CustomerBillFindRpt,setCustomerBillFindRpt] = useState([])

    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [CustomerData, setCustomerData] = useState([])

     // Table Header
   let columnIndex = ["Bill No", "Bill Date", "Total Amount" ,"Expense"]; 
   // Table Row
   const Items = ["bill_no","bill_date","total_amount","less_amount"]; 
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

  useEffect(()=> {
    if(Customer.Id){
      SalesBill_Api();
  }
  },[content.CustomerData])

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
          options={CustomerBillFindRpt}
          getOptionLabel={(option) => option[Column]}        
          onChange={(e,value)=>{searchText(confirm, value == null ? '' :value['sales_idpk'], Column)}}
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

    let newData = CustomerBillFindRpt.filter((val)=> val.sales_idpk == vals); 
    if(newData.length > 0) {
      setCustomerBillFindRpt(newData)
      confirm();
      return false;
    }else{
        SalesBill_Api();
    }

    confirm();
   }


//    Column option for table
   const columns = [
    {
      title: () => {return (
        <div>
            {"Bill No"}
            {(CustomerBillFindRpt.length > 0) &&
                  <Tooltip title={"Sort"} placement="top"> 
                      <ImportExportIcon className="tableSort"
                        onClick={() => {                                               
                          let data = CustomerBillFindRpt.sort(CompareValues('bill_no',((SortType === "asc") ? "desc" : "asc")));                                        
                          setTimeout(function(){ setCustomerBillFindRpt(data)}, 1000);                         
                        }}
                      />
                  </Tooltip>
            }
        </div>
      )},
      dataIndex: "bill_no",
      className: "left",
     ...getColumnSearchProps('Bill No',"bill_no","disabled"),
    },
    {
        title: () => {return (
          <div>
              {"Bill Date"}
              {(CustomerBillFindRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = CustomerBillFindRpt.sort(CompareValues('bill_date',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setCustomerBillFindRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "bill_date",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Bill Date',"bill_date",""),
      },
    {
        title: () => {return (
          <div>
              {"Total Amount"}
              {(CustomerBillFindRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = CustomerBillFindRpt.sort(CompareValues('total_amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setCustomerBillFindRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "total_amount",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Total Amount',"total_amount","disabled"),
      },
    {
        title: () => {return (
          <div>
              {"Expense"}
              {(CustomerBillFindRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = CustomerBillFindRpt.sort(CompareValues('less_amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setCustomerBillFindRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "less_amount",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Expense',"less_amount","disabled"),
      },
      {
        title: () => {return (
          <div>
              {"Commission"}
              {(CustomerBillFindRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = CustomerBillFindRpt.sort(CompareValues('commission',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setCustomerBillFindRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "commission",
        className: "left",
        // width:"20%",
        // editable: true,
       ...getColumnSearchProps('Commission',"less_amount","disabled"),
      },
      {
        title: "Action",
        width: "10%",
        dataIndex: "sales_idpk",
        render: (sales_idpk, record)=>{
         return   (
                <div>
                   
                <Tooltip title="Edit" placement="top"> 
                        <IconButton component="div" className="padding0px" onClick={()=>editRecord(sales_idpk)}
                          disableRipple={true}>
                            <EditIcon className="EditIcon" />
                            </IconButton>
                  </Tooltip>
    
                </div>
                )
            
        }
    },
];

   
    
// Sort Table Columns
function CompareValues(key, order) {
    return function innerSort(a, b) {  
       setLoading(true); 
       setCustomerBillFindRpt([])     
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

  const editRecord = (id) => {
    let getData = CustomerBillFindRpt.filter((val)=> val.sales_idpk == id); 

    localStorage.setItem('BillRefresh', true); 

    dispatch({ type: 'customerBillInfo', data : getData})
    // dispatch({ type: 'CusBillRefresh', CusBillRefresh: true})
    document.getElementById("TriggerNewDoc").value = 'SalesEdit'; 
    var link = document.getElementById('TriggerNewDoc'); 
    link.click('SalesEdit');
  }

  const deleteAlert = (id) => {

    setConfirmationAlert(
      <SweetAlert
          warning
          style={{ display: "block", marginTop: "100px" }}
          title={"Are you sure?"}                 
          onConfirm={() => funcInActive(id)}
          onCancel={() => setConfirmationAlert(null)}
          confirmBtnCssClass={props.classes.button + " " + props.classes.success}
          cancelBtnCssClass={props.classes.button + " " + props.classes.danger}
          confirmBtnText="Yes"
          cancelBtnText="Cancel"
          showCancel
      >
          "Do you want to Delete?"
      </SweetAlert>
  )
      
  }
  const funcInActive =(id) => {

  }


const custNameChange = (val) =>{

    if(val != null){
        setCustomer({Id: val.customer_idpk,Code: val.customer_code, Name: val.customer_name})
    } else{
        setCustomer({Id: '',Code: '', Name: ''})
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

        SalesBill_Api()

    }

    const SalesBill_Api = () => {
      if(!Customer.Id){
        return false;
    }
        setLoading(true)
        let url = config.Api+"customer_bill_find"
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
            console.log(JSON.stringify(res))
            if(res.Output.status.message == "Failed"){
              setCustomerBillFindRpt([])
              setMessage({  open: true, color: "error", message: "Data Not Found" });
            }else{
              if(res.Output.data.length){ 
                console.log(res.Output.data)
               setCustomerBillFindRpt(res.Output.data)
            }else{
                setCustomerBillFindRpt([])
                setMessage({  open: true, color: "error", message: "Data Not Found" });
            }
            }
           
            
        })
        
    }


  const getAllDataPrint = () => {
    setLoading(true); 
   
    let url = config.Api+"customer_bill_find"
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
            let result = res.Output.data; 
            if(result.length > 0){
              setPrintData(res.Output.data)
              let exportItem=[];  

              res.Output.data.map((value) => {
                exportItem.push([
                  
                  value.bill_no,
                  value.bill_date,
                  value.total_amount,
                  value.less_amount,
                  
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
          {confirmationAlert}
        <Notification open={Message.open} color={Message.color} message={Message.message} 
          onClose={()=>setMessage({open: false,color:Message.color})}/>
        <Card style={{marginBottom: '0px'}}>
           <CardBody>
               <Loading loading={loading} />
               <GridContainer >
        
                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                       {/* <Textbox placeholder={"Customer Code"}
                           value={Customer.Code}
                           // onChange={(val)=>{setNumber(val);setNumberExist('');}}
                           // error={ Customer.Code && !Customer.Code? '' :'error'}
                           color={'secondary'}
                           disabled={true}
                       />    */}
                       <Autocomplete
                            options= {CustomerData}
                            value={null}
                            autoHighlight
                            getOptionLabel= {(option) => option.customer_code}
                            onChange={(e,val)=>{custNameChange(val)}}
                            inputValue={Customer.Code}
                            onInputChange={(e,val)=>{setCustomer({...Customer, Code: e.target.value})}}
                            id="debug"
                            onBlur={()=>{!Customer.Code && setCustomer({Id: '',Code: '', Name: ''});setCustomerBillFindRpt([]) }}
                            renderInput={(params) => 
                            <TextField {...params} label="Customer Code" 
                            margin="normal" />}
                        />
                   </GridItem>

                   <GridItem sm={2} md={2} xs={2} lg={2}> 
                   {/* <Autocomplete
                       options= {CustomerData}
                       getOptionLabel= {(option) => option.customer_name}
                       onChange={(e,val)=>{custNameChange(val)}}
                       id="debug"
                       debug
                       renderInput={(params) => <TextField {...params} label="Customer Name" margin="normal" />}
                   /> */}

                        <Autocomplete
                            options= {CustomerData}
                            value={null}
                            autoHighlight
                            getOptionLabel= {(option) => option.customer_name}
                            onChange={(e,val)=>{custNameChange(val)}}
                            inputValue={Customer.Name}
                            onInputChange={(e,val)=>{setCustomer({...Customer, Name: e.target.value})}}
                            id="debug"
                            onBlur={()=>{!Customer.Name  && setCustomer({Id: '',Code: '', Name: ''});setCustomerBillFindRpt([]) }}
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
                   {/* <div className="add-btn-outer-div" style={{marginLeft:'17px'}}>
                <AddBtn  
                    disabled={false }
                    onClick={props.onClick}
                />
                </div> */}
            
            <GridContainer style={{marginTop:'5px',padding: '0px 15px'}}>

           <div className="add-export-btn" style={{top: "46px"}}>  
                    <Export_Print 
                      title={'Customer Bill Find'}
                      data={PrintData}
                      exportData={exportData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{getCustomerData();SalesBill_Api()}}
                      Exceldisabled={false}
                      Printdisabled={false}
                      ref={ref}
                    />
                  </div>

               <GridItem sm={12} md={12} xs={12} lg={12} style={{marginTop:'10px'}}>
               <Table
                   className="DocWeeklyTable"
                   columns={columns} 
                   dataSource={CustomerBillFindRpt} 
                   pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}

                   // pagination={{total: '', current:Pagination.current,showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}                                    
                   // onChange={handleTableChange}
                   scroll={{y: 300}}
               />   

                   <Typography className="totalRecords" gutterBottom>
                       {"Total"} {CustomerBillFindRpt.length} {"Records"}
                   </Typography>
               </GridItem> 
               </GridContainer>
          

       </GridContainer>
           </CardBody>
       </Card>
   </div>
    )
}

export default withStyles(sweetAlertStyle)(CustomerBillFind);
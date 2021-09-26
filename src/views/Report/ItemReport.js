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
  const itemRef = React.useRef();
  const customerRef =React.useRef();
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
    const [ItemData, setItemData] = useState([])
    const [Item, setItem] = useState({ Id: '',Code: '', Name: ''})


    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [CustomerData, setCustomerData] = useState([])

    const [ItemRpt,setItemRpt] = useState("")

    

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
    getItemData();
    itemRef.current.focus();
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
          options={ItemRpt}
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

    let newData = ItemRpt.filter((val)=> val.bill_no == vals); 
    if(newData.length > 0) {
      setItemRpt(newData)
      confirm();
      return false;
    }else{
        ItemRptApi();
    }

    confirm();
   }


//    Column option for table
   const columns = [
    {
        title: () => {return (
          <div>
              {"Bill No"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('bill_no',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
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
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('date',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "date",
        className: "left",
       ...getColumnSearchProps('Date',"date",""),
      },
      {
        title: () => {return (
          <div>
              {"Customer"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('customer_name',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "customer_name",
        className: "left",
       ...getColumnSearchProps('Customer',"customer_name",""),
      },
      {
        title: () => {return (
          <div>
              {"Item Name"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('item_name',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "item_name",
        className: "left",
       ...getColumnSearchProps('Item Name',"item_name",""),
      },
      {
        title: () => {return (
          <div>
              {"UoM"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('uom',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "uom",
        className: "left",
       ...getColumnSearchProps('UoM',"uom",""),
      },
      {
        title: () => {return (
          <div>
              {"quantity"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('qty',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "qty",
        className: "left",
       ...getColumnSearchProps('quantity',"qty",""),
      },
      {
        title: () => {return (
          <div>
              {"Rate"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('rate',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "rate",
        footer: (data) => {
          return <div>Summary: {100}</div>
        },
        className: "left",
       ...getColumnSearchProps('Ratet',"rate",""),
      },
      {
        title: () => {return (
          <div>
              {"Amount"}
              {(ItemRpt.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = ItemRpt.sort(CompareValues('amount',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ setItemRpt(data)}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "amount",
        className: "left",
       ...getColumnSearchProps('Amount',"amount",""),
      },
      
      
     
];


    
// Sort Table Columns
function CompareValues(key, order) {
    return function innerSort(a, b) {  
       setLoading(true); 
       setItemRpt([])     
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
       

        if(!FromDate){
            setMessage({  open: true, color: "error", message: "Please Select the FromDate" });
            return false;
        }

        if(!ToDate){
            setMessage({  open: true, color: "error", message: "Please Select the ToDate" });
            return false;
        }

        ItemRptApi()
    }


    const ItemRptApi = () => {
      
      setLoading(true)
      let url = config.Api+"itemreport"
      let data = {
        "customer_id":Customer.Id,
        "item_id": Item.Id,
        "from_date":FromDate,
        "to_date": ToDate
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
            setItemRpt("")
            
            setMessage({  open: true, color: "error", message: "Data Not Found" });
          }else{
            
            setItemRpt(Object.values(res.Output.data));
      
          }

      })
      
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


  const itemCodeChange = (val) => {
    console.log(val)
    if(val != null){
        customerRef.current.focus();
        setItem({Id: val.item_idpk,Code: val.item_code, Name: val.item_name})
        // 
    } else{
        setItem({Id: "",Code: "", Name: ""})
    } 
  }

    // Fetch Data for Table
   const getItemData = () => {
    setLoading(true); 

    let url = config.Api+"itemselect";
    let data = {
      "item_idpk":"",
      "item_code":"",
      "item_name":"",
      "uom_idpk":"",
      "uom_name":"",
      "pageindex_int": 0,     
      "pagesize_int": 1000
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
            setItemData([])
          return false;
        }else{
          let result = res.Output.data; 
         
          if(result.length > 0){
            setItemData(result)
           // console.log("result",result)
             
          }
        }
      }

    }); 
   
  } 


  const getAllDataPrint = async() => {
   
  }


const getAllDataPrintNew = () => {
  
  }


    return (
        <div>
        <Notification open={Message.open} color={Message.color} message={Message.message} 
          onClose={()=>setMessage({open: false,color:Message.color})}/>
        <Card>
           <CardBody>
               <Loading loading={loading} />
               <GridContainer >
        
               <GridItem sm={8} md={8} xs={8} lg={8}></GridItem>
        
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
                </GridContainer>

                <GridContainer style={{paddingTop:'10px'}}>

                  <GridItem sm={2} md={2} xs={2} lg={2}> 
                  <Autocomplete
                          options= {ItemData}
                          value={null}
                          autoHighlight
                          //openOnFocus
                          getOptionLabel= {(option) => option.item_code}
                          onChange={(e,val)=>{itemCodeChange(val)}}
                          inputValue={Item.Code}
                          onInputChange={(e,val)=>{setItem({...Item, Code: e.target.value})}}
                          id="debug"
                          onBlur={()=>{!Item.Code && setItem({Id: '', Code: '', Name:''})}}

                          renderInput={(params) => 
                          <TextField {...params} label="Item Code" inputRef={itemRef} margin="normal" />}
                      />
                  </GridItem>

                  <GridItem sm={2} md={2} xs={2} lg={2}> 

                  <Autocomplete
                          options= {ItemData}
                          value={null}
                          autoHighlight
                          getOptionLabel= {(option) => option.item_name}
                          onChange={(e,val)=>{itemCodeChange(val)}}
                          inputValue={Item.Name}
                          onInputChange={(e,val)=>{setItem({...Item, Name: e.target.value})}}
                          id="debug"
                          onBlur={()=>{!Item.Name && setItem({Id: '',Code: '', Name:''})}}

                          renderInput={(params) => <TextField {...params} label="Item Name" margin="normal" />}
                      />
                    
                  </GridItem>


                  <GridItem sm={2} md={2} xs={2} lg={2}> 
                  <Autocomplete
                          options= {CustomerData}
                          value={null}
                          autoHighlight
                          getOptionLabel= {(option) => option.customer_code}
                          onChange={(e,val)=>{custNameChange(val)}}
                          inputValue={Customer.Code}
                          onInputChange={(e,val)=>{e.target.value.length==0 && setCustomer({...Customer, Code: e.target.value})}}
                          id="debug"
                          onBlur={()=>{!Customer.Code && setCustomer({Id: '',Code: '', Name: ''})  }}
                          renderInput={(params) => 
                          <TextField {...params} label="Customer Code" 
                          inputRef={customerRef}
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
                          onInputChange={(e,val)=>{e.target.value.length==0 && setCustomer({...Customer, Name: e.target.value})}}
                          id="debug"
                          onBlur={()=>{!Customer.Name  && setCustomer({Id: '',Code: '', Name: ''}) }}
                          renderInput={(params) => 
                          <TextField {...params} label="Customer Name" 
                          margin="normal" />}
                      />
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

            <div style={{position: "absolute",top: "55px",right: "9%",display:'none'}}>

            <ThermalPrint 
                      title={'Summary Report'}
                      data={PrintData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrintNew(Filter.val, Filter.column)}}
                      Printdisabled={false}
                      CustomerCode={Customer.Code}
                      CustomerName={Customer.Name}
                      TotAmt={""}
                      OpenAmt={""}
                      CollectAmt={""}
                      ref={refNew}
                      
            />
            </div>
            

            <div className="add-export-btn" style={{top: "55px",display:'none'}}>
            
                    <Export_Print 
                      title={'Summary Report'}
                      data={PrintData}
                      exportData={exportData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{getCustomerData();setItemRpt([]);setPrintData([]);setExportData([]);ItemRptApi();}}
                      Exceldisabled={false}
                      Printdisabled={false}
                      ref={ref}
                    />
                  </div>

               <GridItem sm={12} md={12} xs={12} lg={12} style={{marginTop:'10px'}}>
               <Table
                   className="DocSummaryTable"
                   columns={columns} 
                   dataSource={ItemRpt}
                   pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}

                   // pagination={{total: '', current:Pagination.current,showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}                                    
                   // onChange={handleTableChange}
                   scroll={{y: 245}}
               />   

                   <Typography className="summaryRecords" gutterBottom>
                       {"Total"} {ItemRpt.length} {"Records"}
                   </Typography>
               </GridItem> 
               </GridContainer>
               </div>

       </GridContainer>
           </CardBody>
       </Card>
   </div>
    )
}

export default WeeklyReport

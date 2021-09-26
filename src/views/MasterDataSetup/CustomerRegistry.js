// Main Imports
import React,{useState, useRef, useEffect} from 'react';
import {config} from '../../config.js';
import { Table, Popconfirm} from 'antd';   
// Nanosfot Components
import Notification from '../../components/_helperComponents/Notification';
import Add from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Textbox from '../../components/_helperComponents/Textbox';
import { Typography } from '@material-ui/core';
import Checkbox from "../../components/_helperComponents/Checkboxtable.js";
import SmartInput from "../../components/_helperComponents/Textbox.js";
import DropDown from "../../components/_helperComponents/dropdown.js";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle";
import Loading from '../../components/_helperComponents/Loading';
import Export_Print from '../../components/_helperComponents/Export_Print.js';
import AddBtn from '../../components/Buttons/AddButton'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import moment from "moment";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import DoneIcon from '@material-ui/icons/Done'; 
import { FilterOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

//language 
  // Redux Imports
import { useDispatch, useSelector } from "react-redux";

const userID=localStorage.getItem('userid');
const EditableContext = React.createContext(); 


// window global variables 
window.CustomerCode = '';
window.CustomerName = '';
window.Place = '';
window.MobileNo = '';
window.OpeningBal = '';
window.CustomerCodeExist = '';
window.CustomerNameExist = '';

// Editable Text box For 
function CodeTextbox(props){
  const content = useSelector(state => state.form);
  const dispatch = useDispatch(); 
  const [Code, setCode] = useState('');  
  const [Exist, setExist] = useState('');
  
    useEffect(()=>{
    setCode(window.CustomerCode);    
  },[window.CustomerCode]);

    useEffect(()=>{
    setExist(window.CustomerCodeExist);
  },[window.CustomerCodeExist]);
  

  return (
      <Textbox
      value={Code}
      type="text"
      autoFocus={true}
      defaultPlaceholder="Enter the Code"
      error={Code && !Exist ? '': 'error'}
      color={Code && 'primary'}
      multiline={false}
      helperText={Exist}
      onChange={(val)=>{setCode(val);setExist('');window.CustomerCode = val;window.CustomerCodeExist = '';}}
      />
  )
}

function NameTextbox(props){
  const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [Name, setName] = useState('');
    const [Exist, setExist] = useState('');
  
    useEffect(()=>{
      setName(window.CustomerName);    
    },[window.CustomerName]);

    useEffect(()=>{
      setExist(window.CustomerNameExist);    
    },[window.CustomerNameExist]);
   
    
  return (
      <Textbox
      value={Name}
      type="text"
      defaultPlaceholder="Enter the Name"
      error={Name && !Exist ? '': 'error'}
      color={ Name && 'primary'}
      multiline={false}
      helperText={Exist}
      onChange={(val)=>{setName(val); window.CustomerName = val;setExist('');window.CustomerNameExist = '';}}
      />
  )
}

function PlaceTextbox(props){
    const content = useSelector(state => state.form);
      const dispatch = useDispatch(); 
      const [Name, setName] = useState('');
    
      
      useEffect(()=>{
        setName(window.Place);    
      },[window.Place]);
      
      const alreadyExist = ()=>{
        if(Name){
          return false;
          
          }    
        } 
      
    return (
        <Textbox
        value={Name}
        type="text"
        defaultPlaceholder="Enter the place"
        onBlur={()=>alreadyExist()}
        error={ !Name && 'error' }
        color={'primary'}
        multiline={false}
        onChange={(val)=>{setName(val.replace(/[^A-Za-z]/ig, '')); window.Place = val.replace(/[^A-Za-z]/ig, '');}}
        />
    )
  }

function PhoneNoTextbox(props){
    const content = useSelector(state => state.form);
      const dispatch = useDispatch(); 
      const [Name, setName] = useState(content.StageName);
      
      
      useEffect(()=>{
        setName(window.MobileNo);    
      },[window.MobileNo]);
      
      const alreadyExist = ()=>{
        if(Name){
          return false;
          
          }    
        } 
      
    return (
        <Textbox
        type="number"
        value={Name}
        maxLength={10}
        defaultPlaceholder="Enter the Mobile No"
        onBlur={()=>alreadyExist()}
        // error={ !Name && 'error' }
        color={'primary'}
        onChange={(val)=>{val.length < 11 && setName(val);window.MobileNo = val;}}
        />
    )
  }

function OpeningBalTextbox(props){
  const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [Name, setName] = useState('');
    
    
    useEffect(()=>{
      setName(window.OpeningBal);    
    },[window.OpeningBal]);
    
    
    
  return (
      <Textbox
      type="number"
      value={Name}
      maxLength={5}
      defaultPlaceholder="Enter the Opening Bal"
      // error={ !Name && 'error' }
      color={'primary'}
      disabled={false}
      onChange={(val)=>{setName(val);window.OpeningBal = val}}
      />
  )
}

function CustomerRegistry(props) { 
  const { classes } = props; 
  const ref = useRef(null);
    // Dispatch Initialized
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
  /*----------------------For using Redux store and useState----------------------*/
    const [loading, setLoading] = useState(false);
    const [TableTotal, setTableTotal] = useState(0);
    const [Pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  
    const [Message, setMessage] = useState({ open: false,color: '',message: '' });
    const [confirmationAlert, setConfirmationAlert] = useState(null);
    const [EditingKey, setEditingKey] = useState('new');
    const isEditing = record => record.customer_idpk === EditingKey; 
    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [ColumnValue, setColumnValue] = useState([]);
    const [FilteredColumn, setFilteredColumn] = useState([]);
    const [BtnRights, setBtnRights] = useState({ IsAdd: false, IsEdit: false, IsView: false, 
      IsDelete: false, IsPrint: false, IsExport: false})
      const [SortType, setSortType] = useState("desc");
    // Table Header
   let columnIndex = ["வாடிக்கையாளர் குறியீடு", "வாடிக்கையாளர் பெயர்", "இடம்", "அலைபேசி எண்", "பாக்கி தொகை"]; 
   // Table Row
   const Items = ["customer_code","customer_name","place","mobile_no","opening_balance"]; 
   // Excel Export
   const exportData = [
    {
      columns: columnIndex,
      data: ExportData
    }
  ];
  

  // JSON for available search column (Important)
  let columnSearch = { 
    "Item Code": '', 
    "Item Name": ''
  };
 
  // Onload data fetch for table
  useEffect(()=>{
    searchData(Pagination);
  },[])

  
 
   // function for pass the search parameter to the function of table data fetch
   const searchText = (confirm, vals,column) => {

    let newData = content.CustomerData.filter((val)=> val.customer_idpk == vals); 
    if(newData.length > 0) {
      dispatch({type:'CustomerData', data:newData});
      confirm();
      return false;
    }else{
      searchData(Pagination, vals, column);
    }

    confirm();
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
          options={content.CustomerData}
          getOptionLabel={(option) => option[Column]}
          id="debug"          
          onChange={(e,value)=>{searchText(confirm, value == null ? '' :value['customer_idpk'], Column)}}
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
    }
  });    

  //    Column option for table
    const PriceCategcolumns = [{
        title: () => {return (
          <div>
              {"Customer Code"}
              {(content.CustomerData.length > 0) &&
                    <Tooltip title="Sort" placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.CustomerData.sort(CompareValues('customer_code',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'CustomerData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "customer_code",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('Customer Code',"customer_code",""),
    },{
        title: () => {return (
          <div>
              {"Customer Name"}
              {(content.CustomerData.length > 0) &&
                    <Tooltip title="Sort" placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.CustomerData.sort(CompareValues('customer_name',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'CustomerData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "customer_name",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('Customer Name',"customer_name","" ),
    },
    {
        title: () => {return (
          <div>
              {"Place"}
              {(content.CustomerData.length > 0) &&
                    <Tooltip title="Sort" placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.CustomerData.sort(CompareValues('Place',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'CustomerData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "place",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('Place',"place",""),
    },
    {
        title: () => {return (
          <div>
              {"Mobile No"}
              {(content.CustomerData.length > 0) &&
                    <Tooltip title="Sort" placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.CustomerData.sort(CompareValues('mobile_no',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'CustomerData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "mobile_no",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('Mobile Name',"mobile_no",""),
    },
    {
      title: () => {return (
        <div>
            {"Opening Balance"}
            {(content.CustomerData.length > 0) &&
                  <Tooltip title="Sort" placement="top"> 
                      <ImportExportIcon className="tableSort"
                        onClick={() => {                                               
                          let data = content.CustomerData.sort(CompareValues('opening_balance',((SortType === "asc") ? "desc" : "asc")));                                        
                          setTimeout(function(){ dispatch({type:'CustomerData', data:data});}, 1000);                         
                        }}
                      />
                  </Tooltip>
            }
        </div>
      )},
      dataIndex: "opening_balance",
      className: "left",
      width:"20%",
      editable: true,
     ...getColumnSearchProps('Opening Balance',"opening_balance","disabled"),
  },
{
  title: "Action",
  width: "10%",
  dataIndex: "customer_idpk",
  render: (customer_idpk, record)=>{
      const editable = isEditing(record);
      return editable ? (
          <div>
            <Tooltip title="Save" placement="top"> 
              <IconButton component="div" className="padding0px" onClick={()=>submitConfirmation(record)}
                    disableRipple={true}>
                      <DoneIcon className="DoneIcon" />
                </IconButton>
            </Tooltip>
            <Popconfirm okText="Yes" cancelText="No" title="Sure to cancel?" 
            onConfirm={() => {onCancel(record.customer_idpk)}}>
              <Tooltip title="Cancel" placement="top"> 
              <IconButton component="div" className="padding0px" 
                    disableRipple={true}>
                      <DeleteIcon className="DeleteIcon" />
              </IconButton>
              
            </Tooltip>
            </Popconfirm>
             
          </div>
      ):(
          <div>

          <Tooltip title="Edit" placement="top"> 
                  <IconButton component="div" className="padding0px" onClick={()=>editRecord(record)}
                    disableRipple={true}>
                      <EditIcon className="EditIcon" />
                      </IconButton>
            </Tooltip>

            <Tooltip title="Delete" placement="top"> 
                <IconButton component="div" className="padding0px" onClick={()=>deleteAlert(record.customer_idpk)}
                disableRipple={true}>
                  <DeleteIcon  className="DeleteIcon" />
                  </IconButton>
            </Tooltip>

          </div>
      )
  }
},

];
   
function CompareValues(key, order) {
  return function innerSort(a, b) {  
     setLoading(true);       
      dispatch({type:'CustomerData', data:[]});     
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

    // Define Whether Column is Editable 
    const columns = PriceCategcolumns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: '',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }); 
    // function for pass the parameter when change the page(server side pagination)
    const handleTableChange = (pagination, filters, sorter) =>{
        let current = pagination.current;
        let pageSize = pagination.pageSize;
        let pages = {current: current, pageSize: pageSize};
        clearDispatch()
        setPagination(pages);
       searchData(pages);      
    }   
  // Delete Alert
  const deleteAlert = (id) =>{
    if(BtnRights.IsDelete){
      setMessage({ open: true,color: 'error',message: "oops !! You don't have privileges." });
      return false;
    }
      setConfirmationAlert(   
          <SweetAlert
              warning
              style={{ display: "block", marginTop: "100px" }}
              title={"Are you sure?"}                  
              onConfirm={() => CustomerDelete(id)}
              onCancel={() => setConfirmationAlert(null)}
              confirmBtnCssClass={
              props.classes.button + " " + props.classes.success
              }
              cancelBtnCssClass={
              props.classes.button + " " + props.classes.danger
              }
              confirmBtnText="Yes"
              cancelBtnText="Cancel"
              showCancel
              focusConfirmBtn
          >
              "Do you want to Delete?"
          </SweetAlert>
      )
  }
  // Confirmation Before Submit
  const submitConfirmation = (data) =>{
    if(!window.CustomerCode){
        setMessage({ open:true,color:'error',message:'Please enter the  Customer Code'});
        return false;
    }
     if(!window.CustomerName){
        setMessage({ open:true,color:'error',message:'Please enter the  Customer Name'});
        return false;
    }
  

    if(!window.Place){
        setMessage({ open:true,color:'error',message:'Please enter the Place'});
        return false;
    }

    // if(!window.MobileNo){
    //     setMessage({ open:true,color:'error',message:'Please enter the Phone No'});
    //     return false;
    // }
    
    else{
      setTimeout(function(){
        if((!window.CustomerCodeExist) && (!window.CustomerNameExist)){
          saveAlert(data);
        }
      }, 500);
    }
      
  }            

  // Save Alert     
  const saveAlert = (data) =>{
    setConfirmationAlert(
        <SweetAlert
          warning
          size="sm"
          style={{ display: "block", marginTop: "100px" }}
          title={"Are you sure?"}                  
            onConfirm={() => saveSubmit(data)}
            onCancel={() => setConfirmationAlert(null)}
          confirmBtnCssClass={
            props.classes.button + " " + props.classes.success
          }
          cancelBtnCssClass={
            props.classes.button + " " + props.classes.danger
          }
          confirmBtnText="Yes"
          cancelBtnText="Cancel"
          showCancel
          focusConfirmBtn
        >
          "Do you want to Save?"
        </SweetAlert>
    );
}

 //   Record Save or Edit Submit Function
 const saveSubmit = (data) => {
  setConfirmationAlert(null);


  if(content.CustomerID){
    setLoading(true)
    const url = config.Api + "customerupdate";
      const SubmitParam = {
        "customeregistry":[
        {
        "customer_code": window.CustomerCode,
        "customer_name": window.CustomerName,
        "mobile_no": window.MobileNo,
        "place": window.Place,
        "opening_balance": window.OpeningBal,
        "customer_idpk": content.CustomerID

        }
      ]
      }
            
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(SubmitParam)
      })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        let response = res.Output.status;
        if (response.code == "200") {

          if(response.message == "Failed"){
            setMessage({ open: true, color: "error", message: response.message });
            return false;
          }
  
          if(response.message == "Success"){
            setMessage({ open: true, color: "success", message: response.message });
            searchData(Pagination);
            clearDispatch();
            setEditingKey('new');
          }else{
            setMessage({ open: true, color: "error", message: response.message });
  
            if(response.message == "Customer code already exist"){
                window.CustomerCodeExist = response.message;
            }else{
              window.CustomerNameExist = response.message;
            }
          }
          
        } else {
          setMessage({ open: true, color: "error",message: response.message });
        }
      });
  }else{
    setLoading(true)
    const url = config.Api + "customersave";
      const SubmitParam = {
        "customeregistry":[
        {
        "customer_code": window.CustomerCode,
        "customer_name": window.CustomerName,
        "mobile_no": window.MobileNo,
        "place": window.Place,
        "opening_balance": window.OpeningBal
        }
      ]
      }
            
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(SubmitParam)
      })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        let response = res.Output.status;
        if (response.code == "200") {
  
          if(response.message == "Success"){
            setMessage({ open: true, color: "success", message: response.message });
            searchData(Pagination);
            clearDispatch();
            setEditingKey('new');
          }else{
            setMessage({ open: true, color: "error", message: response.message });
  
            if(response.message == "Customer code already exist"){
                window.CustomerCodeExist = response.message;
            }else{
              window.CustomerNameExist = response.message;
            }
          }
          
        } else {
          setMessage({ open: true, color: "error",message: response.message });
        }
      });
  }

  
  
  
}; 
  // Delete Function
  const CustomerDelete = (id) => {
    setConfirmationAlert(null); 
    setLoading(true)

    const url = config.Api + "customerdelete";
     console.log("id",id)
      fetch(url+'/'+ id, {
        method: "Post",
        headers: {
          Accept: "application/json",
        }
      })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        let response = res.Output.status;
        if (response.code == "200") {
  
          if(response.message == "Success"){
            setMessage({ open: true, color: "success", message: response.message });
            searchData(Pagination);
            setEditingKey('new');
          }else{
            setMessage({ open: true, color: "error", message: response.message });
  
          }
          
        } else {
          setMessage({ open: true, color: "error",message: response.message });
        }
      });
  }
  // Fetch Data for Table
  const searchData = (params, val, column) => {

    setLoading(true); 
    var columnArr = [];
    columnSearch[column] = val; 

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
            dispatch({ type: 'CustomerData', data: [] })
            setTableTotal(0)
            return false;
          }else{
            let result = res.Output.data; 
            let totalRow = 0;
            if(result.length > 0){
                totalRow = res.Output.data[0].total_count;

                dispatch({ type: 'CustomerData', data: result})
                setTableTotal(totalRow)
            }else{
              setTableTotal(totalRow)
            } 
          }
        }
    }); 
   
  } 


  const getAllDataPrint = () => {
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
        if(res.Output.data){ 
            let result = res.Output.data; 
            if(result.length > 0){
              setPrintData(res.Output.data)
              let exportItem=[];      
              res.Output.data.map((value) => {
                exportItem.push([
                  value.customer_code,
                  value.customer_name,
                  value.place,
                  value.mobile_no,
                  value.opening_balance
                  ]);
            });
              setExportData(exportItem); 
              ref.current.PrintValue()
            }
        }
    }); 
  }


    
  // dispatch clear function
  const clearDispatch = () => {
    dispatch({type: 'Customer_Edit', id: '',active:'1'});
    setFilter({ val:'', column:''})
    window.CustomerCode = '';
    window.CustomerName = '';
    window.Place =  '';
    window.MobileNo =  '';
    window.OpeningBal =  '';
    window.CustomerCodeExist = '';
    window.CustomerNameExist = ''; 
  }

   // Add new row to editable table
   const addNewrow = () =>{ 
    if(EditingKey == 'new'){
    const result = content.CustomerData.filter(val => val.customer_idpk == 'new'); 
    if(result.length == 0){            
        const newArr = {
            "key": content.CustomerData.length + 1 ,
            "customer_idpk": 'new',
            "CustomerCode": '',
            "CustomerName": '',
            "Place": '',
            "MobileNo": '',
            "IsActive": '',
            
        };
        const data = [newArr].concat(content.CustomerData);
        dispatch({type:'CustomerData', data:data});

        console.log("data",data)
    } 
  }
}

// Edit Record
const editRecord = (record) =>{
 
  const arr = content.CustomerData.find(val => val.customer_idpk == 'new');    
  if(arr){
    setMessage({
          open: true,
          color: "warning",
          message: "Please Close or Save Newly Created Row"
        });
  }else{
    setEditingKey(record.customer_idpk);
    dispatch({type: 'Customer_Edit', id: record.customer_idpk,active: record.IsActive });
    window.CustomerCode =  record.customer_code;
    window.CustomerName =  record.customer_name;
    window.Place =  record.place;
    window.OpeningBal = record.opening_balance;;
    window.MobileNo =  record.mobile_no;
  
  }    
}

// Cancel Editable Rown
const onCancel = (id) =>{        
  if(id == 'new'){
      const newArr = content.CustomerData.filter(val => val.customer_idpk != id);
      dispatch({type: 'CustomerData', data: newArr});
      clearDispatch()
  }else{
      setEditingKey('new');
      clearDispatch()
  }
}

// Common Function For Each Column Cell***
  function EditableCell(props){  
    const getInput = (record) => { 
      if (props.dataIndex == 'customer_code') {
        return (
            <CodeTextbox
            Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
        );
      }else if(props.dataIndex == 'customer_name'){
          return(
            <NameTextbox
            Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
          )
      }else if(props.dataIndex == 'place'){
        return(
          <PlaceTextbox
          Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
        )
    }else if(props.dataIndex == 'mobile_no'){
        return(
          <PhoneNoTextbox
          Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
        )
    }else if(props.dataIndex == 'opening_balance'){
      return(
        <OpeningBalTextbox
        Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
      )
  }else if(props.dataIndex == 'IsActive'){
        return(
          <Checkbox 
          checked={content.CustomerAcitve == '1' ?  true:  false}
          onClick={(val)=>{
            dispatch({type: 'Customer_Edit', id: content.CustomerID,active: val})
          }}
          />
        )
      }
    };
    const renderCell = () => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = props;
      return (
        <td {...restProps}>
          {editing ? (
               <div className={classes.editingspan}>
                {getInput(record)}
              </div>
          ) : (
            children
          )}
        </td>
      );
    };
   
      return (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
      )
  }
  // Integrated component of Editable Table 
  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return(
      <div>
          {confirmationAlert}
          <Notification open={Message.open} color={Message.color} message={Message.message} 
          onClose={()=>setMessage({open: false,color:Message.color})}/>
          <Card>
          <Loading loading={loading} /> 
         
          <CardBody>
          <div className="add-btn-outer-div">
                  <AddBtn  
                      disabled={BtnRights.IsAdd }
                      onClick={()=> EditingKey == 'new' ? addNewrow() : null}
                  />
                  <div className="add-export-btn">
                    <Export_Print 
                      title={'Customer Registry'}
                      data={PrintData}
                      exportData={exportData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{searchData(Pagination);setEditingKey('new');clearDispatch()}}
                      Exceldisabled={BtnRights.IsExport}
                      Printdisabled={BtnRights.IsPrint}
                      ref={ref}
                    />
                  </div>
              </div>  
              
              <GridContainer>
            <GridItem sm={12}>
          <Table
              components={components}
              columns={columns} 
              dataSource={content.CustomerData} 
              pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}
              onChange={handleTableChange}
              scroll={{y: 350}}
          />   
          <Typography className="totalRecords" gutterBottom>
            {"Total"} {TableTotal} {"Records"}
          </Typography>
          </GridItem>
          </GridContainer>

          </CardBody>
          </Card>
      </div>
  );
}
 
export default withStyles(sweetAlertStyle)(CustomerRegistry);

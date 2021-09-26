// Main Imports
import React,{useState, useRef, useEffect} from 'react';
import PropTypes from "prop-types";
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
window.item_code = '';
window.item_name = '';
window.UoM = '';
window.Price = '';
window.ItemCodeExist = '';
window.ItemNameExist = ''; 

// Editable Text box For StageNo
function CodeTextbox(props){
  const content = useSelector(state => state.form);
  const dispatch = useDispatch(); 
  const [Code, setCode] = useState('');  
  const [Exist, setExist] = useState('');
 
  useEffect(()=>{
    setCode(window.item_code);    
  },[window.item_code]);

  useEffect(()=>{
    setExist(window.ItemCodeExist);
  },[window.ItemCodeExist]);

  const alreadyExist = ()=>{

    if(Code){
        return false;
     
    }   
  } 
  return (
      <Textbox
      value={Code}
      autoFocus={true}
      defaultPlaceholder="Enter the Code"
      onBlur={()=>alreadyExist()}
      error={Code && !Exist ? '': 'error'}
      color={Code && 'primary'}
      multiline={false}
      helperText={Exist}
      onChange={(val)=>{setCode(val); setExist('');window.ItemCodeExist = '';window.item_code = val;}}
      />
  )
}

function NameTextbox(props){
  const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [Name, setName] = useState(content.StageName);
    const [Exist, setExist] = useState('');
  
    
    useEffect(()=>{
      setName(window.item_name);    
    },[window.item_name]);
    useEffect(()=>{
     
      setExist(window.ItemNameExist);
    },[window.ItemNameExist]);

    const alreadyExist = ()=>{
      if(Name){
        return false;
        
        }    
      } 
    
  return (
      <Textbox
      value={Name}
      defaultPlaceholder="Enter the Name"
      onBlur={()=>alreadyExist()}
      error={ Name && !Exist ? '' : 'error' }
      color={ Name && 'primary'}
      multiline={false}
      helperText={Exist}
      onChange={(val)=>{setName(val); setExist('');window.ItemNameExist = '';window.item_name = val;}}
      />
  )
}

function UoMTextbox(props){
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
    const [uom, setUom] = useState('');


    const colTxtSrchOptions = [ 
    { label: "KG", value: 1 },
    { label: "Box", value: 2 },
    { label: "Packet", value: 3 },
  ];
   
      useEffect(()=>{
        setUom(window.UoM);  
      },[window.UoM]);
      
      
    return (
      <div style={{marginTop:'-16px'}}>
        <DropDown
          data={colTxtSrchOptions}
          value={window.UoM}
          onChange={val => {setUom(val);window.UoM = val;}}
        />
        </div>

      
    )
  }

  // Editable  Text box For Price Name
function PriceTextbox(props){
    const content = useSelector(state => state.form);
      const dispatch = useDispatch(); 
      const [Name, setName] = useState('');
     
      
      useEffect(()=>{
        setName(window.Price);    
      },[window.Price]);
      
      // Check Stage Name already Exist  
      const alreadyExist = ()=>{
        if(Name){
          return false;
          
          }    
        } 
      
    return (
        <Textbox
        type="number"
        value={Name}
        defaultPlaceholder="Enter the Price"
        onBlur={()=>alreadyExist()}
        // error={ !Name && 'error' }
        color={'primary'}
        multiline={false}
        onChange={(val)=>{setName(val);window.Price = val;}}
        />
    )
  }

// Main Rendering  Function Of Table
function ItemRegistry(props) { 
  const { classes } = props; 
  const ref = useRef(null);
    // Dispatch Initialized
    const content = useSelector(state => state.form);
    const dispatch = useDispatch(); 
  /*----------------------For using Redux store and useState----------------------*/
    const [loading, setLoading] = useState(false);
    const [TableTotal, setTableTotal] = useState(0);
    const [Pagination, setPagination] = useState({ current: 0, pageSize: 10 });
  
    const [Message, setMessage] = useState({ open: false,color: '',message: '' });
    const [confirmationAlert, setConfirmationAlert] = useState(null);
    const [EditingKey, setEditingKey] = useState('new');
    const isEditing = record => record.item_idpk === EditingKey; 
    const [ExportData,setExportData] = useState('');
    const [PrintData ,setPrintData] = useState([]);
    const [Filter, setFilter] = useState({ val:'', column:'' })
    const [ColumnValue, setColumnValue] = useState([]);
    const [FilteredColumn, setFilteredColumn] = useState([]);
    const [BtnRights, setBtnRights] = useState({ IsAdd: false, IsEdit: false, IsView: false, 
      IsDelete: false, IsPrint: false, IsExport: false})
      const [SortType, setSortType] = useState("desc");
    // Table Header
   let columnIndex = ["பொருளின் குறியீடு", "பொருளின் பெயர்","அளவீட்டு அலகு", "தொகை" ]; 
   // Table Row
   const Items = ["item_code","item_name","uom_name","price"]; 
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
  useEffect(() => {     

    clearDispatch();  
  },[]);

  useEffect(()=>{
    searchData(Pagination);
  },[content.ItemToken])

  
 
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
          options={content.ItemData}
          getOptionLabel={(option) => option[Column]}
          id="debug"          
          onChange={(e,value)=>{searchText(confirm, value == null ? '' :value['item_idpk'], Column)}}
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

   // function for pass the search parameter to the function of table data fetch
   const searchText = (confirm, vals,column) => {
  
    let newData = content.ItemData.filter((val)=> val.item_idpk == vals); 
    if(newData.length > 0) {
      dispatch({type:'ItemData', data:newData});
      confirm();
      return false;
    }else{
      searchData(Pagination, vals, column);
    }

    confirm();
   }

  //    Column option for table
    const Itemcolumns = [{
        title: () => {return (
          <div>
              {"Item Code"}
              {(content.ItemData.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.ItemData.sort(CompareValues('item_code',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'ItemData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "item_code",
        className: "left",
        width:"20%",
        editable: true,
      
       ...getColumnSearchProps('Item Code',"item_code",""),
    },{
        title: () => {return (
          <div>
              {"Item Name"}
              {(content.ItemData.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.ItemData.sort(CompareValues('item_name',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'ItemData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "item_name",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('Item Name',"item_name",""),
    },
    {
        title: () => {return (
          <div>
              {"UoM"}
              {(content.ItemData.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.ItemData.sort(CompareValues('uom_name',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'ItemData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "uom_name",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('UoM',"uom_name","disabled"),
    },
    {
        title: () => {return (
          <div>
              {"Price"}
              {(content.ItemData.length > 0) &&
                    <Tooltip title={"Sort"} placement="top"> 
                        <ImportExportIcon className="tableSort"
                          onClick={() => {                                               
                            let data = content.ItemData.sort(CompareValues('price',((SortType === "asc") ? "desc" : "asc")));                                        
                            setTimeout(function(){ dispatch({type:'ItemData', data:data});}, 1000);                         
                          }}
                        />
                    </Tooltip>
              }
          </div>
        )},
        dataIndex: "price",
        className: "left",
        width:"20%",
        editable: true,
       ...getColumnSearchProps('Price',"price","disabled"),
    },
{
  title: "Action",
  width: "10%",
  dataIndex: "action",
  render: (text, record)=>{
      const editable = isEditing(record);
      return editable ? (
          <div>
            <Tooltip title={"Save"} placement="top"> 
            <IconButton component="div" className="padding0px" onClick={()=>submitConfirmation(record)}
                    disableRipple={true}>
                <DoneIcon className="DoneIcon" />
            </IconButton>
            </Tooltip>

            <Popconfirm okText={"Yes"} cancelText={"No"} title={"Sure to cancel?"} 
            onConfirm={() => {onCancel(record.item_idpk)}}>
            <Tooltip title={"Cancel"} placement="top"> 
              
              <IconButton component="div" className="padding0px"
                    disableRipple={true}>
                      <DeleteIcon className="DeleteIcon" />
              </IconButton>
           
            </Tooltip>
            </Popconfirm>
             
          </div>
      ):(
          <div>
             
          <Tooltip title={"Edit"} placement="top"> 
                  <IconButton component="div" className="padding0px" onClick={()=>editRecord(record)}
                    disableRipple={true}>
                      <EditIcon className="EditIcon" />
                  </IconButton>
            </Tooltip>

            <Tooltip title={"Delete"} placement="top"> 
                <IconButton component="div" className="padding0px" onClick={()=>deleteAlert(record.item_idpk)}
                disableRipple={true}>
                  <DeleteIcon  className="DeleteIcon" />
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
      dispatch({type:'ItemData', data:[]});     
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
    const columns = Itemcolumns.map(col => {
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
              onConfirm={() => ItemDelete(id)}
              onCancel={() => setConfirmationAlert(null)}
              confirmBtnCssClass={
              props.classes.button + " " + props.classes.success
              }
              cancelBtnCssClass={
              props.classes.button + " " + props.classes.danger
              }
              confirmBtnText={"Yes"}
              cancelBtnText={"Cancel"}
              showCancel
              
          >
              {"Do you want to Delete?"}
          </SweetAlert>
      )
  }
  // Confirmation Before Submit
  const submitConfirmation = (data) =>{
        
    // saveAlert(data);
    if(!window.item_code){
        setMessage({ open:true,color:'error',message:'Please enter the Item Code'});
        return false;
    }
     if(!window.item_name){
        setMessage({ open:true,color:'error',message:'Please enter the Item Name'});
        return false;
    }
     if(window.ItemCodeExist){
        setMessage({ open:true,color:'error',message:'Item Code Already Exist'});
        return false;
    }
     if(window.ItemNameExist){
        setMessage({ open:true,color:'error',message:'Item Name Already Exist'});
        return false;
    }

    if(!window.UoM){
        setMessage({ open:true,color:'error',message:'Please enter the UoM'});
        return false;
    }

    if(!window.Price){
        setMessage({ open:true,color:'error',message:'Please enter the Price'});
        return false;
    }
    
    else{
      setTimeout(function(){
        if((!window.ItemCodeExist) && (!window.ItemNameExist)){
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
        >
          {"Do you want to Save?"}
        </SweetAlert>
    );
}

 //   Record Save or Edit Submit Function
 const saveSubmit = () => {
  setConfirmationAlert(null);
  
  console.log(content.ItemID)
  if(content.ItemID){
    setLoading(true)
    const url = config.Api + "itemupdate";
    const SubmitParam = {
      "itemregistry":[
      {
      "item_code":window.item_code,
      "item_name":window.item_name,
      "uom":window.UoM,
      "price": window.Price,
      "item_idpk":content.ItemID
      }
    ]
    }
    
    fetch(url, {
      method: "Post",
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

          if(response.message == "Item code already exist"){
              window.ItemCodeExist = response.message;
          }else{
            window.ItemNameExist = response.message;
          }
        }
        
      } else {
        setMessage({ open: true, color: "error",message: response.message });
      }
    });
return false;
  }else{
    const url = config.Api + "/itemsave";
    const SubmitParam = {
      "itemregistry":[
      {
      "item_code": window.item_code,
      "item_name":window.item_name,
      "uom":window.UoM,
      "price":window.Price
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

          if(response.message == "Item code already exist"){
              window.ItemCodeExist = response.message;
          }else{
            window.ItemNameExist = response.message;
          }
        }
        
      } else {
        setMessage({ open: true, color: "error",message: response.message });
      }
    });
  }

  
  
}; 
  // Delete Function
  const ItemDelete = (id) => {
    setConfirmationAlert(null); 
    setLoading(true)

    const url = config.Api + "itemdelete";
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
            clearDispatch();
            setEditingKey('new');
          }else{
            setMessage({ open: true, color: "error", message: response.message });
  
            if(response.message == "Item code already exist"){
                window.ItemCodeExist = response.message;
            }else{
              window.ItemNameExist = response.message;
            }
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
          dispatch({ type: 'ItemData', data: [] })
          setTableTotal(0)
          return false;
        }else{
          let result = res.Output.data; 
          let totalRow = 0;
          if(result.length > 0){
              totalRow = res.Output.data[0].total_count;

              dispatch({ type: 'ItemData', data: result})
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
        if(res.Output.data){ 
            let result = res.Output.data; 
            if(result.length > 0){
              setPrintData(res.Output.data)
              let exportItem=[];      
              res.Output.data.map((value) => {
                exportItem.push([
                  value.item_code,
                  value.item_name,
                  value.uom_name,
                  value.price,
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
    dispatch({type: 'Item_Edit', id: '',active:'1',});
    setFilter({ val:'', column:''})
    window.item_code = '';
    window.item_name = '';
    window.UoM =  '1';
    window.Price =  '';
    window.ItemCodeExist = '';
    window.ItemNameExist = ''; 
  }

   // Add new row to editable table
   const addNewrow = () =>{ 
    if(EditingKey == 'new'){
    const result = content.ItemData.filter(val => val.item_idpk == 'new');
    if(result.length == 0){            
        const newArr = {
            "item_idpk": 'new',
            "item_code": '',
            "item_name": '',
            "uom_name": '1',
            "price": '',
            
        };
        const data = [newArr].concat(content.ItemData);
        dispatch({type:'ItemData', data:data});

    } 
  }
}

// Edit Record
const editRecord = (record) =>{
  
  const arr = content.ItemData.find(val => val.item_idpk == 'new');    
  if(arr){
    setMessage({
          open: true,
          color: "warning",
          message: "Please Close or Save Newly Created Row"
        });
  }else{
    setEditingKey(record.item_idpk);
    dispatch({type: 'Item_Edit', id: record.item_idpk,active: record.IsActive })
    window.item_code =  record.item_code;
    window.item_name =  record.item_name;
    window.UoM =  record.uom_idpk;
    window.Price =  record.price;
    window.ItemCodeExist = '';
    window.ItemNameExist = ''; 
  }    
}

// Cancel Editable Rown
const onCancel = (id) =>{        
  if(id == 'new'){
      const newArr = content.ItemData.filter(val => val.item_idpk != id);
      dispatch({type: 'ItemData', data: newArr});
      clearDispatch()
  }else{
      setEditingKey('new');
      clearDispatch()
  }
}

// Common Function For Each Column Cell***
  function EditableCell(props){  
    const getInput = (record) => { 
      if (props.dataIndex == 'item_code') {
        return (
            <CodeTextbox
            Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
        );
      }else if(props.dataIndex == 'item_name'){
          return(
            <NameTextbox
            Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
          )
      }else if(props.dataIndex == 'uom_name'){
        return(
          <UoMTextbox
          Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
        )
    }else if(props.dataIndex == 'price'){
        return(
          <PriceTextbox
          Message={(msg, color)=>setMessage({open: true,color: color, message: msg})}/>
        )
    }else if(props.dataIndex == 'IsActive'){
        return(
          <Checkbox 
          checked={content.ItemActive == '1' ?  true:  false}
          onClick={(val)=>{
            dispatch({type: 'Item_Edit', id: content.ItemID,active: val })
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
                      disabled={false }
                      onClick={()=> EditingKey == 'new' ? addNewrow() : null}
                  />
                  <div className="add-export-btn">
                    <Export_Print 
                      title={'Item Registry'}
                      data={PrintData}
                      exportData={exportData}
                      Items={Items}
                      columnIndex={columnIndex}
                      triggerApi={()=>{getAllDataPrint(Filter.val, Filter.column)}}
                      Refresh={()=>{searchData(Pagination);clearDispatch();setEditingKey('new')}}
                      Exceldisabled={false}
                      Printdisabled={false}
                      ref={ref}
                    />
                  </div>
              </div>  
              
              <GridContainer>
            <GridItem sm={12}>
          <Table
              components={components}
              columns={columns} 
              dataSource={content.ItemData} 
              pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}
              //onChange={handleTableChange}
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


ItemRegistry.propTypes = {
  classes: PropTypes.object
};

 
export default withStyles(sweetAlertStyle)(ItemRegistry);

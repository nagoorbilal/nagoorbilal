import React,{useEffect, useRef,useState} from "react";
import { Table} from 'antd';   

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
import DeleteIcon from "@material-ui/icons/Clear";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle";
import Mat_DatePicker from "../../components/_helperComponents/Mat_DatePicker";
import SubmitBtn from '../../components/Buttons/SubmitButton';
import SaveBtn from '../../components/Buttons/SaveButton';
import RefreshBtn from '../../components/Buttons/Refresh';


import UpdateBtn from '../../components/Buttons/UpdateButton';
import Select from "../../components/_helperComponents/dropdown.js";


// common core component  
import Textbox from '../../components/_helperComponents/Textbox';
import Notification from '../../components/_helperComponents/Notification'; 
import Loading from '../../components/_helperComponents/Loading';
// import DropDown from '../../components/_helperComponents/Select';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import ThermalPrtSales from '../../components/_helperComponents/ThermalPrtSales.js'

const userID = localStorage.getItem('userid');
const useStyles = makeStyles(theme => ({ ...sweetAlertStyle}));
const EditableContext = React.createContext(); 

const ItemDataMaster =  [{
        item_code: "101",
        item_idpk: 1,
        item_name: "Mathi",
        price: "60.00",
        total_count: 4,
        uom_idpk: 1,
        uom_name: "KG",
}]

window.lessAutoFocus = false;
window.AutoRefresh = false;
window.CustBillInfo = [];


function Purchase(props) {
  const ref = useRef(null);
  const itemRef = React.useRef();
  const custCodeRef = React.useRef();
     // Dispatch Initialized
     const content = useSelector(state => state.form);
     const dispatch = useDispatch(); 
     const { classes } = props;
    const [SalesIDPK, setSalesIDPK] = useState('');
    const [BillNo, setBillNo] = useState('')
    const [Customer, setCustomer] = useState({ Id: '',Code: '', Name: '',Openbal: ''})
    const [BillData, setBillDate] = useState(moment().format("YYYY-MM-DD"))
    const [Item, setItem] = useState({ Id: '',Code: '', Name: ''})
    const [Quantity, setQuantity] = useState('')
    const [UoM, setUoM] = useState('')
    const [Rate, setRate] = useState('')
    const [Sno, setSno] = useState('')
    
    const [Message, setMessage] = useState({ open: false,color: '',message: '' });
    const [confirmationAlert, setConfirmationAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [DetailTableData, setDetailTableData] = useState([])
    const [LessAmt, setLessAmt] = useState('')
    const [OpenAmt, setOpenAmt] = useState('')
    const [CurrAmt, setCurrAmt] = useState('')
    const [BckCurrAmt, setBckCurrAmt] = useState('')
    const [NetAmt, setNetAmt] = useState('')
    const [CollectionAmt, setCollectionAmt] = useState('')
    const [CustomerData, setCustomerData] = useState([])
    const [ItemData, setItemData] = useState([])
    const [SalesDetIDPK, setSalesDetIDPK] = useState("");
    const [defaultOpeningBal, setDefaultOpeningBal] = useState('');
    const [Commission, setCommission] = useState('');

     // Table Row
   const Items = ["ItemName","UoMName","Rate","Amount"]; 

     //    JSON for options of column text search
  const UomOptions = [ 
    { label: "KG", value: 1 },
    { label: "Box", value: 2 },
    { label: "Packet", value: 3 },
  ];

  useEffect(()=> {
    finalClear();
    getCustomerData();
  },[content.CustomerData])

  useEffect(() => {
    finalClear();
    // getCustomerData();
    getItemData();    
    custCodeRef.current.focus();
  },[])

   //    Column option for table
   const columns = [
    
    { 
      key: "key",
      title: "S.No", 
      dataIndex: "SNo",
    },
    {
      key: "key",
        title: "Item Code", 
        dataIndex: "ItemCode",
    },
    {
      key: "key",
      title: "Item Name", 
      dataIndex: "ItemName",
    },
    {
        key: "key",
        title: "Qty", 
        dataIndex: "Qty",
    },
    {
        key: "key",
        title: "Rate", 
        dataIndex: "Rate",
    },
    {
        key: "key",
        title: "Total Amount", 
        dataIndex: "Amount",
        footer: (data) => {
            return <div>Total Amt: {data.reduce((sum, record) => sum + record.Amount, 0)}</div>
          },
    },
    {
        title: "Action",
        width: "10%",
        dataIndex: "action",
        render: (text, record)=>{
          
            return  (
                <div>
                   
                <Tooltip title={"Edit"} placement="top"> 
                        <IconButton component="div" className="padding0px" onClick={()=>editRecord(record)}
                          disableRipple={true}>
                            <EditIcon className="EditIcon" />
                            </IconButton>
                  </Tooltip>
  
                  <Tooltip title={"Delete"} placement="top"> 
                      <IconButton component="div" className="padding0px" onClick={()=>deleteAlert(record.key)}
                      disableRipple={true}>
                        <DeleteIcon  className="DeleteIcon" />
                        </IconButton>
                  </Tooltip>
  
                </div>
            )
        }
    },
];

const clear = () => {

    setItem({ Id: '',Code: '', Name: ''})
    setQuantity('')
    setUoM('')
    setRate('')
    setSno('');
    setSalesDetIDPK('');

  
} 

 const editRecord = (data) => {
     console.log(data)

    setCustomer({ Id: data.CustoemrIDPK, Code: data.CustomerCode, Name: data.CustomerName, Openbal: data.opening_balance})
    setBillDate(data.BillDate)
    setItem({ Id: data.ItemIDPK, Code: data.ItemCode, Name: data.ItemName})
    setQuantity(data.Qty)
    setUoM(data.UoM)
    setRate(parseFloat(data.Rate).toFixed(2))
    setSno(data.SNo)
    setSalesDetIDPK(data.salesDetIDPK)
     
}

const finalClear = () => {
    custCodeRef.current.focus()
    setSalesIDPK('')
    setBillDate(moment().format("YYYY-MM-DD"))
    setItem({ Id: null,Code: '', Name: ''})
    setQuantity('')
    setUoM('')
    setRate('')
    setSno('')
    setSalesDetIDPK('')
    setCustomer({ Id: '', Code: '', Name: '', Openbal: ''})

    setDetailTableData([])
    setLessAmt('')
    setOpenAmt('')
    setCurrAmt('')
    setBckCurrAmt('')
    setNetAmt('')
    setCollectionAmt('')
    setDefaultOpeningBal('')
    setCommission('')

   
}

 
 // Delete Function
const deleteAlert = (key) => {

    let salesUpdate = DetailTableData.filter(item=> item.key == key);

    if(salesUpdate.length > 0 && SalesIDPK){

       let updteSal = salesUpdate[0];

      var editData = new Object();

        editData = { 
            "SNo": updteSal.SNo,
            "ItemIDPK": updteSal.ItemIDPK,
            "ItemCode": updteSal.ItemCode,
            "ItemName": updteSal.ItemName,
            "CustoemrIDPK": updteSal.CustoemrIDPK,
            "CustomerCode": updteSal.CustomerCode,
            "CustomerName": updteSal.CustomerName,
            "UoM": updteSal.UoM,
            "Qty": updteSal.Qty,
            "Rate": updteSal.Rate,
            "BillDate":updteSal.BillData,
            "Amount": updteSal.Amount,
            "key": updteSal.key,
            "status": "1",
            "salesDetIDPK": updteSal.salesDetIDPK,
            
        }

        const newData = [...DetailTableData];

        const index = newData.findIndex(SN => SN.key === updteSal.key);

        const item = newData[index];

        newData.splice(index, 1, { ...item, ...editData });
       
        let reAssign = [];
        let printArr = []
        newData.map((val,index) => {

          reAssign.push({
            "SNo": val.SNo ,
            "ItemIDPK": val.ItemIDPK,
            "ItemCode": val.ItemCode,
            "ItemName": val.ItemName,
            "CustoemrIDPK": val.CustoemrIDPK,
            "CustomerCode": val.CustomerCode,
            "CustomerName": val.CustomerName,
            "UoM": val.UoM,
            "Qty": val.Qty,
            "Rate": val.Rate,
            "BillDate":val.BillDate,
            "Amount": val.Amount,
            "key": val.key,
            "status": val.status,
            "salesDetIDPK": val.salesDetIDPK,
          })

        })
       
        setDetailTableData(reAssign)

          let newVal = reAssign.filter(item=> item.status !== "1")

        let curr = []
    newVal.map(val=> {
        curr.push(parseFloat(val.Amount));
    })

    setLessAmt('');
    setCollectionAmt('')
    setCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
    setNetAmt(parseFloat(defaultOpeningBal) + parseFloat(curr.reduce((a, b) => a + b, 0)))
    setBckCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2));

    }else{
   
      const dataSource = [...DetailTableData];

    let newData = DetailTableData.filter(item => item.key !== key)

    let reAssign = [];

    newData.map((val,index) => {
      reAssign.push({
        "SNo": index + 1 ,
        "ItemIDPK": val.ItemIDPK,
        "ItemCode": val.ItemCode,
        "ItemName": val.ItemName,
        "CustoemrIDPK": val.CustoemrIDPK,
        "CustomerCode": val.CustomerCode,
        "CustomerName": val.CustomerName,
        "UoM": val.UoM,
        "UoMName": val.UoMName,
        "Qty": val.Qty,
        "Rate": val.Rate,
        "BillDate":val.BillDate,
        "Amount": val.Amount,
        "key": index + 1,
        "status": "",
        "salesDetIDPK": val.salesDetIDPK,
      })

    })
    setDetailTableData(reAssign)

    let curr = []
    newData.map(val=> {
        curr.push(parseFloat(val.Amount));
    })
    setLessAmt('');
    setCollectionAmt('')
    setCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
    setNetAmt(parseFloat(OpenAmt) + parseFloat(curr.reduce((a, b) => a + b, 0)))
    setBckCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))

    }
    
}

  const submitConfirmation = () => {

     if(!Customer.Id){
       setMessage({ open: true, color: "error", message: "Please Select the Customer" });
       return false;
    }

    if(CollectionAmt && DetailTableData.length == 0){
      saveCollectionAlert()
      return false;
    }

    saveAlert()

  }


  // Save Alert     
  const saveAlert = () =>{
    setConfirmationAlert(
        <SweetAlert
          warning
          size="sm"
          style={{ display: "block", marginTop: "100px" }}
          title={"Are you sure?"}                  
            onConfirm={() => { SalesIDPK ? saveConsumerBill(0) : saveSubmit()}}
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
          {"Do you want to Save?"}
        </SweetAlert>
    );
}

 // Save Alert saveCollectionAlert     
 const saveCollectionAlert = () =>{
  setConfirmationAlert(
      <SweetAlert
        warning
        size="sm"
        style={{ display: "block", marginTop: "100px" }}
        title={"Are you sure?"}                  
          onConfirm={() => { collectOnlysave();}}
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
        {"Do you want to Save?"}
      </SweetAlert>
  );
}

    const saveSubmit = async() => {
        setConfirmationAlert(null)

        setLoading(true)
        const url = config.Api + "purchasesave";

        var selesDet = []
    await  DetailTableData.map(val=> {
           selesDet.push({
                item_id: val.ItemIDPK,
                qty: val.Qty,
                uom_id: val.UoM,
                rate: val.Rate,
                amount: val.Amount

            })
            
        })


        let data = await{
            "purchaseregistry":[
                {
              "pur_customer_id": Customer.Id,
              "bill_date": BillData,
              "less_amount": LessAmt ? LessAmt : "0",
              "total_amount": CurrAmt,
              "opening_balance": NetAmt,
              "old_opening_balance":defaultOpeningBal, 
              "purchasedetails":selesDet,
              "collection":[
                  {
                  "collection_amount": CollectionAmt 
                  }
                  ]
            }
            ]
        }

        fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(res => {
            setLoading(false)
            let response = res.Output.status;
            if (response.code == "200") {

              if(window.CollectionAmt){
                collectOnlysave();
              }
                
              if(response.message == "Success"){
                setMessage({ open: true, color: "success", message: response.message });
                localStorage.setItem("BillNo", res.Output.data[0].new_bill_no);
                finalClear();
                getCustomerData();
                getItemData(); 
                
              }
              
            } else {
              setMessage({ open: true, color: "error",message: response.message });
            }
          });
        
    }

    const collectOnlysave = () => {
      setConfirmationAlert(null);

        const url = config.Api + "purchase_collectionssave";

        let data = 
        {
            "pur_customer_id":Customer.Id,
            "collection_amount":CollectionAmt,
            "opening_balance": parseFloat(defaultOpeningBal) - parseFloat(CollectionAmt),
            "old_opening_balance":defaultOpeningBal,
            "collection_date": BillData

        }
        

        console.log(JSON.stringify(data))

        fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(res => {
            // setLoading(false)
            let response = res.Output.status;
            if (response.code == "200") {
      
              if(response.message == "Success"){
                setMessage({ open: true, color: "success", message: response.message });
               clearAll();
                getCustomerData();
                getItemData(); 
               
              }
              
            } else {
              setMessage({ open: true, color: "error",message: response.message });
            }
          });
        
    }

    const quantityType = (val) => {
      if(val == '1'){
        return 'Kg'
      }else if(val == '2'){
        return 'Box'
      }else if(val == '3'){
        return 'Pocket'
      }
    }



  const submitDetConfirmation = () => {
    
    if(!Customer.Name){
        setMessage({  open: true, color: "error", message: "Please Select the Customer Name" });
        return false;
    }

    if(!Item.Code){
        setMessage({  open: true, color: "error", message: "Please Select the Item Code" });
        return false;
    }
    if(!Item.Name){
        setMessage({  open: true, color: "error", message: "Please Select the Item Name" });
        return false;
    }

    if(!Quantity){
        setMessage({  open: true, color: "error", message: "Please Enter the Quantity" });
        return false;
    }

    if(!UoM){
      setMessage({  open: true, color: "error", message: "Please Select the UoM" });
      return false;
  }

    if(!Rate){
        setMessage({  open: true, color: "error", message: "Please Enter the Rate" });
        return false;
    }

    let itemArr =  DetailTableData.filter(item => item.SNo !== Sno);

    if(SalesIDPK){


      let newItems = itemArr.filter(item=> item.status !== "1")

    const itemCode = newItems.filter(item => item.ItemName === Item.Code);
    const itemName = newItems.filter(item => item.ItemName === Item.Name);

    if(itemCode.length > 0){
        setMessage({  open: true, color: "error", message: "Item Code already exists" });
        return false;
    }
    if(itemName.length > 0){
        setMessage({  open: true, color: "error", message: "Item Name already exists" });
        return false;
    }

    }

   


    var editData = new Object();

    if(Sno){

      console.log("if sno",Sno)

        editData = { 
            "SNo": Sno,
            "ItemIDPK": Item.Id,
            "ItemCode": Item.Code,
            "ItemName": Item.Name,
            "CustoemrIDPK": Customer.Id,
            "CustomerCode": Customer.Code,
            "CustomerName": Customer.Name,
            "UoM": UoM,
            "UoMName": Quantity + " "+ quantityType(UoM),
            // "UoMName": UoM == '1' ? Quantity +" "+"Kg" : Quantity+" "+"Box",
            "Qty": Quantity,
            "Rate": parseFloat(Rate).toFixed(2),
            "BillDate":BillData,
            "Amount": parseFloat(Quantity * parseFloat(Rate)).toFixed(2),
            "key": Sno,
            "status": "0",
            "salesDetIDPK": SalesDetIDPK,
            
        }

        const newData = [...DetailTableData];

        const index = newData.findIndex(SNo => SNo.key == Sno);

        const item = newData[index];

        newData.splice(index, 1, { ...item, ...editData });
       
        console.log("data",newData)


        let reAssign = [];

        newData.map((val,index) => {
          reAssign.push({
            "SNo": val.SNo ,
            "ItemIDPK": val.ItemIDPK,
            "ItemCode": val.ItemCode,
            "ItemName": val.ItemName,
            "CustoemrIDPK": val.CustoemrIDPK,
            "CustomerCode": val.CustomerCode,
            "CustomerName": val.CustomerName,
            "UoM": val.UoM,
            "UoMName": val.UoMName,
            "Qty": val.Qty,
            "Rate": val.Rate,
            "BillDate":val.BillDate,
            "Amount": val.Amount,
            "key": val.key,
            "status": val.status,
            "salesDetIDPK": val.salesDetIDPK,
          })

        
        })
       
        setDetailTableData(reAssign)        

        if(SalesIDPK){
         let newItems = reAssign.filter(item=> item.status !== "1")

        let curr = []
        newItems.map(val=> {
            curr.push(parseFloat(val.Amount));
        })
        console.log(curr)
        setLessAmt('');
        setCollectionAmt('');
        setCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
        setNetAmt(parseFloat(defaultOpeningBal) + parseFloat(curr.reduce((a, b) => a + b, 0)))
        setBckCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))

        clear(); 
        return false;

        }else{

          let curr = []
        newData.map(val=> {
            curr.push(parseFloat(val.Amount));
        })
        console.log(curr)
        setLessAmt('');
        setCollectionAmt('')
        setCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
        setNetAmt(parseFloat(OpenAmt) + parseFloat(curr.reduce((a, b) => a + b, 0)))
        setBckCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))

        clear(); 
        itemRef.current.focus();
          return false;
        }
        
        
    }else{

        console.log("else sno")

        editData = { 
            "SNo": DetailTableData.length + 1 ,
            "ItemIDPK": Item.Id,
            "ItemCode": Item.Code,
            "ItemName": Item.Name,
            "CustoemrIDPK": Customer.Id,
            "CustomerCode": Customer.Code,
            "CustomerName": Customer.Name,
            "UoM": UoM,
            "UoMName": Quantity + " "+ quantityType(UoM),
            // "UoMName": UoM == '1' ? Quantity +" "+"Kg" : Quantity+" "+"Box",
            "Qty": Quantity,
            "Rate": parseFloat(Rate).toFixed(2),
            "BillDate":BillData,
            "Amount": parseFloat(Quantity * parseFloat(Rate)).toFixed(2),
            "key": DetailTableData.length + 1,
            "status": "2",
            "salesDetIDPK": "",
            
        }
    
       
            const data = DetailTableData.concat([editData]);
            
            let reAssign = []
            data.map((val,index) => {
              reAssign.push({
                "SNo": index + 1 ,
                "ItemIDPK": val.ItemIDPK,
                "ItemCode": val.ItemCode,
                "ItemName": val.ItemName,
                "CustoemrIDPK": val.CustoemrIDPK,
                "CustomerCode": val.CustomerCode,
                "CustomerName": val.CustomerName,
                "UoM": val.UoM,
                "UoMName": val.UoMName,
                "Qty": val.Qty,
                "Rate": val.Rate,
                "BillDate":val.BillDate,
                "Amount": val.Amount,
                "key": index + 1,
                "status": val.status,
                "salesDetIDPK": val.salesDetIDPK,
              })

            })

            console.log("reAssign",reAssign)

            setDetailTableData(reAssign)

            if(SalesIDPK){

              let newItems = reAssign.filter(item=> item.status !== "1")

              let curr = []
            newItems.map(val=> {
                curr.push(parseFloat(val.Amount));
            })
            setLessAmt('');
            setCollectionAmt('')
            setCommission('')
            setCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
            setNetAmt(parseFloat(defaultOpeningBal) + parseFloat(curr.reduce((a, b) => a + b, 0)))
            setBckCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
            clear(); 
            return false;

            }else{
            let curr = []
            data.map(val=> {
                curr.push(parseFloat(val.Amount));
            })
            setLessAmt('');
            setCollectionAmt('')
            setCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
            setNetAmt(parseFloat(OpenAmt) + parseFloat(curr.reduce((a, b) => a + b, 0)))
            setBckCurrAmt(parseFloat(curr.reduce((a, b) => a + b, 0)).toFixed(2))
            clear(); 
            itemRef.current.focus();
            return false;
            }
           
           
    }

  
  }

  const custNameChange = (val) =>{
    
    clearAll('date'); 
   

    if(val != null){
      itemRef.current.focus()
        setCustomer({Id: val.pur_customer_idpk,Code: val.customer_code, Name: val.customer_name, Openbal: val.opening_balance})
        setOpenAmt(val.opening_balance);
        setNetAmt(parseFloat(OpenAmt) + parseFloat(CurrAmt))
        setDefaultOpeningBal(val.opening_balance)
       
    } else{
        setCustomer({Id: '',Code: '', Name: '', Openbal: ''})
        setOpenAmt('')
        setNetAmt(0 + parseFloat(CurrAmt))
        setDefaultOpeningBal('')
    }
    
    setNetAmt(0)     
  }

  const clearAll = (date) => {

    if(!date){
      setBillDate(moment().format("YYYY-MM-DD"))
    }

    setSalesIDPK('');
    setBillNo('');
    setCustomer({ Id: '',Code: '', Name: '',Openbal: ''})
    setItem({ Id: '',Code: '', Name: ''})
    setQuantity('')
    setUoM('')
    setRate('')
    setSno('')
    setSalesDetIDPK('')
    
    setDetailTableData([])
    setLessAmt('')
    setOpenAmt('')
    setCurrAmt('')
    setBckCurrAmt('')
    setNetAmt('')
    setCollectionAmt('')
    setDefaultOpeningBal('')
    setCommission('')
  }

   // Fetch Data for getCustomerData
   const getCustomerData = () => {

    setLoading(true); 

    let url = config.Api+"purchasecustselect"
    let data ={
      "pur_customer_idpk":"",
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


  const clearItem = (val) => {
    setItem({...Item, Code: val})
    if(val.length == 0){
      setItem({ Id: '',Code: '', Name: ''})
    }
  }

  const saveConsumerBill = async(val) => {

    setConfirmationAlert(null)

        setLoading(true)
        const url = config.Api + "purchase_bill_find";

        var selesDet = []
    await  DetailTableData.map(val=> {
      console.log("val.salesDetIDPK",val.salesDetIDPK)
           selesDet.push({
                pur_det_idpk: val.salesDetIDPK,
                item_id: val.SNo,
                item_name: val.ItemName,
                qty: val.Qty,
                uom_id: val.UoM,
                rate: val.Rate,
                amount: val.Amount,
                status: val.status,
            })
            
        })


        let data = await{
            "salesregistry":[
                {
                "purchase_idpk":SalesIDPK, 
                "bill_no":BillNo,
                "bill_date": BillData,
                "customer_id": Customer.Id,
                "total_amount": NetAmt,
                "less_amount": LessAmt ? LessAmt : "0",
                "opening_balance": NetAmt,
                "old_opening_balance":defaultOpeningBal, 
                "customer_bill_find":selesDet,
              
            }
            ]
        }

        console.log(JSON.stringify(data))

        //return false;

        fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(res => {
            setLoading(false)
            let response = res.Output.status;
            if (response.code == "200") {
              if(response.message == "Success"){
                setMessage({ open: true, color: "success", message: response.message });
                finalClear();
                getCustomerData();
                getItemData(); 
                
              }
              
            } else {
              setMessage({ open: true, color: "error",message: response.message });
            }
          });
        

    
  }


  const itemCodeChange = (val) => {
    if(val != null){
        console.log("not equal null")
        setItem({Id: val.item_idpk,Code: val.item_code, Name: val.item_name})
    } else{
        setItem({Id: "",Code: "", Name: ""})
    } 
  }

  const handlelessAmt = (val) => {
    setLessAmt(val);
    
    if(CollectionAmt){

      if(val.length == 0){

        if(Commission){
          setNetAmt(parseFloat(parseFloat(BckCurrAmt) + parseFloat(defaultOpeningBal)) - parseFloat(parseFloat(CollectionAmt)+  parseFloat(Commission)))
          return false;
        }else{
        setNetAmt(parseFloat(parseFloat(BckCurrAmt) + parseFloat(defaultOpeningBal)) - parseFloat(CollectionAmt))
        return false;
      }

    }

 if(Commission){

      let totless = parseFloat(parseFloat(BckCurrAmt) + parseFloat(defaultOpeningBal)) -  parseFloat(parseFloat(val) + parseFloat(CollectionAmt) +  parseFloat(Commission));

        setLessAmt(val)
        setNetAmt(parseFloat(totless).toFixed(2));
        return false;

      }else{

      let totless = parseFloat(parseFloat(BckCurrAmt) + parseFloat(defaultOpeningBal)) -  parseFloat(parseFloat(val) + parseFloat(CollectionAmt));

        setLessAmt(val)
        setNetAmt(parseFloat(totless).toFixed(2));

        return false;

      }

    }

    if(parseInt(val) > parseFloat(BckCurrAmt)){

      let crr = parseFloat(BckCurrAmt) - 1;

      let currAmt = parseFloat(BckCurrAmt) - parseFloat(crr);
      let netAmt = parseFloat(OpenAmt) + parseFloat(BckCurrAmt - crr);

        setLessAmt(parseFloat(crr).toFixed(2))
        setNetAmt(parseFloat(netAmt).toFixed(2));

        
        return false
    }
    
    if(val.length == 0){
      if(Commission){
        setNetAmt(parseFloat(OpenAmt) + parseFloat(BckCurrAmt) - parseFloat(Commission))
        return false;
    }else{
      setNetAmt(parseFloat(OpenAmt) + parseFloat(BckCurrAmt))
        return false;
    }

    }else{
      if(Commission){
        let netAmt = parseFloat(OpenAmt) + parseFloat(BckCurrAmt - val) - parseFloat(Commission);
          setNetAmt(parseFloat(netAmt).toFixed(2));
          setLessAmt(val)  
      }else{      
        let netAmt = parseFloat(OpenAmt) + parseFloat(BckCurrAmt - val);
      setNetAmt(parseFloat(netAmt).toFixed(2));
        setLessAmt(val)

      }


    }


  }

  const handleBlurLessAmt = () => {

    if(LessAmt){

      let currAmt = parseFloat(BckCurrAmt) - parseFloat(LessAmt);
      let netAmt = parseFloat(OpenAmt) + parseFloat(BckCurrAmt - LessAmt);
        setCurrAmt(parseFloat(currAmt).toFixed(2));
        setNetAmt(parseFloat(netAmt).toFixed(2));
        setLessAmt(parseFloat(LessAmt).toFixed(2))
       
        console.log(parseFloat(currAmt).toFixed(2))
        console.log(parseFloat(netAmt).toFixed(2))

    }
                    
  }

  const handlelCommission = (val) => {
    setCommission(val);

     
    if(CollectionAmt){

      if(val.length == 0){

        if(Commission){
          setNetAmt(parseFloat(parseFloat(BckCurrAmt) + parseFloat(OpenAmt)) - parseFloat(parseFloat(CollectionAmt)+  parseFloat(LessAmt)))
          return false;
        }else{
          setNetAmt(parseFloat(parseFloat(BckCurrAmt) + parseFloat(OpenAmt)) - parseFloat(CollectionAmt))
          return false;
        }
        
      }

      if(Commission){

      let totless = parseFloat(parseFloat(BckCurrAmt) + parseFloat(OpenAmt)) -  parseFloat(parseFloat(val) + parseFloat(CollectionAmt) +  parseFloat(LessAmt));

        // setLessAmt(val)
        setNetAmt(parseFloat(totless).toFixed(2));
        return false;

      }else{

      let totless = parseFloat(parseFloat(BckCurrAmt) + parseFloat(OpenAmt)) -  parseFloat(parseFloat(val) + parseFloat(CollectionAmt));

        // setLessAmt(val)
        setNetAmt(parseFloat(totless).toFixed(2));

        return false;

      }

    }


    if(val.length == 0){
      if(LessAmt){
        setNetAmt(parseFloat(OpenAmt) + parseFloat(BckCurrAmt) - parseFloat(LessAmt)); 
        return false;
      }else{
        setNetAmt(parseFloat(OpenAmt) + parseFloat(BckCurrAmt))
        return false;
      }
    }else{

      if(LessAmt){
        let netAmt = parseFloat(OpenAmt) + parseFloat(BckCurrAmt - val) - parseFloat(LessAmt);
        setNetAmt(parseFloat(netAmt).toFixed(2));
        setCommission(val)

      }else{
        let netAmt = parseFloat(OpenAmt) + parseFloat(BckCurrAmt - val);
        setNetAmt(parseFloat(netAmt).toFixed(2));
        setCommission(val)
      }

    }
                    
  }


  const collectionCalc = (val) => {

    if(parseFloat(val) > parseFloat(defaultOpeningBal)){
      setCollectionAmt(defaultOpeningBal);
    }else{
      setCollectionAmt(val);
    }
    if(val.length == 0){
      setNetAmt(parseFloat(parseFloat(CurrAmt) + parseFloat(defaultOpeningBal) - parseFloat(LessAmt ? LessAmt : 0) - parseFloat(Commission ? Commission : 0)));
     }
  }

const blurCollection = () => {
   if(CollectionAmt){
    // setNetAmt(parseFloat( parseFloat(parseFloat(CurrAmt) - parseFloat(LessAmt ? LessAmt : 0)) + parseFloat(defaultOpeningBal))  - parseFloat(CollectionAmt))
    setNetAmt(parseFloat( parseFloat(parseFloat(CurrAmt) - parseFloat(LessAmt ? LessAmt : 0) - parseFloat(Commission ? Commission : 0)) + parseFloat(defaultOpeningBal))  - parseFloat(CollectionAmt))
   }
   
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}


    return (
        
        <div>
            {confirmationAlert}
            <Notification open={Message.open} color={Message.color} message={Message.message} 
          onClose={()=>setMessage({open: false,color:Message.color})}/>
             <Card>
                <CardBody>
                    <Loading loading={loading} />
                    <GridContainer >
                        <GridItem sm={1} md={1} xs={1} lg={1}> 
                            <Textbox placeholder={"Bill No"}
                                value={SalesIDPK ? BillNo : localStorage.getItem("BillNo")}
                                color={'secondary'}
                                disabled={true}
                            />   
                        </GridItem>

                        <GridItem sm={2} md={2} xs={2} lg={2}> 
                            <Mat_DatePicker
                            value={BillData} 
                            label={'Bill Date'}
                           // minDate={BillData} 
                            onChange={(val)=>{setBillDate(val)}}
                            disabled={ SalesIDPK ? true : false}/>  

                        </GridItem>

                        <GridItem sm={2} md={2} xs={2} lg={2} > 

                        <Autocomplete
                            options= {CustomerData}
                            value={null}
                            autoHighlight
                            getOptionLabel= {(option) => option.customer_code}
                            onChange={(e,val)=>{custNameChange(val)}}
                            inputValue={Customer.Code}
                            onInputChange={(e,val)=>{setCustomer({...Customer, Code: e.target.value})}}
                            id="debug"
                            onBlur={()=>{!Customer.Code && setCustomer({Id: '',Code: '', Name: '', Openbal: ''})  }}
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
                            onBlur={()=>{!Customer.Name  && setCustomer({Id: '',Code: '', Name: '', Openbal: ''}) }}
                            renderInput={(params) => 
                            <TextField {...params} label="Customer Name" 
                            margin="normal" />}
                        />
                           
                        </GridItem>

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
                            <TextField {...params} 
                            label="Item Code"
                            inputRef={itemRef}
                              margin="normal" />}
                        />

                        </GridItem>


                              <GridItem sm={2} md={2} xs={2} lg={2} > 

                                                    
                              <Autocomplete
                                  options= {ItemData}
                                  value={null}
                                  autoHighlight
                                  getOptionLabel= {(option) => option.item_name}
                                  onChange={(e,val)=>{console.log(val);itemCodeChange(val)}}
                                  inputValue={Item.Name}
                                  onInputChange={(e,val)=>{setItem({...Item, Name: e.target.value})}}
                                  id="debug"
                                  onBlur={()=>{!Item.Name && setItem({Id: '',Code: '', Name:''})}}

                                  renderInput={(params) => <TextField {...params} label="Item Name" margin="normal" />}
                              />

                              </GridItem>

                        </GridContainer>

                        <GridContainer>

                       
                        <GridItem sm={1} md={1} xs={1} lg={1} > 
                            <Textbox placeholder={"Quantity"}
                                type="number"
                                value={Quantity}
                                onChange={(val)=>{setQuantity(val)}}
                                // error={ !Quantity ? 'error' : '' }
                                color={Quantity ? 'secondary' :''}
                                //helperText={Customer.Name}
                            />   
                        </GridItem>


                        <GridItem sm={2} md={2} xs={2} lg={2} > 
                            <Select
                            placeholder={"UoM"}
                            data={UomOptions}
                            value={UoM}
                            onChange={val => {setUoM(val);window.UoM = val;}}
                            /> 
                        </GridItem>

                        <GridItem sm={2} md={2} xs={2} lg={2} > 
                            <Textbox placeholder={"Rate"}
                                type="number"
                                value={Rate}
                                onChange={(val)=>{setRate(val)}}
                                // error={ !Rate ? 'error' : '' }
                                color={'secondary'}
                            />   
                        </GridItem>

                      
                        
                        <GridItem sm={6} md={6} xs={6} lg={6}  style={{marginTop:'7px',display:'flex',flexFlow: 'row'}} > 
                          
                       {
                           Sno ?

                           <UpdateBtn  
                           disabled={false}
                           onClick={() => {submitDetConfirmation()}}
                           />
                           :

                           <SaveBtn  
                           label="Add"
                           disabled={false}
                           onClick={() => {submitDetConfirmation()}}
                           />
                      
                       }

                      <RefreshBtn  
                      label="CLR/Ref"
                      disabled={false}
                      onClick={() => { finalClear(); 
                        getCustomerData();
                        getItemData();  }}
                           />

                  
                        

                  <SubmitBtn  
                  label="Save"
                        disabled={false}
                        onClick={() => { submitConfirmation() }}
                        />
                  
                  <ThermalPrtSales 
                      title={'Purchase Registry'}
                      Items={Items}
                      data={DetailTableData}
                      billNo={localStorage.getItem("BillNo")}
                      billDate={!isValidDate(BillData) && BillData != "Invalid Date" ? BillData.split("-").reverse().join("-") : '' }
                      customerCode={Customer.Code}
                      customerName={Customer.Name}
                      currentAmt={isNaN(CurrAmt) ? "" : CurrAmt}
                      openingBal={isNaN(defaultOpeningBal) ? "" : defaultOpeningBal}
                      lessAmt={isNaN(LessAmt) ? "" :LessAmt }
                      netAmt={isNaN(NetAmt) ? "" : parseFloat(NetAmt).toFixed(2)}
                      commission={isNaN(Commission) ? "" :Commission }
                      triggerApi={()=>{ref.current.PrintValue()}}
                      ref={ref}
                    />

</GridItem>
                
                       
                        <GridContainer style={{padding:'0px 10px 10px 10px'}}>
                          
                    <GridItem sm={12} md={12} xs={12} lg={12} style={{marginTop:'10px'}}>
                     
                    
                    <Table
                        className="DocAccountTable"
                        columns={columns} 
                        dataSource={DetailTableData.filter(item=> item.status !== "1")} 
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100']}}
                        // onChange={handleTableChange}
                        scroll={{y: 170}}
                    />   

                        <Typography className="totalsalesRecords" gutterBottom>
                            {"Total"} {

                              SalesIDPK ?

                              DetailTableData.filter(item=> item.status !== "1").length

                              :

                              DetailTableData.length

                            } {"Records"}
                        </Typography>
                    </GridItem> 
                    </GridContainer>
                   {/* </div> */}
                <GridContainer style={{padding:'0px 10px 10px 10px', marginTop:'20px'}}>

                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3} style={{padding:"0px !important"}}>
                  <Textbox placeholder={"Current Amount"}
                        type="number"
                        value={CurrAmt}
                        color={'secondary'}
                        disabled={true}
                        fullWidth={true}
                    /> 
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3} style={{padding:"0px !important"}}>
                  <Textbox placeholder={"Pending Balance"}
                        type="number"
                        value={defaultOpeningBal}
                        color={'secondary'}
                        disabled={true}
                        fullWidth={true}
                    /> 
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3} style={{padding:"0px !important"}}>
                  <Textbox placeholder={"Expense"}
                        type="number"
                        value={LessAmt}
                        onChange={(val)=>{handlelessAmt(val) }}
                        color={'secondary'}
                        disabled={ SalesIDPK ? true : false}
                        fullWidth={true}
                    /> 
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3} style={{padding:"0px !important"}}>
                  <Textbox placeholder={"Commission"}
                        type="number"
                        value={Commission}
                        onChange={(val)=>{handlelCommission(val) }}
                        color={'secondary'}
                        disabled={ SalesIDPK ? true : false}
                        fullWidth={true}
                    /> 
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3} style={{padding:"0px !important"}}>
                  <Textbox placeholder={"Net Amount"}
                        type="number"
                        value={parseFloat(NetAmt).toFixed(2)}
                        color={'secondary'}
                        disabled={true}
                        fullWidth={true}
                    />  
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3}></GridItem>
                  <GridItem sm={3} md={3} xs={3} lg={3} style={{padding:"0px !important"}}>
                        <Textbox placeholder={"Collection"}
                                      type="number"
                                      value={CollectionAmt}
                                      onChange={(val)=>{ collectionCalc(val)}}
                                      onBlur= {()=> blurCollection()}
                                      color={'secondary'}
                                      disabled={ SalesIDPK ? true : false}
                                      fullWidth={true}
                                  />   
                  </GridItem>
                </GridContainer>


             
                
                {/* </GridContainer> */}

               

            </GridContainer>
                </CardBody>
            </Card>
            
        </div>
    )
}


export default withStyles(sweetAlertStyle)(Purchase);


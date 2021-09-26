import React,{useState, useEffect, useRef, useCallback} from 'react';
import ReactDOM from 'react-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Textbox from '../components/_helperComponents/Textbox';
import {MenuList, SubMenuList ,SecondSubMenuList , ThirdSubMenuList,SalesEdit,PurchaseEdit} from './Mainmenu';
import {MenuSearch} from './MenusearchList';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ViewListIcon from '@material-ui/icons/ViewList';
import Button from "../components/CustomButtons/Button.jsx";
import Notification from '../components/_helperComponents/Notification'; 
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Content from './content';
import Dashboard from '../views/Dashboard/Dashboard.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
// import Demo from '../views/HomeScreen';
import { useDispatch, useSelector } from "react-redux";
import {config} from '../config';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; 
import GridContainer from "../components/Grid/GridContainer.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Loading from '../components/_helperComponents/Loading';
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from "@material-ui/core/Tooltip";

import '../assets/css/select.css';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "../Store/store";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import classNames from "classnames";
import DescriptionIcon from '@material-ui/icons/Description';
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import PropTypes from "prop-types";
import adminNavbarLinksStyle from "../assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.jsx";
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Select from '../components/_helperComponents/FilterSelect.js';
import Buttons from '@material-ui/core/Button';
import MenuLists from '@material-ui/core/MenuList';
import Person from '../assets/img/person.jpeg';
import Slide from "@material-ui/core/Slide";
// Icons
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SettingsIcon from '@material-ui/icons/Settings';
import ToggleButton from '@material-ui/lab/ToggleButton';
// import ThemeBtn from './ThemeBtn'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import AddDocument from './AddDocument';
const { store, persistor } = configureStore(); 

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const theme = createMuiTheme({
    overrides: {
            MuiAutocomplete: {
                clearIndicator: {
                    marginTop: '-1px',
                    marginRight: '20px'
                }
            } 
        } 
    });

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 500,
    },
    typography: {
      padding: theme.spacing(2),
      cursor: 'pointer'
    },
    input: {
        color: 'white'
    }
  }),
);

const navigationStyles ={    
    ...adminNavbarLinksStyle,
    
    companyName:{
        fontWeight: 600,
        fontSize: 16,
        marginLeft: 15
    },
    hideName:{
        display: 'none'
    }, 
    smallSidenavUL:{        
        backgroundColor: '#000',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        // backgroundImage:  /*contents.MenuBg ? contents.MenuBg :*/ 'none',
        color: '#fff',
        width: 85,
        top: 0,
        bottom: 0,
        position: 'fixed',
        zIndex: 10,
        marginBottom: 0,
        listStyleType: 'none',
        marginBlockStart: 0,
        marginBlockEnd: 0,
        paddingInlineStart: 0,
        // overflowY: 'scroll',
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        '&:before':{
            content: '""',
            zIndex: '-1',
            position: 'fixed',
            top: 0,
            bottom: 0,
            height: '100%',
            width: '85px',
            background: '#2F2F2F',
            opacity: '0.8'
        }
    },  
    sidenavLISmall:{
        fontSize: '0.85rem',
        fontWeight: '400',
        listStyleType: 'none',
        textAlign: 'center',
    },
    subli:{
        fontSize: '0.85rem',
        fontWeight: '400',
        listStyleType: 'none', 
        width: '250px',
        display: 'inline-block !important '
    },      
    hideArrow:{
        display: 'none'
    },
    
    miniSidenavSpan:{
        padding: "5px 0px 0px 15px",
        position: "absolute",
        fontSize: 15,
        display: "none"
    },
    sidenavHeader:{
        textAlign:'center',
        padding: '8px',
        margin: "0px 10px",        
        borderBottom: '1px solid'
    }, 
       
    content:{
        marginTop: '65px',
        padding: '0px 2%',
    },
    tabDiv:{
        zIndex: 10,
        display: 'flex',
        width: '100%', 
        marginTop:'-5px',
        marginBottom:'-30px'
    },
    tabList:{
        padding: '7px',
        opacity: 0.5,  
        borderRadius: '6px',  
        cursor: 'pointer',
        margin: '3px',
        listStyleType: 'none',
        backgroundColor: '#fff',        
        borderRight: '1px solid gainsboro',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
    }, 
    tabIcons:{
        position: 'relative',
        top:'7px', 
    }, 
    pageContent:{
        display: 'none'
    },
    contentMain:{  
        // width: '100%',
        // //margin: 'auto',
        // padding: '15px', 
        // background: '#fff'
    },  
    profileImg:{
        width: '40px',
        marginRight: '10px',
        background: '#fff',
        borderRadius: '50%',
        '&>img':{
            width: '100%',
            borderRadius: '50%'
        }
    },
    profileDiv:{
        display: 'inline-flex'
    }, 
    menuImgSmall: {
        width: '50px',
        height: '35px'
    },
    dropdown: {
        borderRadius: "3px",
        border: "0",
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
        top: "100%",
        zIndex: "1000",
        minWidth: "160px",
        padding: "5px 0",
        margin: "2px 0 0",
        fontSize: "14px",
        textAlign: "left",
        listStyle: "none",
        backgroundColor: "#fff",
        backgroundClip: "padding-box"
      },
       
      dropdownItem: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
       // fontWeight: "300",
        lineHeight: "1.5em",
        fontSize: "14px",
        padding: "10px 20px",
        margin: "0 5px",
        borderRadius: "2px",
        position: "relative",
        transition: "all 150ms linear",
        display: "block",
        clear: "both",
        fontWeight: "400",
        height: "100%",
        color: '#000',
        whiteSpace: "nowrap",
        minHeight: "unset"
      },
      infoHover: {
        "&:hover": {
          backgroundColor: '#57adc2',
          color: '#fff',
          fontWeight: "400",
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 149, 251,.4)'
        }
      },
      inputFields: {
          marginTop: '10px',
          marginLeft: '15px',
      }
};



let clickID = null;
let sndLvlclickID = null;
let thirdLvlclickID = null;
const tabs = [{
    name: 'Home',
    id: 1,
    active: true,
    page: <Dashboard/>
}];  
var tabArr = ["Home"];

window.TabName = '';

const Navigation = React.memo((props)=>{   
    const content = useSelector(state => state.form);
    const dispatch = useDispatch();  
    const anchorRef = React.useRef(null);    
    const Uname = localStorage.getItem('username');
    const [Message, setMessage] = useState(false);
    const [openProfile, setopenProfile] =  useState(false)
    const [MenuRights, setMenuRights] = useState([]);
    const [expandMenu, setExpandMenu] = useState(false);
    const [Menu, setMenu] = useState([]);
    const [SubMenu, setSubMenu] = useState([]);
    const [SecondSubMenu, setSecondSubMenu] = useState([]);
    const [ThirdSubMenu, setThirdSubMenu] = useState([]);
    const [fstLvlMenu, setFstLvlMenu] = useState(false);
    const [sndLvlMenu, setSndLvlMenu] = useState(false);
    const [thirdLvlMenu, setthirdLvlMenu] = useState(false);
    const [smTop, setSmTop] = useState(0);
    const [smLeft, setSmLeft] = useState(0);
    const [SmHeight, setSmHeight] = useState(0);
    const [SmWidth, setSmWidth] = useState(0);
    const [tmTop, setTmTop] = useState(0);
    const [tmLeft, setTmLeft] = useState(0);
    const [TmWidth, setTmWidth] = useState(0);
    const [TmHeight, setTmHeight] = useState(0);
    const [FMTop, setFMTop] = useState(0);
    const [FMLeft, setFMLeft] = useState(0);
    const [FMWidth, setFMWidth] = useState(0);
    const [FMHeight, setFMHeight] = useState(0);
    const [tabsLi, setTabsLi] = useState(tabs);
    const [Items, setItems] = useState([])
   
    const [anchorEl, setAnchorEl] = React.useState(null); 
    const [placement, setPlacement] = React.useState(null);
    const [MenuVal,setMenuVal] = useState('');
    const [userID] = useState(localStorage.getItem('userid'))
    const [userPassword] = useState(localStorage.getItem('password'))
    const [open, setOpen] = useState(false);
    const [Password ,setPassword] = useState({ Old: '', New: '', Confirm:'' })
    const [Err, setErr] = useState({ error1: '', error2: '', error3: ''})
    const [Helptxt, setHelptxt] = useState({ helperText1: '', helperText2: '', helperText3: ''})
    const [Type, setType] = useState({ type1: 'password', type2: 'password', type3: 'password'})  
    const [loading, setLoading] = useState(false);  
    const [TabName, setTabName] = useState('')
    const [TabArr,setTabArr] = useState(tabArr);
    const [MenuImg,setMenuImg]=useState('#');
    const [selected,setSelected]=useState(false)
    const [SearchMenu, setSearchMenu] = useState([])
    const [AppCount, setAppCount] = useState('')
    const { classes, rtlActive  } = props;  
    const styles = useStyles();
    const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive
    });
    const dropdownItem = classNames(
        classes.dropdownItem,
        classes.infoHover,
        { [classes.dropdownItemRTL]: rtlActive }
    );
    const wrapper = classNames({
        [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
        [classes.managerClasses]: true
    });
    const reload = localStorage.getItem("reload"); 
    // onload
    
    useEffect(()=>{
        dispatch({type:"MenulogoShow",MenulogoShow:false});
        tabArr = ["Home"]; 
       window.TabName = ''
       dispatch({ type: 'logoutMsg', logoutMsg : ''})
    
    },[]);     

    // Show and Set Position of Submenu
    const sndMenu = (e, index, id, row) =>{      
        const findLi = SubMenuList.filter((val)=>{
            return val[id];
        }); 
        let elem = document.querySelector('.active');
        if(elem){ 
            elem.classList.remove('active'); 
        }
        document.querySelector('#'+id+' div').classList.add('active'); 
        if(findLi.length != 0){
            const subList = findLi[0][id];   
            setSubMenu(subList);             
            let totalLi = subList.length;
            let width = Math.ceil(totalLi/row);  
            let liPosition = e.currentTarget.getClientRects()[0]; 
            let liWidth = liPosition.width; 
            let subMenuWidth = 250 * width;
            let windowHeight = window.innerHeight; 
            let subMenuHeight = (liPosition.height * row);
            let calcHeight = liPosition.top + subMenuHeight; 
            // if(windowHeight < calcHeight){ 
            //     let extraHeight =  calcHeight-windowHeight; 
            //     console.log("extraHeight",extraHeight)
            //     if(extraHeight < liPosition.top){
            //         console.log("liPosition.top",liPosition.top)
            //         setSmTop(liPosition.top - extraHeight);
            //         console.log("liPosition.top - extraHeight",liPosition.top - extraHeight)
            //     }else{
            //         setSmTop(extraHeight - liPosition.top);
            //         console.log("extraHeight - liPosition.top",extraHeight - liPosition.top)
            //     }
            // }else{
            //     console.log("liPosition.top",liPosition.top)
            //     setSmTop(liPosition.top);
            // } 
            if(liPosition.top > 450){
                setSmTop(liPosition.top - 100);
            }else{
                setSmTop(liPosition.top);
            }
            //setSmTop(liPosition.top);
            setSmLeft(liPosition.width);   
            setSmHeight(subMenuHeight);
            setSmWidth(subMenuWidth);
        }else{
            setSubMenu([])
            setSmHeight(0);
            setSmWidth(0);
        }  
        if(clickID == index){            
            setFstLvlMenu(!fstLvlMenu);  
            setSndLvlMenu(false);            
            setthirdLvlMenu(false);
        }else{
            setFstLvlMenu(true); 
            setSndLvlMenu(false);
            setthirdLvlMenu(false);
        }   
        clickID = index;
            
    }  

    const trdMenu = (e, index, id, row) =>{         
        const findLi =  SecondSubMenuList.filter((val)=>{
            return val[id];
        });  
        let elem = document.querySelector('.subActive');
        if(elem){ 
            elem.classList.remove('subActive'); 
        }
        document.querySelector('#'+id+' div').classList.add('subActive'); 
        if(findLi.length != 0){
            const subList = findLi[0][id];
            setSecondSubMenu(subList); 
            let totalLi = subList.length;
            let width = Math.ceil(totalLi/row); 
            let liPosition = e.currentTarget.getClientRects()[0];   
            let windowHeight = window.innerHeight;  
            let subMenuWidth = 250 * width;
            let subMenuHeight = liPosition.height * row;
            let calcHeight = liPosition.top + subMenuHeight; 
            if(windowHeight < calcHeight){ 
                let extraHeight =  calcHeight-windowHeight; 
                if(extraHeight < liPosition.top){
                    setTmTop(liPosition.top - extraHeight);
                }else{
                    setTmTop(extraHeight - liPosition.top);
                }
            }else{
                setTmTop(liPosition.top);
            } 
            setTmLeft(liPosition.right);  
            setTmHeight(subMenuHeight);
            setTmWidth(subMenuWidth);
        }else{
            setSecondSubMenu([])
            setTmHeight(0);
            setTmWidth(0);
        }    
        if(sndLvlclickID == index){            
            setSndLvlMenu(!sndLvlMenu);  
            setthirdLvlMenu(false);
        }else{
            setSndLvlMenu(true); 
            setthirdLvlMenu(false);
        }    
        sndLvlclickID = index;
    }  

    const fourthMenu = (e, index, id, row) =>{
        const findLi =  ThirdSubMenuList.filter((val)=>{
            return val[id];
        });  
        let elem = document.querySelector('.subActive2');
        if(elem){ 
            elem.classList.remove('subActive2'); 
        }
        document.querySelector('#'+id+' div').classList.add('subActive2'); 
        if(findLi.length != 0){
            const subList = findLi[0][id].filter((val)=>{
                return MenuRights[0][val.id];
            }); 
            setThirdSubMenu(subList); 
            let totalLi = subList.length;
            let width = Math.ceil(totalLi/row); 
            let liPosition = e.currentTarget.getClientRects()[0];   
            let windowHeight = window.innerHeight;  
            let subMenuWidth = 250 * width;
            let subMenuHeight = liPosition.height * row;
            let calcHeight = liPosition.top + subMenuHeight; 
            if(windowHeight < calcHeight){ 
                let extraHeight =  calcHeight-windowHeight; 
                if(extraHeight < liPosition.top){
                    setFMTop(liPosition.top - extraHeight);
                }else{
                    setFMTop(extraHeight - liPosition.top);
                }
            }else{
                setFMTop(liPosition.top);
            } 
            setFMLeft(liPosition.right);  
            setFMHeight(subMenuHeight);
            setFMWidth(subMenuWidth);
        }else{
            setThirdSubMenu([])
            setFMHeight(0);
            setFMWidth(0);
        }    
        if(thirdLvlclickID == index){            
            setthirdLvlMenu(!thirdLvlMenu);  
        }else{
            setthirdLvlMenu(true); 
        }    
        thirdLvlclickID = index;
    }
    function FirstMenuClick(e,menu){
        newTab(e,menu.TabName, menu.id, menu.icon, menu.component,menu.token,menu.caseType);
        let elem = document.querySelector('.active');
        if(elem){ 
            elem.classList.remove('active'); 
        }
        document.querySelector('#'+menu.id+' div').classList.add('active'); 
    }
    let firstLevelMenuList = MenuList.map((menu, index)=>{          
        return  (
           menu.Child ? (
                <li     
                key={index} 
                id={menu.id} 
                className="sidenavLI"
                onClick={(e)=>{sndMenu(e, index, menu.id, menu.ListCount)}}>
                <div className='liDiv'>
                    {menu.icon ? menu.icon : <AccountBalanceIcon className="MenuIcon"/>}
                    <span className={expandMenu?classes.miniSidenavSpan:"sidenavSpan"}>{menu.TabName}</span>
                    {/* <ArrowForwardIosIcon className={expandMenu?classes.hideArrow: "arrow"}/> */}
                </div> 
                </li>
           )
            : 
            (
                <li     
                key={index} 
                id={menu.id} 
                className="sidenavLI"                       
                onClick={(e)=>{menu.component? FirstMenuClick(e,menu): message(menu.id, 'Main');}}>
                <div className='liDiv'> 
                    {menu.icon ? menu.icon : <AccountBalanceIcon className="MenuIcon"/>}
                    <span className={expandMenu?classes.miniSidenavSpan:"sidenavSpan"}>{menu.TabName}</span>
                    {/* {menu.Child ? <ArrowForwardIosIcon className={expandMenu?classes.hideArrow: classes.arrow}/> : ""} */}
                </div> 
                </li>
            )
       )
           
    });

    const makeActive = (id) =>{      
        document.querySelector('.tabActive').classList.remove('tabActive'); 
        document.querySelector('.activeDiv').className = 'hideDiv';
        document.querySelector("#tab"+id).classList.add('tabActive'); 
        document.querySelector("#div"+id).className = 'activeDiv';
        
    } 

    const removeTab = (e, id, token, caseType) =>{  
       // if(typeof(e) !== 'undefined')
       if (e.stopPropagation) e.stopPropagation();
       // e.stopPropagation();
        //  dispatch(ClearTab(id)); 
         //console.log(e, id, token, caseType)
         let currentTab = document.querySelector("#tab"+id);
         let currentDiv = document.querySelector("#div"+id);
         let prevTab = currentTab.previousElementSibling;
         let prevDiv = currentDiv.previousElementSibling;
         let isActive = currentTab.classList.contains('tabActive');
         currentTab.remove(); 
         currentDiv.remove();
         if(isActive){
             prevTab.classList.add('tabActive');
             prevDiv.className = 'activeDiv';                
         }
          
         tabArr = tabArr.filter(val=> val != id);
        //  dispatch({
        //      type: caseType,
        //      [token]: []
        //  })

        //  console.log(caseType,[token])
    } 
    const newTab = (e,name, id, Icon, Component,token,caseType) =>{ 
       
        if(typeof e == 'undefined'){
            return false;
        }
        if(typeof name == 'undefined'){
            return false;
        }else{

        if(!Component){
            setMessage({ open:true,color:'error',message: 'Page Under Development'})
        }else{ 
            const duplicate = tabArr.find(val=> val == id);  
            if(!duplicate){ 
                tabArr.push(id);   
                setTabArr(TabArr.concat(id));
                document.querySelector('.tabActive').classList.remove('tabActive');
                document.querySelector('.activeDiv').className = 'hideDiv'; 
                var Content='';
                if(id == "ConsumptionRecords"){
                    Content =  (
                        <div onClick={()=>makeActive(id)}>
                            <span className={"tabIcons spanTab"}>
                                {Icon ? <FileCopyIcon  className="SubMenuIcon"/> : <AccountBalanceIcon className="MenuIcon"/>}
                            </span>{name}
                            <span onClick={(e)=>{removeTab(e, id, token, caseType)}}>
                                <CloseIcon className={'closeBtn'} />
                            </span>
                        </div>
                    );
                }else{
                     Content =  (
                        <div onClick={()=>makeActive(id)}>
                            <span className={"tabIcons spanTab"}>
                                {Icon ? Icon : <AccountBalanceIcon className="MenuIcon"/>}
                            </span>{name}
                            <span onClick={(e)=>{removeTab(e, id, token, caseType)}}>
                                <CloseIcon className={'closeBtn'} />
                            </span>
                        </div>
                    );
                } 
                const lastLi = document.querySelector('#tabs');
                const main = document.querySelector('#main');
                const li = document.createElement('li'); 
                const div = document.createElement('div'); 
                const tabli = 'tab'+ id; 
                const divID = 'div'+ id;
                li.textContent = name; 
                li.setAttribute('id', tabli);
                li.setAttribute('class', 'liTabs tabActive');  
                div.setAttribute('id', divID);
                div.setAttribute('class', 'activeDiv');      
                lastLi.appendChild(li);        
                main.appendChild(div);
                ReactDOM.render(Content, document.getElementById(tabli));
                ReactDOM.render(<Provider store={store}><PersistGate persistor={persistor}>{Component}</PersistGate></Provider>, document.getElementById(divID));       
                
                if(tabArr.length > 6){
                   // console.log(e, Items[0].id,Items[0].token,Items[0].caseType)
                    removeTab(e, Items[0].id,Items[0].token,Items[0].caseType)
                    var arr = Items
                    arr.splice(0, 1);
                    arr.push({
                        id:id,
                        token:token,
                        caseType:caseType
                    });
                    setItems(arr)
                }else{
                    setItems([...Items, {
                        id:id,
                        token:token,
                        caseType:caseType
                    }])
                }            
                setFstLvlMenu(false);  
                setSndLvlMenu(false);
                setthirdLvlMenu(false)
                
            }else{
                makeActive(id);
                setFstLvlMenu(false);  
                setSndLvlMenu(false);
                setthirdLvlMenu(false)
            }
        }   
    }         
    } 
    

    const message = (id, level) =>{   
        
        //console.log(id, level);

        if(level == 'submenu1'){          
            let elem = document.querySelector('.subActive');
        if(elem){ 
            elem.classList.remove('subActive'); 
        }
        document.querySelector('#'+id+' div').classList.add('subActive');   
            setSndLvlMenu(false);
            setthirdLvlMenu(false)
        }else if(level == 'submenu2'){
            let elem = document.querySelector('.subActive2');
        if(elem){ 
            elem.classList.remove('subActive2'); 
        }
        document.querySelector('#'+id+' div').classList.add('subActive3'); 
            setthirdLvlMenu(false)
        }else if(level == 'submenu3'){
            let elem = document.querySelector('.subActive3');
            if(elem){ 
                elem.classList.remove('subActive3'); 
            }
            document.querySelector('#'+id+' div').classList.add('subActive3'); 
        }else if(level == 'Main'){
            let elem = document.querySelector('.active');
            if(elem){ 
                elem.classList.remove('active'); 
            }
            document.querySelector('#'+id+' div').classList.add('active'); 
            setFstLvlMenu(false);  
            setSndLvlMenu(false);
            setthirdLvlMenu(false)
        }
        setMessage({ open:true,color:'error',message: 'Page Under Development'})
    }
  
    const handleClick = () => {
        setopenProfile(!openProfile);
    };

    useEffect(() => {
        // if(content.MenuBg){
        //     document.getElementById('SideMenuUl').style.backgroundImage = `url(${content.MenuBg})`;
        // }else{
        //     document.getElementById('SideMenuUl').style.backgroundImage = `none`;
        // }
    },[])
    const logoutFunc = () =>{
       
        setopenProfile(false);
        setMessage({ open:true,color:'success',message: 'Logout sucessfully'})   
        localStorage.setItem('MarFish', false); 
        props.history.push('/login'); 
    //     Token(0).then((val)=>{
    //         console.log("token",val)
    //     const tokenID = val.TokenIDPK;
    //     const tokenName = val.TokenName;     
    //     const url = config.Api + "CommonCustomUpdate/";
    //     const sessionID = localStorage.getItem('SessionID');
    //     const date = new Date();
    //     const Time =  date.getFullYear()+"-" +(date.getMonth()+1) +'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    //     const param = {
    //         "data":[{
    //           "TableNamePrimary":"AdminUserSessionLogs",
    //           "ColumnnNamePrimary":"SessionIDPK",
    //           "ColumnnValuePrimary": sessionID,
    //           "UserActiveStat": "0",
    //           "LogoutTime": Time
    //         }]
    //       };
    //   fetch(url,{
    //       method: "POST",
    //       headers: {  
    //         'Content-Type': 'application/json',  
    //         'TOKEN_ID': tokenID,
    //         'TOKEN_NAME': tokenName
    //       }, 
    //       keepalive: false,
    //       body: JSON.stringify(param)
    //     }) 
    //     .then(res=>res.json())
    //     .then(res=>{ 
    //         if(typeof val.TokenIDPK == 'undefined'){
    //             props.history.push('/Login')
    //             return false;
    //         }
    //       const status = res[0].status;
    //       //status.code
    //       if(status.code == '200'){
    //           dispatch({ type: 'logoutMsg', logoutMsg : 'Logout sucessfully'})
    //         setMessage({ open:true,color:'error',message: 'Logout sucessfully'})      
    //         Idleclear();            
    //         localStorage.clear();      
    //         props.history.push('/Login')
    //       }else{
    //         setMessage({ open:true,color:'error',message: 'Problem In Logout'})
           
    //       }
    //     });
    // })
    }
     
    const oldpassChange = (e) => {
        var val = e.target.value;  
        setPassword({...Password, Old: val})
    
        if(val !== userPassword){
            setHelptxt({...Helptxt,helperText1:'Old Password is Incorrect'})
            setErr({...Err,error1:'error'})
            return false;
        }
        else{
            setHelptxt({...Helptxt,helperText1:''})
            setErr({...Err,error1:''})
            }
    }
    const newpassChange = (e) => {
        var val = e.target.value;  
        setPassword({...Password, New: val})

        if(!val){
            setHelptxt({...Helptxt,helperText2:'New Password is Required'})
            setErr({...Err,error2:'error'})
            return false;
        }
        else{ 
            setHelptxt({...Helptxt,helperText2:''})
            setErr({...Err,error2:''})
        }

        if(Password.Confirm !== val && Password.Confirm !== ''){
            
            setHelptxt({...Helptxt,helperText3:'Password Mismatched'})
            setErr({...Err,error3:'error'})
            return false;  
        }
        else{ 
            setHelptxt({...Helptxt,helperText3:''})
            setErr({...Err,error3:''})
        
        }
    }
    const confirmpassChange = (e) => {
        var val = e.target.value;  
        setPassword({...Password, Confirm: val})

        if(Password.New !== val){
            setHelptxt({...Helptxt,helperText3:'Password Mismatched'})
            setErr({...Err,error3:'error'})
            return false;
        }
        else{
            setHelptxt({...Helptxt,helperText3:''})
            setErr({...Err,error3:''})
            
        }
    }

    const handleClose = () => {
        setOpen(false);
        setPassword({ Old: '', New: '', Confirm:'' })
        setErr({ error1: '', error2: '', error3: ''})
        setHelptxt({ helperText1: '', helperText2: '', helperText3: ''})
        setType({ type1: 'password', type2: 'password', type3: 'password'})
        
    };
    
    const submit = () =>{


    // if(!Password.Old){
    //     setHelptxt({...Helptxt,helperText1:'Old Password is Required'})
    //     setErr({...Err, error1: 'error'});
    //     return false;
    //     }
    //     if(!Password.New){
    //     setHelptxt({...Helptxt,helperText2:'New Password is Required'})
    //     setErr({...Err, error2: 'error'}); 
    //     return false;
    //     }
    //     if(!Password.Confirm){
    //     setHelptxt({...Helptxt,helperText3:'Confirm Password is Required'})
    //     setErr({...Err, error3: 'error'});             
    //     return false;
    //     }
    //     if(!userPassword){
    //     setHelptxt({...Helptxt,helperText1:'Old Password is Incorrect'})
    //     setErr({...Err, error1: 'error'});
    //     return false;
    //     }

    //     if(Err.error1 === 'error' || Err.error2 === 'error' || Err.error3 ==='error'){ 
    //     return false;
    //     }else{

    //     const json =  {
    //         "data": {
    //             "UserID": userID,
    //             "OldPassword": Password.Old,
    //             "NewPassword": Password.New,
    //             "ConfirmPassword": Password.Confirm
    //         }
    //     }
        
        
        
    //     setLoading(true)
    //     Token(0).then(val => {
    //     fetch(config.Api+'ChangePassword/', 
    //     { method: 'POST',
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         TOKEN_ID: val.TokenIDPK,
    //         TOKEN_NAME: val.TokenName,
    //         USER_ID:userID,
    //         FORM_ID:1
    //         },
    //                 body: JSON.stringify(json)
    //         })     
    //         .then(res => res.json())   
    //         .then(res => { 
    //             setLoading(false);
    //             if(res.Output.status.code == "200"){ 
    //                     setMessage({ open:true,color:'success',message: 'Password Changed Successfully'})                       
    //                     setTimeout(function(){
    //                         logoutFunc();  
    //                     }, 1000);    
    //             }else{
    //                     if(res.Output.status.code == "400"){
    //                         setMessage({ open:true,color:'error',message: res.Output.error.message })
    //                     }                    
    //             }
    //         })
    //     })
    //     }   

    }
      
    const iconclick =() =>{
       
        if(Type.type1 === 'password'){
            setType({...Type,type1:'text'})
        }else{
            setType({...Type,type1:'password'})
        }
       
    }
    const icon2click = () =>{
      if(Type.type2 === 'password'){
        setType({...Type,type2:'text'})
      }else{
        setType({...Type,type2:'password'})
      }
    }
    const icon3click = ()=>{
      if(Type.type3 === 'password'){
        setType({...Type,type3:'text'})
      }else{
        setType({...Type,type3:'password'})
      }

    }
    function SlideMenuClose(){
        setExpandMenu(true);
        document.getElementById('SideMenuUl').style.width = "0%";
        document.getElementById('CloseMenu').style.width = "100%";
    }
    function SlideMenuOpen(){
        setExpandMenu(false);
        document.getElementById('SideMenuUl').style.width = "9%";
        document.getElementById('CloseMenu').style.width = "91%";
    }

    function TriggerFunc(){
        let ID = document.getElementById("TriggerNewDoc").value;
        
        if(ID == "SalesEdit"){  

            newTab(1,SalesEdit.TabName, SalesEdit.id, SalesEdit.icon, SalesEdit.component,SalesEdit.token,SalesEdit.caseType)
        } 

        if(ID == "PurchaseEdit"){  

            newTab(1,PurchaseEdit.TabName, PurchaseEdit.id, PurchaseEdit.icon, PurchaseEdit.component,PurchaseEdit.token,PurchaseEdit.caseType)
        }
       
    }

    // Toggle Btn
    const openSlide = () => {
        if(!selected){
            document.getElementById("ThemeSlide").style.width = "28%"; 
            document.getElementById("floatButton").style.right = "382px";
        }else{
            document.getElementById("ThemeSlide").style.width = "0%"; 
            document.getElementById("floatButton").style.right = "8px";
        }
        
        setSelected(!selected);
    }

    const menuChange = (e,menu) => {
        if(menu !== null ){
            window.TabName = menu.TabName;
           newTab(e,menu.TabName, menu.id, menu.icon, menu.component,menu.token,menu.caseType)
        }else{
            setTabName('')
            window.TabName = '';
           
        }  
    }

   

    const ApprovalTab = () => {
        document.getElementById("TriggerNewDoc").value = 'ApprovalTab'; 
        var link = document.getElementById('TriggerNewDoc'); 
        link.click('ApprovalTab');
    }

    

    return(
       
        <div>
        <Notification open={Message.open} color={Message.color} 
            message={Message.message} onClose={()=>setMessage({open: false,color:Message.color})}/>
            <Loading loading={loading} />
            {/* <ThemeBtn/>  */}
            <div id="floatButton" style={{display:"none"}}>
                <ToggleButton
                    value="check"
                    selected={selected} 
                    onChange={(val) => openSlide(val)}
                    >
                    <SettingsIcon />
                </ToggleButton>
            </div> 
            <div className="horizontalNav" id="horizontalNav">
                <GridContainer>
                    <GridItem xs={4} sm={4} md={4} lg={4}>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4} lg={4}>
                                {   (MenuImg != '#' ?
                                        <img alt="" src={MenuImg} className="menuImg"/>
                                        :
                                        null// <h5 style={{color:"black"}}>Menu Image</h5>
                                    )                             
                                }
                            </GridItem> 
                            <GridItem xs={2} sm={2} md={2} lg={2}>
                                    {expandMenu ? (
                                        <Button
                                            justIcon
                                            round 
                                            className="listButton"
                                            onClick={()=>{SlideMenuOpen()}}
                                        >
                                            <MenuIcon className="sidebarMiniIcon" />
                                        </Button>
                                        ) : (
                                        <Button
                                            justIcon
                                            round
                                            color="white"                            
                                            className="listButton"
                                            onClick={()=>{SlideMenuClose()}}
                                        >
                                            <MenuIcon className="sidebarMiniIcon" />
                                        </Button>
                                    )} 
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6} lg={6} align="left">
                                <div className="menuSearch">
                    {/* <div className="menuSearchdes"> */}
                    <MuiThemeProvider theme={theme}>
                    <Paper component="form" className={classes.root} style={{borderRadius: '25px'}}>
                        <Autocomplete
                        id="size-small-standard"
                        size="small"
                        freeSolo
                       // autoComplete   
                       forcePopupIcon={false} 
                       includeInputInList
                        options={MenuSearch}
                        getOptionLabel={(option) => option.TabName}
                        // value={TabName}
                       // inputValue={window.TabName}
                        onChange={(e,menu)=>{menuChange(e,menu) }}
                        renderInput={(params) => (
                            <TextField {...params} variant="standard" 
                            //className={classes.input}
                            style={{marginTop:'10px',height: '30px'}}
                            //autocomplete="off"
                            InputProps={{...params.InputProps, disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment position="start" style={{marginLeft: '-13px'}}>
                                      <AccountCircle style={{color: 'transparent'}} />
                                    </InputAdornment>
                                  ),
                                //   endAdornment: (<InputAdornment position="end">Kg</InputAdornment>),
                                }}
                            placeholder="Search Menu" />
                        )}
                    />

</Paper>
                    </MuiThemeProvider>
{/* </div> */}
                    {/* <Dropdown 
                        className="search-dropdown"
                        data={window.TabName}
                        isLoading={false}
                        placeholder="Search Menu"
                        color="secondary"
                        label={"TabName"} 
                        onSelect={(e, menu) => newTab(e,menu.TabName, menu.id, menu.icon, menu.component,menu.token,menu.caseType)}
                        clientSide={true}
                    />   */}
                                </div> 
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6} lg={6} align="right">

                         {/* <IconButton aria-label="delete" className={classes.margin}>
                    <ThumbUpIcon  />
                    </IconButton>  */}
                  
                   
                    
                    </GridItem> 
                    <GridItem xs={2} sm={2} md={2} lg={2} > 
                        <div className="profile" >
                           <div
                           className={classes.profileDiv}
                           color="transparent"
                            aria-label="Person"
                            aria-owns={open? "profile-menu-list" : null}
                            aria-haspopup="true"
                            onClick={()=>handleClick()}                            
                            ref={anchorRef}
                           >
                           <div className={classes.profileImg}>
                           <img src={Person} alt="Avatar"/>
                           </div>
                           <div className="posAlign">                           
                            <h6 className='Profile-Name' id="welcome">Welcome</h6>
                            <h6 className='Profile-Name' id="user-name">{Uname}</h6>
                            </div>
                           </div>                         
                        <Popper
                            open={openProfile}
                            anchorEl={anchorRef.current}
                            transition
                            disablePortal
                            placement="bottom"
                            className={classNames({
                            [classes.popperClose]: !open,
                            [classes.popperResponsive]: true,
                            [classes.popperNav]: true
                            })}
                        >
                            {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                                id="profile-menu-list"
                                style={{ transformOrigin: "0 0 0" }}
                            >
                            <ClickAwayListener onClickAway={()=>setopenProfile(false)}>
                                <Paper className={classes.dropdown}>
                                    <MenuLists role="menu">
                                    <MenuItem
                                        onClick={()=>setopenProfile(false)}
                                        className={dropdownItem}
                                    >
                                        <PersonIcon/><span>{rtlActive ? "الملف الشخصي" : "Profile"}</span>                                        
                                    </MenuItem>
                                    <MenuItem
                                        onClick={()=>setOpen(true)}
                                        className={dropdownItem}
                                    >
                                        <VpnKeyIcon /> <span>{rtlActive ? "الإعدادات" : "Change Password"}</span>
                                        
                                    </MenuItem>
                                    <Divider light />
                                    <MenuItem
                                        onClick={()=>logoutFunc()}
                                        className={dropdownItem}
                                    >
                                        <PowerSettingsNewIcon/><span>{rtlActive ? "الخروج" : "Log out"} </span>                                        
                                    </MenuItem>
                                    </MenuLists>
                                </Paper>
                                </ClickAwayListener>  
                            </Grow>
                            )}
                        </Popper>  
                        </div> 
                    </GridItem>
                </GridContainer>
            </div>
            <div>
            {/* <h6 className="proText" >
                            Product Developed For <br></br> Siemens By Nanosoft
                    </h6> */}
                <div>
                    
                    <ul id="SideMenuUl" className="sidenavUL" style={{overFlow:"auto"}}
                    onScroll={()=>{setFstLvlMenu(false);setSndLvlMenu(false);setthirdLvlMenu(false)}}>
                        {firstLevelMenuList}
                    </ul>              
                </div>
                <div id="CloseMenu" className="expandNav" onClick={()=>{setFstLvlMenu(false);setSndLvlMenu(false);setthirdLvlMenu(false)}}>                  
                    <div className={classes.content}>
                        <div className={classes.tabDiv} id="tabs">
                        <li className={'liTabs tabActive'} onClick={()=>makeActive('Home')} id="tabHome" style={{marginLeft:'-1px'}}>
                            <span className={classes.tabIcons+" spanTab"}><HomeIcon/></span>Home
                        </li> 
                        </div>
                        <div className={classes.contentMain} id="main">
                        <div className="activeDiv" id="divHome"><Dashboard/></div> 
                        </div> 
                    </div>
                </div>   
            </div>          
            {fstLvlMenu && <div  id="SubMenu" style={{top: smTop, left: smLeft, height: "250px", width: SmWidth}} className="subMenu">
                        { 
                            SubMenu.map((menu, index)=>{    
                                return(
                                    menu.Child?
                                        (<li     
                                        key={index} 
                                        id={menu.id} 
                                        className={classes.subli}
                                        onClick={(e)=>{trdMenu(e, index, menu.id, menu.ListCount)}}>
                                        <div className="subDivli">     
                                            {menu.icon ? menu.icon : <AccountBalanceIcon className="MenuIcon"/>}                       
                                            <span className={""}>{menu.TabName}</span> 
                                            <ArrowForwardIosIcon className={expandMenu?classes.hideArrow: "arrow"}/>                                         
                                        </div> 
                                        </li>):
                                        (<li     
                                        key={index} 
                                        id={menu.id} 
                                        className={classes.subli} 
                                        onClick={(e)=>{menu.component? newTab(e,menu.TabName, menu.id, menu.icon, menu.component,menu.token,menu.caseType): message(menu.id, 'submenu1');}}>
                                        <div className="subDivli">     
                                        {menu.icon ? menu.icon : <AccountBalanceIcon className="MenuIcon"/>}                       
                                        <span className={""}>{menu.TabName}</span>                                          
                                        </div> 
                                        </li>)
                                        )
                            })
                         }
                </div>
            }
            {sndLvlMenu && <div  id="SubMen2" style={{top: tmTop, left: tmLeft, /*height: TmHeight,*/ width: TmWidth}} className="subMenu2">
                    {                    
                        SecondSubMenu.map((menu, index)=>{   
                            return(
                                menu.Child?
                                    (<li     
                                    key={index} 
                                    id={menu.id} 
                                    className={classes.subli}
                                    onClick={(e)=>fourthMenu(e, index, menu.id, menu.ListCount)}>
                                    <div className="subDivli">   
                                        <AccountBalanceIcon className="SubMenuIcon"/>                    
                                        <span className="SubTabName">{menu.TabName}</span>
                                        <ArrowForwardIosIcon className={expandMenu?classes.hideArrow: "arrow"}/>      
                                    </div>
                                    </li>):
                                    (<li     
                                    key={index} 
                                    id={menu.id} 
                                    className={classes.subli} 
                                    onClick={(e)=>{menu.component? newTab(e,menu.TabName, menu.id, menu.icon, menu.component,menu.token,menu.caseType): message(menu.id, 'submenu3');}}>
                                    <div className="subDivli">     
                                    {menu.icon ? menu.icon : <AccountBalanceIcon className="SubMenuIcon"/>}                       
                                    <span className="SubTabName">{menu.TabName}</span>                                          
                                    </div> 
                                    </li>)
                                    )
                        })
                    }
                </div>
            }
            
            {thirdLvlMenu && <div  id="SubMenu3" style={{top: FMTop, left: FMLeft, height: FMHeight, width: FMWidth}} className="subMenu3">
                    {                    
                        ThirdSubMenu.map((menu, index)=>{ 
                            return(
                                menu.Child?
                                    (<li     
                                    key={index} 
                                    id={menu.id} 
                                    className={classes.subli}
                                    onClick={(e)=>{}}>
                                    <div className="subDivli">   
                                    <AccountBalanceIcon className="SubMenuIcon"/>                    
                                    <span className="SubTabName">{menu.TabName}</span>
                                    <ArrowForwardIosIcon className={expandMenu?classes.hideArrow: "arrow"}/>      
                                    </div>
                                    </li>):
                                    (<li     
                                    key={index} 
                                    id={menu.id} 
                                    className={classes.subli} 
                                    onClick={(e)=>{menu.component? newTab(e,menu.TabName, menu.id, menu.icon, menu.component,menu.token,menu.caseType): message(menu.id, 'submenu3');}}>
                                    <div className="subDivli">     
                                    {menu.icon ? menu.icon : <AccountBalanceIcon className="SubMenuIcon"/>}                       
                                    <span className="SubTabName">{menu.TabName}</span>                                          
                                    </div> 
                                    </li>)
                                    )
                        }) 
                    }
                    </div>
                } 
                        <Dialog style={{zIndex:'98'}}         
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted 
                            disableEscapeKeyDown 
                            disableBackdropClick
                            onClose={handleClose}
                            aria-labelledby="classic-modal-slide-title"
                            aria-describedby="classic-modal-slide-description"
                            >

                            <DialogContent
                                id="classic-modal-slide-description"
                                className={classes.modalBody}
                            > 
                                <GridContainer >
                                <GridItem xs={12} sm={12} md={12}> 
                                            <CustomInput
                                                labelText="Old Password"
                                                helperText={Helptxt.helperText1}
                                                error={Err.error1 === "error"}
                                                inputProps={{
                                                    type: Type.type1,
                                                    value:Password.Old,
                                                    onChange:oldpassChange,
                                                    autoComplete: "off",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {(Type.type1 === 'password') ?                                                                 
                                                                <VisibilityOff style={{color:"#3F95FC"}} 
                                                                onClick={iconclick}/>
                                                            :
                                                                <Visibility style={{color: "#47BE71"}} 
                                                                onClick={iconclick}/>
                                                            }
                                                        </InputAdornment>
                                                    )
                                                
                                                }}
                                                formControlProps={{
                                                fullWidth: true
                                                }}
                                            
                                            
                                            />
                                

                                            <CustomInput
                                                labelText="New Password"
                                                helperText={Helptxt.helperText2}
                                                error={Err.error2 === "error"}
                                                inputProps={{
                                                    type: Type.type2,
                                                    value: Password.New,
                                                    onChange:newpassChange,
                                                    autoComplete: "off",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {(Type.type2 === 'password') ?                                                                 
                                                                <VisibilityOff style={{color:"#3F95FC"}} 
                                                                onClick={icon2click}/>
                                                            :
                                                                <Visibility style={{color: "#47BE71"}}
                                                                onClick={icon2click}/>
                                                            }
                                                        </InputAdornment>
                                                    )
                                                
                                                }}
                                                formControlProps={{
                                                fullWidth: true
                                                }}
                                            
                                            />

                                            <CustomInput
                                                labelText="Confirm Password"
                                                helperText={Helptxt.helperText3} 
                                                error={Err.error3 === "error"}
                                                inputProps={{
                                                    type: Type.type3,
                                                    value:Password.Confirm,
                                                    onChange:confirmpassChange,
                                                    autoComplete: "off",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {(Type.type3 === 'password') ? 
                                                                <VisibilityOff style={{color:"#3F95FC"}} 
                                                                onClick={icon3click}/>
                                                            :
                                                                <Visibility style={{color: "#47BE71"}} 
                                                                onClick={icon3click}/>                                                                
                                                            }
                                                        </InputAdornment>
                                                    )
                                                
                                                }}
                                                formControlProps={{
                                                fullWidth: true
                                                }}
                                            
                                            />

                                
                                </GridItem>      
                                </GridContainer>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={()=>handleClose()} color="info">
                                Cancel
                                </Button>
                                <Button className={classes.dlgbtn} color="rose" 
                                onClick={()=>submit()}>RESET</Button>
                            </DialogActions>
                        </Dialog> 
                        <input type="hidden" id="TriggerNewDoc"  
                            onClick={TriggerFunc} />
                </div> 
       
        );
});

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool, 
};

export default withStyles(navigationStyles)(Navigation);
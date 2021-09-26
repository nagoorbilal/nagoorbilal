import React, { useState } from 'react'; 
import { withStyles } from '@material-ui/styles';
const contentStyles = {
    tabDiv:{
        display: 'flex'
    },
    tabList:{
        padding: 5,    
        cursor: 'pointer',
        listStyleType: 'none',
        backgroundColor: '#fff',        
        borderRight: '1px solid gainsboro',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
    },
    closeBtn:{
        color: 'red',
        marginLeft: 5,
        fontWeight: 400
    },
    active:{
        backgroundColor: 'darkgray'
    }
}

const tabs = [{
    name: 'Home',
    id: 1,
    active: true
},{
    name: 'Services',
    id: 2,
    active: false
},{
    name: 'Settings',
    id: 3,
    active: false
},{
    name: 'Contract',
    id: 4,
    active: false
},{
    name: 'Inventory',
    id: 5,
    active: false
}];
function Content(props){
    const {classes} = props;
    const [tabsLi, setTabsLi] = useState(tabs);    
    const tabList = tabsLi.map((tab)=>{ 
        if(tab.active){
            return  (<li className={classes.tabList+' '+classes.active} onClick={()=>makeActive(tab.id)}>{tab.name}
                        <span className={classes.closeBtn} onClick={()=>removeTab(tab.id)}>x</span>
                    </li>);
        }else{
            return  (<li className={classes.tabList} onClick={()=>makeActive(tab.id)}>{tab.name}
                        <span className={classes.closeBtn} onClick={()=>removeTab(tab.id)}>x</span>
                    </li>);
        }
    });
    const makeActive = (id) =>{  
        const data = tabsLi.map((tab)=>{  
            var temp = Object.assign({}, tab);
            if(tab.id == id){
                temp.active = true;
            }else{
                temp.active = false;
            }
            return temp;
        });
        setTabsLi(data);
    } 
    const removeTab = (id) =>{ 
        const removed = tabsLi.filter(tab=>tab.id != id);
        setTabsLi(removed);  
    } 

    const newTab = (name, id) =>{
    }
    return(
        <div className={classes.tabDiv}>

            {   
                tabsLi.map((tab, index)=>{ 
                    if(tab.active){
                        return  (<li key={index} className={classes.tabList+' '+classes.active} onClick={()=>makeActive(tab.id)}>{tab.name}
                                    <span className={classes.closeBtn} onClick={()=>removeTab(tab.id)}>x</span>
                                </li>);
                    }else{
                        return  (<li key={index} className={classes.tabList} onClick={()=>makeActive(tab.id)}>{tab.name}
                                    <span className={classes.closeBtn} onClick={()=>removeTab(tab.id)}>x</span>
                                </li>);
                    }
                })
            }
        </div>
    );
}

export default withStyles(contentStyles)(Content);
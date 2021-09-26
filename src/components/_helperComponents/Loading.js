import React ,{useState,useEffect} from 'react';
import { withStyles } from "@material-ui/core/styles";
import spinners from '../../assets/img/Curve-Loading.gif';

const divStyle={
    position:'absolute',
   // left: '50%',
    textAlign:'center',
     top: '30%',
    width: '100%',
    // height: '100%',
    zIndex: '99',
    transform: 'translate(-50%, -50%)',
    transform: '-webkit-translate(-50%, -50%)',
    transform: '-moz-translate(-50%, -50%)',
    transform: '-ms-translate(-50%, -50%)',
}

const styles = theme => ({
    root: {
        width:'100%' ,
        height:'100%',
        zIndex:'99',
        position:'absolute',
        background:'#fff',
        opacity: '0.7'
    },
    img: {
        width:'15%',
        webkitTouchCallout: 'none', /* iOS Safari */
        webkitUserSelect: 'none', /* Safari */
         khtmlUserSelect: 'none', /* Konqueror HTML */
           mozUserSelect: 'none', /* Old versions of Firefox */
            msUserSelect: 'none', /* Internet Explorer/Edge */
                userSelect: 'none', /* Non-prefixed version, currently
                                      supported by Chrome, Opera and Firefox */
    },
    font:{
        fontColor:'#000',
        fontWeight:'400',
        userSelect:'none'
    }
  });
  


function Customloading(props){
    const { classes } = props;
    const [visible , setVisible] = useState('hidden');

   useEffect(() => {

        if(props.loading === true){
            setVisible('visible');
        }else{
            setVisible('hidden');
        }
   })

    return (
        <div className={classes.root} style={{visibility:visible}} draggable="false">
        <div style={divStyle} draggable="false"> 
            <img draggable="false" src={'static/media/Curve-Loading.657ed726.gif'} alt="Logo" className={classes.img}  />
         
            <div > <h4 className={classes.font}>loading .....</h4></div>  
        </div>
        
        </div>
    )
}


export default withStyles(styles)(Customloading);
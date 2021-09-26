import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// common core component  
import Textbox from '../../components/_helperComponents/Textbox'
import Button from "../../components/CustomButtons/Button";
import Notification from '../../components/_helperComponents/Notification'; 
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import Loading from '../../components/_helperComponents/Loading';

// url config file
import {config} from '../../config.js'; 
import Logo from '../../assets/img/arm.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '78vh',
  },
  Grdcontainerwid:{
    width:'calc(100% + 15px) !important',
},
  image: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#fff',
      // theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imgDiv: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  imgMain: {
    float: 'right',
    width: '33%',
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [Messages, setMessage] = useState({ open: false,color: '',message: '' });
  const [loading, setLoading] = useState(false);

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState(""); 

  const keypress = (e) => {
    if(e.key === 'Enter'){
        logSubmit();
      }
}

    const logSubmit = () => {
        // alert("logged in")

        if(!UserName){
            setMessage({ open: true,color: 'error',message: "Please Enter the UserName" });
            return false;
        }
        if(!Password){
            setMessage({ open: true,color: 'error',message: "Please Enter the Password" });
            return false;
        }

        loginFun();

        // if(UserName == 'admin' && Password == '123456'){
        //     localStorage.setItem('MarFish', true);  
        //     localStorage.setItem('username', 'admin');
        //     setMessage({ open: true,color: 'success',message: "Login Successfully" });
        //     props.history.push('/Home'); 
        // }else{
        //     setMessage({ open: true,color: 'error',message: "Invalid UserName or Password" });
        // }

    }

    const loginFun = () => {

        setLoading(true)
        let url = config.Api+"login"
        let data = {
                   "username":UserName,
                   "password": Password
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

            //console.log(res)

            if(res.Output.status.message == "Failed"){
                setMessage({ open: true,color: 'error',message: "Invalid UserName or Password" });
              // setMessage({  open: true, color: "error", message: "Data Not Found" });
            }else{
              localStorage.setItem('MarFish', true); 
              localStorage.setItem('username', UserName);
              localStorage.setItem("BillNo", res.Output.data.bill_no);
              props.history.push('/Home'); 
            }

        })
        
    }

  return (
    <div  className={classes.bgm}>
    <Notification open={Messages.open} color={Messages.color} 
    message={Messages.message} onClose={()=>setMessage({open: false,color:Messages.color})}/>

    <Loading loading={loading} />

<GridContainer justify="space-evenly" className={classes.Grdcontainerwid}> 

              
            <GridItem xs={12} sm={12} md={11} style={{ margin:'2% 0%'}}>

            <Card className={classes.cardstyle}>

            <Grid container component="main" className={classes.root}>
      
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

         {/* <div className={classes.imgDiv}>
             <img className={classes.imgMain} src={"static/media/marlogo.a235b18a.jpeg"}/>
          </div> */}

        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}


                <div className={classes.contentBody}>
    
                    <h3 className={classes.TextWeight500}>Welcome Back</h3>
                     <p className={classes.TextWeight400}>Please Sign in to your account</p>
                 <div>

          <form className={classes.form} noValidate>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}

                <Textbox 
                    placeholder="Username"
                    id='username'
                    type='text'
                    onChange={(val)=>setUserName(val)}
                    onKeyPress={(e) => keypress(e)}
                    keyPress={true}
                    color={'secondary'}
                    />   

             <Textbox 
                    placeholder={"Password"}
                    id={'password'}
                    type={'password'}
                    onChange={(val)=>setPassword(val)} 
                    onKeyPress={(e) => keypress(e)} 
                    keyPress={true}
                    color={'secondary'}
                    />  

            <FormControlLabel
              control={<Checkbox value="remember" style={{color: '#65A2F9'}}
               />}
              label="Remember me"
            />
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button> */}

<Grid container>

            <Button  color="smartblue"  
            fullWidth
                       onClick={() => logSubmit()} 
                       >login</Button>

</Grid>
            <Grid container style={{marginTop: '10px'}}>
              <Grid item xs>
                <Link href="#" variant="body2" style={{color: '#65A2F9'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" style={{color: '#65A2F9'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              {/* <Copyright /> */}
            </Box>
          </form>
          </div>
          </div>
        </div>
      </Grid>
    </Grid>

              </Card>  
              </GridItem>
              </GridContainer>
    </div>
    
  );
}
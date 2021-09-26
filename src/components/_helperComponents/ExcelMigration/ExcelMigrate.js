import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import GridContainer from "../../Grid/GridContainer.jsx";
import GridItem from "../../Grid/GridItem.jsx";
import Button from "../../CustomButtons/Button";
import CloseIcon from '@material-ui/icons/Close';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';


const useStyles = theme => ({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  }
});

// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
// import { SheetJSFT } from './types';

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      fileName:'',
    }
    // this.handleFile = this.handleFile.bind(this);
  //  this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange = (e) => {
   // console.log(e)
    const files = e.target.files;
    
    this.setState({ fileName: e.target.files[0].name})
//  console.log(files)
    this.props.filename(e.target.files[0].name)

    var a = e.target.files[0].name;
    var filename = a.split(/\.(?=[^\.]+$)/);

    // console.log(filename[1])

    if(filename[1] == ("xls" )|| filename[1] == ("xlsx")) {

    if (files && files[0]) this.setState({ file: files[0] });

    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });

      if(this.props.SheetCount > 1){

        var SheetNames = wb.SheetNames.slice(0, this.props.SheetCount);
        let sheetarray = []
      SheetNames.map((val,key) => {
        
         /* Get first worksheet */
      const wsname = wb.SheetNames[key];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      let data = XLSX.utils.sheet_to_json(ws);
      sheetarray.push(data)


      })
      this.props.data(sheetarray)
       //console.log(sheetarray)
      }else{
        //console.log("else")
         /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
       // console.log(JSON.stringify(this.state.data, null, 2));
        this.props.data(this.state.data, null, 2)
      });

      }

    };
 
    if (rABS) {
      reader.readAsBinaryString(files[0]);
    } else {
      reader.readAsArrayBuffer(files[0]);
    };

    this.props.process(false)
     
    }else{
      this.props.process(true)
      this.props.Messages("You can only upload Excel file!");
      return false;
    }

     
  };

  // onInputClick = (event) => {
  //   event.target.value = ''
  // }
  
  render() {
    const { classes } = this.props;


  let icon = null; 
  if (this.props.NameFile) {
    icon = <CloseIcon style={{width: '18px', color: '#777'}}
    onClick={(e)=>{this.props.reset()}}/>;
  } 

 

    return (
      <GridContainer>
        <GridItem sm={12}>
          <GridContainer>
            <GridItem sm={4}>

            <input type="file" className="form-control" id="myInput"
               ref={(ref) => this.myInput = ref} style={{ display: 'none' }} 
               onChange={(e)=>{this.handleChange(e)}}
               onClick={(event)=> { event.target.value = null }}
                />

            <Button 
            size="sm"
            color={'success'}
            className="BrowseBtn"
            startIcon={<PageviewOutlinedIcon className="AddBtnIcon"/>}
            onClick={(e) => {this.myInput.click()} }>Browse file</Button>

            </GridItem>
            <GridItem sm={8}>

            <TextField value={this.props.NameFile}
            disabled={true}
            multiline
            rowsMax={"2"}
            fullWidth
            InputProps={{ 
              classes,
              endAdornment: icon
             }} />

            </GridItem>
          </GridContainer>


        </GridItem>

       
      </GridContainer>
        
        
    )
  }
}
ExcelReader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(ExcelReader);
// export default ExcelReader;
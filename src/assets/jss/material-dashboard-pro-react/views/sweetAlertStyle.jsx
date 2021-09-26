import { grayColor ,tooltip, cardTitle } from '../../material-dashboard-pro-react';

import buttonStyle from "../../material-dashboard-pro-react/components/buttonStyle";
import divStyles from "../../../css/divStyles.js"

const sweetAlertStyle = { 
//  tooltip,
cardIconTitle: {
  ...cardTitle,
  marginTop: "5px",
  marginBottom: "0px",
  color: "#343a40",
  fontSize: "16px",
  fontWeight:"500"
},
  ...buttonStyle,
  ...divStyles
};

export default sweetAlertStyle;
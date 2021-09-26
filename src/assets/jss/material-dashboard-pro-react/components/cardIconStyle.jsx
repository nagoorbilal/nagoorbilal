/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    smartgreenCardHeader,
    smartblueCardHeader,
    grayColor
  } from "../../../../assets/jss/material-dashboard-pro-react.jsx";
  const cardIconStyle = {
    cardIcon: {
      "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader,&$smartgreenCardHeader,&$smartblueCardHeader": {
        borderRadius: "3px",
        // backgroundColor: grayColor[0],
        padding: "9px",
        marginTop: "-24px",
        marginRight: "15px",
        float: "right"
      }
    },
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    smartgreenCardHeader,
    smartblueCardHeader
  };
  
  export default cardIconStyle;
  
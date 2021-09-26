
import React from "react";
import styles from './print.css';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
 const mystyle = {
      width: "3px"
    };
  const mystyle2 = {
      width: "40px"
    };  
    const mystyle3 = {
      width: "30px"
    }; 


class ComponentToPrint extends React.Component {

  render() {
    return (
       <div id="invoice-POS">

    <center id="top">
      <div className="logo"></div>
      <div className="info"> 
        <h4>MAR FISH</h4>
      </div>
    </center>

    <div id="mid">
	      <div className="info">
		        <p> 
		            Address : street city, state<br/>
		            Contact No : +91 99999 99999<br/>
		        </p>
	      </div>
      <div className="flex">
        <div className="flex-item">
        <p> <sm>Bill No</sm><br/><span>AAAA-BBBB</span><br/>
            <sm>Customer Code</sm><br/><span>1111-1111</span><br/>
        </p>
 
        </div>
        <div className="flex-item">
         <p> <sm>Bill Date</sm><br/><span>10-10-2020</span><br/>
            <sm>Customer Name</sm><br/><span>Apple</span><br/>
        </p>
        </div>
      </div>
    </div>
<table>
                <thead>
                    <tr>
                        <th className="description">Item Name</th>
                        <th className="quantity">Qty/Kg/Box</th>
                        <th className="price">Rate</th>
                        <th className="price">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="description">பாரை</td>
                        <td className="quantity">1</td>
                        <td className="price">375</td>
                        <td className="price">375.00</td>
                    </tr>
                     <tr>
                        <td className="description">பாரை</td>
                        <td className="quantity">1</td>
                        <td className="price">375</td>
                        <td className="price">375.00</td>
                    </tr>
                    
                    <tr>
                        <td className="quantity"></td>
                        <td className="quantity"></td>
                        <td className="description">TOTAL</td>
                        <td className="price">$55.00</td>
                    </tr>
                </tbody>
            </table>

    
                   

                    

          
  </div>

    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a>Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;


import CanvasJSReact from '../../assets/reactcanvas/canvasjs.react';
var React = require('react');
var Component = React.Component;

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class ContractChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: this.props.value,
          
    
      };
        
      }


		render() {
            let value= this.props.value;
            
     
            const options = {
               
                height: 210,
                width:1100,
                                animationEnabled: true,
	                        	animationDuration: 5000,
								theme: "light2",
								axisY:{

                            gridThickness: 0,
                            labelFontSize: 0,	
                            tickThickness: 0,
                            
                          },
                          axisX:{
                            interval: 1,
                            intervalType: "month"
                          },
                          data: [
                            {
                                // Change type to "doughnut", "line", "splineArea", etc.
                                type: "column",
                                name: 'Consumed',
                                indexLabel: "{y}",
                                showInLegend: true,
                                indexLabelFontSize:"15",
                                dataPoints: [
                                    { label: "Jan",  y: 10  },
                                    { label: "Feb", y: 15  },
                                    { label: "Mar", y: 25  },
                                    { label: "Apr",  y: 30  },
                                    { label: "May",  y: 28  },
                                    { label: "Jun",  y: 40  },
                                    { label: "Jul",  y: 25  },
                                    { label: "Aug",  y: 19  },
                                    { label: "Sep",  y: 18  },
                                    { label: "Oct",  y: 19  },
                                    { label: "Nov",  y: 10  },
                                    { label: "Dec",  y: 5  }
                                ]
                            },
                            {
                                // Change type to "doughnut", "line", "splineArea", etc.
                                type: "column",
                                name: 'Billed',
                                indexLabel: "{y}",
                                showInLegend: true,
                                indexLabelFontSize:"15",
                                dataPoints: [
                                    { label: "Jan",  y: 10  },
                                    { label: "Feb", y: 15  },
                                    { label: "Mar", y: 25  },
                                    { label: "Apr",  y: 30  },
                                    { label: "May",  y: 28  },
                                    { label: "Jun",  y: 40  },
                                    { label: "Jul",  y: 25  },
                                    { label: "Aug",  y: 19  },
                                    { label: "Sep",  y: 18  },
                                    { label: "Oct",  y: 19  },
                                    { label: "Nov",  y: 10  },
                                    { label: "Dec",  y: 5  }
                                ]
                            }
                            ]
            }

          

        
            return (
                // className="areachart"
                <div >
                
                   
                                <CanvasJSChart options = {options}
                                    /* onRef={ref => this.chart = ref} */
                                />
                           
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            );
	}
}

export default ContractChart;

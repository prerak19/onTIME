import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

class DashboardGraph extends React.Component {
  state = {
    dataHorizontal: {
      labels: ['OTHA', 'CLA'],
      datasets: [
        {
          label: 'Total Hours',
          data: [1,2],
          fill: true,
          backgroundColor: [
            '#FDCA2E',
            '#699CFC'
          ],
          borderColor: [
            '#FDCA2E',
            '#699CFC'
          ],
        }
      ]
    }
  };

  render() {
    return (
      <div className="width-95 ml-auto">
        <HorizontalBar width={100}
          height={15}
          data={this.state.dataHorizontal}
            options={{
              legend: {
                display: false,
              }, 
              responsive: true, 
              scales: {
                xAxes: [{
                  
                  ticks: {
                    drawTicks: false,padding:5,fontColor:'#000',
                    max: 12,
                    min: 0,
                    stepSize: 1
                  },
                    gridLines: {
                      drawBorder: true,drawOnChartArea:false,drawTicks: false
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Hours',fontColor:'#000',
                    }
                },{
                  position: 'top',
                  ticks: {
                    display: false
                },
                gridLines: {
                    drawBorder: true,
                    drawTicks: false
                }
                }],
                yAxes: [{                  
                  ticks: {
                    drawTicks: false,padding:5,fontColor:'#000',
                  },
                    gridLines: {
                      drawBorder: true,drawOnChartArea:false,drawTicks: false
                    }
                },{
                  position: 'right',
                  ticks: {
                    display: false
                },
                gridLines: {
                    display: false,drawBorder: true,
                    drawTicks: false
                }
                }]
              } 
            }}
        />
      </div>
    );
  }
}

export default DashboardGraph;
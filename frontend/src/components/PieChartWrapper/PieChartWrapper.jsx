import React from 'react';
import {Panel} from 'react-bootstrap'
import {Chart} from 'react-google-charts';
import request from 'superagent'

import LoadingAnimation from './../LoadingAnimation/LoadingAnimation.jsx'

import './pieChartWrapper.css'

class PieChartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      consumption: [
        ['Meat', 'Quantity'],
        ['Beef',  2],
        ['Bison', 2],
        ['Lamb',  2]
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUserIndex !== this.props.selectedUserIndex) {
      this.setState({
        isLoading: true
      })
      let user = nextProps.userData[nextProps.selectedUserIndex]
      request
        .get('/bar-types')
        .query({user: user.user})
        .end((err, res)=>{
          const data = JSON.parse(res.text);
          const formattedData = [['Meat', 'Quantity']];

          data.map((data) => {
            formattedData.push(this.formatDataForGraph(data)) 
          })

          this.setState({
            isLoading: false,
            consumption: formattedData
          })
        });
    }
  }

  formatDataForGraph(data) {
    return [data.type, data.quantity]
  }

  render() {
    let user = this.props.userData[this.props.selectedUserIndex]
    return (
      <Panel header={`Meat consumption ${user?'by ' + user.user:''}`}>
        <LoadingAnimation isLoading={this.state.isLoading}/>
        <div className={`piechart${this.state.isLoading? ' faded':''}`}>
          <Chart
            chartType="PieChart"
            data={this.state.consumption}
            options={{}}
            graph_id="PieChart"
            width="100%"
            height="400px"
            loader=" "
            legend_toggle/>
        </div>
      </Panel>
    )
  }
}

module.exports = PieChartWrapper;

import React from 'react';
import {Panel, Table} from 'react-bootstrap'
import request from 'superagent'

import LoadingAnimation from './../LoadingAnimation/LoadingAnimation.jsx'

import './consumptionTable.css'

class ConsumptionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  handleClick(index) {
    this.props.selectUser(index);
  }

  componentDidMount() {
    request
      .get('/people')
      .end((err, res)=>{
        if (err) throw err;
        const people = JSON.parse(res.text);

        const promisifiedReqs = people.map((person) => {
          return (
            request
              .get('/consumptions')
              .query({user: person.name})
          )
        })

        Promise.all(promisifiedReqs)
        .then((data)=> {

          const formattedData = data.map((res) => {
            return JSON.parse(res.text);
          })

          this.props.updateUserData(formattedData);
          this.setState({
            isLoading: false,
          })          
        })

      });
  }

  render() {
    return (
      <div>
        <Panel  header="Number of consumptions by user">
          <LoadingAnimation isLoading={this.state.isLoading}/>
          <div className={`panel${this.state.isLoading? ' faded' : ''}`}>
            <Table responsive hover={true}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Consumption</th>
                </tr>
              </thead>
              <tbody>
                {this.props.userData.map((data, index) => {
                  return (
                    <tr key={index} onClick={()=>this.handleClick(index)}>
                      <td>{data.user}</td>
                      <td>{data.consumption}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </Panel>
      </div>
      )
  }
}

module.exports = ConsumptionTable;

import React from 'react';
import reactDOM from 'react-dom'
import {Grid, Row, Col, PageHeader} from 'react-bootstrap'

import PieChartWrapper from './components/PieChartWrapper/PieChartWrapper.jsx'
import ConsumptionTable from './components/ConsumptionTable/ConsumptionTable.jsx' 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserIndex: null,
      userData: []
    }
    this.selectUser = this.selectUser.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  selectUser(index) {
    this.setState({
      selectedUserIndex: index
    })
  }

  updateUserData(data) {
    this.setState({
      selectedUserIndex: 0,
      userData: data
    })
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row className="title-bar">
          <Col xs={12} sm={12} md={12} lg={12}>
            <PageHeader>Meat <small>data analysis for Epic Meat Bars</small></PageHeader>
          </Col>
        </Row>
        <Row className="main-view">
          <Col xs={12} sm={12} md={6} lg={6}>
            <ConsumptionTable 
              selectUser={this.selectUser}
              updateUserData={this.updateUserData}
              userData={this.state.userData}/>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <PieChartWrapper 
              selectedUserIndex={this.state.selectedUserIndex}
              userData={this.state.userData}
              />
          </Col>
        </Row>
      </Grid>

    )
  }
}

reactDOM.render(React.createElement(App), document.getElementById('app'))

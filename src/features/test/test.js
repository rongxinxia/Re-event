import React, { Component } from 'react'
import {connect} from 'react-redux'
import {increment_Counter,decrement_Counter} from './testActions'
import {Button} from 'semantic-ui-react'

class test extends Component {
  render() {
    return (
      <div>
          <h1> this is {this.props.data}</h1>
          <Button onClick={this.props.increment_Counter}>add</Button>
          <Button onClick={this.props.decrement_Counter}>substract</Button>
      </div>
    )
  }
}

const actions={increment_Counter,decrement_Counter};

const mapState=(state)=>({
    data: state.test.data
});


export default connect(mapState,actions)(test);

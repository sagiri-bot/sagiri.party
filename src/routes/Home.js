import React, { Fragment, Component } from 'react'
import Header from './home/Header'
import Resume from './home/Resume'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Resume />
      </Fragment>
    )
  }
}

export default Home
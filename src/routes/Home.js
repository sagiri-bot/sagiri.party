import React, { Component } from 'react'
import Header from './home/Header'
import Resume from './home/Resume'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="columns is-multiline">
          <Header />

          <Resume />
        </div>
      </div>
    )
  }
}

export default Home
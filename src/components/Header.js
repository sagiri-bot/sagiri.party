import React, { Component } from 'react'

import Navbar from './header/Navbar'

class Header extends Component {
  render() {
    return (
      <section className="hero is-dark">
        <Navbar />
      </section>
    )
  }
}

export default Header
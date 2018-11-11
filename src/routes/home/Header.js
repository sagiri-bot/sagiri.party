import React, { Component } from 'react'

class Subtitle extends Component {
  render() {
    return (
      <h1 className="subtitle is-2 align-center">
        <a className="button is-success is-large" href="https://sagiri.party/invite">
          Invite
        </a>
        <hr />
        <img className="header-image" src={require("../../sagiri-hero.png")} alt="mascot" />
      </h1>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <div className="column is-12">
        <h1 className="title is-2 align-center">Make your Discord more awesome</h1>
        <Subtitle />
      </div>
    )
  }
}

export default Header
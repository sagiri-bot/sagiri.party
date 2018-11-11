import React, { Component } from 'react'

const classNames = require('classnames');

class LeftColumn extends Component {
  render() {
    return (
      <div className="is-parent is-vertical">
        <p>Loreum posum</p>
      </div>
    )
  }
}

class RightColumn extends Component {
  render() {
    return (
      <div className="is-parent is-vertical">
        <img className="header-image" src={require("../../screen.png")} alt="screen" />
      </div>
    )
  }
}

class Bottom extends Component {
  render() {
    return (
      <div className="is-parent">
        <article className="is-child notification is-dark">
          <p className="title">
            <i className="fa fa-terminal" aria-hidden="true"></i> Commands
          </p>
        </article>
      </div>
    )
  }
}

class Features extends Component {
  render() {
    return (
      <div className="column is-12">
        <h3 className="title is-2">Perk up your Discord server</h3>
        <div className="title is-ancestor">
          <div className="is-vertical is-12">
            <div className="">
              <LeftColumn />
              <RightColumn />
            </div>
            <Bottom />
          </div>
        </div>
      </div>
    )
  }
}

export default Features
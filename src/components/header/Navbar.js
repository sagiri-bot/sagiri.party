import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class InternalItemLink extends Component {
  render() {
    return (
      <li>
        <NavLink to={this.props.href} exact={this.props.exact} activeStyle={{ backgroundColor: '#2B2B2B', borderColor: '#2B2B2B', color: 'white' }} >
          {this.props.name}
        </NavLink>
      </li>
    )
  }
}

class ExternalItemLink extends Component {
  render() {
    return (
      <li>
        <a href={this.props.href}>{this.props.name}</a>
      </li>
    )
  }
}

class ItemLink extends Component {
  render() {
    if (this.props.external) {
      return (<ExternalItemLink name={this.props.name} href={this.props.href} />)
    } else {
      return (<InternalItemLink exact={this.props.exact} name={this.props.name} href={this.props.href} />)
    }
  }
}

class Item extends Component {
  render() {
    return (
      <ItemLink external={this.props.external} exact={this.props.exact} name={this.props.name} href={this.props.href} />
    )
  }
}

class Navbar extends Component {
  render() {
    return (
      <div className="hero-foot">
        <nav className="is-fullwidth">
          <div className="container">
            <ul>
              <Item name="Home" href="/" exact />
              <Item name="Commands" href="/commands" />
              <Item name="Donate" href="/donate" />
              <Item external name="Invite the bot" href="https://dabbot.org/invite" />
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
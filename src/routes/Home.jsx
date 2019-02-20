import React, { Fragment, Component } from 'react';
import Header from './home/Header';
import Features from './home/Features';
import Reviews from "./home/Reviews";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Features />
        <Reviews />
      </Fragment>
    )
  }
}

export default Home;
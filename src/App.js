import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './routes/Home'
// import Commands from './routes/Commands'
// import Donate from './routes/Donate'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <section className="section">
              <div className="container">
                <Route exact path="/" component={Home} />
                {/* <Route path="/commands" component={Commands} />
                <Route path="/donate" component={Donate} />  */}
              </div>
            </section>
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
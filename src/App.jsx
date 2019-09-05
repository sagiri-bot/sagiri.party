import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './routes/Home'
import Commands from './routes/Commands'
import Premium from './routes/Premium'
import Community from './routes/Community'

import './scss/sagiri.scss';


const history = createHistory()
history.listen(location => {
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
})


class App extends Component {
  componentDidMount() {
		ReactGA.pageview(window.location.pathname)
  }
  
  render() {
    
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/commands" component={Commands} />
            <Route path="/premium" component={Premium} />
            <Route path="/community" component={Community} />
            <Route path="/invite" component={Community} />
            <Route path="/community" component={Community} />
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
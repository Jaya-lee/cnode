import React, { Component } from 'react';
import{ BrowserRouter as Router,Route} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Home from './home.js'
import Topic from './topic.js'
import User from './user.js'
class App extends Component {
  render() {
    return (
      <Router>
          <Route render={props=>
          <div>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={3000}
                transitionLeaveTimeout={3000}>
              <div className={props.location.key} key={props.location.key}>
                 <Route exact path='/' component={Home}></Route>
                  <Route path='/topic/:id' component={Topic}></Route>
                  <Route path='/user/:loginname' component={User}></Route>
              </div>
              {/* 匹配到topic下面的任何路径时，挂载Topic */}
              </ReactCSSTransitionGroup>

          </div>
      }/>
      </Router>
    );
  }
}

export default App;

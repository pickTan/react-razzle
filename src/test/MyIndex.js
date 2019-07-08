import React,{Component} from 'react';
import logo from './react.svg';
import './Home.css';
import * as acs  from './home/js/healper';

class Home extends Component {
  render() {
      console.log(acs)
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to fynnpeng</h2>
        </div>

      </div>
    );
  }
}

export default Home;

import React from 'react';
import G2_logo from '../static/img/G2_logo.png';


//
class Overview extends React.Component {



	render() {
		return (
      <div className="text-center" style={{backgroundColor: 'black', height:'100vh'}} >
		  <img src={G2_logo} width="100%" height="100%"/> 
      </div>

		)
	}
}

export default Overview

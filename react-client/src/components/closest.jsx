import React from 'react';

import ClosestRow from './closestRow.jsx';

class Closest extends React.Component {
  constructor(props){
    super(props);

    // TODO: pass props to ClosestRow!
  }

  render(){
    // for each restaurant in props.restaurants...

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Rating</th>
            <th>Omit</th>
          </tr>
        </thead>

        <tbody>
          {this.props.restaurants.map((shop, i)=> (
            <ClosestRow shop={shop} index={i}/>
          ))
          }
        </tbody>
      </table>
    )
  }

}

export default Closest;
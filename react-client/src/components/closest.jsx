import React from 'react';


const Closest = (props) => {
  let rows = props.restaurants.map((shop, i) => {
    let {name, url, rating} = shop;
    i = i + 1;
    let linkedName = <a href={url}>{name}</a>
    
    if (props.visited.includes(i)) {
      return (
        <tr></tr>
        ) 
    } else {
      return (
        <tr>
        <td>{i}</td>
        <td>{linkedName}</td>
        <td>{rating}</td>
        <td><button value={i} onClick={props.handleOmit}>Went</button></td>
        </tr>
        ) 
  
    }
  })
  
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
        {rows}
      </tbody>
    </table>
  )

}


export default Closest;

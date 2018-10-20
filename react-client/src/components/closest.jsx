import React from 'react';


const Closest = (props) => {
  let rows = props.restaurants.map((shop, i) => {
    let {name, url, rating, is_closed, visited} = shop;
    i = i + 1;
    let linkedName = <a href={url}>{name}</a>
    let open = is_closed ? 'Closed' : 'Open'
    
    if (props.visited.includes(i) || visited) {
      return (
        <tr></tr>
        ) 
    } else {
      return (
        <tr>
        <td>{i}</td>
        <td>{linkedName}</td>
        <td>{open}</td>
        <td>{rating}</td>
        <td><button value={i} onClick={props.handleOmit}>Went</button></td>
        </tr>
        ) 
  
    }
  })

  let randomElem = (
  <div>
    <h2>Go to...</h2>
    {props.randomChosen}
  </div>
  )

  let random = props.isRandom ? randomElem : ""
  
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Open</th>
          <th>Rating</th>
          <th>Omit</th>
        </tr>
      </thead>
  
      <tbody>
        {rows}
      </tbody>
    </table>
    <div>
      {random}
    </div>
    </div>
  )

}


export default Closest;

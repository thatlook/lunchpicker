import React from 'react';


const Closest = (props) => {
  console.log('>>> in closest', props.restaurants.length, props.visited)
  let rows = props.restaurants.map((shop, i) => {
    let {name, url, rating, is_closed, visited} = shop;
    i = i + 1;
    let linkedName = <a href={url}>{name}</a>
    let open = is_closed ? 'Closed' : 'Open'
    
    if (props.visited.includes(i) || visited) {
      return 
    } else {
      return (
        <tr style={{height: '30px'}}>
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
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h2>Go to</h2>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {props.randomChosen}
      </div>

    </div>
  )

  let random = props.isRandom ? randomElem : "";

  let tableStyle = {
    tableLayout: 'auto',
    width: '90%',
    padding: '40px'
  }
  
  return (
    <div>
    <table style={tableStyle}>
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

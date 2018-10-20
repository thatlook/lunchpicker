import React from 'react';


class Closest extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visited: [],
    }

    // line-through css
    // this.tdStyle = {  
    //   textDecoration: 'line-through'
    // }
  }

  handleOmit(event){
    event.preventDefault();
    // console.log('>>> event target value', event.target.value)
    
    event.persist();  // to use in below in .setState
    this.setState((state) => {  // this is how to trigger state change of array
      if (!state.visited.includes(parseInt(event.target.value))) {
        state.visited.push(parseInt(event.target.value))
        
      }
    })

    // send to DB that this person went
  }

  render(){
    // console.log('>>> re rendered!', this.state.visited)
    let rows = this.props.restaurants.map((shop, i) => {
      let {name, url, rating} = shop;
      i = i + 1;
      let linkedName = <a href={url}>{name}</a>
      
      if (this.state.visited.includes(i)) {
        return (
          <tr></tr>
          ) 
      } else {
        return (
          <tr>
          <td>{i}</td>
          <td>{linkedName}</td>
          <td>{rating}</td>
          <td><button value={i} onClick={this.handleOmit.bind(this)}>Went</button></td>
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

}

export default Closest;

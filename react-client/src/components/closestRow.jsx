import React from 'react';

class ClosestRow extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visited: [],
      changed: 0
    }

    // add cross out
    this.tdStyle = {
      textDecoration: 'line-through'
    }
  }

  handleOmit(event){
    event.preventDefault();
    // send to DB that this person went
    console.log('>>> event target value', event.target.value)
    this.state.visited.push(event.target.value)
    // set state!!
  }

  render(){
    let {name, url, rating, } = this.props.shop;
    let i = this.props.index + 1;
    let linkedName = <a href={url}>{name}</a>

    console.log('>>> visited', this.state.visited)
    
    if (this.state.visited.includes(i)) {
      return (
        <tr style={this.tdStyle}>
        <td>{i}</td>
        <td>{linkedName}</td>
        <td>{rating}</td>
        <td><button value={i - 1} onClick={this.handleOmit.bind(this)}>Went</button></td>
        </tr>        
      )
    } else {
      return (
          <tr>
            <td>{i}</td>
            <td>{linkedName}</td>
            <td>{rating}</td>
            <td><button value={i - 1} onClick={this.handleOmit.bind(this)}>Went</button></td>
          </tr>
      )

    }

  }

}

export default ClosestRow;
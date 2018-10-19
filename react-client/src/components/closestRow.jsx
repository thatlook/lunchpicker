import React from 'react';

class ClosestRow extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visited: []
    }
  }

  handleOmit(event){
    event.preventDefault();
    // send to DB that this person went

  }

  render(){
    let {name, url, rating, } = this.props.shop;

    let i = this.props.index + 1;

    let linkedName = <a href={url}>{name}</a>
    return (
        <tr>
          <td>{i}</td>
          <td>{linkedName}</td>
          <td>{rating}</td>
          <td><button onClick={this.handleOmit.bind(this)}>Went</button></td>
        </tr>
    )
  }

}

export default ClosestRow;
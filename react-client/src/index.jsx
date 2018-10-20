import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import axios from 'axios';

import Closest from './components/closest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      myAddr: '119 Nueces St. Austin TX 78701',  // my current address
      totalStores: 0,  // number of stores in DB
      main: 'main',  // used as react side router
      restaurants: [],  // all restaurants to show
      visited: [],  // all restaurants hidden because visited
    };

    // line-through css
    // this.tdStyle = {  
    //   textDecoration: 'line-through'
    // }

  }

  componentDidMount() {
    // get number of stores from database
    axios.get('/total').then((res)=>{
      // console.log('>>> total stores from axios', res.data)
      this.setState({
        totalStores: res.data
      })
    })
  }

  handleSubmitAddr(event){
    event.preventDefault();
    // TODO: change me!
    axios.post('/closest', { myAddr: this.state.myAddr }).then((res)=>{
      // console.log('>>> res from axios: ', res.data);
      
      this.setState({
        main: 'closest',  // redirect to next page
        restaurants: res.data
      })

    })
    
  }

  handleChangeAddr(event){
    this.setState({
      myAddr: event.target.value
    })
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


  render () {
    // main page
    if (this.state.main === 'main') {
      return (
      <div>
        <h3>There are {this.state.totalStores} restaurants in the database!</h3>
        <h1>My Address</h1>
        <form onSubmit={this.handleSubmitAddr.bind(this)}>
          <input type="text" name="myAddr" onChange={this.handleChangeAddr.bind(this)}></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>)
      // closest restaurant
    } else if (this.state.main === 'closest') {
      return (
        <div>
          <h1>These are the closest restaurants!</h1>
          <Closest restaurants={this.state.restaurants} visited={this.state.visited} handleOmit={this.handleOmit.bind(this)}/>
        </div>
      )
    } 

  }
}

ReactDOM.render(<App />, document.getElementById('app'));

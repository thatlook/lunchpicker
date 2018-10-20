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
      myPastAddr: ['119 Nueces St. Austin TX 78701'],  // my past restaurants
      random: false
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
    // add visited addr to db
  }


  handleOmit(event){
    event.preventDefault();
    // console.log('>>> event target value', event.target.value)
    
    let i = parseInt(event.target.value);
    event.persist();  // to use in below in .setState
    this.setState((state) => {  // this is how to trigger state change of array
      if (!state.visited.includes(i)) {
        state.visited.push(i)
        axios.post('/went', { shop: state.restaurants[i - 1] })  // send to db
        
      }
    })

  }

  randomPicker(event){
    event.preventDefault();

    // TODO: choose random shop
    let limit = this.state.restaurants.length;  // TODO: reflect what was taken out...
    console.log('>>> random', Math.floor(Math.random()*(limit - 1)))

    this.setState({
      random: true,
      randomChosen: 'Here'
    })
  }

  goBackToSearch(event){
    event.preventDefault();

    this.setState({
      main: 'main'
    })
  }


  render () {
    // main page
    if (this.state.main === 'main') {
      return (
      <div>
        <h1>Hungry & Lazy</h1>
        <h2>You have visited {this.state.totalStores} restaurants from...</h2>
        {this.state.myPastAddr.map((addr, key) => {
        
        return (
          <li>
          <a href="">{addr}</a>
          </li>
          )

        })}
        <br></br>
        <br></br>
        <h2>Add new address</h2>
        <form onSubmit={this.handleSubmitAddr.bind(this)}>
          <input type="text" name="myAddr" onChange={this.handleChangeAddr.bind(this)}></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>)
      // closest restaurant
    } else if (this.state.main === 'closest') {
      return (
        <div>
          <h1>These are the closest restaurants you haven't visited!</h1>
          <Closest restaurants={this.state.restaurants} 
            visited={this.state.visited} 
            handleOmit={this.handleOmit.bind(this)}
            randomChosen={this.state.randomChosen}
            isRandom={this.state.random}
          />
          {/* TODO:  */}
          <br></br>
          <button onClick={this.goBackToSearch.bind(this)}>Go back</button>
          <button>Show all</button>
          <button onClick={this.randomPicker.bind(this)}>Random</button>
        </div>
      )
    } else if (this.state.main === 'login') {
      // login with first/last name
    } 

  }




}

ReactDOM.render(<App />, document.getElementById('app'));

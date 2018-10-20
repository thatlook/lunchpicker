import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import axios from 'axios';

import Closest from './components/closest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    // some addresses
    // home: 501 W 26th St, Austin, TX 78705
    // galvanize: 119 Nueces St. Austin TX 78701
    // LA: 6060 Center Dr #950, Los Angeles, CA 90045
    // new york: 315 Hudson Street Second Floor, New York, NY 10013
    // san fransisco hack reactor: 944 Market Street, 8th floor, San Francisco, CA 94102

    this.state = { 
      myAddr: '',  // my current address
      main: 'main',  // used as react side router
      restaurants: [],  // all restaurants to show

      visited: [],  // all restaurants hidden because visited
      myPastAddr: [],  // my past restaurants
      random: false
    };

  }


  handleSubmitAddr(event){
    event.preventDefault();
    this.setState({main: 'closest'})

    this.setState((state) => {
      if (!state.myPastAddr.includes(state.myAddr)) {
        state.myPastAddr.push(state.myAddr)

        // 1) save address to db, 2) fetch and save shops to db, 3) render shops on page
        console.log('>>> myaddr', this.state.myAddr)
        axios.post('/closest', { myAddr: this.state.myAddr }).then((res)=>{
          // console.log('>>> res from axios: ', res.data);
          
          this.setState({
            restaurants: res.data,  
            visited: []
          })
    
        })

      }

      

    })

    
  }

  handleChangeAddr(event){
    event.preventDefault();
    event.persist();

    this.setState({myAddr: event.target.value})


  }


  handleOmit(event){
    event.preventDefault();
    // console.log('>>> event target value', event.target.value)
    
    let i = parseInt(event.target.value);
    event.persist();  // to use in below in .setState
    this.setState((state) => {  // this is how to trigger state change of array
      if (!state.visited.includes(i)) {
        state.visited.push(i)
        axios.post('/went', { shop: state.restaurants[i -1] })  // send to db
        
      }
    })

  }

  randomPicker(event){
    event.preventDefault();

    let odds = this.state.restaurants.filter((item, i)=> (!this.state.visited.includes(i + 1) && !item.visited))
    let limit = odds.length;
    let randomI = Math.floor(Math.random()*(limit - 1))
    let randomShop = odds[randomI].name;
    console.log('>>> random shop', randomShop)
    console.log('>>> rest/visited', this.state.restaurants.length, this.state.visited.length, odds)
    console.log('>>> randomI', limit, randomI)
    this.setState({
      random: true,
      randomChosen: randomShop
    })
  }

  goBackToSearch(event){
    event.preventDefault();

    this.setState({
      main: 'main'
    })
  }


  render () {
    // console.log('>>> state', this.state.main)
    // main page
    if (this.state.main === 'main') {
      return (
      <div>
        <h1>Hungry & Lazy</h1>
        <h2>You have visited {this.state.totalStores} restaurants from...</h2>
        {this.state.myPastAddr.map((addr, key) => {
        
        return (
          <li>
          <a href="#" onClick={this.handleSubmitAddr.bind(this)}>{addr}</a>
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
          <br></br>
          <button onClick={this.goBackToSearch.bind(this)}>Go back</button>
          {/* <button>Show all 20</button> */}
          <button onClick={this.randomPicker.bind(this)}>Random</button>
        </div>
      )
    }

  }




}

ReactDOM.render(<App />, document.getElementById('app'));

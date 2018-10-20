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
        // console.log('>>> myaddr', this.state.myAddr)
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

  handleShowAll(event){
    event.preventDefault();
    let myAddr = this.state.myAddr;
    axios.post('/all', {myAddr}).then((res) => {
      this.setState({
        visited:[],
        restaurants: res.data
      })
    })
  }


  render () {
    // console.log('>>> state', this.state.main)
    
    const divStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

    // main page
    if (this.state.main === 'main') {
      return (
      <div>
        <div style={divStyle}>
          <h1>Hungry & Lazy</h1>
        </div>

        <div style={divStyle}>
          <h2>You have visited {this.state.myPastAddr.length} restaurants from...</h2>
        </div>

        <div style={{textAlign: 'center'}}>
          {this.state.myPastAddr.map((addr, key) => {
            return (
              <li>
              <a href="#" onClick={this.handleSubmitAddr.bind(this)}>{addr}</a>
              </li>
              )})
          }
        </div>

        <div style={divStyle}>
          <h2>Add new address</h2>
        </div>

        <div style={divStyle}>
          <form onSubmit={this.handleSubmitAddr.bind(this)}>
            <input type="text" name="myAddr" onChange={this.handleChangeAddr.bind(this)} style={{height: '20px'}}></input>
            <input type="submit" value="submit"></input>
          </form>
        </div>

      </div>)
      // closest restaurant
    } else if (this.state.main === 'closest') {

      return (
        <div>
          <div style={divStyle}>
            <h1>These are the closest restaurants!</h1>
          </div>

          <div>
            <Closest restaurants={this.state.restaurants} 
              visited={this.state.visited} 
              handleOmit={this.handleOmit.bind(this)}
              randomChosen={this.state.randomChosen}
              isRandom={this.state.random}
            />
          </div>

          <br></br><br></br>
          <div style={divStyle}>
            <button onClick={this.goBackToSearch.bind(this)} style={{marginLeft: '50px', marginRight: '20px'}}>Go back</button>
            <button onClick={this.handleShowAll.bind(this)}>Reset visits</button>
            <button onClick={this.randomPicker.bind(this)} style={{marginRight: '50px', marginLeft: '20px'}}>Random</button>
          </div>

        </div>
      )
    }

  }




}

ReactDOM.render(<App />, document.getElementById('app'));

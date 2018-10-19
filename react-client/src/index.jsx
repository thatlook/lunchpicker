import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import axios from 'axios';

import Closest from './components/closest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      myAddr: '119 Nueces St. Austin TX 78701',
      totalStores: 0,
      main: 'main',
      restaurants: [],
    }
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
    axios.post('/closest', { myAddr: '119 Nueces St. Austin TX 78701' }).then((res)=>{
      // console.log('>>> res from axios: ', res.data);
      
      this.setState({
        main: 'closest',  // redirect to next page
        restaurants: res.data
      })

    }).catch((err)=>{
      this.setState({
        main: 'error'  // redirect to error page
      })
    })
  }

  handleChangeAddr(event){
    this.setState({
      myAddr: event.target.value
    })
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
          <Closest restaurants={this.state.restaurants}/>
        </div>
      )
      // if error
    } else if (this.state.main === 'error') {
      return (
        <div>
          <h1>An error occured...OTL</h1>
        </div>
      )
    }

  }
}

ReactDOM.render(<App />, document.getElementById('app'));

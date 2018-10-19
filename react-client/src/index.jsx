import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import axios from 'axios';

// import Closest from './components/Closest.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      myAddr: '',
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

  handleSubmit(event){
    event.preventDefault();
    // console.log('>>> my addr in handleSubmit', this.state.myAddr);
    axios.post('/closest', this.state.myAddr).then((res)=>{
      console.log('>>> res from axios: ', res.data);
      
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

  handleChange(event){
    this.setState({
      myAddr: event.target.value
    })
  }

  render () {
    // main page
    if (this.state.main === 'main') {
      return (<div>
        <h3>There are {this.state.totalStores} restaurants in the database!</h3>
        <h1>My Address</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="myAddr" onChange={this.handleChange.bind(this)}></input>
          <input type="submit" value="submit"></input>
        </form>
      </div>)
      // closest restaurant
    } else if (this.state.main === 'closest') {
      return (
        <div>
          <h1>These are the closest restaurants!</h1>
          <table>

          </table>
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

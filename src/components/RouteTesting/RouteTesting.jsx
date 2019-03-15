import React, { useContext } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import Web3Provider from './../Providers/Web3Provider';
import axios from 'axios';
import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);

console.log("web3 loaded in route testing, version: ", web3.version);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class RouteTesting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      publicAddress: '',
      usernameProvided: true,
      username: '',
      contractDeployed: false
    }
  }
  async componentWillMount() {
    console.log("route testing mounted, getting accounts....");
    await web3.eth.getAccounts().then(accounts => {
      this.setState({
        publicAddress: accounts[0]
      });
    });
    console.log("route test mounted, public address:", this.state.publicAddress);
    const getUser = 'http://localhost:3001/getUser';
    axios.put(getUser, {publicAddress: this.state.publicAddress}).then(
      (res) => {
        console.log("result from getuser: ", res.data);
        if(!res.data.username){
          console.log("no username found");
          this.setState({usernameProvided: false});
        }
        else {
          this.setState({
            username: res.data.username
          })
        }
      });
  }
  handleChangeUsername = (event) => {
    this.setState({username: event.target.value});
  }
  handleSubmitUsername = (event) => {
    event.preventDefault();
    console.log("username on submit: ", this.state.username);
    const updateUser = 'http://localhost:3001/updateUser';
    axios.put(updateUser, {publicAddress: this.state.publicAddress, username: this.state.username}).then(
      (res) => {
        console.log("result from update user: ", res.data);
        if(!res.data.username){
          console.log("no username found");
          this.setState({usernameProvided: false});
        }
        else {
          this.setState({
            username: res.data.username,
            usernameProvided: true
          })
        }
      });
  }
  handleDeployForm = (event) => {
    event.preventDefault();
    console.log("contract deployed");
    const toAddress = 'adressofrecipient';
    const fromAddress = this.state.publicAddress;
    const getUser = 'http://localhost:3001/getUser';
    //TODO: create contract object to pass to the addcontract route
    //
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>A central place to test all the routes</h1>
        <p>They will be as follows:</p>
        <ol>
          <li>(x)Check if user is in database on mount, create if not - return user object</li>
          <li>(x)If user.username is null, prompt for a username and access updateUser route</li>
          <li>()When a contract is deployed, access addContract route (twice) - can just use web3 contract object and extract values?</li>
          <li>()Send addContract(fromAddress) - this one sets userRole: "from", contractStatus: "pendingPayment"</li>
          <li>()Send addContract(toAddress) - this one sets userRole: "to", contractStatus: "pendingPayment"</li>
          <li>()Send updateContract(contractAddress) - this one sets contractStatus: "paymentAdded"</li>
          <li>()Send updateContract(contractAddress) - this one sets contractStatus: "servicesDelivered"</li>
          <li>()Maybe make some of the above event listeners, or more reliant on the app?</li>
        </ol>
        <p>Username: {this.state.username ? this.state.username : "Username Not Provided"}</p>
        {this.state.usernameProvided ? null :
          <form onSubmit={this.handleSubmitUsername}>
            <label>
              <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
            </label><br/>
            <input type="submit" value="Submit" />
          </form>}
      </div>
    );
  }
}

export default withStyles(styles)(RouteTesting);

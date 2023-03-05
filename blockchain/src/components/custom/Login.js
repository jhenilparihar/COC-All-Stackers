import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username);

    axios
      .get("http://localhost:8000/api/electionName", {})
      .then(function (response) {
        var data = response.data;
        let flag = 0;
        data.map((item, index) => {
          if (username == item.election_organizer && item.election_pass)
            flag = item.election_id;
        });
        if (flag == 0) {
          alert("Incorrect Username or Password");
        } else {
          window.location.assign("/elections");
        }
      })
      .catch(function (err) {
        console.error(err);
      });

    // axios.post('http://localhost:8000/api/adminLogin', {
    //     username: username,
    //     password: password,
    // })
    // .then(function(response){
    //     if(response.data){
    //         window.location.assign("/newelection")
    //     }else{
    //         alert('Incorrect Username or Password');
    //     }
    // })
    // .catch(function(err){
    //     console.error(err);
    // });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="name">Username</label>
          <br></br>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="name">Password</label>
          <br></br>
          <br></br>
          <button className="btn blue darken-2" type="submit" name="action">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

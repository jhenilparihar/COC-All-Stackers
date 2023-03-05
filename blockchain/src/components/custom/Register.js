import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            user_password: '',
        };
    }

    handleInputChange = e => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username,user_password } = this.state;
        console.log(user_password,username);
        axios.post('http://localhost:8000/api/userdetails', {
            username: username,
            password: user_password
        })
        .then(function(response){ 
            window.location.assign('/');
        })
        .catch(function(err){
            console.error(err);
        });
    }

    render(){
        return(
            <div className="container">
                <h4>Create New Election</h4>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input type="text" id="election_name" name="election_name" onChange={this.handleInputChange} required/> */}
                        <label htmlFor="username">Username</label><br></br>
                        <input type="text" id="election_organizer" name="username" onChange={this.handleInputChange} required/>
                        
                        <label htmlFor="user_password">Password</label><br></br><br></br>
                        <input type="text" id="election_name" name="user_password" onChange={this.handleInputChange} required/>

                        <button className="btn blue darken-2" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
            </div>
        )
    }
}

export default Register;
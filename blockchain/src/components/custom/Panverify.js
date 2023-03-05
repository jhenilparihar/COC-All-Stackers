import React, { Component } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
var myHeaders = new Headers();



class Pan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pan: '',
        };
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    // sendEmail = (from_name,to_name,otp,reply_to) => {
    //     const data={
    //         from_name:from_name,
    //         to_name:to_name,
    //         otp:otp,
    //         reply_to:reply_to
    //     }
    //     emailjs.sendForm('service_sy9xg2r', 'template_cuxcy6r', data, 'mu2n-oFHk9CR_O4n2')
    //       .then((result) => {
    //           console.log(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //       });
    //   };

    handleSubmit = (e) => {
        e.preventDefault();
        const { pan } = this.state;
        console.log(pan);
        axios.get('http://localhost:8000/api/pandetails', {
            pan: pan
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data[0]);
                console.log(response.data.length);
                for (var i = 0; i < response.data.length; i++) {
                    if (pan == response.data[i].panid) {
                        console.log("yes")
                        const post = { "phone": "+918850366017" }
                        try {
                            const res = axios.post('https://nzv8s9m7vk.execute-api.eu-west-1.amazonaws.com/staging', post)
                            console.log(res.data)
                        } catch (e) {
                            alert(e)
                        }
                        // pancards.updateOne(
                        //     { _id: 100 },
                        //     { $set: { "details.make": "Kustom Kidz" } }
                        //  )


                    } else {
                        console.log("no")
                    }

                }
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="container">
                <h4>Create New Election</h4>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" id="election_name" name="election_name" onChange={this.handleInputChange} required/> */}
                    <label htmlFor="username">PanId</label><br></br>
                    <input type="text" id="election_organizer" name="pan" onChange={this.handleInputChange} required />

                    <button className="btn blue darken-2" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

export default Pan;
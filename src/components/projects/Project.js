import React, { Component ,useContext,useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { useHistory } from "react-router-dom";
//import car from  '../assets/cantact.jpeg'
import { Button } from "@material-ui/core";
import { Height } from "@material-ui/icons";

import styled from "styled-components";
const Styles = styled.div`

.rcorners1 {
    border-radius: 45px;
    border: 2px solid #000000;
    padding-left: 60px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 800px;
    height: 700px;
    margin-left: 30.5rem;
    margin-top: 3.5rem;
  }`
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);



export default function Groups() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function postdata() {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "name": name,
  "email": email,
  "subject": subject,
  "message": message
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
await fetch("https://gzacors.herokuapp.com/http://122.185.13.163:3013/contact", requestOptions)
  .then(response => response.text())
  .then(result => alert("Thank you for getting in touch. Our team will get in touch shortly."))
  .catch(error => console.log('error', error));

  }
  return (
    <Styles>
    <div className="rcorners1">
    <div class="container contact">
      <div  class="row" style={{marginRight:'-198px',marginLeft:'89px'}}>
        <div>
        <div class="contact-info">
				<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
				<h2 style={{paddingLeft:"20px"}}>Contact Us</h2>
				<h4 style={{paddingLeft:"20px",paddingTop:"15px"}}>We would love to hear from you !</h4>
        
			</div>
        </div>
        <div class="col-md-9">
        <div class="contact-form">
        <div class="form-group">
        <label class="control-label col-sm-2" for="fname">Name:</label>
        <div class="col-sm-10"> 
        <MDBInput type="text" class="form-control" id="fname" placeholder="Enter First Name" name="fname" 
                onChange={(e) => setName(e.target.value)}></MDBInput>
        </div>     
        </div>
        <div class="form-group">
				  <label class="control-label col-sm-2" for="lname">Email:</label>
				  <div class="col-sm-10">          
					<MDBInput type="text" class="form-control" id="lname" placeholder="Enter Last Name" name="lname"
          
          onChange={(e) => setEmail(e.target.value)}> </MDBInput>
				  </div>
				</div>
        <div class="form-group">
				  <label class="control-label col-sm-2" for="email">Subject:</label>
				  <div class="col-sm-10">
					<MDBInput type="email" class="form-control" id="email" placeholder="Enter email" name="email" 
                onChange={(e) => setSubject(e.target.value)}></MDBInput>
				  </div>
				</div>
        <div class="form-group">
				  <label class="control-label col-sm-2" for="comment">Message:</label>
				  <div class="col-sm-10">
					<textarea 
                onChange={(e) => setMessage(e.target.value)} class="form-control" rows="5" id="comment"></textarea>
				  </div>
				</div>
        <div class="form-group">        
				  <div class="col-sm-offset-2 col-sm-10">
					<Button  style={{border:'2px',backgroundColor:"#FFEDD9"}} type="submit" class="btn btn-default" onClick={postdata}>Submit</Button>
				  </div>
				</div>
        </div>
           </div>
      </div>

    </div>
    </div>
     </Styles>
    //   <div>
    // {/* <div className="App" style={{ backgroundImage:`url(${require("../assets/ca.jpg")})` , height: '450px',backgroundSize: 'cover',
    //         overflow: 'hidden'}}>
    //   <WhiteTextTypography variant="h3">
    //   Get in touch with us
    //   </WhiteTextTypography>
    // </div> */}
    // <div style={{align:'center'}}> 
    // <MDBContainer>
    //   <MDBRow>
    //     <MDBCol md="6">
    //       <MDBCard style={{ backgroundColor:'#dfbf9f'} } > 
    //         <div className="header pt-3 grey lighten-2">
              
    //         </div>
    //         <MDBCardBody className="mx-4 mt-4">

    //           <MDBInput
    //            label="Your email" 
    //            group type="text"
    //             validate />
    //           <MDBInput
    //             label="Your Mobile Number"
    //             group
    //             type="password"
    //             validate
    //             containerClass="mb-0"
    //           />
    //           <div>
    //              <label htmlFor="password">Password *</label>
    //         </div>
    //         <div>
    //         <MDBInput style={{borderColor: 'gray', borderWidth: 1,maxWidth:'450px' }}
              
    //           hint="Password"
    //           type="password"
    //           name="password"
    //           noValidate
    //          // onChange={this.handleChange}
    //         />
    //         </div>
    //          <MDBBtn
    //               color="danger"
    //               type="button"
    //               className="btn-block z-depth-2"
    //             >
    //               Submit
    //             </MDBBtn>
    //         </MDBCardBody>
    //       </MDBCard>
    //     </MDBCol>
    //   </MDBRow>
    // </MDBContainer>
    // </div>
    // <div>
      
    // </div>
    // </div>
  );
}

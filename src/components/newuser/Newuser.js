import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Confetti from 'react-confetti'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../assets/ca.jpg'
import { useHistory } from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BorderAllSharp, Style } from '@material-ui/icons';
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput,MDBInputGroup } from 'mdbreact';
import { light } from '@material-ui/core/styles/createPalette';
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
const Styles = styled.div`

.rcorners1 {
    border-radius: 45px;
    border: 2px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 550px;
    height: 260px;
    margin-left: -9.5rem;
    margin-top: 1.5rem;
  }   
  .rcorners2 {
    border-radius: 45px;
    border: 2px solid #000000;
    padding-left: 80px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 550px;
    height: 260px;
    margin-top: 1.5rem;
  }
  .rcorners3 {
    border-radius: 45px;
    border: 2px solid #000000;
    padding-left: 85px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 900px;
    height: 200px;
    margin-left: 12.5rem;
    margin-top: 1.5rem;
  }`
export default function Newuser() {
  const { register, handleSubmit, errors } = useForm();
  const [NewuserEmail, setFirstName] = useState('');
  const [GuestuserEmail, setGuestuserEmail] = useState('');
  const [VolunteerEmail, setVolunteerEmail] = useState('');
  const classes = useStyles();
  const history = useHistory();
  var NewuserEmaill = NewuserEmail
  var GuestuserEmaill =GuestuserEmail
  var VolunteerEmaill =VolunteerEmail
  localStorage.setItem("Newuseremail",NewuserEmaill)
  localStorage.setItem("GuestuserEmail",GuestuserEmaill)
   var getem =localStorage.getItem("Newuseremail")
   var getgu =localStorage.getItem("GuestuserEmail")
  console.log("name",getgu)
  console.log("guest",GuestuserEmaill)
  console.log("volunteer",VolunteerEmaill)

 async function Vemail(){
   console.log("bbbbbbbbbbbbb")
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "EmailID": NewuserEmaill
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
 await fetch("https://gzacors.herokuapp.com/http://122.185.13.163:3013/mailcheck", requestOptions)
  .then(response => response.json())
  .then(json =>{
    var message = json.message
    var otp_verified = json.otp_verified
    console.log(otp_verified)
    console.log(json)
    if(message === "The E-mail already in use" ){

      if(message === "The E-mail already in use" && otp_verified === "0"){
//message = "You have already registered.Please complete OTP validation"
        alert("You have already registered.Please complete OTP validation.") 
        Swal.fire({
          title: 'Enter vaild OTP',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (email) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {

            var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "otp": email,
  "email": localStorage.getItem("Newuseremail")
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch("https://gzacors.herokuapp.com/http://122.185.13.163:3013/otpcheck", requestOptions)
  .then(response => response.json())
  .then(json =>{ 
    var message = json.message
    // if(message === 'wrong otp"'){
    //   alert("InVaild OTP")
    // }
    if (message === "correct otp") {
         
      window.location = "./Newuserlogin";
      reject('This email is already taken.')
    } else {
     
     resolve()
     alert("Enter Valid OTP..");
    }
    console.log(json ,"result in otp ver")
  })
  //.then(result => console.log(result ,"result in otp ver")
  
  .catch(error => console.log('error', error));
            // if ('correct otp') {
             
            //   window.location = "./Newuserlogin";
            //    //reject('Invaild OTP.')
            // } else {
            //   if("wrong otp")
            //   alert("Enter Valid OTP..");
            //  resolve()
            //  //alert("Enter Valid OTP..");
            // }
          }, 2000)
        })
      },
      allowOutsideClick: false
        }).then(function() {
         
         // window.location = "./guestprofile";
      })
      }else{
        if(message === "The E-mail already in use" && otp_verified === "1"){
          alert("User is already registered. Please sign in")
history.push('/Newuserlogin')
        }
      }
          
    }else {
      history.push('/Registation')
    }
    console.log(message,"json.........")
  })
  .catch(error => console.log('error', error));
  }
  function volunteer(){

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "email": VolunteerEmail
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch("https://gzacors.herokuapp.com/http://122.185.13.163:3013/volunteer", requestOptions)
  .then(response => response.text())
  .then(result => alert(result))
  .catch(error => console.log('error', error));
  }
  return (
    // <div style={{paddingLeft:'125px'}}>
    <Styles> 
      <Container className="container">
      <div style={{paddingLeft:'70px'}}>
          <Row>
           
            <Col>
            <div className="rcorners1"> 
  <h3>New Donor Registation</h3>
  
            <div    
                
               
              style={{paddingTop:'40px' ,borderRadius:'40px'}}>
           
           <MDBInputGroup  style={{}} containerClassName="mb-3" prepend="Email ID" hint=""   onChange={e => setFirstName(e.target.value)} />

            {/* {formErrors.firstName.length > 0 && (
              <span style={{ color: 'red' }} className="errorMessage">{formErrors.firstName}</span>
            )} */}
          </div>
          <div style={{paddingLeft:'350px',}}>
    <button  disabled={!NewuserEmail} onClick={Vemail }style={{backgroundColor:"#FFEDD9",width:150,height:50,borderRadius:50}}>SIGN UP</button>
    </div>
</div>

           </Col>
           <p style={{paddingTop:'150px',paddingRight:'40px'}}> OR</p>
           <Col><div className="rcorners2">
  <h3>Guest Donors</h3>
  <div    
           style={{paddingTop:'40px' ,borderRadius:'40px'}}>
             
               <MDBInputGroup  style={{}} containerClassName="mb-3" prepend="Email ID" hint=""  onChange={e => setGuestuserEmail(e.target.value)} />
  
              {/* {formErrors.firstName.length > 0 && (
                <span style={{ color: 'red' }} className="errorMessage">{formErrors.firstName}</span>
              )} */}
            </div>
            <div style={{paddingLeft:'300px',}}>
      <button   disabled={!GuestuserEmail} onClick={() =>history.push('/Login')}style={{backgroundColor:"#FFEDD9",width:150,height:50,borderRadius:50}}> SUBMIT</button>
      </div>
</div></Col>
         </Row>
         </div>
</Container>
      <div style={{paddingTop:'40px',paddingLeft:"450px"}}>
        <h4>IMPORTANT </h4>
        <h6>
- To be a regular partner to sponsor a child, please click SIGN UP</h6>
<h6>
- To donate a one time payment as a guest, please click SUBMIT </h6>
<h6>
- To join our team as a volunteer, please enter your details and click JOIN </h6>
      </div>

      <div className="rcorners3">
        <div style={{paddingLeft:'300px',paddingBottom:'10px'}}>
  <h3>Volunteer</h3>
  </div>
            <div    
                
               
              // style={{paddingTop:'0px' , paddingLeft:'150px',borderRadius:'40px',width:'550px'}}>
              style={{paddingLeft:'150px',borderRadius:'40px',width:'550px'}}>
             <MDBInputGroup  style={{ backgroundColor:'#FFEDD9'}} containerClassName="mb-3" prepend="Email ID"  hint=""  type="email"  onChange={e => setVolunteerEmail(e.target.value)}
              name="email" />

            {/* {formErrors.firstName.length > 0 && (
              <span style={{ color: 'red' }} className="errorMessage">{formErrors.firstName}</span>
            )} */}
          </div>
          <div style={{paddingLeft:'402px'}}>
    <button disabled={!VolunteerEmail}   onClick={volunteer}
style={{backgroundColor:"#FFEDD9",width:150,height:50,borderRadius:50}}>JOIN</button>
    </div>
    
</div>

<div style={{paddingTop:'50px'}}>
  <Carousel>
  <Carousel.Item interval={1000}>
  <img style={{ height: '550px',width:'2030px'}}
      className="d-block w-0"
      src={require("../assets/Testimony.jpg")}
      alt="First slide"
    
    />
    <Carousel.Caption>
      {/* <h1 onClick={() => history.push('/Newuser')} style={STYLE.errorColor}>I want to support</h1> */}
      <h6 style={{paddingLeft:'850px',fontFamily: 'Montserrat, sans-serif',fontWeight:'bold',fontSize:'50px',paddingTop:'50px'}}>My Story</h6>
      <p style={{paddingLeft:'790px',paddingTop:"90px",fontFamily: 'Raleway,sans-serif',fontSize:'20px',color:"white",fontStyle: 'italic',textAlign:'center',width:'1250px',paddingLeft:'875px'}}>
This is a great place to add a tagline.

Tell customers more about you. Add a few words and a stunning pic to grab their attention and get them to click.

???This space is ideal for writing a detailed description of your business and the types of services that you provide. Talk about your team and your areas of expertise</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1000}>
  <img style={{ height: '550px',width:'2030px'}}
      className="d-block w-0"
      src={require("../assets/Testimony.jpg")}
      alt="First slide"
    
    />
    <Carousel.Caption>
      {/* <h1 onClick={() => history.push('/Newuser')} style={STYLE.errorColor}>I want to support</h1> */}
      <h6 style={{paddingLeft:'850px',fontFamily: 'Montserrat, sans-serif',fontWeight:'bold',fontSize:'50px',paddingTop:'50px'}}>My Story</h6>
      <p style={{paddingLeft:'790px',paddingTop:"90px",fontFamily: 'Raleway,sans-serif',fontSize:'20px',color:"white",fontStyle: 'italic',textAlign:'center',width:'1250px',paddingLeft:'875px'}}>
This is a great place to add a tagline.

Tell customers more about you. Add a few words and a stunning pic to grab their attention and get them to click.

???This space is ideal for writing a detailed description of your business and the types of services that you provide. Talk about your team and your areas of expertise</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1000}>
  <img style={{ height: '550px',width:'2030px'}}
      className="d-block w-0"
      src={require("../assets/Testimony.jpg")}
      alt="First slide"
    
    />
    <Carousel.Caption>
      {/* <h1 onClick={() => history.push('/Newuser')} style={STYLE.errorColor}>I want to support</h1> */}
      <h6 style={{paddingLeft:'850px',fontFamily: 'Montserrat, sans-serif',fontWeight:'bold',fontSize:'50px',paddingTop:'50px'}}>My Story</h6>
      <p style={{paddingLeft:'790px',paddingTop:"90px",fontFamily: 'Raleway,sans-serif',fontSize:'20px',color:"white",fontStyle: 'italic',textAlign:'center',width:'1250px',paddingLeft:'875px'}}>
This is a great place to add a tagline.

Tell customers more about you. Add a few words and a stunning pic to grab their attention and get them to click.

???This space is ideal for writing a detailed description of your business and the types of services that you provide. Talk about your team and your areas of expertise</p>
    </Carousel.Caption>
  </Carousel.Item>
  </Carousel>
</div>
    </Styles>
// </div>
//       <Carousel>
//   <Carousel.Item interval={1000}>
//     <img style={{width: '550px', height: '450px'}}
//       className="d-block w-100"
//       src={require("../assets/pc4.jpg")}
//       alt="First slide"
//     />
//     <Carousel.Caption>
//       {/* <h1 onClick={() => history.push('/Newuser')} style={STYLE.errorColor}>I want to support</h1> */}
    
//     </Carousel.Caption>
//   </Carousel.Item>
//   <Carousel.Item interval={500}>
//     <img style={{width: '550px', height: '450px'}}
//       className="d-block w-100"
//       src={require("../assets/pc1.jpg")}
//       alt="Third slide"
//     />
//      <Carousel.Caption>
//       {/* <h1 onClick={() => history.push('/Newuser')} style={STYLE.errorColor}>I want to support</h1> */}
    
//     </Carousel.Caption>
//   </Carousel.Item>
//   <Carousel.Item>
//     <img style={{width: '550px', height: '450px'}}
//       className="d-block w-100"
//       src={require("../assets/pc2.jpg")}
//       alt="Third slide"
//     />
//     <Carousel.Caption>
//     <Carousel.Caption>
//       {/* <h1 onClick={() => history.push('/Newuser')} style={STYLE.errorColor}>I want to support</h1> */}
    
//     </Carousel.Caption>
//     </Carousel.Caption>
//   </Carousel.Item>
// </Carousel> 
//       </div>
//     </div>
  );
}
const STYLE = {
  infoColor: {
      color: 'green'
  },
  warningColor: {
      color: 'orange'
  },
  errorColor: {
      color: 'red'
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root1: {
    maxWidth: 2050,
    borderColor:"#0A0A09",
    BorderAllSharp:'2px'
  },
  media: {
    height: 150,
  },
  
  
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));
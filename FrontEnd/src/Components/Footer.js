import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import {  faTwitter,faFacebook,faGoogle,faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
class Footer extends Component {
    render(){
      const styling = {color:'white',width:'5%',height:'5%',margin:'5px'}
        return <div >
<footer className="page-footer font-small unique-color-dark" style={{marginTop:'1%'}}>

  <div style={{backgroundColor: '#76777a'}}>
    <div className="container">

        
      <div className="row py-4 d-flex align-items-center">

            
        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0 text-light ">
          <h6 className="mb-0">Get connected with us on social networks!</h6>
        </div>
            

        
        <div className="col-md-6 col-lg-7 text-center text-md-right">
           
        <a className="fb-ic" href="https://www.facebook.com/kashish.chaudhary.1485" target="_blank" rel ="noopener noreferrer">
            <FontAwesomeIcon icon = {faFacebook} style={styling}/> 
          </a>
            
          <a className="tw-ic" href="https://twitter.com/Dishant18621632" target="_blank" rel ="noopener noreferrer">
            {/* <i className="fab fa-twitter white-text mr-4"> </i> */}
            <FontAwesomeIcon icon = {faTwitter} style={styling}/>
          </a>
            
          <a className="gplus-ic" href="" target="_blank" rel ="noopener noreferrer">
            {/* <i className="fab fa-google-plus-g white-text mr-4"> </i> */}
            <FontAwesomeIcon icon = {faGoogle} style={styling}/>
          </a>
            
          <a className="li-ic" href="https://www.linkedin.com/in/dishant-dishu-38329017b/" target="_blank" rel ="noopener noreferrer">
            {/* <i className="fab fa-linkedin-in white-text mr-4"> </i> */}
            <FontAwesomeIcon icon = {faLinkedin} style={styling}/>
          </a>
            
          <a className="ins-ic" href="https://www.instagram.com/dishant.dua.895/" target="_blank" rel ="noopener noreferrer">
            {/* <i className="fab fa-instagram white-text"> </i> */}
            <FontAwesomeIcon icon = {faInstagram} style={styling}/>
          </a>
        </div>
            

      </div>
        

    </div>
  </div>

    
  <div className="container text-center text-md-left mb-1">

    
    <div className="row mb-1">

        
      <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-1">

        
        <h6 className="text-uppercase font-weight-bold">Tech Explore</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
        <p>TechExplore is a technical website where you can explore the latest news about world's Techlonogy faster and accurate.</p>

      </div>
        

        
      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-1">

            
        <h6 className="text-uppercase font-weight-bold">Products</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
        <p>
          <a href="#!" rel ="noopener noreferrer">MDBootstrap</a>
        </p>
        <p>
          <a href="#!" rel ="noopener noreferrer">MDWordPress</a>
        </p>
        <p>
          <a href="#!" rel ="noopener noreferrer">BrandFlow</a>
        </p>
        <p>
          <a href="#!" rel ="noopener noreferrer">Bootstrap Angular</a>
        </p>

      </div>
        

        
      <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

            
        <h6 className="text-uppercase font-weight-bold">Useful links</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
        <p>
          <a href="#!" rel ="noopener noreferrer">Your Account</a>
        </p>
        <p>
          <a href="#!" rel ="noopener noreferrer">Become an Affiliate</a>
        </p>
        <p>
          <a href="#!" rel ="noopener noreferrer">Shipping Rates</a>
        </p>
        <p>
          <a href="#!" rel ="noopener noreferrer">Help</a>
        </p>

      </div>
        

        
      <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

        
        <h6 className="text-uppercase font-weight-bold">Contact</h6>
        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
        <p>
          <i className="fas fa-home mr-3"></i>216/4,Meham,Rohtak,Haryana,India</p>
        <p>
          <i className="fas fa-envelope mr-3"></i>dishantdua8956@gmail.com</p>
        <p>
          <i className="fas fa-phone mr-3"></i> + 91 8053838048 </p>
        <p>
          <i className="fas fa-print mr-3"></i> + 91 8950618970</p>

      </div>
        

    </div>
        

  </div>



  <div className="footer-copyright text-center py-3">© 2018 Copyright:
    <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank" rel ="noopener noreferrer"> MDBootstrap.com</a>
  </div>

</footer>
</div>
       
    }
}
export default Footer
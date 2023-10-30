import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Styles/Contact.css'

const Contact = () => {




  return (
    <>

      <div className='contact-info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>

              <div className='contact-info-item d-flex justify-content-start align-item-center '>
                <img src="https://img.icons8.com/office/24/000000/iphone.png" height={"30px"} width={"30px"} alt="phone" />
                <div className='contact-info-content'>
                  <div className='contact-info-title'>
                    Phone
                  </div>

                  <div className='contact-info-text'>
                    90909090909
                  </div>
                </div>
              </div>

              <div className='contact-info-item d-flex justify-content-start align-item-center '>
                <img src="https://img.icons8.com/office/24/000000/email.png"  height={"30px"} width={"30px"} alt="phone" />
                <div className='contact-info-content'>
                  <div className='contact-info-title'>
                    Email
                  </div>
                  <div className='contact-info-text'>
                    Mustafa
                  </div>
                </div>
              </div>


              <div className='contact-info-item d-flex justify-content-start align-item-center '>
                <img src="https://img.icons8.com/office/24/000000/home.png"  height={"30px"} width={"30px"} alt="phone" />
                <div className='contact-info-content'>
                  <div className='contact-info-title'>
                    Address
                  </div>

                  <div className='contact-info-text'>
                    Indore, M.P.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      {/* Contact Us form */}
      <div className='contact-form'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact-form  py-4'>
                <div className='contact-form-title'>
                  Get in touch  </div>

                <form id="Contact-form">
                  <div className="contact-form-name d-flex justify-content-between align-item-between">
                    <input type="text"
                      id="contact-form-name"
                      className="contact-form-name input-field"
                      placeholder="Your Name" />

                    <input type="text"
                      id="contact-form-email"
                      className="contact-form-email input-field"
                      placeholder="Your Email" />

                    <input type="number"
                      id="contact-form-phone"
                      className="contact-form-phone input-field"
                      placeholder="Your Phone number" />

                  </div>

                  <div className='contact-form-text py-5'>
                    <textarea className='text-field contact-form-message' name="" placeholder='Message' cols="70" rows="8"></textarea>
                  </div>
                  <div className='contact-button' >
                    <button type='submit' className='btn btn-primary'>Send message</button>
                  </div>


                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Contact
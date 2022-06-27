// url http://localhost:3000/#/login

import React, {useState} from 'react'
import {Link, Navigate , useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import { routerMiddleware, push } from 'react-router-redux'
import { withRouter } from 'react-router-dom';
import history from '../../history'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'
import {connect, useDispatch} from "react-redux";
import ClientOAuth2 from "client-oauth2";

// static get propTypes() {
//   return {
//     email: PropTypes.any
//   };
// }

let email;
let password;

const changedEmail = (event)=>{
  // show the user input value to console

};
const changedPassword = (event)=>{
  // show the user input value to console
  const userValue = event.target.value;
  password = userValue;
};


const Login = ({loginStatus, logged_in}) => {

  if (loginStatus == true){
    return <Navigate to="/dashboard" />
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Welcome Back!</h1>
                    <p className="text-medium-emphasis">{"Let's get you logged in."}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser}/>
                      </CInputGroupText>
                      <CFormInput placeholder="your email" autoComplete="email" onChange={(event) =>{
                        email = event.target.value
                      }}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked}/>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(event) =>{
                          password = event.target.value
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => {
                          logged_in()
                        }}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}



export function loginThunkActionCreator(dispatch){
  return async function loginThunkFunction (dispatch, getState) {
    await dispatch({type:'LOGGED_IN'})
    history.push('/#/dashboard')
  }
}



Login.propTypes ={
  logged_in : PropTypes.func,
  loginStatus : PropTypes.bool
}
const mapStateToProps = (state) => {
  return {
    loginStatus : state.IS_LOGGED_IN
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logged_in: () => dispatch(loginThunkActionCreator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


//
// function login() {
//   return dispatch => {
//     // dispatch(setLoginPending(true));
//     // dispatch(setLoginSuccess(false));
//     // dispatch(setLoginError(null));
//     var myOauthToken;
//
//     const oauthClient = new ClientOAuth2({
//       clientId: 'sMdJeyoLw1P99kHbBjoJbOMH',
//       clientSecret: '8HM4dFrLgFXGC47r5kqdTBucNSprznpBK9gzQpncO3JNJxHC',
//       accessTokenUri: `http://127.0.0.1:5000/oauth/token`,
//       authorizationUri: "http://127.0.0.1:5000/oauth/authorize",
//       redirectUri: "https://www.yourapp.com/auth/dropbox",
//       scopes: ["profile"],
//     });
//     oauthClient.owner.getToken(email, password)
//       .then(function (user) {
//         console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
//         window.localStorage.setItem('oauth_token',user.accessToken)
//         myOauthToken = user.accessToken
//         console.log(myOauthToken)
//       });
//   }
// }
//
// callLoginApi( success => {
//   console.log('success')
// },error => {
//   console.log("test working 1");
//   dispatch(setLoginPending(false));
//   if (!error) {
//     dispatch(setLoginSuccess(true));
//     console.log("login succcess");
//   } else {
//     dispatch(setLoginError(error));
//     console.log("login failed");
//   }
// });
//
// function setLoginSuccess(isLoginSuccess) {
//   const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
//   return {
//     type: SET_LOGIN_SUCCESS,
//     isLoginSuccess
//   };
// }

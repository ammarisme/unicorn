import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import history from '../../history'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";

const AppHeaderDropdown = ({loginStatus,logout}) => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src="" size="md" />
        {/*<CAvatar src={avatar8} size="md" />*/}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#" onClick={(event) => {
          event.preventDefault()
          logout()
        }}>
          <CIcon icon={cilLockLocked} className="me-2"  />
          Sign-off
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

function logoutActionCreator(){
  return async function(dispatch, getState){
    dispatch({type: 'LOGOUT'})
    history.push("/#/login")
    window.location.reload()
  }
}

AppHeaderDropdown.propTypes = {
  logout : PropTypes.func,
  loginStatus : PropTypes.bool
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => {dispatch(logoutActionCreator())}
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus : state.IS_LOGGED_IN
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderDropdown)

import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody, CCardHeader,
  CCol, CDropdown, CDropdownItem, CFormInput, CFormSelect, CFormSwitch,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane
} from "@coreui/react/dist/index";
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import showViewActionCreator from "../../shared/shared-functions";
import DynamicSelect from "../../shared/components/DynamicSelect";
;

class ManageBot extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadCreateRuleParams()
    this.setState({
      SHOW_THEN: false,
    })
  }

  render() {
    console.log(this.props.view_state)
    return (
      <CModal size="xl" fullscreen={"xl"} visible={true} className={"font-config"} onClose={() => {
        this.props.showView("MANAGE_BOT", false);
      }}>
        <CModalHeader>
          <CModalTitle>Setup Bot</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={2}>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                label="Bot name"
                placeholder=""
                text=".."
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
            <CCol md={2}>
              <CFormInput
                type="number"
                id="exampleFormControlInput1"
                label="Replicas"
                placeholder=""
                text=".."
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="exampleFormControlInput1"
                label="Authorization Code"
                disabled={true}
                placeholder="fsjdoi3u9t3fj934r34u93hf9348f398344fj39f3j49j"
                text=".."
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={2}>
              <DynamicSelect url={"http://localhost:5000/api/schema"} queryAttributes={[{"schema" : "ultimate"}]}
                             label={"Input Schema"}></DynamicSelect>
            </CCol>
            <CCol md={2}>
              <DynamicSelect url={"http://localhost:5000/api/schema"} queryAttributes={[{"schema" : "ultimate"}]}
                             label={"Output Schema"}></DynamicSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={2}>
              <CButton color="dark" size="sm">Setup</CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    )
  }
}


function setActiveKeyActionCreator(activeKey) {
  return async function (dispatch, getState) {
    dispatch({
        type: 'MANAGE_RULES_TAB',
        value: activeKey
      }
    )
  }
}

function loadCreateRuleParamsActionCreator() {

  return async function (dispatch, getState) {

    fetch('http://localhost:5000/api/rules-engine/get-schema')

      .then(res => res.json())
      .then(result => {
        dispatch({
            type: 'LOAD_CONDITIONS',
            INIT_CONDITIONS: [0]
          }
        )

        dispatch({
          type: 'LOAD_CREATE_RULE_PARAMS'
        })

      })
  }
}

ManageBot.propTypes = {
  showView: PropTypes.func,
  activeKey: PropTypes.number,
  setActiveKey: PropTypes.func,
  loadCreateRuleParams: PropTypes.func,
  ruleParams: PropTypes.object,
  conditions: PropTypes.array,
  view_state : PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    activeKey: state.MANAGE_RULES_ACTIVE_TAB,
    ruleParams: state.RULE_PARAMS,
    conditions: state.CONDITIONS,
    view_state  : state.VIEW_STATE
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showView : (modalName, visible) => dispatch(showViewActionCreator(modalName, visible)),
    setActiveKey: (activeKey) => dispatch(setActiveKeyActionCreator(activeKey)),
    loadCreateRuleParams: () => dispatch(loadCreateRuleParamsActionCreator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBot)

import React from 'react'
import {
  CCol, CFormSwitch,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow
} from "@coreui/react/dist/index";
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import DefineSchema from "../rules/define-schema"
import ConfigureOperations from "./processes/configure-operations";
import {switchToProViewActionCreator,showViewActionCreator} from "../../shared/shared-functions"
import Finish from "../rules/finish";

class ManageProcess extends React.Component {
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
  console.log('pro view', this.props.view_state.PRO_VIEW)
    return (
      <CModal size="xl" fullscreen={this.props.view_state.PRO_VIEW} visible={true} className={"font-config"} onClose={() => {
        this.props.showView("CREATE_RULE", false);
      }}>
        <CModalHeader>
          <CModalTitle>Create / Update Process </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={2}>
              <CListGroup>
                <CListGroupItem
                onClick={() => this.props.showView("DEFINE_SCHEMA", true)}
                active={this.props.view_state.DEFINE_SCHEMA &&
                this.props.view_state.DEFINE_SCHEMA.VISIBLE }
                >Setup Entities</CListGroupItem>
                <CListGroupItem
                  onClick={() => this.props.showView("CONDITIONS", true)}
                  active={this.props.view_state.CONDITIONS &&
                  this.props.view_state.CONDITIONS.VISIBLE }>Setup Operations</CListGroupItem>
                <CListGroupItem
                  onClick={() => this.props.showView("FINISH", true)}
                  active={this.props.view_state.FINISH &&
                  this.props.view_state.FINISH.VISIBLE }
                >Finish</CListGroupItem>
                <CListGroupItem>
                  <CFormSwitch size="xl" label="Pro view" id="formSwitchCheckDefaultXL"
                               onChange={(event) => {
                                 this.props.switchToProView(event.target.checked)
                               }}
                  />
                </CListGroupItem>

              </CListGroup>
            </CCol>
            <CCol md={10}
            >

              {
                this.props.view_state.DEFINE_SCHEMA &&
                this.props.view_state.DEFINE_SCHEMA.VISIBLE && <DefineSchema></DefineSchema>
              }
              {
                this.props.view_state.CONDITIONS &&
                this.props.view_state.CONDITIONS.VISIBLE && <ConfigureOperations></ConfigureOperations>
              }
              {
                this.props.view_state.FINISH&&
                this.props.view_state.FINISH.VISIBLE && <Finish></Finish>
              }
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

ManageProcess.propTypes = {
  showView: PropTypes.func,
  activeKey: PropTypes.number,
  setActiveKey: PropTypes.func,
  loadCreateRuleParams: PropTypes.func,
  ruleParams: PropTypes.object,
  conditions: PropTypes.array,
  view_state : PropTypes.object,
  switchToProView: PropTypes.func,
  proView : PropTypes.bool
}
const mapStateToProps = (state) => {
  return {
    activeKey: state.MANAGE_RULES_ACTIVE_TAB,
    ruleParams: state.RULE_PARAMS,
    conditions: state.CONDITIONS,
    view_state  : state.VIEW_STATE,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showView : (modalName, visible) => dispatch(showViewActionCreator(modalName, visible)),
    setActiveKey: (activeKey) => dispatch(setActiveKeyActionCreator(activeKey)),
    loadCreateRuleParams: () => dispatch(loadCreateRuleParamsActionCreator()),
    switchToProView: (proView) => dispatch(switchToProViewActionCreator(proView))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProcess)

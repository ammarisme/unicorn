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
import CreateCondition from "./CreateCondition";
import { ViewActionCreator } from 'src/redux/action_creators/view-action-creator';

class ManageRuleOld extends React.Component {
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
    console.log('conditions : ', this.props.conditions)
    return (
      <CModal size="xl" fullscreen={"xxl"} visible={true} className={"font-config"} onClose={() => {
        this.props.showView("CREATE_RULE", false);
      }}>
        <CModalHeader>
          <CModalTitle>Manage Rule</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={2}>
              <CListGroup>
                <CListGroupItem>Step 1 : Mappings</CListGroupItem>
                <CListGroupItem active={true}>Step 2 : Rule 1</CListGroupItem>
                <CListGroupItem>Step 3 : Rule 3</CListGroupItem>
              </CListGroup>
            </CCol>
            <CCol md={10}>
              {
                this.props.ruleParams && <CCard className="mb-12 main-card">
                  <CCardHeader>
                    Step 1:
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      placeholder=""
                      text=".."
                      aria-describedby="exampleFormControlInputHelpInline"
                      value={"Rule 1"}
                    />
                  </CCardHeader>
                  <CCardBody>

                    <CRow>
                      {
                        this.props.conditions && <>
                        {
                          this.props.conditions.map(condition => {
                            return (<>
                              <CreateCondition ></CreateCondition>
                            </>)
                          })
                        }
                        </>
                      }
                    </CRow>

                  </CCardBody>
                </CCard>
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

ManageRule.propTypes = {
  showView: PropTypes.func,
  activeKey: PropTypes.number,
  setActiveKey: PropTypes.func,
  loadCreateRuleParams: PropTypes.func,
  ruleParams: PropTypes.object,
  conditions: PropTypes.array,
}
const mapStateToProps = (state) => {
  return {
    activeKey: state.MANAGE_RULES_ACTIVE_TAB,
    ruleParams: state.RULE_PARAMS,
    conditions: state.CONDITIONS
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showView : (modalName) => dispatch(ViewActionCreator.showViewActionCreator(modalName, false)),
    setActiveKey: (activeKey) => dispatch(setActiveKeyActionCreator(activeKey)),
    loadCreateRuleParams: () => dispatch(loadCreateRuleParamsActionCreator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRuleOld)

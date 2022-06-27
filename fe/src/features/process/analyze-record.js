import React, {useState} from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight, cilMediaStop } from '@coreui/icons';


import {
  CModal,
  CModalBody,
  CModalHeader,
  CCol,
  CContainer,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody, CTableDataCell, CTable
} from "@coreui/react/dist/index";
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import showViewActionCreator from "../../shared/shared-functions";
import DynamicSelect from "../../shared/components/DynamicSelect";
import {CBadge} from "@coreui/react";

class AnalyzeRecord extends React.Component {
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
    return (
      <CModal size="xl" fullscreen={"xl"} visible={true} className={"font-config"} onClose={() => {
        this.props.showView('ANALYZE_RECORD', false)
      }}>
        <CModalHeader>
          <CModalTitle>Rule Analysis</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={4}>
              <div className="custom-panel">
                <div className="custom-panel-heading">Input</div>
                <div className="custom-panel-body">
                  <CTable bordered borderColor="primary">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>

                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Name</CTableDataCell>
                        <CTableDataCell>Ammar Ameerdeen</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Age</CTableDataCell>
                        <CTableDataCell>29</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>
              </div>
            </CCol>
            <CCol md={4}>
              <div className="custom-panel">
                <div className="custom-panel-heading">Rules</div>
                <div className="custom-panel-body">
                  <div className="rule-processing-history">
                    <div className="custom-h3">Rules & Conditions</div>
                    <div className={"rule odd"}>
                      <div className={"rule-name"}>Rule 01 - Basic Eligibled Checks</div>
                      <div>
                        <div>
                          <span> <CBadge color="success">gender match</CBadge> </span>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="success">age eligible</CBadge> </span>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="success">coverage available</CBadge> </span>
                        </div>
                        <div>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="dark">state support</CBadge> </span>
                          <span> <CBadge color="dark">authorized</CBadge> </span>
                        </div>
                      </div>
                    </div>
                    <div className={"rule"}>
                      <div className={"rule-name"}>Rule 02 - CPT Checks</div>
                      <div>
                        <div>
                          <span> <CBadge color="success">gender match</CBadge> </span>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="success">age eligible</CBadge> </span>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="success">coverage available</CBadge> </span>
                        </div>
                        <div>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="dark">state support</CBadge> </span>
                          <span> <CBadge color="dark">authorized</CBadge> </span>
                        </div>
                      </div>
                    </div>
                    <div className={"rule odd"}>
                      <div className={"rule-name"}>Rule 03 - MUE Edits</div>
                      <div>
                        <div>
                          <span> <CBadge color="success">gender match</CBadge> </span>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="success">age eligible</CBadge> </span>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="success">coverage available</CBadge> </span>
                        </div>
                        <div>
                          <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                          <span> <CBadge color="dark">state support</CBadge> </span>
                          <span> <CBadge color="dark">authorized</CBadge> </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rule-processing-history">
                    <div className="custom-h3">Actions Performed</div>
                    <div className={"rule"}>
                      <span> <CBadge color="info">Name formatting</CBadge> </span>
                      <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                      <span> <CBadge color="info">Call API</CBadge> </span>
                      <span> <CIcon icon={cilArrowRight} size="sm"/> </span>
                      <span> <CBadge color="danger">Email</CBadge> </span>
                    </div>

                  </div>
                </div>
              </div>
            </CCol>
            <CCol md={4}>
              <div className="custom-panel">
                <div className="custom-panel-heading">Result</div>
                <div className="custom-panel-body">
                  <CTable bordered borderColor="primary">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow className={"data-changed"}>
                        <CTableDataCell>Name</CTableDataCell>
                        <CTableDataCell>Ameerdeen, Ammar</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Age</CTableDataCell>
                        <CTableDataCell>29</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>
              </div>
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

AnalyzeRecord.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeRecord)

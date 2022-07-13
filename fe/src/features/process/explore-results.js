import React from 'react'
import {connect} from "react-redux/es/index";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import {DynamicSelect} from 'src/common/components/DynamicSelect'
import { ViewActionCreator } from 'src/redux/action_creators/view-action-creator';
import PropTypes from "prop-types";
import AnalyzeRecord from "./analyze-record";

const loadOptions = (
  inputValue,
  // callback: (options: ColourOption[]) => void
  callback
) => {
  const state = JSON.parse(localStorage.getItem('state'))['state']
  const my_queries = state['CREATE_RULE_QUERY_TREE']
  fetch("http://localhost:5000/api/rules-engine/get-suggesstions", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      // your expected POST request payload goes here
      latest_input_string: inputValue,
      query_tree: my_queries
    })
  })
    .then(res => res.json())
    .then(result => {
      callback(result.suggestions)
    })
};

class ExploreResults extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('c did mount')
  }

  logicalElementSelected = (value) => {

  }

  render() {
    return (
      <>
        {
          this.props.view_state.ANALYZE_RECORD && this.props.view_state.ANALYZE_RECORD.VISIBLE && <AnalyzeRecord></AnalyzeRecord>
        }
        <CCard className="mb-12 main-card font-config">
          <CCardBody>

            <CRow>
              <CCol md={11}>
                <CRow>
                  <CCol md={3}>
                    <CFormInput type="text" id="formFile" label="Batch date from : " />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput type="text" id="formFile" label="Batch date to : " />
                  </CCol>
                  <CCol md={2}>
                    <DynamicSelect label={"matched rule(s)"} />
                  </CCol>
                </CRow>


              </CCol>
              <CCol md={1}>
                <CButton color="primary" size="sm"
                >Filter</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard className="mb-12 main-card font-config">
          <CCardBody>
            <CTable bordered borderColor="primary">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <div> Input</div>
                    <DynamicSelect label={"Select fields : "}/></CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <div> Result</div>
                    <DynamicSelect label={"Select fields : "}/></CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rules</CTableHeaderCell>

                  <CTableHeaderCell scope="col">Batch Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Ammar Ameerdeen / 29 </CTableDataCell>
                  <CTableDataCell>Male</CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol md={8}>
                        <CBadge color="success"  shape="rounded-pill">Eligible</CBadge>
                        <CBadge color="success"  shape="rounded-pill">MUE</CBadge>
                        <CBadge color="danger"  shape="rounded-pill">Gender</CBadge>
                      </CCol>
                      <CCol md={4}>
                        <CButton color="primary" size="sm"
                        onClick={() => {
                          this.props.showView('ANALYZE_RECORD', true)
                        }}
                        >View Analysis</CButton>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>6/23/2022</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
          </>
    )
  }
}


ExploreResults.propTypes = {
  showView : PropTypes.func,
  view_state : PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    view_state : state.VIEW_STATE
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showView : (modalName, visible) => dispatch(ViewActionCreator.showViewActionCreator(modalName, visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreResults)

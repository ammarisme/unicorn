import React from 'react'
import {connect} from "react-redux/es/index";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormCheck,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import AsyncSelect from 'react-select/async/dist/react-select.cjs.js';

const loadOptions = (
  inputValue,
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

class UploadData extends React.Component {
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
        <CCard className="mb-12 main-card font-config">
          <CCardBody>
            <CRow>
              <CCol md={4}>
                <CFormInput type="file" id="formFile" label="Accepted file types : .json / .csv"/>
              </CCol>
              <CCol md={4}>
                <label className={"dynamic-select-label"}>Select rule</label>
                <AsyncSelect
                  data={this.props}
                  cacheOptions
                  isMulti
                  loadOptions={this.loadOptions}
                  defaultOptions
                  onInputChange={this.handleInputChange}
                  onChange={this.logicalElementSelected}
                />
              </CCol>
              <CCol md={2}>
                <CFormCheck id="flexCheckDefault" label="First match"/>
              </CCol>
              <CCol md={2}>
                <CButton color="primary" size="sm">Upload</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>


        <CCard className="mb-12 main-card font-config">
          <CCardBody>
            <CContainer fluid style={{"marginTop": "10px"}}>
              <CRow>
                <CCol md={2}>
                  <CFormInput type="text" size="sm" placeholder="" label={"Date from : "} aria-label="sm input example"/>
                </CCol>
                <CCol md={2}>
                  <CFormInput type="text" size="sm" placeholder="" label={"Date to : "} aria-label="sm input example"/>
                </CCol>
              </CRow>

            </CContainer>
            <CContainer fluid style={{"marginTop": "10px"}}>
              <CTable bordered borderColor="primary">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">File name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Records</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Clean</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Errors</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Auto Corrected</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CContainer>

          </CCardBody>
        </CCard>

      </>
    )
  }
}


UploadData.propTypes = {}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadData)

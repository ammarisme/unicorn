import React from 'react'
import DatePicker from "react-datepicker";
import TextField from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

const Hl7SummaryReport = () => {

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol md={1}>
                  Start Date :
                </CCol>
                <CCol md={3}>
                  <DatePicker
                    label="Basic example"

                    onChange={(newValue) => {
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </CCol>
                <CCol md={1}>
                  End Date :
                </CCol>
                <CCol md={3}>
                  <DatePicker
                    label="Basic example"

                    onChange={(newValue) => {
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Summary of claims received</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={12}>
                  <div className="row">
                    <div className="col-lg-4">
                      <div data-coreui-locale="en-US" data-coreui-toggle="date-picker"></div>
                    </div>
                    <div className="col-lg-4">
                      <div data-coreui-date="2023/03/15" data-coreui-locale="en-US"
                           data-coreui-toggle="date-picker"></div>
                    </div>
                  </div>
                </CCol>

                <CCol md={12}>
                  <table className="table table-bordered border-primary">
                    <thead>
                    <tr>
                      <th scope="col" className={"col-md-3"}>Date</th>
                      <th scope="col" className={"col-md-3"}>Billable Claims (Unique)</th>
                      <th scope="col"  className={"col-md-3"}>Errors</th>
                      <th scope="col" className={"col-md-3"}>Total</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">1/4/2022</th>
                      <td>
                        <div style={{'float':"left"}}>
                          0 /  <a href={""}  color="link">Download</a>
                        </div>
                        <div style={{"float":"right"}}>
                          <CButton
                            color="primary" size={"sm"} onClick={() => {

                          }} >Review</CButton>
                        </div>

                      </td>
                      <td>  <div style={{'float':"left"}}>
                        23 /  <a href={""}  color="link">Download</a>
                      </div>
                        <div style={{"float":"right"}}>
                          <CButton
                            color="warning" size={"sm"} >Review</CButton>
                        </div></td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <th scope="row">1/5/2022</th>
                      <td>20</td>
                      <td>2</td>
                      <td>22</td>
                    </tr>
                    <tr>

                      <td colSpan="1">-</td>
                      <td colSpan="1">20</td>
                      <td  colSpan="1">-</td>
                      <td  colSpan="1">-</td>
                    </tr>
                    </tbody>
                  </table>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Hl7SummaryReport

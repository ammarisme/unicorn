import React from 'react'
import DatePicker from "react-datepicker";
import TextField from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol, CFormCheck, CFormInput, CFormSelect, CModal, CModalBody, CModalHeader, CModalTitle, CNavLink,
  CProgress,
  CRow,

} from '@coreui/react'

import PropTypes from "prop-types";
import {connect} from "react-redux";
import IndividualClaim from "./IndividualClaim";


class ClaimReview extends React.Component {
  constructor(props) {
    super();
    props.load_billable_claims(props.current_batch_number)
  }


  render() {

    return (
        <CModal size="xl" visible={true} fullscreen="xxl" className={"font-config"} onClose={() => {
          this.props.hide_claim_review();
        }}>
          <CModalHeader>
            <CModalTitle>Claim Review / Batch #</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {
              this.props.is_reviewing_claim && <IndividualClaim></IndividualClaim>
            }
            <CCol xl className={"font-config"}>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <CCol md={2} className={"font-config"}
                    >
                      <CFormSelect
                        label="Filter by"
                        aria-label="Default select example"
                        options={[
                          'Select',
                          {label: 'Provider', value: '1'},
                          {label: 'CPT', value: '1'},
                          {label: 'DX', value: '2'},
                          {label: 'Patient', value: '2'},
                          {label: 'Facility', value: '3', disabled: true},
                          {label: 'Preauth', value: '3', disabled: true},
                          {label: 'Status', value: '3', disabled: true},
                        ]}
                      />
                    </CCol>
                    <CCol md={2}>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        label="Text"
                        placeholder=""
                        text=".."
                        aria-describedby="exampleFormControlInputHelpInline"
                      />
                      <CButton
                        color="secondary" size={"sm"}>Filter</CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <CCol md={2} className={"font-config"}>
                      <CFormSelect
                        aria-label="Default select example"
                        options={[
                          'Select',
                          {label: 'Send to AMD', value: '1'},
                          {label: 'Check Eligibility', value: '1'},
                          {label: 'Approve', value: '1'},
                          {label: 'Void', value: '2'},
                          {label: 'Mark as CIP', value: '2'},
                          {label: 'Write-off', value: '3', disabled: true},
                          {label: 'Post', value: '3', disabled: true}
                        ]}
                      />
                    </CCol>
                    <CCol md={2}>
                      <CButton
                        color="primary" size={"sm"}>Bulk Action</CButton>
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

                    <CCol md={12} style={{
                      "overflow": "auto"
                    }}>
                      <table className="table table-bordered border-primary">
                        <thead>
                        <tr>
                          <th scope="col" className={"col-md-3"}>
                            <CFormCheck id="flexCheckDefault" label="All"/>
                          </th>
                          <th scope="col" className={"col-md-3"}></th>
                          <th scope="col" className={"col-md-3"}>Received</th>
                          <th scope="col" className={"col-md-3"}>DOS</th>
                          <th scope="col" className={"col-md-3"}>Provider</th>
                          <th scope="col" className={"col-md-3"}>CPT</th>
                          <th scope="col" className={"col-md-3"}>DX</th>
                          <th scope="col" className={"col-md-3"}>Patient</th>
                          <th scope="col" className={"col-md-3"}>Resp.</th>
                          <th scope="col" className={"col-md-3"}>Facility</th>
                          <th scope="col" className={"col-md-3"}>Carrier</th>
                          <th scope="col" className={"col-md-3"}>TFL</th>
                          <th scope="col" className={"col-md-3"}>Preauth</th>
                          <th scope="col" className={"col-md-3"}>Pat. Portion</th>
                          <th scope="col" className={"col-md-3"}>Ins. Portion</th>
                          <th scope="col" className={"col-md-3"}>Total</th>
                          <th scope="col" className={"col-md-3"}>Estimated Amt.</th>
                          <th scope="col" className={"col-md-3"}>Status</th>
                          <th scope="col" className={"col-md-3"}>Note</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          this.props.billable_claims.map((claim) => {
                            return (
                              <>
                                <tr>
                                  <td scope="row"></td>
                                  {/*<td scope="row"> <CFormCheck id="flexCheckDefault" label=""/></td>*/}
                                  <td scope="row"><CButton
                                    color="primary" size={"sm"} onClick={() => {
                                    this.props.openIndividualClaim(1)
                                  }}>Review</CButton></td>
                                  <td scope="row">{claim[0]} </td>
                                  <td scope="row">{claim[1]} </td>
                                  <td scope="row">{claim[2]} </td>
                                  <td scope="row">
                                    {claim[3]}
                                  </td>
                                  <td scope="row">{claim[4]} </td>
                                  <td scope="row">
                                    {claim[5]}
                                  </td>
                                  <td scope="row">{claim[6]} </td>
                                  <td scope="row">{claim[7]} </td>
                                  <td scope="row">
                                    {claim[8]}
                                  </td>
                                  <td scope="row">{claim[9]} </td>
                                  <td scope="row">{claim[10]} </td>
                                  <td scope="row">{claim[11]} </td>
                                  <td scope="row">{claim[12]} </td>
                                  <td scope="row">{claim[13]} </td>
                                  <td scope="row">{claim[14]} </td>
                                  <td scope="row">{claim[15]} </td>
                                  <td scope="row">{claim[16]} </td>

                                </tr>
                              </>);
                          })
                        }

                        </tbody>
                      </table>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CModalBody>
        </CModal>
    )
  }

}

function loadBillableClaimsActionCreator(batch_number) {
  return async function loadBillableAction(dispatch, getState) {
    // get billable claims from API
    fetch("http://localhost:5000/api/claims/billable_claims/1")
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({
            type: 'LOAD_BILLABLE_CLAIMS',
            billable_claims: result.claims
          })

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          dispatch({
            type: 'LOAD_BILLABLE_CLAIMS_FAILED',
          })
        }
      )

  }
}

function openIndividualClaimActionCreator(claimid) {

  return async function openIndividualClaimAction(dispatch, getState) {
    dispatch({
      type: 'IS_REVIEWING_CLAIM'
    })

  }
}

function hideClaimReviewActionCreator() {
  return async function (dispatch, getState) {
    dispatch({
      type: "SHOW_CLAIM_REVIEW",
      value: false
    })
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.IS_LOGGED_IN,
    billable_claims: state.BILLABLE_CLAIMS,
    current_batch_number: state.CURRENT_BATCH_NUMBER,
    show_claim_review: state.SHOW_CLAIM_REVIEW,
    is_reviewing_claim: state.IS_REVIEWING_CLAIM
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    load_billable_claims: (batch_number) => dispatch(loadBillableClaimsActionCreator(batch_number)),
    openIndividualClaim: (claimId) => dispatch(openIndividualClaimActionCreator(claimId)),
    hide_claim_review: () => dispatch(hideClaimReviewActionCreator())
  }
}

ClaimReview.propTypes = {
  id: PropTypes.string,
  load_billable_claims: PropTypes.func,
  current_batch_number: PropTypes.number,
  billable_claims: PropTypes.array,
  openIndividualClaim: PropTypes.func,
  is_reviewing_claim: PropTypes.bool,
  hide_claim_review: PropTypes.func
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimReview)

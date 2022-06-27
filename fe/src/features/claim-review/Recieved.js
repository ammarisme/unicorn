import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import {CButton, CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import PropTypes from "prop-types";
import ClaimReview from "./ClaimReview";
import {connect} from "react-redux";
import IndividualClaim from "./IndividualClaim";



class RecievedClaims extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>

        <CRow>
          {
            this.props.show_claim_review && <ClaimReview></ClaimReview>
          }
          {
            this.props.is_reviewing_claim && <IndividualClaim></IndividualClaim>
          }
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
                              this.props.showClaimReview(1)
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
        </CRow>
      </>
    )
  }
}

function showClaimReviewActionCreator(batch_number){
  return async function (dispatch, getState){
    dispatch({
      type : 'SHOW_CLAIM_REVIEW',
      value : true,
      batch_number : batch_number
    })

  }
}

RecievedClaims.propTypes = {
  show_claim_review : PropTypes.bool,
  showClaimReview : PropTypes.func,
  is_reviewing_claim: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    show_claim_review : state.SHOW_CLAIM_REVIEW,
    is_reviewing_claim: state.IS_REVIEWING_CLAIM
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    showClaimReview : (batch_number) => dispatch(showClaimReviewActionCreator(batch_number))
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(RecievedClaims)

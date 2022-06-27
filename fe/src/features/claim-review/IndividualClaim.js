import {useState} from "react";
import React from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCol,
  CFormCheck,
  CFormInput, CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow
} from "@coreui/react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

//const [visibleXL, setVisibleXL] = useState(false)


class IndividualClaim extends React.Component {
  constructor(props) {
    super();
    this.props = props
  }

  componentDidMount() {
    this.props.getClaimDetails(1)
    this.props.activeAccordion(2)
  }

  render() {
    return (<>
        <CModal size="xl" visible={true} className={"font-config"} onClose={() => {
          this.props.hideIndividualClaimView();
        }}>
          <CModalHeader>
            <CModalTitle>Review Claim - Patient Name / Visit #</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CAccordion activeItemKey={this.props.activeAccordionItemNo}>
              {/*charge*/}
              <CAccordionItem  onClick={() => this.props.activeAccordion(1)} itemKey={1}>
                <CAccordionHeader  >
                  Charge
                </CAccordionHeader>
                <CAccordionBody>
                  {this.props.charges &&
                    <table className="table table-bordered border-primary">
                      <thead>
                      <tr>
                        <th scope="col" className={"col-md-1"}>Procedure</th>
                        <th scope="col" className={"col-md-1"}>DOS</th>
                        <th scope="col" className={"col-md-1"}>DX</th>
                        <th scope="col" className={"col-md-1"}>Mods</th>
                        <th scope="col" className={"col-md-1"}>Unit</th>
                        <th scope="col" className={"col-md-1"}>Fee</th>
                        <th scope="col" className={"col-md-1"}>Est. Amt.</th>
                        <th scope="col" className={"col-md-1"}>Ins. portion</th>
                        <th scope="col" className={"col-md-1"}>Pat. portion</th>
                        <th scope="col" className={"col-md-1"}>Status</th>
                        <th scope="col" className={"col-md-1"}>Flags</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        this.props.charges.map((charge) => {
                        // eslint-disable-next-line react/jsx-key
                        return (<tr>
                            <th scope="col" className={"col-md-1"}>{charge[0]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[1]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[2]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[3]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[4]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[5]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[6]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[7]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[8]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[9]}</th>
                            <th scope="col" className={"col-md-1"}>{charge[10]}</th>
                          </tr>
                        )
                      })
                      }
                      </tbody>
                    </table>
                  }

                </CAccordionBody>
              </CAccordionItem>
              {/*insurance*/}
              <CAccordionItem onClick={() => this.props.activeAccordion(2)} itemKey={2}>
                <CAccordionHeader className={"action-alert"}>
                  Insurance
                </CAccordionHeader>
                <CAccordionBody>
                  {this.props.patient && this.props.patient.insurance_plans &&
                    <table className="table table-bordered border-primary">
                      <thead>
                      <tr>
                        <th scope="col" className={"col-md-1"}>Order</th>
                        <th scope="col" className={"col-md-1"}>Eff. From</th>
                        <th scope="col" className={"col-md-1"}>Eff. To</th>
                        <th scope="col" className={"col-md-1"}>Carrier</th>
                        <th scope="col" className={"col-md-1"}>Coverage</th>
                        <th scope="col" className={"col-md-1"}>Group Name</th>
                        <th scope="col" className={"col-md-1"}>Group #</th>
                        <th scope="col" className={"col-md-1"}>Subscriber ID</th>
                        <th scope="col" className={"col-md-1"}>Pat. Relationship</th>
                        <th scope="col" className={"col-md-1"}>Copay</th>
                        <th scope="col" className={"col-md-1"}>MSP Code</th>
                        <th scope="col" className={"col-md-1"}>Flags</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.props.patient.insurance_plans.map((plan) => {
                        // eslint-disable-next-line react/jsx-key
                        return (<tr>
                            <th scope="col" className={"col-md-1"}></th>
                            <th scope="col" className={"col-md-1"}>{plan[0]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[1]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[2]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[3]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[4]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[5]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[6]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[7]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[8]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[9]}</th>
                            <th scope="col" className={"col-md-1"}>{plan[10]}</th>

                          </tr>
                        )
                      })
                      }
                      </tbody>
                    </table>
                  }
                </CAccordionBody>
              </CAccordionItem>
              {/*patient/resparty*/}
              <CAccordionItem onClick={() => this.props.activeAccordion(3)} itemKey={3}>
                <CAccordionHeader>
                  Patient / Responsible Party
                </CAccordionHeader>
                <CAccordionBody>
                  {
                    this.props.patient && <>
                      <h6>Patient</h6>
                      <CRow>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Patient Name"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Responsible Party Name"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Address 1"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Address 2"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Zip Code"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="City">
                            <option>Select city</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="State">
                            <option>Select state</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="Sex">
                            <option>Select state</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="Gender">
                            <option>Select state</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="SO">
                            <option>Select state</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="Title">
                            <option>Select title</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="Title">
                            <option>Marital Status</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="DOB"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="SSN#"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Phone"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Email"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Note"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <h6>Responsible party</h6>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Patient Name"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Responsible Party Name"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Address 1"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Address 2"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Zip Code"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="City">
                            <option>Select city</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={2}>
                          <CFormSelect aria-label="Default select example" label="State">
                            <option>Select state</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3" disabled>Three</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>
                    </>
                  }
                </CAccordionBody>
              </CAccordionItem>
              {/*physician*/}
              <CAccordionItem onClick={() => this.props.activeAccordion(4)} itemKey={4}>
                <CAccordionHeader>
                  Physician
                </CAccordionHeader>
                <CAccordionBody>
                  {
                    this.props.physician &&
                    <>
                      <CRow>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Ref. Provider name"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="NPI"
                            placeholder="eg:- Doe, Jhon"
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                      </CRow>
                    </>
                  }
                </CAccordionBody>
              </CAccordionItem>
              {/*history*/}
              <CAccordionItem onClick={() => this.props.activeAccordion(5)} itemKey={5}>
                <CAccordionHeader>
                  History
                </CAccordionHeader>
                <CAccordionBody>
                  {this.props.history &&
                    <table className="table table-bordered border-primary">
                      <thead>
                      <tr>
                        <th scope="col" className={"col-md-1"}>Date</th>
                        <th scope="col" className={"col-md-1"}>Event</th>
                        <th scope="col" className={"col-md-1"}>Visit No.</th>
                        <th scope="col" className={"col-md-1"}>Detail</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.props.history.map((plan) => {
                        // eslint-disable-next-line react/jsx-key
                        return (<tr>
                            <th scope="col" className={"col-md-1"}></th>
                            <th scope="col" className={"col-md-1"}></th>
                            <th scope="col" className={"col-md-1"}></th>
                            <th scope="col" className={"col-md-1"}></th>
                          </tr>
                        )
                      })
                      }
                      </tbody>
                    </table>
                  }
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
            <CRow>
              <CCol md={12}>
                <CButton
                  color="primary" className={"action-btn"} size={"sm"}>Approve</CButton>
                <CButton
                  color="primary" className={"action-btn"} size={"sm"}>Void</CButton>
                <CButton
                  color="primary" className={"action-btn"} size={"sm"}>Trash</CButton>
                <CButton
                  color="primary" className={"action-btn"} size={"sm"}>Save</CButton>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      </>
    )
  }
}


function hideIndividualClaimViewActionCreator() {
  return async function (dispatch, getState) {
    dispatch({type: 'STOP_INDIVIDUAL_CLAIM_REVIEW'})
  }
}

function getClaimDetailsActionCreator(claimId) {
  return async function (dispatch, getState) {
    fetch("http://localhost:5000/api/claims/1")
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: 'LOAD_INDIVIDUAL_CLAIM_DETAIL',
          charges: result.charges,
          patient: result.patient,
          physician: result.physician,
          history: result.history
        })
      })
  }
}

function activeAccordionActionCreator(itemNo) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'ACTIVE_ACCORDION_CHANGE',
      active_accordion: itemNo
    })
  }
}

IndividualClaim.propTypes = {
  hideIndividualClaimView: PropTypes.func,
  charges: PropTypes.array,
  patient: PropTypes.object,
  physician: PropTypes.object,
  history: PropTypes.arrayOf(Object),
  getClaimDetails: PropTypes.func,
  activeAccordion: PropTypes.func,
  activeAccordionItemNo: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    is_reviewing_claim: state.IS_REVIEWING_CLAIM,
    charges: state.CHARGES,
    patient: state.PATIENT,
    physician: state.PHYSICIAN,
    history: state.HISTORY,
    activeAccordionItemNo: state.ACTIVE_ACCORDION_ITEM_NO
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    hideIndividualClaimView: () => dispatch(hideIndividualClaimViewActionCreator()),
    getClaimDetails: (claimId) => dispatch(getClaimDetailsActionCreator(claimId)),
    activeAccordion: (itemNo) => dispatch(activeAccordionActionCreator(itemNo))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualClaim)

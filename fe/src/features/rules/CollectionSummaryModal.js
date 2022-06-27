import React from 'react'
import {connect} from "react-redux/es/index";
import {
  CButton,
  CCol,
  CFormInput,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CWidgetStatsB
} from "@coreui/react/dist/index";
import PropTypes from "prop-types";

class CollectionSummaryModal extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <>

        <CModal size="xl" visible={true} className={"font-config"} onClose={() => {
          this.props.hideCollectionSummary();
        }}>

          <CModalHeader>
            <CModalTitle>Rule Collection - Blood</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={2}>
                <CWidgetStatsB
                  className="mb-3"
                  progress={{color: 'success', value: 89.9}}
                  text=""
                  title="Pay Rate"
                  value="89.9%"
                />
              </CCol>
              <CCol md={2}>
                <CWidgetStatsB
                  className="mb-3"
                  text=""
                  progress={{color: 'success', value: 80}}
                  title="Processed # / %"
                  value="1,040 / 80%"
                />
              </CCol>
              <CCol md={2}>
                <CWidgetStatsB
                  progress={{color: 'danger', value: 20}}
                  className="mb-3"
                  text=""
                  title="Rejections"
                  value="260 / 20%"
                />
              </CCol>
              <CCol md={2}>
                <CWidgetStatsB
                  className="mb-3"
                  text=""
                  title="Rules"
                  value="23"
                />
              </CCol>
              <CCol md={1} className={"font-config"}>
                <CFormSwitch defaultChecked label="Active"  id="formSwitchCheckDefault"/>
              </CCol>
              <CCol md={1}>
                <CButton color="dark" size={"sm"}>Clone</CButton>
              </CCol>
              <CCol md={2}>
                <CButton color="dark" size={"sm"}>View Analytics</CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <h6>Top Denials</h6>
                <table className="table table-bordered border-primary">
                  <thead>
                  <tr>
                    <th scope="col" className={"col-md-1"}>Denial Reason</th>
                    <th scope="col" className={"col-md-1"}>#</th>
                    <th scope="col" className={"col-md-1"}>%</th>
                  </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </CCol>
              <CCol md={6}>
                <h6>Top Payors</h6>
                <table className="table table-bordered border-primary">
                  <thead>
                  <tr>
                    <th scope="col" className={"col-md-1"}>Payor</th>
                    <th scope="col" className={"col-md-1"}>#</th>
                    <th scope="col" className={"col-md-1"}>%</th>
                  </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <h6>Top CPTs</h6>
                <table className="table table-bordered border-primary">
                  <thead>
                  <tr>
                    <th scope="col" className={"col-md-1"}>CPT Code</th>
                    <th scope="col" className={"col-md-1"}>#</th>
                    <th scope="col" className={"col-md-1"}>%</th>
                  </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </CCol>
            </CRow>

            {/*Rules*/}
            <CRow>
              <CCol md={2}>
                <h6>Rule Chain
                </h6>
              </CCol>
              <CCol md={9}>
                <button className="plus-button plus-button--small"
                onClick={() => {
                  this.props.showCreateRule()
                }}
                ></button>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12}>
                <table className="table table-bordered border-primary">
                  <thead>
                  <tr>
                    <th scope="col" className={"col-md-1"}>Name</th>
                    <th scope="col" className={"col-md-1"}>Order</th>
                    <th scope="col" className={"col-md-1"}>Status</th>
                    <th scope="col" className={"col-md-1"}>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      </>
    );
  }
}

function hideCollectionSummaryActionCreator() {
  return async function (dispatch, getState) {
    dispatch({
      type: 'SHOW_COLLECTION_SUMMARY',
      value: false
    })
  }
}

function showCreateRuleActionCreator(){
  return async function (dispatch, getState) {
    dispatch({
      type: 'SHOW_MANAGE_RULES',
      value: true
    })
  }
}

CollectionSummaryModal.propTypes = {
  hideCollectionSummary: PropTypes.func,
  showCreateRule : PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    show_collection_summary: state.SHOW_COLLECTION_SUMMARY
  }
}
const mapStateToDispatch = (dispatch) => {
  return {
    hideCollectionSummary: () => dispatch(hideCollectionSummaryActionCreator()),
    showCreateRule : () => dispatch(showCreateRuleActionCreator())
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(CollectionSummaryModal)

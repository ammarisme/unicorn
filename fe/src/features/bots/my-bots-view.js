import React from 'react'
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import {CCard, CCardBody,CCardTitle, CCol, CRow} from "@coreui/react/dist/index";
import showViewActionCreator from '../../shared/shared-functions'
import ManageRule from "./manage-bot";
import {CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";

class MyBotsView extends React.Component {
  constructor(props) {
    super();

  }

  componentDidMount() {
    this.props.loadRuleBoxes()
  }

// {
//   this.props.show_collection_summary && <CollectionSummaryModal></CollectionSummaryModal>
// }

  render() {
    return (
      <>
        {
          (
            this.props.view_state.MANAGE_BOT &&
            this.props.view_state.MANAGE_BOT.VISIBLE) && <ManageRule></ManageRule>
        }
          <CCard className="mb-12 main-card font-config">
              <CCardBody>

                <CRow>
                  <CCol md={10}></CCol>
                  <CCol md={2}>
                    <CButton color="dark" size="sm"
                    onClick={() => this.props.showView("MANAGE_BOT", true)}
                    >Setup Bot</CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
        {
          this.props.rule_boxes &&
          <CCard className="mb-12 main-card font-config">
            <CCardBody>
              <CCardTitle>My Bots</CCardTitle>
              <CRow>
                <CCol md={12}>
                  <CTable bordered>
                    <CTableBody>
                      {
                        this.props.rule_boxes.map((rule) => {
                          return <>
                            <CTableRow>
                              <CTableHeaderCell scope="row">{rule.name}</CTableHeaderCell>
                              <CTableDataCell>{rule.description}</CTableDataCell>
                              <CTableDataCell>
                                <CButton color="dark" size="sm"
                                                       onClick={() => this.props.showView("MANAGE_BOT", true)}
                              >View</CButton>
                              </CTableDataCell>
                            </CTableRow>
                          </>
                        })
                      }
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        }
      </>
    );
  }
}

function loadRuleBoxesActionCreator() {
  return async function (dispatch, getState) {
    fetch("http://localhost:5000/api/bots").then(res => res.json())
      .then(result => {
          dispatch({
            type: 'LOAD_RULE_BOXES',
            rule_boxes: result
          })
        }, error => {
        }
      )
  }
}



function showCollectionSummaryActionCreator(){
  return async function (dispatch, getState){
    dispatch({
      type : 'SHOW_COLLECTION_SUMMARY',
      value : true
    })
  }
}

MyBotsView.propTypes = {
  loadRuleBoxes: PropTypes.func,
  loadMyCollection: PropTypes.func,
  rule_boxes: PropTypes.array,
  my_collections: PropTypes.array,
  show_collection_summary :PropTypes.bool,
  view_state : PropTypes.object,
  showCollectionSummary: PropTypes.func,
  showView : PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    rule_boxes: state.RULE_BOXES,
    my_collections: state.MY_COLLECTIONS,
    show_collection_summary : state.SHOW_COLLECTION_SUMMARY,
    view_state : state.VIEW_STATE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRuleBoxes: () => dispatch(loadRuleBoxesActionCreator()),
    showView : (modalName, visible) => dispatch(showViewActionCreator(modalName, visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBotsView);

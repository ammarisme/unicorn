import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react/dist/index";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {showViewActionCreator} from "../../../shared/shared-functions";
import DynamicSelect from "../../../shared/components/DynamicSelect";
import {FaMinusCircle} from "react-icons/fa";

class ManageAction extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      SHOW_THEN: false,
      action_type : ""
    })
  }

  render() {
    if (!this.state){
      return <></>
    }
    return (
      <CModal alignment="center" size="md"  visible={true} className={"font-config"} onClose={() => {
        this.props.showView("MANAGE_ACTION", false);
      }}>
        <CModalHeader className={"modal-type-2"}>
          <CModalTitle>New Action</CModalTitle>
        </CModalHeader>
        <CModalBody className={"modal-type-2"}>
          <CContainer fuild style={{"marginTop": "10px"}}>
            <CCol md={4}>
              <CFormSelect
                id="field_type"
                aria-label="Default select example"
                options={["Select Action type",
                  {label: 'Update Record', value: 'update'},
                  {label: 'Set Flag', value: 'flag'},
                  {label: 'Send Email', value: 'email'},
                ]}
                onChange={(event) => {
                  this.setState({
                    ...this.state,
                    "action_type": event.target.value
                  })
                }}
              />
            </CCol>
          </CContainer>
          <CContainer fluid style={{"marginTop": "10px"}}>
            {
              this.state.action_type == "flag" &&
              <>
                <DynamicSelect label={"Select flags : "} isMulti={true}
                               url={"http://localhost:5000/api/flags"}></DynamicSelect>
              </>
            }
            {
              this.state.action_type == 'email' &&
              <>

                <DynamicSelect label={"To:"}
                               url={"http://localhost:5000/api/my-contacts"}
                               isMulti={true}></DynamicSelect>
                <DynamicSelect label={"CC:"} url={"http://localhost:5000/api/my-contacts"}
                               isMulti={true}></DynamicSelect>

                <label>Message : </label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                          onChange={((event) => {
                            this.setState({
                              ...this.state,
                              email_body: event.target.value
                            })
                          })}
                />
              </>
            }
            {
              this.state.action_type == "update" &&
              <>
                <CTable bordered borderColor="primary">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Field Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">New Value</CTableHeaderCell>
                      <CTableHeaderCell scope="col">
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      this.state.update_fields && <>
                        {
                          this.state.update_fields.map((field) => {
                            return (<>
                              <CTableRow>
                                <CTableDataCell>
                                  <DynamicSelect queryAttributes={[{"schema": "test-schema"}]}
                                                 url={"http://localhost:5000/api/schema/attributes"}>
                                  </DynamicSelect>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <DynamicSelect
                                    queryAttributes={[{"schema": "test-schema"}, {"attribute": "name"}]}
                                    url={"http://localhost:5000/api/schema/value-suggession"}
                                    isMulti={true}>
                                  </DynamicSelect>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CButton color="primary" size="sm"><FaMinusCircle/></CButton>
                                </CTableDataCell>
                              </CTableRow>
                            </>)
                          })
                        }
                      </>
                    }
                    <CTableRow>
                      <CTableDataCell colSpan={3}>
                        <CButton color="primary" size="sm"
                                 onClick={() => {
                                   let update_fields = this.state.update_fields
                                   update_fields.push({"field_name": null, "value": null})
                                   this.setState({
                                     ...this.state,
                                     update_fields: update_fields
                                   })
                                 }}
                        >+</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </>
            }
          </CContainer>
          <CContainer fuild style={{"marginTop": "10px"}}>
            <CButton color="primary" size="sm">Add</CButton>
          </CContainer>
        </CModalBody>
      </CModal>
    )
  }
}


ManageAction.propTypes = {
  showView: PropTypes.func,
  activeKey: PropTypes.number,
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
    showView : (modalName, visible) => dispatch(showViewActionCreator(modalName, visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAction)

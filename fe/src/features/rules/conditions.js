import React from 'react'
import {connect} from "react-redux/es/index";
import {
  CButton,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormSelect, CFormSwitch,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane
} from "@coreui/react";
import AsyncSelect from 'react-select/async/dist/react-select.cjs.js';
import DynamicSelect from "../../shared/components/DynamicSelect";
import {FaMinusCircle} from "react-icons/fa";

const loadOptions = (
  inputValue: string,
  // callback: (options: ColourOption[]) => void
  callback: (options) => void,
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

class Conditions extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      actonditions: [
        {"actondition_type": "condition", "description": "if x = 1"},
        {"actondition_type": "action", "description": "set flag Q"},
        {"actondition_type": "condition", "description": "if x = 2"}
      ],
      activeKey: "action",
      action_type: "update",
      update_fields: [{"field_name": null, "value": null}]
    })
  }

  render() {
    if (this.state == null) {
      return <></>
    }

    console.log(this.state.update_fields)
    return (
      <>
        <CRow>
          <CContainer>
            <CFormSwitch label="Digram View" id="formSwitchCheckDefault" disabled/>
          </CContainer>
          <CContainer fluid style={{"marginTop": "10px"}}>
            <CCol md={12}>
              <CTable bordered borderColor="primary">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Condition</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    this.state.actonditions.map((actondition) => {
                      if (actondition.actondition_type == "condition") {
                        return <>
                          <CTableRow>
                            <CTableDataCell>Condition : {actondition.description}</CTableDataCell>
                            <CTableDataCell><CButton color="primary" size="sm">Edit</CButton></CTableDataCell>
                          </CTableRow>
                        </>
                      } else if (actondition.actondition_type == "action") {
                        return <>
                          <CTableRow>
                            <CTableDataCell>Action : {actondition.description}</CTableDataCell>
                            <CTableDataCell><CButton color="primary" size="sm">Edit</CButton></CTableDataCell>
                          </CTableRow>
                        </>
                      }
                    })
                  }
                  <CTableRow className={"font-config"}>
                    <CTableDataCell colSpan={2}>
                      <CNav variant="tabs" role="tablist">
                        <CNavItem>
                          <CNavLink
                            href="javascript:void(0);"
                            active={this.state.activeKey === "action"}
                            onClick={() => this.setActiveKey("action")}
                          >
                            New Action
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink
                            href="javascript:void(0);"
                            active={this.state.activeKey === "condition"}
                            onClick={() => this.setActiveKey("condition")}
                          >
                            New Condition
                          </CNavLink>
                        </CNavItem>
                      </CNav>
                      <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="home-tab"
                                  visible={this.state.activeKey === "action"}>
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
                                                   update_fields.push({"field_name":null, "value" : null})
                                                   this.setState({
                                                     ...this.state,
                                                     update_fields : update_fields
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
                            <CButton color="primary" size="sm"
                            >Add</CButton>
                          </CContainer>
                        </CTabPane>
                        <CTabPane role="tabpanel" aria-labelledby="profile-tab"
                                  visible={this.state.activeKey === "condition"}>
                          <CContainer fuild style={{"marginTop": "10px"}}>
                            <CFormSelect
                              id="logical_gate"
                              aria-label="Default select example"
                              options={["Select",
                                {label: 'And', value: 'and'},
                                {label: 'Or', value: 'or'},
                              ]}
                              onChange={(event) => {
                                this.setState({
                                  ...this.state,
                                  "new_field_type": event.target.value
                                })
                              }}
                            />
                            {
                              this.state.new_field_type && <>
                                <DynamicSelect label={"If : "} url={"http://localhost/api/suggesstions"}
                                               queryAttributes={[{"schema" : "ultimate"}]}></DynamicSelect>
                              </>
                            }

                          </CContainer>
                          <CContainer fuild style={{"marginTop": "10px"}}>
                            <CButton color="primary" size="sm">Add</CButton>
                          </CContainer>
                        </CTabPane>
                      </CTabContent>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
            <CButton color="primary" size="sm">Save</CButton>
          </CContainer>
        </CRow>
      </>
    )
  }

  setActiveKey(actondition_type) {
    this.setState({
      ...this.state,
      activeKey: actondition_type
    })
  }
}


Conditions.propTypes = {}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Conditions)

import React from 'react'
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react/dist/index";
import DynamicSelect from "../../../shared/components/DynamicSelect";
import {CBadge, CRow} from "@coreui/react";
import {FaArrowCircleRight, FaBolt, FaSave, FaTrash} from "react-icons/fa";
import {FaPlusCircle, FaPenSquare} from "react-icons/fa";

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

class Operation extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      actions: [{id: 0, description: "Send an email"}]
    })
  }

  render() {
    if (this.state == null) {
      return <></>
    }

    return (
      <>
        <CContainer fluid className={"operation-box"}>
          <div className={"operations-head"}>
            <div className={"label"}>Step {1}</div>
            <div className={"input-container"}><CFormInput type={"text"}></CFormInput></div>
          </div>
          <div className={"operation-content"}>
            <CCol md={12}>
              <DynamicSelect label={"Pre-requisite: "} isMulti={true}
                             url={"http://localhost:5000/api/flags"}></DynamicSelect>
            </CCol>
            <CCol md={12} className={"opearation-row"}>
              <p><a href="#">
                <CBadge color="dark"
                        onClick={(event) => {
                          event.preventDefault()
                          this.setState({
                            ...this.state,
                            add_condition: !this.state.add_condition
                          })
                        }}
                ><FaArrowCircleRight/>
                  {
                    this.state.add_condition && " Remove condition "
                  }
                  {
                    !this.state.add_condition && " Set a condition "
                  }
                </CBadge></a> <span>  or  </span>
                <a href="#"
                   onClick={(event) => {
                     event.preventDefault()
                     this.setState({
                       ...this.state,
                       add_actions: !this.state.add_actions
                     })
                   }}
                ><CBadge color="dark"><FaBolt/>
                  {
                    this.state.add_actions && " Remove all Actions "
                  }
                  {
                    !this.state.add_actions && " Add some Actions "
                  }
                </CBadge></a></p>
            </CCol>
            {
              this.state.add_condition && <CCol md={12} className={"operation-row"}>
                <DynamicSelect label={"Condition: "} isMulti={true}
                               url={"http://localhost:5000/api/flags"}></DynamicSelect>
              </CCol>
            }
            <br/>
            {
              this.state.add_actions &&
              <CCol md={12} className={"operation-row"}>
                <CTable bordered borderColor="primary">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Action </CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      this.state.actions.map(action => {
                        return <> <CTableRow>
                          <CTableDataCell>{action.description}</CTableDataCell>
                          <CTableDataCell>
                            <span className={"badge-button"}><CBadge color="dark">Edit <FaPenSquare/></CBadge></span>
                            </CTableDataCell>
                        </CTableRow>
                        </>
                      })
                    }

                    <CTableRow>
                      <CTableDataCell colSpan={2}>
<span className={"badge-button float-left"}
onClick={() => {
  let actions = this.state.actions
  actions.push({description: "sample"})
  this.setState({
    ...this.state,
    actions : actions
  })
}}
>
  <CBadge color="dark">Add an Action <FaPlusCircle/></CBadge></span>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>

              </CCol>
              }
              </div>
              <div className={"operation-footer"}>
              <span className={"badge-button float-right"}>
              <CBadge color="primary">Save <FaSave/></CBadge>
              </span>
              <span className={"badge-button float-right"}>
              <CBadge color="danger"> Delete <FaTrash/></CBadge>
              </span>


              </div>

              </CContainer>
              </>
              )
              }
              }


              Operation.propTypes = {
              key: PropTypes.object,
              }
              const mapStateToProps = (state) => {
              return {}
              }
              const mapDispatchToProps = (dispatch) => {
              return {}
              }

              export default connect(mapStateToProps, mapDispatchToProps)(Operation)

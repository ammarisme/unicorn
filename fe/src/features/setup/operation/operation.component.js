import React from 'react'
import { connect } from "react-redux/es/index";
import PropTypes from "prop-types";
import {
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
import { DynamicSelect } from 'src/components/custom_components/DynamicSelect'
import { CBadge, CRow } from "@coreui/react";
import { FaArrowCircleRight, FaBolt, FaSave, FaTrash } from "react-icons/fa";
import { FaPlusCircle, FaPenSquare } from "react-icons/fa";
import { ViewActionCreator } from 'src/redux/action_creators/view-action-creator';
import ManageAction from "../manage-action/manage-action";
import { OperationModel } from 'src/domain/models/operation.model';
import SmartSelectComponent from 'src/components/custom_components/smart-select/smart-select.component';
import OperationAPI from 'src/api/operation-api';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class OperationComponent extends React.Component {
  operation = {
    sequence_number: undefined,
    summary: undefined
  }

  constructor() {
    super();

  }


  componentDidMount() {
    this.operation.sequence_number = 1
    console.log('dfsfsf')
    this.setState({
      actions: [{ id: 0, description: "Send an email" }],
      operation: this.operation
    })

  }

  render() {
    if (this.state == null || this.state.operation == undefined) {
      return <></>
    }
    console.log(this.state.operation.sequance_number)
    return (
      <>
        {
          this.props.view_state.MANAGE_ACTION && <ManageAction></ManageAction>
        }
        <CContainer fluid className={"operation-box"}>
          <div className={"operations-head"}>
            <div className={"label"}>Step {this.state.operation.sequance_number}</div>
            <div className={"input-container"}>
              <CFormInput type={"text"}
                onChange={(event) => {
                  this.setState({
                    ...this.state,
                    summary: event.target.value
                  })
                }}
              ></CFormInput></div>
          </div>
          <div className={"operation-content"}>
            <CCol md={12}>
              <SmartSelectComponent
                label={"Pre-requisite: "} isMulti={true}
                APIModelCall={OperationAPI.get_prerequisites}
                data={
                  {
                    "process_status": this.props.process.to_object(),
                    "sequance_number": this.state.operation.sequence_number,
                  }}
              ></SmartSelectComponent>

              {/* <DynamicSelect queryAttributes={[{"process_id": "1"}]}
                             url={"http://localhost:5000/api/processes/get-pre-requisites"}></DynamicSelect> */}
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
                ><FaArrowCircleRight />
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
                ><CBadge color="dark"><FaBolt />
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
            <br />
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
                            <span className={"badge-button"}><CBadge color="dark">Edit <FaPenSquare /></CBadge></span>
                          </CTableDataCell>
                        </CTableRow>
                        </>
                      })
                    }

                    <CTableRow>
                      <CTableDataCell colSpan={2}>
                        <span className={"badge-button float-left"}
                          onClick={() => {
                            this.props.showView("MANAGE_ACTION", true)
                          }}
                        >
                          <CBadge color="dark">Add an Action <FaPlusCircle /></CBadge></span>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>

              </CCol>
            }
          </div>
          <div className={"operation-footer"}>
            <span className={"badge-button float-right"}>
              <CBadge color="primary"
                onClick={() => {
                  // let nodes = this.props.nodes
                  // if (nodes == undefined) {
                  //   nodes = [
                  //     {
                  //       id: "1",
                  //       type: 'input',
                  //       data: {
                  //         label: (
                  //           <>
                  //             {this.state.operation_name}
                  //           </>
                  //         ),
                  //       },
                  //       position: {x: 250, y: 0},
                  //     }
                  //   ]
                  // } else {
                  //   let last_node = nodes[nodes.length - 1]
                  //   nodes = [
                  //     ...nodes,
                  //     {
                  //       id: (parseInt(last_node["id"]) + 1).toString(),
                  //       data: {
                  //         label: (
                  //           <>
                  //             {this.state.operation_name}
                  //           </>
                  //         ),
                  //       },
                  //       position: {x: 250, y: 50 * (parseInt(last_node["id"]) * 3 + 1)}
                  //     }
                  //   ]
                  // }

                  // const operation_data = {
                  //   nodes: nodes
                  //   ,
                  //   edges: []
                  // }
                  // this.props.saveOperation(operation_data)
                }}
              >Save <FaSave /></CBadge>
            </span>
            <span className={"badge-button float-right"}>
              <CBadge color="danger"> Delete <FaTrash /></CBadge>
            </span>
          </div>
        </CContainer>
      </>
    )
  }
}


OperationComponent.propTypes = {
  key: PropTypes.object,
  showView: PropTypes.func,
  saveOperation: PropTypes.func,
  view_state: PropTypes.object,
  nodes: PropTypes.array,
  process: PropTypes.object,
}
const mapStateToProps = (state) => {
  return {
    view_state: state.VIEW_STATE,
    nodes: state.NODES
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showView: (modalName, visible) => dispatch(ViewActionCreator.showViewActionCreator(modalName, visible)),
    saveOperation: (operation_data) => dispatch(ViewActionCreator.saveOperationActionCreator(operation_data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationComponent)

import {FaArrowDown} from "react-icons/fa";
import React from 'react'
import {connect} from "react-redux";
import {CBadge, CButton, CCol, CContainer, CFormSwitch, CRow} from "@coreui/react/dist/index";
import OperationComponent from "../operation/operation.component";
import ProcessDiagramComponent from "../process-diagram/process-diagram.component";
import PropTypes from "prop-types";
import {FaPlusCircle} from "react-icons/fa";


class OperationsListComponent extends React.Component {
  process;
  constructor() {
    super();
  }

  componentDidMount() {

    this.process = this.props.process

    this.setState({
      operations: [
      ],
      activeKey: "action",
      action_type: "update",
      update_fields: [{"field_name": null, "value": null}]
    })
  }

  render() {
    if (!this.state) {
      return <></>
    }
    return (
      <>
        <CRow>
          <CCol md={
            () => {
              if (this.props.view_state.PRO_VIEW) {
                return 6
              } else {
                return 12
              }
            }
          }>
            {
              this.state.operations.map((rank, i, operation) => {
                return (<> <OperationComponent process={this.process} key={operation}/>
                  {
                    (i + 1 != this.state.operations.length) &&
                    <div className={"lead-to-next"}>
                      <div className={"next-icon"}>
                        <FaArrowDown/>
                      </div>
                    </div>
                  }
                  {
                    (i + 1 == this.state.operations.length) &&
                    <div className={"lead-to-next"}>
                      <div className={"next-icon"}>
                        <FaArrowDown/>
                      </div>
                      <div >
                        <span className={"badge-button div-center"}>
                        <CBadge color="primary" className={"hand-cursor"}
                                onClick={(event) => {
                                  event.preventDefault()
                                  let operations = this.state.operations
                                  operations.push({})
                                  this.setState({
                                    operations : operations
                                  })
                                }}>Add new <FaPlusCircle/></CBadge>
                        </span>
                      </div>
                    </div>
                  }
                </>)
              })
            }

            {  (this.state.operations.length==0) &&
            <div className={"lead-to-next"}>
              <div >
                        <span className={"badge-button div-center"}>
                        <CBadge color="primary" className={"hand-cursor"}
                                onClick={(event) => {
                                  event.preventDefault()
                                  let operations = this.state.operations
                                  operations.push({})
                                  this.setState({
                                    operations : operations
                                  })
                                }}>Add new <FaPlusCircle/></CBadge>
                        </span>

              </div>
            </div>
            }
          </CCol>
          {
            this.props.view_state.PRO_VIEW && <CCol md={6}>
              <ProcessDiagramComponent></ProcessDiagramComponent>
            </CCol>
          }

        </CRow>
      </>
    )
  }
}


OperationsListComponent.propTypes = {
  switchToProView: PropTypes.func,
  view_state: PropTypes.object,
  process : PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    view_state: state.VIEW_STATE
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationsListComponent)

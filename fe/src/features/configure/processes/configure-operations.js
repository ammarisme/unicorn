import {FaArrowDown} from "react-icons/fa";
import React from 'react'
import {connect} from "react-redux";
import {CBadge, CButton, CCol, CContainer, CFormSwitch, CRow} from "@coreui/react/dist/index";
import Operation from "./operation";
import ProcessDiagram from "./process-diagram";
import PropTypes from "prop-types";
import {FaPlusCircle} from "react-icons/fa";


class ConfigureOperations extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      operations: [
        {id: 0, "actondition_type": "condition", "description": "if x = 1"},
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
                return (<> <Operation key={operation}/>
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
            <CContainer>
              <CFormSwitch label="Digram View" id="formSwitchCheckDefault" disabled/>
            </CContainer>
          </CCol>
          {
            this.props.view_state.PRO_VIEW && <CCol md={6}>
              <ProcessDiagram></ProcessDiagram>
            </CCol>
          }

        </CRow>
      </>
    )
  }
}


ConfigureOperations.propTypes = {
  switchToProView: PropTypes.func,
  view_state: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    view_state: state.VIEW_STATE
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureOperations)

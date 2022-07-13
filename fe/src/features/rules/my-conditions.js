import React from 'react'
import {
  CCol,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow
} from "@coreui/react/dist/index";
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import { ViewActionCreator } from 'src/redux/action_creators/view-action-creator';
import DefineSchema from "./define-schema"
import Conditions from "../configure/processes/configure-operations";
import Actions from "./actions";
import Finish from "./finish";

class MyConditions extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadCreateRuleParams()
    this.setState({
      SHOW_THEN: false,
    })
  }

  render() {
    console.log(this.props.view_state)
    return (
      <CModal size="xl" fullscreen={"xl"} visible={true} className={"font-config"} onClose={() => {
        this.props.showView("CREATE_RULE", false);
      }}>
        <CModalHeader>
          <CModalTitle>Create / Update Rule</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={3}>
              <CListGroup>
                <CListGroupItem
                onClick={() => this.props.showView("DEFINE_SCHEMA", true)}
                active={this.props.view_state.DEFINE_SCHEMA &&
                this.props.view_state.DEFINE_SCHEMA.VISIBLE }
                >Step 1 : Define Schema</CListGroupItem>
                <CListGroupItem
                  onClick={() => this.props.showView("CONDITIONS", true)}
                  active={this.props.view_state.CONDITIONS &&
                  this.props.view_state.CONDITIONS.VISIBLE }>Step 2 : Conditions / Actions</CListGroupItem>
                {/*<CListGroupItem*/}
                {/*  onClick={() => this.props.showView("ACTIONS", true)}*/}
                {/*  active={this.props.view_state.ACTIONS &&*/}
                {/*  this.props.view_state.ACTIONS.VISIBLE }*/}
                {/*>Step 3 : Actions</CListGroupItem>*/}
                <CListGroupItem
                  onClick={() => this.props.showView("FINISH", true)}
                  active={this.props.view_state.FINISH &&
                  this.props.view_state.FINISH.VISIBLE }
                >Step 4 : Finish</CListGroupItem>
              </CListGroup>
            </CCol>
            <CCol md={9}>
              {/*{*/}
              {/*  this.props.ruleParams && <CCard className="mb-12 main-card">*/}
              {/*    <CCardHeader>*/}
              {/*      Step 1:*/}
              {/*      <CFormInput*/}
              {/*        type="text"*/}
              {/*        id="exampleFormControlInput1"*/}
              {/*        placeholder=""*/}
              {/*        text=".."*/}
              {/*        aria-describedby="exampleFormControlInputHelpInline"*/}
              {/*        value={"Rule 1"}*/}
              {/*      />*/}
              {/*    </CCardHeader>*/}
              {/*    <CCardBody>*/}

              {/*      <CRow>*/}
              {/*        {*/}
              {/*          this.props.conditions && <>*/}
              {/*          {*/}
              {/*            this.props.conditions.map(condition => {*/}
              {/*              return (<>*/}
              {/*                <CreateCondition ></CreateCondition>*/}
              {/*              </>)*/}
              {/*            })*/}
              {/*          }*/}
              {/*          </>*/}
              {/*        }*/}
              {/*      </CRow>*/}

              {/*    </CCardBody>*/}
              {/*  </CCard>*/}
              {/*}*/}
              {
                this.props.view_state.DEFINE_SCHEMA &&
                this.props.view_state.DEFINE_SCHEMA.VISIBLE && <DefineSchema></DefineSchema>
              }
              {
                this.props.view_state.CONDITIONS &&
                this.props.view_state.CONDITIONS.VISIBLE && <Conditions></Conditions>
              }
              {
                this.props.view_state.ACTIONS &&
                this.props.view_state.ACTIONS.VISIBLE && <Actions></Actions>
              }
              {
                this.props.view_state.FINISH&&
                this.props.view_state.FINISH.VISIBLE && <Finish></Finish>
              }
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    )
  }
}


function setActiveKeyActionCreator(activeKey) {
  return async function (dispatch, getState) {
    dispatch({
        type: 'MANAGE_RULES_TAB',
        value: activeKey
      }
    )
  }
}

function loadCreateRuleParamsActionCreator() {

  return async function (dispatch, getState) {

    fetch('http://localhost:5000/api/rules-engine/get-schema')

      .then(res => res.json())
      .then(result => {
        dispatch({
            type: 'LOAD_CONDITIONS',
            INIT_CONDITIONS: [0]
          }
        )

        dispatch({
          type: 'LOAD_CREATE_RULE_PARAMS'
        })

      })
  }
}

MyConditions.propTypes = {
  showView: PropTypes.func,
  activeKey: PropTypes.number,
  setActiveKey: PropTypes.func,
  loadCreateRuleParams: PropTypes.func,
  ruleParams: PropTypes.object,
  conditions: PropTypes.array,
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
    showView : (modalName, visible) => dispatch(ViewActionCreator.showViewActionCreator(modalName, visible)),
    setActiveKey: (activeKey) => dispatch(setActiveKeyActionCreator(activeKey)),
    loadCreateRuleParams: () => dispatch(loadCreateRuleParamsActionCreator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyConditions)

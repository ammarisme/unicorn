import React, {useState} from 'react'
import {
  CButton, CCol,
  CFormInput, CFormSelect, CRow

} from "@coreui/react/dist/index";
import {connect} from "react-redux/es/index";
import PropTypes from "prop-types";
import AsyncSelect from 'react-select/async/dist/react-select.cjs.js';

const loadOptions = (
  inputValue,
  // callback: (options: ColourOption[]) => void
  callback
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

const loadActionSuggesstions = (
  inputValue: string,
  // callback: (options: ColourOption[]) => void
  callback: (options) => void,
) => {
  const state = JSON.parse(localStorage.getItem('state'))['state']
  const my_queries = state['CREATE_RULE_QUERY_TREE']
  fetch("http://localhost:5000/api/rules-engine/get-action-suggesstions", {
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

class CreateCondition extends React.Component {

  constructor() {
    super();
  }


  componentDidMount() {
    this.props.loadInitialData()
  }

  handleInputChange = (newValue) => {
    // const inputValue = newValue.replace(/\W/g, '');
    this.setState({newValue});
    return newValue;
  }


  handleActionSuggesstionChange= (newValue) => {
    this.setState(
      {
        ...this.state,
        input_update: newValue
      });
    console.log(newValue)
    return newValue;
  }

  logicalElementSelected = (value) => {
    this.props.addToQueryTree(this.props.context, value)
  }

  updateStatementSelected = (value) => {
    if (value.meta.target_subschema != undefined){
      this.props.showSchemaUpdateView(value.target_subschema)
    }

    // this.props.addToUpdateQueryTree(this.props.context, value)
    // show the proper data manipulation component based on the value selected.
    // update + context -> load the specific context to update.
    // update first <number> subschema --> load the subschema
    // update last <number> same as above
    // update all <subschema> load subschema
    //

  }

  render() {
    if (this.props == undefined) {
      return (<div>Loading</div>)
    }
    return (
      <>
        <CRow>
          <div className={"logic-text"}>
            <span>If </span>
          </div>
          <div>
            <AsyncSelect
              data={this.props}
              cacheOptions
              isMulti
              loadOptions={loadOptions}
              defaultOptions
              onInputChange={this.handleInputChange}
              onChange={this.logicalElementSelected}
            />
          </div>
        </CRow>
        <div>
          <CCol md={4}>
            Update instruction : <AsyncSelect
            data={this.props}
            cacheOptions
            loadOptions={loadActionSuggesstions}
            defaultOptions
            onInputChange={this.handleActionSuggesstionChange}
            onChange={this.updateStatementSelected}
          />
          </CCol>
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Field Name</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Default Carrier</td>
                <td></td>
              </tr>
              <tr>
                <td>Pre-auth</td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>

          {
            this.props.showSchemaUpadter &&
              <>
                <div>Preview :
                  <table className="table mb-0">
                    <thead>
                    <tr>
                      <th>CPT Code</th>
                      <th>Units</th>
                      <th>Modifier</th>
                      <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </>
          }

        </div>
        <CRow>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Test Data</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                      onChange={((event) => {
                        this.setState({
                          testData: event.target.value
                        })
                      })}
            ></textarea>
          </div>
          <div className="mb-3">{this.props.testResult}</div>
        </CRow>
        <CRow md={12}>
          <CCol md={2} className="font-config">
            <CButton size={"sm"} onClick={() => {
              this.props.test(this.state.testData)
            }}>Test</CButton>
          </CCol>
        </CRow>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeKey: state.MANAGE_RULES_ACTIVE_TAB,
    ruleParams: state.RULE_PARAMS,
    context: state.CREATE_RULE_CONTEXT,
    suggestions: state.CREATE_RULE_SUGGESTIONS,
    queryTree: state.CREATE_RULE_QUERY_TREE,
    testResult: state.TEST_RESULTS,
    showSchemaUpadter : state.SHOW_SCHEMA_UPDATER
  }
}

function setContextActionCreator(context) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'CREATE_RULE',
      sub_type: 'SET_CONTEXT',
      data: context
    })
  }
}

function resetContextActionCreator() {
  return async function (dispatch, getState) {
    dispatch(
      {
        type: 'CREATE_RULE',
        sub_type: 'RESET_CONTEXT'
      }
    )
  }
}

function loadInitialDataActionCreator() {
  return async function (dispatch, getState) {
    dispatch({
      type: 'CREATE_RULE',
      sub_type: 'LOAD_INITIAL_DATA'
    })
  }
}

function loadSuggessionsActionCreator(context) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'CREATE_RULE',
      sub_type: 'LOAD_SUGGESSTIONS'
    })
  }
}

function addToQueryTreeActionCreator(currentContext, inputValue) {
  return async function (dispatch, getState) {
    if (inputValue.length > 0) {
      const logical_operator = inputValue[inputValue.length - 1].value
      const parameter = inputValue[inputValue.length - 1].label.split("'")[1]
      const type = inputValue[inputValue.length - 1].type

      console.log(inputValue)

      dispatch({
        type: 'CREATE_RULE',
        sub_type: 'ADD_TO_QUERY_TREE',
        data: {
          current_context: currentContext,
          inputValue: {
            logical_operator: logical_operator,
            parameter: parameter,
            type: type
          }
        }
      })
    }
  }
}

function addToUpdateQueryTreeActionCreator(inputValue, currentContext) {
  return async function (dispatch, getState) {
    if (inputValue.length > 0) {
      const logical_operator = inputValue[inputValue.length - 1].value
      const parameter = inputValue[inputValue.length - 1].label.split("'")[1]
      const type = inputValue[inputValue.length - 1].type

      console.log(inputValue)

      dispatch({
        type: 'CREATE_RULE',
        sub_type: 'ADD_TO_UPDATE_QUERY_TREE',
        data: {
          current_context: currentContext,
          inputValue: {
            logical_operator: logical_operator,
            parameter: parameter,
            type: type
          }
        }
      })
    }
  }
}

function testActionCreator(test_data) {
  const test_json = test_data
  return async function (dispatch, getState) {
    const state = JSON.parse(localStorage.getItem('state'))['state']
    const my_queries = state['CREATE_RULE_QUERY_TREE']
    fetch("http://localhost:5000/api/rules-engine/test",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          // your expected POST request payload goes here
          test_data: test_json,
          query_tree: my_queries
        })
      }
    ).then(res => res.json())
      .then(result => {
          dispatch({
            type: 'CREATE_RULE',
            sub_type: 'TEST',
            data: result["result"]
          })
        }
      )
  }
}

function showSchemaUpdateViewActionCreator(schema){
  return async function (dispatch, getState){
    dispatch({
      type: "CREATE_RULE",
      sub_type : "SHOW_SCHEMA_UPDATE_VIEW",
      data : {
        schema : schema,
        show : true
      }
      })
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData: () => dispatch(loadInitialDataActionCreator()),
    setContext: (context) => dispatch(setContextActionCreator(context)),
    resetContext: () => dispatch(resetContextActionCreator()),
    loadSuggessions: (context) => dispatch(loadSuggessionsActionCreator(context)),
    addToQueryTree: (currentContext, inputValue) => dispatch(addToQueryTreeActionCreator(currentContext, inputValue)),
    test: (testData) => dispatch(testActionCreator(testData)),
    addToUpdateQueryTree: (input_value, current_context) => dispatch(addToUpdateQueryTreeActionCreator()),
    showSchemaUpdateView : (schema) => dispatch(showSchemaUpdateViewActionCreator(schema))
  }
}

CreateCondition.propTypes = {
  ruleParams: PropTypes.object,
  context: PropTypes.string,
  suggestions: PropTypes.array,
  queryTree: PropTypes.array,
  testResult: PropTypes.string,
  showSchemaUpadter : PropTypes.bool,

  // prop functions
  setContext: PropTypes.func,
  loadCreateRuleParams: PropTypes.func,
  addCondition: PropTypes.func,
  resetContext: PropTypes.func,
  loadInitialData: PropTypes.func,
  loadSuggessions: PropTypes.func,
  addToQueryTree: PropTypes.func,
  test: PropTypes.func,
  addToUpdateQueryTree: PropTypes.func,
  showSchemaUpdateView : PropTypes.func
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCondition)

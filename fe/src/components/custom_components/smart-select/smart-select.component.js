import React from 'react'
import { connect } from "react-redux/es/index";
import AsyncSelect from 'react-select/async/dist/react-select.cjs.js';
import * as PropTypes from "prop-types";

export class SmartSelectComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  logicalElementSelected = (value) => {
    console.log(value)
  }

  handleInputChange = (newValue) => {
    this.setState({ newValue });
    console.log(newValue)
    return newValue;
  }

  render() {

    return (
      <>
        <div className={"custom-input"}>
          <div className={"input-label"}>
            {
              this.props.label && <label className={"dynamic-select-label"}>{this.props.label}</label>
            }
          </div>
          <div className={"input-box"}>
            <AsyncSelect
              data={this.props}
              cacheOptions
              isMulti={this.props.isMulti}
              loadOptions={this.loadOptions}
              defaultOptions
              onInputChange={this.handleInputChange}
              onChange={this.logicalElementSelected}
            />
          </div>
        </div>
      </>
    )
  }

  loadOptions = (
    inputValue,
    callback,
  ) => {
    this.props.APIModelCall(this.props.data, callback)
  }
}

SmartSelectComponent.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  isMulti: PropTypes.bool,
  queryAttributes: PropTypes.array,
  APIModelCall : PropTypes.any,
  data : PropTypes.object
}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartSelectComponent)

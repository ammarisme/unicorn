import React from 'react'
import {connect} from "react-redux/es/index";
import AsyncSelect from 'react-select/async/dist/react-select.cjs.js';
import * as PropTypes from "prop-types";

export class DynamicSelect extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  logicalElementSelected = (value) => {
    console.log(value)
  }

  handleInputChange = (newValue) => {
    // const inputValue = newValue.replace(/\W/g, '');
    this.setState({newValue});
    console.log(newValue)
    return newValue;
  }

  render() {
    if (this.props.url == undefined) {
      return <></>
    }
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
    // callback: (options: ColourOption[]) => void
    callback,
  ) => {
    let url = this.props.url + "?"
    if (this.props.queryAttributes != undefined) {
      this.props.queryAttributes.forEach(function (item, index) {
        const key = Object.getOwnPropertyNames(item)[0]
        const value = item[key]
        url += key + "=" + value + "&"
      });
    }

    fetch(url + "query=" + inputValue, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        callback(result)
      })
  };

}

DynamicSelect.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  isMulti: PropTypes.bool,
  queryAttributes: PropTypes.array
}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicSelect)

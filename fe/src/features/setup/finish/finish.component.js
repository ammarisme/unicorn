import React from 'react'
import {connect} from "react-redux/es/index";
import {CContainer, CFormInput} from "@coreui/react";

class FinishComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('c did mount')
  }

  render() {
    return (
      <CContainer>
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          label="Rule name"
          placeholder=""
          text=".."
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                  onChange={((event) => {
                    this.setState({
                      testData: event.target.value
                    })
                  })}
        ></textarea>
      </CContainer>
    )
  }
}


FinishComponent.propTypes = {
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishComponent)

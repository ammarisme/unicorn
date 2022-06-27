import React from 'react'
import {connect} from "react-redux/es/index";
import {
  CButton,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";

class Actions extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('c did mount')
  }

  render() {
    return (
      <CContainer>
        <CTable bordered borderColor="primary">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Send an email to CTO.</CTableDataCell>
              <CTableDataCell>email</CTableDataCell>
              <CTableDataCell><CButton color="primary" size="sm">Edit</CButton></CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <CButton color="primary" size="sm">Add action</CButton>
      </CContainer>
    )
  }
}


Actions.propTypes = {}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)

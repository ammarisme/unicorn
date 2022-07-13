import React from 'react'
import {connect} from "react-redux/es/index";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput, CFormSelect,
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import {DynamicSelect} from 'src/common/components/DynamicSelect'
import PropTypes from "prop-types";
import {FaMinusCircle} from "react-icons/fa";

class DefineSchema extends React.Component {


  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      "schema": [
        {"field_name": "Name", "type": "text", "default": ""},
        {"field_name": "Age", "type": "number", "default": ""}
      ]
    })
  }

  render() {
    if (this.state == null) {
      return <></>
    }
    return (
      <>
        <CRow>
          <CCol md={8}>
            <DynamicSelect url={"http://localhost:5000/api/schema"} queryAttributes={[{"schema" : "ultimate"}]}
                           label={"Select Entity"}></DynamicSelect>
          </CCol>
        </CRow>
        <CContainer fluid style={{"marginTop": "10px"}}>
          <span style={{
            "marginRight" : "10px"
          }}>Or</span>
          <span>
          <CButton color="primary" size="sm">Create a new Entity</CButton>
          </span>
        </CContainer>
        <CRow>
          <CContainer fluid style={{"marginTop": "10px"}}>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                label="Entity Name"
                placeholder=""
                text=".."
                onChange={(event) => {
                  this.setState({
                    ...this.state,
                    schema_name: event.target.value
                  })
                }}
                aria-describedby="exampleFormControlInputHelpInline"
              />
            </CCol>
          </CContainer>
        </CRow>
        <CRow>
          <CContainer fluid style={{"marginTop": "10px"}}>
            <CCol md={12}>
              <CTable bordered borderColor="primary">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Attribute</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Default value</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    this.state.schema && <>
                      {
                        this.state.schema.map((schema) => {
                          return (
                            <>
                              <CTableRow>
                                <CTableDataCell>{schema.field_name}</CTableDataCell>
                                <CTableDataCell>{schema.type}</CTableDataCell>
                                <CTableDataCell>{schema.default}</CTableDataCell>
                                <CTableDataCell>
                                  <CButton color="primary" size="sm"
                                           onClick={() => {
                                             this.removeFieldFromSchema(schema.field_name)
                                           }}
                                  ><FaMinusCircle/></CButton>
                                </CTableDataCell>
                              </CTableRow>
                            </>)
                        })
                      }
                    </>
                  }
                  <CTableRow>
                    <CTableDataCell colSpan={4}>
                      <CRow>
                        <CCol md={3}>
                          <CFormInput
                            type="text"
                            id="ifield_name"
                            placeholder="New Field Name"
                            text=""
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                "new_field_name": event.target.value
                              })
                            }}
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormSelect
                            id="field_type"
                            aria-label="Default select example"
                            options={["New Field Type",
                              {label: 'Text', value: 'text'},
                              {label: 'Number', value: 'number'},
                              {label: 'Boolean', value: 'boolean', disabled: true}
                            ]}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                "new_field_type": event.target.value
                              })
                            }}
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormInput
                            type="text"
                            id="default_value"
                            placeholder=""
                            text=".."
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        </CCol>
                        <CCol md={3}>
                          <CButton color="primary" size="sm"
                                   onClick={() => {
                                     this.addFieldToSchema()
                                   }}
                          >Add</CButton>
                        </CCol>
                      </CRow>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
            <CCol md={8}>
              <label>Description</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                        onChange={((event) => {
                          this.setState({
                            ...this.state,
                            schema_description: event.target.value
                          })
                        })}
              />
            </CCol>
            <CButton color="primary" size="sm"
                     onClick={() => {
                       this.saveSchema()
                     }}
            >Save</CButton>
          </CContainer>

        </CRow>
      </>
    )
  }

  addFieldToSchema() {
    const field_name = this.state.new_field_name
    const type = this.state.new_field_type
    let schema = this.state.schema
    schema.push({field_name: field_name, type: type, default: ""})
    this.setState({
      ...this.state,
      schema: schema
    })
  }

  removeFieldFromSchema(field_name) {
    let schema = this.state.schema
    schema = schema.filter(function (obj) {
      return obj.field_name !== field_name;
    });
    this.setState({
      ...this.state,
      schema: schema
    })
  }

  saveSchema() {
    console.log(this.state.schema)
    fetch("http://localhost:5000/api/schema", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        "schema_structure": this.state.schema,
        "schema_name": this.state.schema_name,
        "schema_description" : this.state.schema_description
      })
    })
      .then(res => res.json())
      .then(result => {
      })
  }
}


DefineSchema.propTypes = {
  schema: PropTypes.any
}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DefineSchema)

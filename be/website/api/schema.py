from flask import jsonify

from website.data.database import MongoDB
from website.data.models.models import Schema, Flag, Contact

schema = {
    "schema_name": "claim",
    "claim": {
        "attributes": [
            {"name": "first_name", "data_type": "string"},
            {"name": "age", "data_type": "number"},
            {"name": "cpt", "data_type": "sub_schema"},
            {"name": "insurance", "data_type": "sub_schema"}
        ],
        "cpt": {
            "attributes": [
                {"name": "code", "data_type": "string"},
                {"name": "units", "data_type": "number"}
            ],
        },
        "insurance": {
            "attributes": [
                {"name": "carrier_code", "data_type": "string"},
                {"name": "eligibility", "data_type": "string"}
            ],
        }
    }
}


def create_schema(schema_name, schema_description, schema_structure):
    # database = MongoDB()
    schema = Schema()
    schema.name = schema_name
    schema.description = schema_description
    schema.version = "1.0"
    schema.structure = schema_structure
    schema.save_item()
    return True

def load_all_schemas():
    schema = Schema()
    all_schemas = schema.all()
    values = [{"label" : schema["name"], "value" : schema["_id"], } for schema in all_schemas]
    return values

def get_flags_by_query(query):
    flag = Flag()
    all_flags = flag.all()
    result_flags = []
    if ([flag for flag in all_flags if flag["flag_name"] == query] is not None)\
            or (len([flag for flag in all_flags if flag["flag_name"] == query]) == 0):
        if query== "":
            result_flags.append({"label": "Type something to create a new flag.", "value": query.lower()})
        else:
            result_flags.append({"label" : query, "value": query.lower()})
    for flag in all_flags:
        result_flags.append({
            "label" : "flag_name",
            "value" : "flag_name"
        })

    return result_flags


def get_my_filtered_contacts(query):
    contact = Contact()
    all_contacts = contact.all()
    result_flags = []
    if ([contact for contact in all_contacts if contact["email_address"] == query] is not None)\
            or (len([flag for flag in all_contacts if flag["email_address"] == query]) == 0):
        if query== "":
            result_flags.append({"label": "Type something to add a new email.", "value": query.lower()})
        else:
            result_flags.append({"label" : query, "value": query.lower()})
    for flag in all_contacts:
        result_flags.append({
            "label" : "email_address",
            "value" : "email_address"
        })

    return result_flags



def get_schema_attributes_by(schema_name, query):
    schema = Schema()
    schema = schema.find_by_pk(schema_name)
    result_attributes = []
    for attribute in schema["structure"]:
        result_attributes.append({
            "label" : attribute["field_name"],
            "value" : attribute["field_name"]
        })

    return result_attributes

def get_value_suggesstions(schema_name,attribute,  query):
    schema = Schema()
    schema = schema.find_by_pk(schema_name)
    result_attributes = []
    for attribute in schema["structure"]:
        result_attributes.append({
            "label" : attribute["field_name"],
            "value" : attribute["field_name"]
        })

    result_attributes.append({"label" : "'"+query+"'" , "value": query})

    return result_attributes

def get_schema_by_pk(schema_name):
    schema = Schema().find_by_pk(schema_name)
    return schema

def get_rules():
    return []

def get_rules_by_pk(rule_name):
    return {}




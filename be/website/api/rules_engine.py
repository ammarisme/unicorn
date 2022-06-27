from flask import jsonify
import ast

from website.api.schema import schema
from website.api.tree import TreeNode, Tree, LinkedList, Node, SQLTree


def load_rule_boxes():
    return jsonify([
        {
            "name": "Blood",
            "description": "Claim rules forblood claims"
        },
        {
            "name": "Toxicology",
            "description": "Claim rules for tox claims"
        },
        {
            "name": "Radiology",
            "description": "Claim rules for radiology claims"
        }
    ])


def load_bots():
    return jsonify([
        {
            "name": "hl7-extractor",
            "description": "Extracts HL7 claims from SFTP"
        },
        {
            "name": "amd-biller",
            "description": "Sends claims to AMD via API"
        },
        {
            "name": "amd-writeoff",
            "description": "Writes off claims via API"
        }
    ])

def load_my_collections():
    return jsonify([
        {
            "name": "Collection 1",
            "description": "Claim rules forblood claims"
        },
        {
            "name": "Collection 2",
            "description": "Claim rules for tox claims"
        }
    ])


def load_schema():
    return {
        'array_sub_schemas': ['CPT', 'INSURANCE_PLAN'],
        'subschema_dt': {
            'CPT': {
                'schema_name': 'CPT',
                'variables': ['Code', 'Fee']
            },
            'INSURANCE_PLAN': {
                'schema_name': 'Insurance Plan',
                'variables': ['Carrier Code', 'Carrier Name', 'Eligibility']
            }
        }
    }


def get_current_context(query_tree):
    return None


def load_action_suggesstions(input_string):
    print(input_string)
    actions = [
        {"value": "add_<subschema>", "label": "add <subschema>", "context_target": "unchanged", "type": "change_data",
         "sql": "", "scope": "", "target_subschema": ""},
        {"value": "update_all_<subschema>", "label": "update all <subschema>", "context_target": "unchanged",
         "type": "change_data", "sql": "", "scope": "", "target_subschema": ""},
        {"value": "remove all_<subschema>", "label": "remove all <subschema>", "context_target": "unchanged",
         "type": "change_data", "sql": "", "scope": "all", "target_subschema": ""},
        {"value": "update_first_<subschema>", "label": "update first matching <subschema>",
         "context_target": "unchanged", "type": "change_data", "sql": "=", "scope": "first", "target_subschema": ""},
        {"value": "update_last_<subschema>", "label": "update last matching <subschema>", "context_target": "unchanged",
         "type": "change_data", "sql": "!=", "scope": "last", "target_subschema": ""},
        {"value": "update_all_<subschema>", "label": "update all matching <subschema>", "context_target": "unchanged",
         "change_data": "comparison", "type": "change_data",
         "sql": ">", "scope": "all", "target_subschema": ""},
        {"value": "remove_duplicate_<subschema>", "label": "remove duplicate <subschema>",
         "context_target": "unchanged", "change_data": "comparison",
         "sql": ">", "scope": "", "target_subschema": ""}
    ]

    suggesstions = []

    for action in [action for action in actions if action["label"] in input_string or input_string in action["label"]]:
        if "update" in action["value"]:
            for attribute in [claim for claim in schema["claim"] if claim != "attributes"]:
                suggesstions.append({
                    "label": action["label"].replace("<subschema>", attribute),
                    "value": action["value"].replace("<subschema>", attribute),
                    "context_target": action["context_target"],
                    "meta": {
                        "target_subschema": attribute,
                        "scope": action["scope"]
                    },
                    "type": action["type"],
                    "sql": action["sql"]
                })

        if "add" in action["value"]:
            for attribute in [claim for claim in schema["claim"] if claim != "attributes"]:
                suggesstions.append({
                    "label": action["label"].replace("<subschema>", attribute),
                    "value": action["value"].replace("<subschema>", attribute),
                    "context_target": action["context_target"],
                    "type": action["type"],
                    "sql": action["sql"]
                })

    return {
        "suggestions": suggesstions,
        "schema" : schema
    }


def load_suggesstions(query_tree, input_string):
    seq = "_?_?_" + str(len(query_tree))
    # // search attributes
    # // search inner element attributes
    # // set connectors: any / all / consts of / none
    # // attribute connectors: and / or / is not
    # // generate suggestions

    current_context = "claim"
    suggestions = []
    logical_operators = [
        # {"value": "a", "name": "a", "context_target": "unchanged", "type": "logical_table"},
        # {"value": "an", "name": "an", "context_target": "unchanged", "type": "logical_table"},
        {"value": "any_of_the", "name": "any of the", "context_target": "unchanged", "type": "logical_table"},
        {"value": "all_of_the", "name": "all of the", "context_target": "unchanged", "type": "logical_table"},
        {"value": "is", "name": "is ", "context_target": "unchanged", "type": "comparison", "sql": "="},
        {"value": "is_not", "name": "is not ", "context_target": "unchanged", "type": "comparison", "sql": "!="},
        {"value": "is_greater_than", "name": "is greater than ", "context_target": "unchanged", "type": "comparison",
         "sql": ">"},
        {"value": "is_lesser_than", "name": "is lesser than ", "context_target": "unchanged", "type": "comparison",
         "sql": "<"},
        {"value": "and", "name": "and", "context_target": "unchanged", "type": "connector"},
        {"value": "or", "name": "or", "context_target": "unchanged", "type": "connector"},
        {"value": "consists_of", "name": "consists of ", "context_target": "unchanged", "type": "comparison"},
        {"value": "ends_with", "name": "ends with ", "context_target": "unchanged", "type": "comparison", "sql": "*"},
        {"value": "begins_with", "name": "begins with ", "context_target": "unchanged", "type": "comparison",
         "sql": "**"},
        {"value": "is_missing", "name": "is missing", "context_target": "unchanged", "type": "comparison",
         "sql": "**"},
        {"value": "is_duplicate", "name": "is duplicated", "context_target": "unchanged", "type": "comparison",
         "sql": "**"},
        {"value": "contains_less_than", "name": "contains less than ", "context_target": "unchanged",
         "type": "comparison",
         "sql": "**"},
        {"value": "contains_more_than", "name": "contains more than ", "context_target": "unchanged",
         "type": "comparison",
         "sql": "**"},
        {"value": "has exactly ", "name": "contains more than ", "context_target": "unchanged",
         "type": "comparison",
         "sql": "**"},
    ]

    for logical_operator in [logical_operator for logical_operator in logical_operators if
                             (input_string in logical_operator["name"] or logical_operator["name"] in input_string)]:
        if logical_operator["type"] == "logical_table":
            subschemas = [subschema for subschema in schema[schema['schema_name']]['attributes'] if
                          subschema["data_type"] == 'sub_schema']

        if logical_operator["type"] == "comparison":
            txts = (input_string.split("'"))
            if len(txts) > 1:
                txts = txts[1].split("'")
                if len(txts) > 0:
                    user_input_value = txts[0]
                    value = logical_operator["value"] + seq
                    label = logical_operator["name"] + "'" + user_input_value + "'"
                    suggestions.append(
                        {"value": value,
                         "label": label,
                         "context_target": "unchanged", "type": logical_operator["type"]}
                    )

            else:
                suggestions.append(
                    {"value": logical_operator["value"], "label": logical_operator["name"] + "''",
                     "context_target": "unchanged", "type": logical_operator["type"]}
                )
        else:
            value = logical_operator["value"] + seq
            label = logical_operator["name"]
            suggestions.append(
                {"value": value,
                 "label": label,
                 "context_target": "unchanged", "type": logical_operator["type"]}
            )

    for attribute in [attrib for attrib in schema[current_context]['attributes'] if
                      input_string in current_context + "." + attrib["name"]]:
        value = current_context + "." + attribute["name"] + seq
        label = current_context + "." + attribute["name"]
        suggestions.append(
            {"value": value,
             "label": label,
             "context_target": "unchanged", "type": "attribute"}
        )
        if attribute["data_type"] == "sub_schema":
            for sub_attribute in [sub_attribute for sub_attribute in schema['claim'][attribute["name"]]['attributes'] if
                                  input_string in current_context + "." + attribute["name"] + "." + sub_attribute[
                                      "name"]]:
                value = current_context + "." + attribute["name"] + "." + sub_attribute["name"] + seq
                label = current_context + "." + attribute["name"] + "." + sub_attribute["name"]
                suggestions.append(
                    {"value": value,
                     "label": label,
                     "context_target": "unchanged", "type": "attribute"}
                )

    return {
        "suggestions": suggestions
    }


def test_rule(query_tree, test_data):
    test_data = ast.literal_eval(test_data)

    logic_list = LinkedList()
    sql_tree = Tree()
    root = TreeNode()
    current_node = TreeNode()
    sql_tree.insert(root, None)  # initiate the tree with a root
    root.add_child(current_node)

    for logic in query_tree:
        logic_list.add(logic)

    logic_element = logic_list.head
    while logic_element is not None and logic_element.next is not None:
        logic_element = logic_element.next

    sql_tree = SQLTree()
    sql_tree.generate(logic_element, sql_tree.root)
    sql_query = sql_tree.get_sql()
    print(sql_query)

    return {"result": sql_query}


def save_sql_query(sql_query):
    pass

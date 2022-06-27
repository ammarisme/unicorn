import createRuleStateReducer from "./create-rule-reducer";
import initialState from '../initial-state'
import viewReducer from "./views-reducer";

const reducer = (state = initialState, {type, ...rest}) => {
  console.log('reducer : ', type)
  switch (type) {
    case 'VIEW_STATE_UPDATE':
      return viewReducer(rest.view_name, state, rest.visible,  rest.view_state_data)
    case 'SHOW-MODAL':
      state = {
        ...state,
        VISIBLE_MODAL_NAME : rest.modalName
      }
      console.log('SHOWING : '+rest.modalName)
      return state;
    case 'LOGGED_IN':
      console.log(type)
      state = {
        ...state,
        IS_LOGGED_IN: true
      }
      return state
    case 'LOGOUT':
      state = {
        ...state,
        IS_LOGGED_IN: false
      }
      return state
    case 'LOAD_BILLABLE_CLAIMS':
      state = {
        ...state,
        BILLABLE_CLAIMS: rest.billable_claims
      }
      return state
    case 'IS_REVIEWING_CLAIM':
      state = {
        ...state,
        IS_REVIEWING_CLAIM: true
      }
      return state
    case 'STOP_INDIVIDUAL_CLAIM_REVIEW':
      state = {
        ...state,
        IS_REVIEWING_CLAIM: false
      }
      return state
    case 'LOAD_INDIVIDUAL_CLAIM_DETAIL':
      state = {
        ...state,
        CHARGES: rest.charges,
        PATIENT: rest.patient,
        PHYSICIAN: rest.physician,
        HISTORY: rest.history
      }
      return state
    case 'ACTIVE_ACCORDION_CHANGE':
      state = {
        ...state,
        ACTIVE_ACCORDION_ITEM_NO: rest.active_accordion
      }
      return state
    case 'LOAD_RULE_BOXES':
      state = {
        ...state,
        RULE_BOXES: rest.rule_boxes
      }
      return state
    case 'LOAD_MY_COLLECTIONS':
      state = {
        ...state,
        MY_COLLECTIONS: rest.my_collections
      }
      return state
    case 'SHOW_COLLECTION_SUMMARY':
      state = {
        ...state,
        SHOW_COLLECTION_SUMMARY: rest.value
      }
      return state
    case 'SHOW_CLAIM_REVIEW':
      if (rest.value == true) {
        state = {
          ...state,
          SHOW_CLAIM_REVIEW: rest.value,
          BATCH_NUMBER: rest.batch_number
        }
      } else {
        state = {
          ...state,
          SHOW_CLAIM_REVIEW: rest.value,
          BATCH_NUMBER: undefined
        }
      }

      return state
    case 'SHOW_MANAGE_RULES':
      state = {
        ...state,
        SHOW_MANAGE_RULES: rest.value
      }
      return state
    case 'MANAGE_RULES_TAB':
      state = {
        ...state,
        MANAGE_RULES_ACTIVE_TAB: rest.value
      }
      return state
    case 'LOAD_CREATE_RULE_PARAMS':
      state = {
        ...state,
        RULE_PARAMS: {
          COMPOSITIONS: [
            {key: 0, value: 'any'},
            {key: 1, value: 'none'},
            {key: 2, value: 'all'}],
          ARRAY_DATASETS: [
            {key: 0, value: 'CPT'},
            {key: 1, value: 'Insurance Plan'},
          ],
          LOGICAL_RELATIONSHIPS : [
            {key: 0, value: 'are'},
            {key: 0, value: 'are NOT'},
            {key: 1, value: 'are greater than'},
            {key: 2, value: 'are smaller than'},
            {key: 3, value: 'consists of'},
          ],
          SUB_SCHEMAS : rest.SCHEMAS,
          SUBSCHEMA_DT : rest.SUBSCHEMA_DT,
        },
      }
      return state
    case 'LOAD_CONDITIONS':
      state = {
        ...state,
        CONDITIONS: rest.INIT_CONDITIONS
      }
      return state
    case 'ADD_CONDITION':
      state = {
        ...state,
        CONDITIONS: rest.CONDITIONS
      }
      return state
    case 'CREATE_RULE':
      return createRuleStateReducer(rest.sub_type, state, rest.data)
    default:
      return state
  }
}
export default reducer

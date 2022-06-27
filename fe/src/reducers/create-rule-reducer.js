const createRuleStateReducer = (sub_type, state, data) => {
  console.log('reducer : CREATE_RULE_', sub_type)
  switch (sub_type){
    case 'LOAD_INITIAL_DATA':
      state = {
        ...state,
        CREATE_RULE_CONTEXT :'claim',
        CREATE_RULE_SUGGESTIONS: [],
        CREATE_RULE_QUERY_TREE: [],
        TEST_RESULTS: undefined
      }
      return state
    case 'SET_CONTEXT' :
      state = {
        ...state,
        CREATE_RULE_CONTEXT : data
      }
      return state
    case 'SET_SUGGESTIONS' :
      state = {
        ...state,
        CREATE_RULE_SUGGESTIONS : data
      }
      return state
    case 'RESET_CONTEXT':
      state = {
        ...state,
        CREATE_RULE_CONTEXT: undefined
      }
      return state

    case 'LOAD_SUGGESSTIONS':
      state = {
        ...state,
        CREATE_RULE_SUGGESTIONS: [
          {value: '4', label: 'all of the cpts', context_target: 'cpt'},
          {value: '5', label: 'some of the cpts', context_target : 'cpt'},
          {value: '6', label: 'all of the cpts', context_target: 'cpt'}
        ]
      }
      return state
    case 'ADD_TO_QUERY_TREE':
      state = {
        ...state,
        CREATE_RULE_QUERY_TREE: [
          ...state.CREATE_RULE_QUERY_TREE,
          {
            CURRENT_CONTEXT : data.current_context,
            LOGICAL_ELEMENT : data.inputValue,
            TYPE : data.type
          }
        ]
      }
      return state
    case 'ADD_TO_UPDATE_QUERY_TREE':
      state = {
        ...state,
        CREATE_RULE_UPDATE_QUERY_TREE: [
          ...state.CREATE_RULE_UPDATE_QUERY_TREE,
          {
            CURRENT_CONTEXT : data.current_context,
            LOGICAL_ELEMENT : data.inputValue,
            TYPE : data.type
          }
        ]
      }
      return state
    case 'TEST':
      state = {
        ...state,
        TEST_RESULTS : data
      }
      return state
    case 'SHOW_SCHEMA_UPDATE_VIEW':
      state = {
        ...state,
        SHOW_SCHEMA_UPDATER : data.show,

      }
      return state
    default:
      return state
  }
}

export default createRuleStateReducer

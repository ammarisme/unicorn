import {loadState} from "./localStorage";

let initialState = undefined;
console.log(loadState())
if (loadState() != undefined) {
  initialState = loadState().state
} else {
  initialState = {
    sidebarShow: true,
    IS_LOGGED_IN: false,
    IS_REVIEWING_CLAIM: false,
    CREATE_RULE_QUERY_TREE: [],
    VIEW_STATE: {CURRENT_VIEW: undefined,
      CREATE_RULE : {VISIBLE : false},
      DEFINE_SCHEMA : {VISIBLE : false},
      CONDITIONS : {VISIBLE : false},
      ACTIONS : {VISIBLE : false},
      FINISH : {VISIBLE : false},
      ANALYZE_RECORD : {VISIBLE : false},
      MANAGE_BOT : {VISIBLE : false}
    }
  }
}

export default initialState

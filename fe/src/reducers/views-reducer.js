const viewReducer = (view_name, state, visible, view_state_data) => {
  console.log('View state update : '+view_name)
  switch (view_name) {
    case 'CREATE_RULE':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          CREATE_RULE : {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      if (visible == true){
        state.VIEW_STATE.ACTIONS.VISIBLE = false;
        state.VIEW_STATE.FINISH.VISIBLE = false;
        state.VIEW_STATE.CONDITIONS.VISIBLE = false;
        state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = true;
      }else {
        state.VIEW_STATE.ACTIONS.VISIBLE = false;
        state.VIEW_STATE.FINISH.VISIBLE = false;
        state.VIEW_STATE.CONDITIONS.VISIBLE = false;
        state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = false;
      }
      return state
    case 'DEFINE_SCHEMA':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          DEFINE_SCHEMA : {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      state.VIEW_STATE.ACTIONS.VISIBLE = false;
      state.VIEW_STATE.FINISH.VISIBLE = false;
      state.VIEW_STATE.CONDITIONS.VISIBLE = false;
      state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = true;
      return state
    case 'CONDITIONS':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          CONDITIONS : {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      state.VIEW_STATE.ACTIONS.VISIBLE = false;
      state.VIEW_STATE.FINISH.VISIBLE = false;
      state.VIEW_STATE.CONDITIONS.VISIBLE = true;
      state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = false;
      return state
    case 'ACTIONS':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          ACTIONS : {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      state.VIEW_STATE.ACTIONS.VISIBLE = true;
      state.VIEW_STATE.FINISH.VISIBLE = false;
      state.VIEW_STATE.CONDITIONS.VISIBLE = false;
      state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = false;
      return state
    case 'FINISH':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          FINISH: {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      state.VIEW_STATE.ACTIONS.VISIBLE = false;
      state.VIEW_STATE.FINISH.VISIBLE = true;
      state.VIEW_STATE.CONDITIONS.VISIBLE = false;
      state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = false;
      return state
    case 'ANALYZE_RECORD':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          ANALYZE_RECORD : {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      return state;
    case 'MANAGE_BOT':
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          MANAGE_BOT : {
            VISIBLE :  visible,
            DATA : view_state_data
          },
        }
      }
      return state;
    case "PRO_VIEW":
      console.log(visible)
      state = {
        ...state,
        VIEW_STATE : {
          ...state.VIEW_STATE,
          PRO_VIEW : visible
        }
      }
      return state;
    default:
      return state
  }
}

export default viewReducer

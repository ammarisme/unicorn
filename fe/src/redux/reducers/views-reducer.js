export class ViewReducer {
  constructor(){
  }

  // Shows and hides views based on parameters passed.
  /**
   * 
   * @param {the view that has to be hidden/shown} view_name 
   * @param {the global state} state 
   * @param {visibility - true / false} visible 
   * @param {any additional data to pass into the view} view_state_data 
   * @returns 
   */
  static sub_reducer(view_name, state, visible, view_state_data){
      console.log('View state update : '+view_name)
      switch (view_name) {
        case 'CREATE_RULE':
          state = this.hide_all_views(state)
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
          break;  
        case 'DEFINE_SCHEMA':
          state = this.hide_all_views(state)
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
          break;
        case 'CONDITIONS':
          state = this.hide_all_views(state)
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
          break;
        case 'ACTIONS':
          state = this.hide_all_views(state)
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
          break;
        case 'FINISH':
          state = this.hide_all_views(state)
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

          break;
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
          break;
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
          break;
        case "PRO_VIEW":
          state = {
            ...state,
            VIEW_STATE : {
              ...state.VIEW_STATE,
              PRO_VIEW : visible
            }
          }
          break;
        case "MANAGE_ACTION":
          state = {
            ...state,
            VIEW_STATE : {
              ...state.VIEW_STATE,
              MANAGE_ACTION : visible
            }
          }
          break;
        default:
          break;
      }

      return state;
  }

  static hide_all_views(state) {
    state.VIEW_STATE.ACTIONS.VISIBLE = false;
    state.VIEW_STATE.FINISH.VISIBLE = false;
    state.VIEW_STATE.CONDITIONS.VISIBLE = false;
    state.VIEW_STATE.DEFINE_SCHEMA.VISIBLE = false;
    return state;
  }
}


export default ViewReducer

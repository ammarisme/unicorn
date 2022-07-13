import React from "react";
import {nodes, edges} from "../../features/configure/processes/initial-elements"
import { ActionCreator } from "../action-creator";

export class ViewActionCreator extends ActionCreator {
  static showViewActionCreator(modalName, visible){
    return async function(dispatch, getState){
      dispatch(
        {
          type: "VIEW_STATE_UPDATE",
          view_name : modalName,
          visible : visible,
          view_state_data : null
        })
    }
  }
  
  static switchToProViewActionCreator(proView){
    return async function(dispatch, getState){
      dispatch(
        {
          type: "VIEW_STATE_UPDATE",
          view_name : "PRO_VIEW",
          visible : proView,
          view_state_data : null
        })
    }
  }
  
  static saveOperationActionCreator(operation_data){
      return async function(dispatch, getState){
        dispatch(
          {
            type: "CHANGE_NODES",
            NODES : operation_data.nodes,
            EDGES : []
          })
      }
  }

}

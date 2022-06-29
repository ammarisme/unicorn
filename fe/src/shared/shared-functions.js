export function showViewActionCreator(modalName, visible){

  return async function(dispatch, getState){
    console.log('showViewActionCreator')

    dispatch(
      {
        type: "VIEW_STATE_UPDATE",
        view_name : modalName,
        visible : visible,
        view_state_data : null
      })
  }
}

export function switchToProViewActionCreator(proView){
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

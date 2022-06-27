function showViewActionCreator(modalName, visible){
  console.log(visible)
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


export default showViewActionCreator

import API from './api'

class OperationAPI extends API{
  static get_prerequisites(process_data, callback){
    if (process_data == undefined){
      return;
    }
      let operation_id = process_data.operation_id
      let process_status = process_data.process_status
      super.post_data(OperationAPI.sub_url+"/get-prerequisites", 
      {
        "process_data": operation_id,
        "operation_id": process_status,
      },
      callback
      )
  }
}

OperationAPI.sub_url = "/create-process"

export default OperationAPI
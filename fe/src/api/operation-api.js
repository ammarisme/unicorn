import API from './api'

class OperationAPI extends API{
  static get_prerequisites(process_data, callback){
    if (process_data == undefined){
      return;
    }
      super.post_data(OperationAPI.sub_url+"/get-prerequisites", 
      {
        "process_status": process_data.process_status,
        "sequance_number": process_data.sequance_number,
      },
      callback
      )
  }
}

OperationAPI.sub_url = "/create-process"

export default OperationAPI
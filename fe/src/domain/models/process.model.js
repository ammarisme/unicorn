import {array} from "prop-types";
import { OperationModel } from "./operation.model";

export class ProcessModel {
  process_name;
  description;

  constructor() {
    let operations; // an array of Operations

    this.add_operation = (operation) => {
    }

    this.remove_operation = (operation) => {
    }

    this.set_entity = (entity) => {
    }

    this.get_possible_prerequisites = (operation_id) => {
      
    }
  
    this.to_object =()=> {
      return {
        "process_name" : this.process_name,
        "description" : this.description
      }
    }
  }


}

import {array} from "prop-types";

export class OperationModel{
 summary ;
 sequance_number;

 constructor(){
   let preconditions ; // list of Preconditions
   let actions ; // list of Actions
   let condition ;  // list of LogicalElement s.

   this.add_logical_element_to_condition= (logical_element) => {
   }

   this.remove_last_logical_element_from_condition = () => {
   }

   this.add_action = () => {}
 }

}

class LogicElementModel{
  value ;
  label ;
  prev;
}

class ActionModel {
  action_name;
}

class Precondition{

}
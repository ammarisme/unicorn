import {array} from "prop-types";

export class Operation{
 summary : string;

 constructor(){
   let preconditions : array;
   let actions : array;
   let condition : array

   this.add_logical_element_to_condition= (logical_element) => {
   }

   this.remove_last_logical_element_from_condition = () => {
   }

   this.add_action = () => {}
 }

}

export class LogicElement{
  value : any;
  label : any;
  prev: any;
}

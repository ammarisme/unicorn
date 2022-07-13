
// Stora data related to an entity and operate on the entity.
export class EntityModel {
    id;
    name;
    description;

    constructor(){
        
    let attributes = []; // list of Attributes

    // add an attribute to the entity
    this.add_attribute = (name, type, default_value) => {
        // TODO : check duplicates
        attribute = AttributeModel(name, type, default_value)
        this.attributes.push(attribute)
    }

    //remove an exisiting attribute
    this.remove_attributes = (attribute_name) => {
    }
    }
    
}

class AttributeModel{
    attribute_name;
    type;
    default_value;

    constructor(name, type, default_value){
        this.attribute_name = name;
        this.type = type;
        this.default_value = default_value
    }
}
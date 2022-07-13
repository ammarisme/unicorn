export class Persist{
  save_object_localstorage(key){
    localStorage.setItem(key, JSON.stringify(this));
  }

  retrieve_object_from_localstorage(key){
    let retrievedObject = localStorage.getItem(key);
    return JSON.parse(retrievedObject);
  }
}

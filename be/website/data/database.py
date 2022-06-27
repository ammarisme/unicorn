from pymongo import MongoClient
import sys
from bson.json_util import dumps, loads

class MongoDB():
    def __init__(self):
        client = MongoClient("mongodb://localhost", 27017)
        self.db = client["kpaas_instance"]

    def save_item(self):
        db_collection = self.db[self.collection_name]
        dict_obj = self.slotted_to_dict(self)
        result = db_collection.insert_one(dict_obj)
        return result

    def slotted_to_dict(self, obj):
        return {s: getattr(obj, s) for s in obj.__slots__ if hasattr(obj, s)}

    def all(self):
        db_collection = self.db[self.collection_name]
        r =db_collection.find()
        l = list(r)  # Converts object to list
        d = dumps(l)  # Converts to String
        dict_needed = loads(d)
        for item in dict_needed:
            item["_id"] = str(item["_id"])
        return dict_needed

    def find_by_pk(self, value):
        db_collection = self.db[self.collection_name]
        r = db_collection.find_one({self.primary_key : value})
        if r is not None:
            r["_id"] = str(r["_id"])
            return r
        else:
            return []



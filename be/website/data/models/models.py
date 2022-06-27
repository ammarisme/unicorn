from website.data.database import MongoDB

class Schema(MongoDB):
    collection_name = "schema"
    primary_key = "name"
    __slots__ = ("_id", "name", "description", "version", "structure")


class Flag(MongoDB):
    primary_key = "flag_name"
    collection_name = "flag"
    __slots__ = ("_id", "flag_name")

class Contact(MongoDB):
    collection_name = "flag"
    primary_key = "email_address"
    __slots__ = ("_id", "name", "email_address")
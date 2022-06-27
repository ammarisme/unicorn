#Implementation of generic tree in Python

import random
import string
import pptree

class TreeNode(object):
    "Node of a Tree"
    def __init__(self, name='root', node=None,  children=None,parent=None,):
        self.name = name
        self.node = node
        self.parent=parent
        self.children = []
        if children is not None:
            for child in children:
                self.add_child(child)

    def __repr__(self):
        return self.name

    def is_root(self):
        if self.parent is None:
            return True
        else:
            return False
    def is_leaf(self):
        if len(self.children) == 0:
            return True
        else:
            return False


    def depth(self):    # Depth of current node
        if self.is_root():
            return 0
        else:
            return 1 + self.parent.depth()

    def add_child(self, node):
        node.parent=self
        assert isinstance(node, TreeNode)
        self.children.append(node)

    def disp(self):
        pptree.print_tree(self,'children','name')



class Tree:
    """
    Tree implemenation as a collection of TreeNode objects
    """
    def __init__(self):
       self.root=None
       self.height=0
       self.nodes=[]

    def insert(self,node,parent):   # Insert a node into tree
        if parent is not None:
            parent.add_child(node)
        else:
            if self.root is None:
                self.root=node
        self.nodes.append(node)

    def search(self,data):  # Search and return index of Node in Tree
        index=-1
        for N in self.nodes:
            index+=1
            if N.name == data:
                break
        if index == len(self.nodes)-1:
            return -1  #node not found
        else:
            return index

    def print(self, node):  # Search and return index of Node in Tree
        print(node.name)
        if node.children is not None:
            for child in node.children:
                self.print(child)

    def generate_sql(self,node):

        sql = ""
        if node.children is not None:
            for child in node.children:
                if child.name == "root":
                    sql += self.generate_sql(child)
                elif child.name == "any_of_the":
                    sql += child.name  +"("+ self.generate_sql(child)
                elif child.parent.name == "root" and child.node.prev.data['LOGICAL_ELEMENT']['type'] != "logical_table":
                    sql += "("+child.name + self.generate_sql(child)
                elif child.children is None or len(child.children) == 0:
                    sql += child.name + self.generate_sql(child)
                    if child.node.data['LOGICAL_ELEMENT']['type'] == "comparison":
                        sql += ")"
                else:
                    sql += child.name + self.generate_sql(child)

        return sql


    def getNode(self,id):
        return self.nodes[id]

    def root(self):
        return self.root

    def print_tree(self, node):
        print(node.name),
        if node.children is not None:
            print("..")
            for child in node.children:
                self.print_tree(child)

                # if child.name == "root":
                #     sql += self.generate_sql(child)
                # elif child.name == "any_of_the":
                #     sql += child.name + "(" + self.generate_sql(child)
                # elif child.parent.name == "root" and child.node.prev.data['LOGICAL_ELEMENT']['type'] != "logical_table":
                #     sql += "(" + child.name + self.generate_sql(child)
                # elif child.children is None or len(child.children) == 0:
                #     sql += child.name + self.generate_sql(child)
                #     if child.node.data['LOGICAL_ELEMENT']['type'] == "comparison":
                #         sql += ")"
                # else:
                #     sql += child.name + self.generate_sql(child)

        # return sql


class Node :
    def __init__( self, data):
        self.data = data
        self.next = None
        self.prev = None

class LinkedList :
	def __init__( self ) :
		self.head = None

	def add( self, data ) :
		node = Node( data )
		if self.head == None :
			self.head = node
		else :
			node.next = self.head
			node.next.prev = node
			self.head = node

	def search( self, k ) :
		p = self.head
		if p != None :
			while p.next != None :
				if ( p.data == k ) :
					return p
				p = p.next
			if ( p.data == k ) :
				return p
		return None

	def remove( self, p ) :
		tmp = p.prev
		p.prev.next = p.next
		p.prev = tmp

	def __str__( self ) :
		s = ""
		p = self.head
		if p != None :
			while p.next != None :
				s += p.data
				p = p.next
			s += p.data
		return s

	def print(self):
		p = self.head
		if p != None:
			while p.next != None:
				if p.data is not None:
					print( p.data)
				p = p.next
			print(p.data)


class SQLTree():
    def __init__(self):
        self.sql_tree = Tree()
        self.root = TreeNode()
        self.current_node = TreeNode()
        self.root.add_child(self.current_node)
        self.sql_tree.insert(self.root, None)  # initiate the tree with a root

    def generate(self, logic_element, current_node):
        if logic_element is not None:
            logic = logic_element.data
            logic['LOGICAL_ELEMENT']["logical_operator"] = logic['LOGICAL_ELEMENT']["logical_operator"].split("_?_?_")[
                0]
            new_node = None
            if logic['LOGICAL_ELEMENT']['type'] == 'connector':
                if logic["LOGICAL_ELEMENT"]["logical_operator"] == "and":
                    new_node = TreeNode(" & ", logic_element)
                elif logic["LOGICAL_ELEMENT"]["logical_operator"] == "or":
                    new_node = TreeNode(" | ", logic_element)

                if logic_element.prev.data['LOGICAL_ELEMENT']['type'] == "logical_table":
                    self.root.add_child(new_node)
                else:
                    current_node.add_child(
                        new_node
                    )
            elif logic['LOGICAL_ELEMENT']['type'] == "logical_table":
                new_node = TreeNode(logic["LOGICAL_ELEMENT"]["logical_operator"], logic_element)
                self.root.add_child(new_node)
            elif logic['LOGICAL_ELEMENT']['type'] == "attribute":
                attribute_name = logic['LOGICAL_ELEMENT']["logical_operator"]
                new_node = TreeNode(attribute_name, logic_element)
                current_node.add_child(
                    new_node
                )
            elif logic['LOGICAL_ELEMENT']['type'] == "comparison":
                if logic["LOGICAL_ELEMENT"]["logical_operator"] == "is":
                    new_node = TreeNode("=" + logic["LOGICAL_ELEMENT"]["parameter"], logic_element)
                    current_node.add_child(
                        new_node
                    )
                elif logic["LOGICAL_ELEMENT"]["logical_operator"] == "is_not":
                    new_node = TreeNode("!=" + logic["LOGICAL_ELEMENT"]["parameter"], logic_element)
                    current_node.add_child(
                        new_node
                    )
                elif logic["LOGICAL_ELEMENT"]["logical_operator"] == "is_greater_than":
                    new_node = TreeNode(">" + logic["LOGICAL_ELEMENT"]["parameter"], logic_element)
                    current_node.add_child(
                        new_node
                    )
                elif logic["LOGICAL_ELEMENT"]["logical_operator"] == "is_lesser_than":
                    new_node = TreeNode("<" + logic["LOGICAL_ELEMENT"]["parameter"], logic_element)
                    current_node.add_child(
                        new_node
                    )
                elif logic["LOGICAL_ELEMENT"]["logical_operator"] == "and":
                    new_node = TreeNode("&" + logic["LOGICAL_ELEMENT"]["parameter"], logic_element)
                    current_node.add_child(
                        new_node
                    )
            print(logic_element.data)
            self.generate(logic_element.prev, new_node)

    def get_sql(self):
        return self.sql_tree.generate_sql(self.root)



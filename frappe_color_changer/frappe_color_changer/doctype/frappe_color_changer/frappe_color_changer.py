# Copyright (c) 2025, Alon Ben Refael and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class FrappeColorChanger(Document):
	pass
	
@frappe.whitelist()

dir_path = '/files/css'

def update_template(doctype_name,element,color):
	import os
	try:
		os.mkdir(path)
	except OSError as error:
		pass
	user_name = frappe.utils.get_fullname()
	user_name = user_name.lower().replace(' ','_')
	file_path = dir_path + '/' + user_name + '_' + doctype_name + '.css'
	element_prts = element.split(':')
	element = element_prts[0]
	prop = element_prts[1]
	appendded_val = ''
	try:
		with open(file_path, 'r') as file:
			for line in file.read():
				if element in line and prop in line:
					line = line.replace(line.split(':')[1],color) + ';}'
				appendded_val += line
	except:
		appendded_val = element + '{' + prop + ':' + color + ';}'
	with open(file_path, 'w') as file:
		file.write(appendded_val)

# Copyright (c) 2025, Alon Ben Refael and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class FrappeColorChanger(Document):
	pass
	
@frappe.whitelist()
def update_template(doctype_name,element,color):
	import os
	file_path = '/files/css'
	try:
		os.mkdir(path)
	except OSError as error:
		pass
	user_name = frappe.utils.get_fullname()
	user_name = user_name.lower().replace(' ','_')
	file_path += '/' + user_name + '_' + doctype_name + '.css'

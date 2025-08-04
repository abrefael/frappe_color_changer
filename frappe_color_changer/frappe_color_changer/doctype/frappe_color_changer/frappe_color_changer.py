# Copyright (c) 2025, Alon Ben Refael and contributors
# For license information, please see license.txt

import frappe
import os
from frappe.utils import cstr
from frappe.model.document import Document


class FrappeColorChanger(Document):
	pass
	
dir_path = os.getcwd() + '/' + cstr(frappe.local.site) + '/public/files/css'
elements_dict = {
	"Page background color":[
		'background-color',
		[
			'.form-control',
			'.std-form-layout > .form-layout > .form-page',
			'.page-head',
			'.page-container',
			'.navbar',
			'.new-timeline .activity-title, .new-timeline .timeline-actions',
			'.grid-footer .btn, .grid-footer div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-footer button, .grid-custom-buttons .btn, .grid-custom-buttons div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-custom-buttons button',
			'.grid-footer, .grid-custom-buttons'
		]
	],
	"Page background text color":[
		'color',
		[
			'.form-control',
			'.control-label',
			'body',
			'a'
		]
	],
	"Buttons background":[
		'background-color',
		[
			'.btn.btn-default, div#driver-popover-item .driver-popover-footer button.btn-default'
		]
	],
	"Field background color":[
		'background-color',
		[
			'.comment-box .comment-input-container .frappe-control .ql-editor',
			'.awesomplete .input-with-feedback',
			'.like-disabled-input',
			'.frappe-control .ql-editor:not(.read-mode)'
		]
	],
	"Field font color":[
		'color',
		[
			'.comment-box .comment-input-container .frappe-control .ql-editor',
			'.awesomplete .input-with-feedback',
			'.like-disabled-input',
			'.frappe-control .ql-editor:not(.read-mode)'
		]
	],
	"Table and Text Editor head background color":[
		'background-color',
		[
			'.grid-heading-row',
			'.ql-toolbar.ql-snow'
		]
	],
	"Table rows font color":[
		'color',
		[
			'.grid-body .data-row',
			'.grid-body .data-row a'
		]
	],
	"Table head font color":[
		'color',
		[
			'.grid-heading-row',
		]
	],
	"Table rows background color":[
		'background-color',
		[
			'.grid-body'
		]
	]
}


@frappe.whitelist()
def apply_color(doctype_name,element,color,user_name):
	from pathlib import Path
	try:
		os.mkdir(dir_path)
	except OSError as error:
		pass
	file_path = dir_path + '/' + user_name + '_' + doctype_name + '.css'
	element_prts = elements_dict[element]
	elements = element_prts[1]
	prop = element_prts[0]
	appendded_val = ''
	if Path(file_path).is_file():
		with open(file_path, 'r') as file:
			for line in file.read():
				for element in elements:
					if element == line.split('{')[0]) and prop in line:
						line = line.replace(line.split('{')split(':')[1],color) + ';}\n'
						elements.remove(element)
				appendded_val += line
	for element in elements:
		appendded_val += element + '{' + prop + ':' + color + ';}\n'
	with open(file_path, 'w') as file:
		file.write(appendded_val)

@frappe.whitelist()
def remove_color(doctype_name,element,color,user_name):
	file_path = dir_path + '/' + user_name + '_' + doctype_name + '.css'
	element_prts = elements_dict[element]
	elements = element_prts[1]
	prop = element_prts[0]
	appendded_val = ''
	with open(file_path, 'r') as file:
		for line in file.read():
			for element in elements:
				if element == line.split('{')[0]) and prop in line:
					line = ''
			appendded_val += line
	with open(file_path, 'w') as file:
		file.write(appendded_val)







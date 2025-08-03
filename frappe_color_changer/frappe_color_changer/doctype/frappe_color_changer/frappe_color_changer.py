# Copyright (c) 2025, Alon Ben Refael and contributors
# For license information, please see license.txt

import frappe
import os
from frappe.model.document import Document


class FrappeColorChanger(Document):
	pass
	
dir_path = os.getcwd() + '/' + cstr(frappe.local.site) + '/public/files/css'

@frappe.whitelist()
def apply_color(doctype_name,element,color,user_name):
	from pathlib import Path
	try:
		os.mkdir(dir_path)
	except OSError as error:
		pass
	file_path = dir_path + '/' + user_name + '_' + doctype_name + '.css'
	element_prts = element.split(':')
	element = element_prts[0]
	prop = element_prts[1]
	appendded_val = ''
	if Path(file_path).is_file():
		with open(file_path, 'r') as file:
			for line in file.read():
				if element in line and prop in line:
					line = line.replace(line.split(':')[1],color) + ';}'
				appendded_val += line
	else:
		appendded_val = element + '{' + prop + ':' + color + ';}'
	with open(file_path, 'w') as file:
		file.write(appendded_val)

@frappe.whitelist()
def remove_color(doctype_name,element,color,user_name):
	file_path = dir_path + '/' + user_name + '_' + doctype_name + '.css'
	element_prts = element.split(':')
	element = element_prts[0]
	prop = element_prts[1]
	appendded_val = ''
	with open(file_path, 'r') as file:
		for line in file.read():
			if element in line and prop in line:
				line = ''
			appendded_val += line
	with open(file_path, 'w') as file:
		file.write(appendded_val)




#//	changeRule('.std-form-layout > .form-layout > .form-page', 'background-color', '#3584e4');// ✓ 
#//	changeRule('.page-head', 'background-color', '#3584e4');
#//	changeRule('.page-container', 'background-color', '#3584e4');
#//	changeRule('.navbar','background','#3584e4', 2);
#//	changeRule('.new-timeline .activity-title, .new-timeline .timeline-actions', 'background-color', '#3584e4');
#//	//changeRule('body','color','#ff7800');
#//	//changeRule('a','color','#ff7800');
#//	changeRule('.btn.btn-default, div#driver-popover-item .driver-popover-footer button.btn-default', 'background-color','#ff0000');
#//	changeRule('.grid-footer .btn, .grid-footer div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-footer button, .grid-custom-buttons .btn, .grid-custom-buttons div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-custom-buttons button', 'background-color','#ff0000');
#//	changeRule('.grid-footer, .grid-custom-buttons', 'background-color', '#3584e4');// ✓
#//	changeRule('.comment-box .comment-input-container .frappe-control .ql-editor', 'background-color', '#ff7800');
#//	changeRule('.comment-box .comment-input-container .frappe-control .ql-editor', 'color', '#613583');
#//	changeRule('.grid-heading-row', 'background-color', '#613583'); // ✓ table head
#//	changeRule('.grid-heading-row', 'color', '#f9f06b'); // ✓ table head
#//	changeRule('.grid-body .data-row','color','#f9f06b'); // ✓ table
#//	changeRule('.grid-body', 'background-color', '#613583');// ✓ table
#//	changeRule('.awesomplete .input-with-feedback', 'background-color', '#ff7800'); // ✓
#//	changeRule('.ql-toolbar.ql-snow', 'background-color', '#ff7800',2);
#//	changeRule('.awesomplete .input-with-feedback', 'color', '#613583');// ✓
#//	changeRule('.form-control', 'background-color', '#ff7800');// ✓
#//	changeRule('.form-control', 'color', '#613583');// ✓
#//	changeRule('.like-disabled-input', 'background-color', '#ff7800');// ✓
#//	changeRule('.like-disabled-input', 'color', '#613583');// ✓
#//	changeRule('.control-label', 'color', '#865e3c');// ✓
#//	changeRule('input[type="checkbox"]', 'boarder', '#e01b24');
#//	changeRule('.frappe-control .ql-editor:not(.read-mode)', 'background-color', '#ff7800');
#//	changeRule('.frappe-control .ql-editor:not(.read-mode)', 'color', '#613583');
#//	var styleSheet = document.createElement("style")
#//	styleSheet.textContent = '.grid-body .data-row a {color: #f9f06b;}'// ✓
#//	document.head.appendChild(styleSheet)


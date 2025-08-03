// Copyright (c) 2025, Alon Ben Refael and contributors
// For license information, please see license.txt

var content;
var url;
var selections_options_lst = '\n.std-form-layout > .form-layout > .form-page\n.page-head\n.page-container\n.navbar\n.new-timeline .activity-title, .new-timeline .timeline-actions\nbody\na\n.btn.btn-default, div#driver-popover-item .driver-popover-footer button.btn-default\n.grid-footer .btn, .grid-footer div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-footer button, .grid-custom-buttons .btn, .grid-custom-buttons div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-custom-buttons button\n.grid-footer, .grid-custom-buttons\n.comment-box .comment-input-container .frappe-control .ql-editor\n.grid-heading-row\n.grid-body .data-row\n.grid-body\n.awesomplete .input-with-feedback\n.ql-toolbar.ql-snow\n.form-control\n.like-disabled-input\n.control-label\ninput[type="checkbox"]\n.frappe-control .ql-editor:not(.read-mode)\n.grid-body .data-row a';

frappe.ui.form.on("Frappe Color Changer", {
	apply_btn(frm) {
		var selected = frm.doc.select_i;
		let child = frm.add_child("selections_chld_tbl");
		var color = frm.doc.color_i;
		child.element = selected;
		child.color = color;
		selections_options_lst = selections_options_lst.replace("\n" + selected + "\n", "\n");
		frm.set_df_property("select_i", "options", selections_options_lst);
		frm.refresh_field("select_i");
		frappe.call({method:'frappe_color_changer.frappe_color_changer.doctype.frappe_color_changer.frappe_color_changer.apply_color',
			args: {
				'element': selected,
				'color':color,
				'doctype_name': frm.doc.doctype_name,
				'user_name': frm.doc.user_full_name
			}
		}).then(r => {
			build_preview(frm);
		});
	},
});

frappe.ui.form.on("selections_chld_tbl",{
	reset: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		let element = d.element;
		let color = d.color;
		frm.get_field("selections_chld_tbl").grid.grid_rows[d.idx - 1].remove();
		selections_options_lst = selections_options_lst + "\n" + element;
		frm.set_df_property("select_i", "options", selections_options_lst);
		frm.refresh_field("select_i");
		frm.refresh();
		frappe.call({method:'frappe_color_changer.frappe_color_changer.doctype.frappe_color_changer.frappe_color_changer.remove_color',
			args: {
				'element': element,
				'color':color,
				'doctype_name': frm.doc.doctype_name,
				'user_name': frm.doc.user_full_name
			}
		}).then(r => {
			build_preview(frm);
		});
	}
});



frappe.ui.form.on("Frappe Color Changer", {
	doctype_name(frm) {
		if (frm.doc.dt_selected){
			frappe.throw(__('DocType was already set. Do not change it!'));
			return
		}
		build_preview(frm);
	},
});


function build_preview(frm){
	var id = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for ( let i = 0; i < 10; i++ ) {
		id += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	url = '/app/' +
		frm.doc.doctype_name.toLowerCase().replace(' ','-') +
		'/new-' + frm.doc.doctype_name.toLowerCase().replace(' ','-') +
		'-' +
		id;
	content = ' <iframe style="width: 99%; height: 1080px;" src="' + url + '"></iframe>';
	frm.set_df_property("preview", "options", content);
	frm.refresh_field("preview");
}


frappe.ui.form.on('Frappe Color Changer',
	'before_save', function(frm){
		if (frm.is_new()) {
			frm.set_value('dt_selected',1);
			frm.set_df_property("doctype_name", "read_only", 1);
		}
});


frappe.ui.form.on("Frappe Color Changer", {
	onload(frm) {
		console.log(frappe.session.user_fullname);
		if (frm.is_new()){
			frm.set_value('user_full_name',frappe.user_info().fullname.toLowerCase().replace(' ','_'));
			frm.refresh_field('user_full_name');
		}
		else {
			build_preview(frm);
			var tbl = frm.doc.selections_chld_tbl;
			$.each(tbl, function(index, row){
				selections_options_lst = selections_options_lst.replace("\n" + row.element + "\n", "\n");
				frm.set_df_property("select_i", "options", selections_options_lst);
				frm.refresh_field("select_i");
			});
		}
	},
});

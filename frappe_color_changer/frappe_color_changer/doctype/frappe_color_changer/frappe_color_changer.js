// Copyright (c) 2025, Alon Ben Refael and contributors
// For license information, please see license.txt
const roman=['i','ii','iii','iv','v','vi','vii','viii','ix','x'];
var selections_options_lst = ['','.std-form-layout > .form-layout > .form-page','.page-head','.page-container','.navbar','.new-timeline .activity-title, .new-timeline .timeline-actions','body','a','.btn.btn-default, div#driver-popover-item .driver-popover-footer button.btn-default','.grid-footer .btn, .grid-footer div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-footer button, .grid-custom-buttons .btn, .grid-custom-buttons div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-custom-buttons button','.grid-footer, .grid-custom-buttons','.comment-box .comment-input-container .frappe-control .ql-editor','.grid-heading-row','.grid-body .data-row','.grid-body','.awesomplete .input-with-feedback','.ql-toolbar.ql-snow','.form-control','.like-disabled-input','.control-label','input[type="checkbox"]','.frappe-control .ql-editor:not(.read-mode)','.grid-body .data-row a'];

frappe.ui.form.on("Frappe Color Changer", {
	color_i(frm) {
		t_dsp('i',frm);
	},
});

frappe.ui.form.on("Frappe Color Changer", {
	color_ii(frm) {
		t_dsp('ii',frm);
	},
});

frappe.ui.form.on("Frappe Color Changer", {
	color_iii(frm) {
		t_dsp('iii',frm);
	},
});
frappe.ui.form.on("Frappe Color Changer", {
	color_iv(frm) {
		t_dsp('iv',frm);
	},
});
frappe.ui.form.on("Frappe Color Changer", {
	color_v(frm) {
		t_dsp('v',frm);
	},
});
frappe.ui.form.on("Frappe Color Changer", {
	color_vi(frm) {
		t_dsp('vi',frm);
	},
});
frappe.ui.form.on("Frappe Color Changer", {
	color_vii(frm) {
		t_dsp('vii',frm);
	},
});
frappe.ui.form.on("Frappe Color Changer", {
	color_viii(frm) {
		t_dsp('viii',frm);
	},
});
frappe.ui.form.on("Frappe Color Changer", {
	color_ix(frm) {
		t_dsp('ix',frm);
	},
});


function t_dsp(num,frm){
	let i = String(roman.indexOf(num) + 1);
	let selection = "select_" + i;
	let field = frm.get_field(selection);
	field.df.options = selections_options_lst;
	field.set_options();
	frm.toggle_display(selection, true);
	frm.toggle_display("color_" + i, true);

}

function selections_options(frm){
	var i = 0;
	for (i; i<10; i++){
		frappe.db.get_value('Frappe Color Changer', frm.doc.name , 'select_' + roman[i])
		.then(r => {
			selections_options_lst = selections_options_lst.filter((val) => val !== r.message['select_' + roman[i]]);
		});
	}
	let selection = "select_" + roman[i-1];
	let field = frm.get_field(selection);
	field.df.options = selections_options_lst;
	field.set_options();

}

frappe.ui.form.on("Frappe Color Changer", {
	onload(frm) {
		if (!frm.is_new()){
			selections_options(frm)
		}
	},
});

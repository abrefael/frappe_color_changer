// Copyright (c) 2025, Alon Ben Refael and contributors
// For license information, please see license.txt
const roman=['i','ii','iii','iv','v','vi','vii','viii','ix','x'];
var selections_options_lst = ['\n.std-form-layout > .form-layout > .form-page\n.page-head\n.page-container\n.navbar\n.new-timeline .activity-title, .new-timeline .timeline-actions\nbody\na\n.btn.btn-default, div#driver-popover-item .driver-popover-footer button.btn-default\n.grid-footer .btn, .grid-footer div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-footer button, .grid-custom-buttons .btn, .grid-custom-buttons div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-custom-buttons button\n.grid-footer, .grid-custom-buttons\n.comment-box .comment-input-container .frappe-control .ql-editor\n.grid-heading-row\n.grid-body .data-row\n.grid-body\n.awesomplete .input-with-feedback\n.ql-toolbar.ql-snow\n.form-control\n.like-disabled-input\n.control-label\ninput[type="checkbox"]\n.frappe-control .ql-editor:not(.read-mode)\n.grid-body .data-row a'];

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
	frm.set_df_property(“selection”, “options”, selections_options_lst);
	field.refresh_field();

}

frappe.ui.form.on("Frappe Color Changer", {
	onload(frm) {
		if (!frm.is_new()){
			selections_options(frm)
		}
	},
});

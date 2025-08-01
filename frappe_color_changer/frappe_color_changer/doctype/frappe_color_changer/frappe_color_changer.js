// Copyright (c) 2025, Alon Ben Refael and contributors
// For license information, please see license.txt
const roman=['i','ii','iii','iv','v','vi','vii','viii','ix','x'];
var selections_options_lst = [];
frappe.ui.form.on("Frappe Color Changer", {
	color_i(frm) {
		frm.toggle_display("select_ii", true);
		frm.toggle_display("color_ii", true);
	},
});

function t_dsp(num,frm){
	roman.indexOf(num)
}

function selections_options(frm){
	for (let i=0; i<10; i++){
		frappe.db.get_value('Frappe Color Changer', frm.doc.name , 'select_' + roman[i])
		.then(r => {
			Object.entries(r.message).forEach(([k,v]) => {
				if ((k.includes('select_')) && (v !== null) && (v !== '')){
					selections_options_lst = selections_options_lst.filter((val) => val !== v);
				}
			}
		});
	}
}

frappe.ui.form.on("Frappe Color Changer", {
	onload(frm) {
		if (!frm.is_new()){
			selections_options(frm)
		}
	},
});

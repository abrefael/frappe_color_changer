// Copyright (c) 2025, Alon Ben Refael and contributors
// For license information, please see license.txt

frappe.ui.form.on("Frappe Color Changer", {
	color_i(frm) {
		frm.toggle_display("select_ii", true);
		frm.toggle_display("color_ii", true);
	},
});


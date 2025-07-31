//frappe.after_ajax(() => {
    if (frappe.ui && frappe.ui.form) {
       color_changer();
        frappe.ui.form.on("*", {
            refresh: function(frm) {
                
		console.log('begin_inside');
            }
        });
    }
//});


function color_changer() {
	var changeRule = function(selector, property, value) {
		var styles = document.styleSheets,
			n, sheet, rules, m, done = false;
		for(n = 0; n < styles.length; n++) {
			sheet = styles[n];
			rules = sheet.cssRules || sheet.rules;
			for(m = 0; m < rules.length; m++) {
				if(rules[m].selectorText){
					if (rules[m].selectorText.toLowerCase() === selector) {
						done = true;
						rules[m].style[property] = value;
						break;
					}
				}
				if (done) {
					break;
				}
			}
		}
	};
	changeRule('.std-form-layout > .form-layout > .form-page', 'background-color', '#3584e4');// ✓ 
	changeRule('.page-head', 'background-color', '#3584e4');
	changeRule('.page-container', 'background-color', '#3584e4');
	document.querySelector('.navbar').style.backgroundColor = '#3584e4';
	//changeRule('.navbar', 'background-color', '#3584e4');
	changeRule('.new-timeline .activity-title, .new-timeline .timeline-actions', 'background-color', '#3584e4');
	//changeRule('body','color','#ff7800');
	//changeRule('a','color','#ff7800');
	changeRule('.btn.btn-default, div#driver-popover-item .driver-popover-footer button.btn-default', 'background-color','#ff0000');
	changeRule('.grid-footer .btn, .grid-footer div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-footer button, .grid-custom-buttons .btn, .grid-custom-buttons div#driver-popover-item .driver-popover-footer button, div#driver-popover-item .driver-popover-footer .grid-custom-buttons button', 'background-color','#ff0000');
	changeRule('.grid-footer, .grid-custom-buttons', 'background-color', '#3584e4');// ✓
	changeRule('.grid-heading-row', 'background-color', '#613583'); // ✓ table head
	changeRule('.grid-heading-row', 'color', '#f9f06b'); // ✓ table head
	changeRule('.grid-body .data-row','color','#f9f06b'); // ✓ table
	changeRule('.grid-body', 'background-color', '#613583');// ✓ table
	changeRule('.awesomplete .input-with-feedback', 'background-color', '#ff7800'); // ✓
	changeRule('.awesomplete .input-with-feedback', 'color', '#613583');// ✓
	changeRule('.form-control', 'background-color', '#ff7800');// ✓
	changeRule('.form-control', 'color', '#613583');// ✓
	changeRule('.like-disabled-input', 'background-color', '#ff7800');// ✓
	changeRule('.like-disabled-input', 'color', '#613583');// ✓
	changeRule('.control-label', 'color', '#865e3c');// ✓
	changeRule('input[type="checkbox"]', 'boarder', '#e01b24');
	changeRule('.frappe-control .ql-editor:not(.read-mode)', 'background-color', '#ff7800');
	changeRule('.ql-toolbar.ql-snow', 'background-color', '#ff7800');
	changeRule('.frappe-control .ql-editor:not(.read-mode)', 'background', '#613583');
	changeRule('.ql-toolbar.ql-snow', 'background', '#613583');
	var styleSheet = document.createElement("style")
	styleSheet.textContent = '.grid-body .data-row a {color: #f9f06b;}'// ✓
	document.head.appendChild(styleSheet)
}

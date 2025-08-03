var flag = '';
var href = '';
const observer = new MutationObserver(() => {
	var d_rout;
	if ((document.body.getAttribute('data-route'))) {
		d_rout = document.body.getAttribute('data-route');
		var d_rout_str = d_rout.split('/');
		if (d_rout != flag){
			flag = d_rout;
			if (d_rout_str[0] == 'Form'){
				$('link[rel=stylesheet][href="' + href +'"]').remove();
				href = '/files/css/' + frappe.user_info().fullname.toLowerCase().replace(' ','_') + '_' + d_rout_str[1].toLowerCase().replace(' ','_') + '.css';
				var link = document.createElement('link');
				link.rel = "stylesheet";
				link.type = "text/css";
				link.href = href;
				link.id = "temp_css";
				document.head.appendChild(link);
				console.log(document.body.getAttribute('data-route'));
			}
			else if (d_rout_str[0] != 'Form'){
				$('link[rel=stylesheet][href="' + href +'"]').remove();
			}
		}
	}
});

observer.observe(document.body, { childList: true, subtree: true });



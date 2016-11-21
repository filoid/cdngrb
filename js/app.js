// Frame Buster
if (top != self) {
	try {
		if (top.location.host != self.location.host) throw 1;
	} catch (err) {
		top.location.replace(self.location.protocol + '//' + self.location.host + self.location.pathname);
	}
}
function pr(percent, received, speed) {
	document.getElementById('received').innerHTML = '<b>' + received + '</b>';
	document.getElementById('percent').innerHTML = '<b>' + percent + '%</b>';
	document.getElementById('progress').innerHTML = '<b>' + percent + '%</b>';
	document.getElementById('progress').style.width = percent + '%';
	document.getElementById('speed').innerHTML = '<b>' + speed + ' KB/s</b>';
	document.title = percent + '% Downloaded';
	return true;
}
function new_transload_window() {
	var tmp = (new Date()).getTime();
	$('form[name=transload]').attr('target', 'rapidleech_' + tmp);
	var options = 'width=700,height=320,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no';
	window.open('', 'rapidleech_' + tmp, options);
	window.setTimeout('$(\'form[name=transload]\').submit();', 200);
}

function table_filelist_refresh_headers() {
	if ($.browser.msie == true) {
		if ($('#table_filelist').parent().height() > 450) {
			$('#table_filelist').parent().height(450);
		}
		$('#table_filelist_h, #table_filelist_f').width($('#table_filelist').width());
		$('#table_filelist tr.flisttblhdr td').each(function (id) {
			$('#table_filelist_h tr.flisttblhdr td:eq(' + id + ')').html($(this).html().replace(/(<span .*?sorttable.*?>|<\/span>)/gi, ''));
			$('#table_filelist_h tr.flisttblhdr td:eq(' + id + '), #table_filelist_f tr.flisttblftr td:eq(' + id + ')').width($(this).width());
		});
	} else {
		$('#table_filelist_h, #table_filelist_f').css('width', $('#table_filelist').css('width'));
		$('#table_filelist tr.flisttblhdr td').each(function (id) {
			$('#table_filelist_h tr.flisttblhdr td:eq(' + id + ')').html($(this).html().replace(/(<span .*?sorttable.*?>|<\/span>)/gi, ''));
			$('#table_filelist_h tr.flisttblhdr td:eq(' + id + '), #table_filelist_f tr.flisttblftr td:eq(' + id + ')').css('width', $(this).css('width'));
		});
	}
}

function switchCell(m) {
	$('#tb1, #tb2, #tb3, #tb4').hide();
	$('#navcell1, #navcell2, #navcell3, #navcell4').removeClass('selected');
	$('#navcell' + m).addClass('selected');
	$('#tb' + m).fadeIn('slow');
	if (m == 3 && $('#table_filelist_h').length != 0) {
		table_filelist_refresh_headers();
	}
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + '=';
	var begin = dc.indexOf('; ' + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) {
			return null;
		}
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(';', begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + '=' + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
	}
}

function clearSettings() {
	clear('domail', 'email', 'saveto', 'path', 'useproxy', 'proxy', 'proxyuser', 'proxypass', 'split', 'partSize', 'savesettings', 'clearsettings', 'premium_acc', 'premium_user', 'premium_pass');
	$('#domail, #splitchkbox, #useproxy, #premium_acc, #saveto, #savesettings').prop('checked', false);
	$('#email, #proxyproxy, #proxyuser, #proxypass, #premium_user, #premium_pass').val('');
	$('#emailtd, #splittd, #methodtd, #proxy, #premiumblock, #path, #clearsettings').hide();
	document.cookie = 'clearsettings = 1;';
}

function clear() {
	for (var i = 0; i < arguments.length; i++) document.cookie = arguments[i] + ' = ; expires=Thu, 01-Jan-70 00:00:01 GMT';
}

//Match text
function flist_match() {
	var text, insensitive, text_regexp, e_to_click;
	text = $('#flist_match_search').val();
	if (text == '') {
		return false;
	}
	insensitive = $('#flist_match_ins').prop('checked');
	text = '*' + text + '*';
	while (text.search(/\*\*/g) != -1) {
		text = text.replace(/\*\*/g, '*');
	}
	text = text.replace(/\^|\$|\?|\+|\||\(|\{|\[|\\/g, '');
	text = text.replace(/\./g, '\\.');
	text = text.replace(/\*/g, '.*?');
	text_regexp = new RegExp(text, insensitive ? 'i' : '');
	$('#table_filelist :checked').prop('checked', false);
	$('#table_filelist :checkbox').each(function () {
		if ($(this).parent().next().children().html().match(text_regexp) !== null) {
			$(this).prop('checked', true);
		}
	});
	if ($('#table_filelist :checked').size() > 0) {
		e_to_click = ($('#file_list_checkbox_title_h').length != 0) ? $('#file_list_checkbox_title_h') : $('#file_list_checkbox_title');
		e_to_click.click();
		if ($('#file_list_checkbox_title').html().search('sorttable_sortrevind') == -1) {
			e_to_click.click();
		}
		$('#table_filelist').parent().animate({
			scrollTop: '0'
		});
	}
	return false;
}

function setCheckboxes(act) {
	elts = document.getElementsByName('files[]');
	var elts_cnt = (typeof (elts.length) != 'undefined') ? elts.length : 0;
	if (elts_cnt) {
		for (var i = 0; i < elts_cnt; i++) {
			elts[i].checked = (act == 1 || act == 0) ? act : (elts[i].checked ? 0 : 1);
		}
	}
}

function showAll() {
	if (getCookie('showAll') == 1) {
		clear('showAll');
		location.href = location.href.split('?', 1) + '?act=files';
	} else {
		document.cookie = 'showAll = 1;';
		location.href = location.href.split('?', 1) + '?act=files';
	}
}

function mail(str, field) {
	document.getElementById('mailPart.' + field).innerHTML = str;
	return true;
}

function setFtpParams() {
	setParam('host', 'port', 'login', 'password', 'dir');
	document.cookie = 'ftpParams=1';
	document.getElementById('hrefSetFtpParams').style.color = '#808080';
	document.getElementById('hrefDelFtpParams').style.color = '#0000FF';
}

function delFtpParams() {
	clear('host', 'port', 'login', 'password', 'dir', 'ftpParams');
	document.getElementById('hrefSetFtpParams').style.color = '#0000FF';
	document.getElementById('hrefDelFtpParams').style.color = '#808080';
}

function setParam() {
	for (var i = 0; i < arguments.length; i++) document.cookie = arguments[i] + '=' + document.getElementById(arguments[i]).value;
}

function changeStatus(file, size) {
	document.getElementById('status').innerHTML = 'Uploading File <b>' + file + '</b>, Size <b>' + size + '</b>...<br />';
}

function checkFile(id) {
	if (document.getElementById('files' + id).checked == true) document.getElementById('files' + id).checked = false;
	else document.getElementById('files' + id).checked = true;
	return false;
}

function openNotes() {
	var options = 'width=700,height=450,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no';
	window.open('notes.php', 'open_window', options);
}

function startLinkCheck() {
	// Post ajax
	$.ajax({
		type: 'POST',
		url: 'ajax.php?ajax=linkcheck',
		data: ({
			submit: 'Check Links',
			links: $('#links').val(),
			k: ($('#chk_k').prop('checked')) ? 1 : 0,
			d: ($('#chk_d').prop('checked')) ? 1 : 0
		}),
		beforeSend: function () {
			$('#linkchecker-results').hide();
			$('#loading').show();
			$('#linkchecker').addClass('linkchecker-load');
			$('#submit').prop('disabled', true);
		},
		success: function (data) {
			$('#linkchecker-results').html(data);
			$('#linkchecker-results').show();
		},
		complete: function () {
			$('#loading').hide();
			$('#linkchecker').removeClass('linkchecker-load');
			$('#linkchecker-results').show();
			$('#submit').prop('disabled', false);
		}
	});
	return false;
}

function fc(caption, displaytext) {
	if (c > 0) {
		document.getElementById("dl").innerHTML = caption + php_js_strings[87].replace('%1$s', c.toFixed(1));
		c = c - 0.5;
		setTimeout('fc(\'' + caption + '\',\'' + displaytext + '\')', 500);
	} else {
		document.getElementById('dl').style.display = 'none';
		document.getElementById('code').innerHTML = unescape(displaytext);
	}
}

// Javascript clock for server time
/**
 * Numbers < 10 should be presented with a zero in front
 */
function fixNumber(number) {
	return (number < 10) ? '0' + number : number;
}

/**
 * Fixed look for month
 */
function fixMonth(number) {
	number = number + 1;
	return (number < 10) ? '0' + number : number;
}

function getLocalDate(year, month, day, dateFormat) {
	if (dateFormat.length < 2) { // When not logged in there is no dateformat
		dateFormat = 'yyyy-mm-dd';
	}
	dateFormat = dateFormat.replace('yyyy', year);
	dateFormat = dateFormat.replace('mm', month);
	dateFormat = dateFormat.replace('dd', day);
	dateFormat = dateFormat.replace('d', day);
	dateFormat = dateFormat.replace('m', month);

	return dateFormat;
}

/**
 * Show online users and clock
 */
function runClock(timeDiff, dateFormat) {
	var now = new Date();

	var newTime;
	newTime = now.getTime() - timeDiff;
	now.setTime(newTime);

	var localDate = getLocalDate(now.getFullYear(), fixMonth(now.getMonth()), fixNumber(now.getDate()), dateFormat);

	document.getElementById('server').innerHTML = fixNumber(now.getHours()) + ':' + fixNumber(now.getMinutes()) + ':' + fixNumber(now.getSeconds());

	setTimeout('runClock(timeDiff,"' + dateFormat + '");', 1000);
}

/**
 * Calculates a time difference between client and server, to make js clock to run correctly
 */
function timeDiff(Year, Month, Day, Hour, Minute, Second, dateFormat) {
	var timeDifferense;
	var serverClock = new Date(Year, Month - 1, Day, Hour, Minute, Second);

	var clientClock = new Date();
	var serverSeconds;
	var clientSeconds;
	timeDiff = clientClock.getTime() - serverClock.getTime() - 3000;
	runClock(timeDiff, dateFormat);
}

function getthedate() {
	var mydate = new Date();
	var hours = mydate.getHours();
	var minutes = mydate.getMinutes();
	var seconds = mydate.getSeconds();
	var dn = 'AM';
	if (hours >= 12) dn = 'PM';
	if (hours > 12) hours = hours - 12;
	if (hours == 0) hours = 12;
	if (hours <= 9) hours = '0' + hours;
	if (minutes <= 9) minutes = '0' + minutes;
	if (seconds <= 9) seconds = '0' + seconds;

	var cdate = '<span class="cpu-clock-lt-text">' + php_js_strings[281] + ':</span> &nbsp;&nbsp;&nbsp;<span class="cpu-clock-lt-time">' + hours + ':' + minutes + ':' + seconds + ' ' + dn + '</span><br />';
	$('#clock').html(cdate);
	setTimeout('getthedate()', 1000);
}
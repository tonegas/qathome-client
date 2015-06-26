var api_url = 'http://qathome.com/api/v1/';
//var api_url = 'http://192.168.1.6:8000/api/v1/';

var users_url;
var firms_url;
var tickets_url;

var loggedUserName = '';
var loggedPassword = '';

function initServerCommunication() {
	$.ajax({
		url: api_url,
		error: function(error) {
			console.log('ajax error: ' + error.status);
		},
		success: function(data, textStatus, jqXHR) {
			users_url = data['users'];
			firms_url = data['firms'];
			tickets_url = data['tickets'];
		}
    });
}

function logIn(username,password) {
	var loginOk = false;
	$.ajax({
		url: tickets_url,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
		},
		success: function(data, textStatus, jqXHR) {
			loggedUserName = username;
			loggedPassword = password;
			loginOk = true;
		}
    });
	return loginOk;
}

function getLoggedUserName() {
	return loggedUserName;
}

function logOut() {
	loggedUserName = '';
	loggedPassword = '';
}

function getOwnedFirms() {
	var ownedFirms = [];
	$.ajax({
		url: firms_url,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		success: function(data, textStatus, jqXHR) {
			ownedFirms = data;
		}
    });
	return ownedFirms;
}

function getDesks(desksURL) {
	var desks = [];
	$.ajax({
		url: desksURL,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		success: function(data, textStatus, jqXHR) {
			desks = data;
		}
    });
	return desks;
}

function getFirmDesksURL(firmURL) {
	var firmDesksURL = 'ERROR!';
	$.ajax({
		url: firmURL,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		success: function(data, textStatus, jqXHR) {
			firmDesksURL = data['desks'];
		}
    });
	return firmDesksURL;
}

function getFirmName(firmURL) {
	var firmName = 'ERROR!';
	$.ajax({
		url: firmURL,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		success: function(data, textStatus, jqXHR) {
			firmName = data['name'];
		}
    });
	return firmName;
}

function firmIsOpen(firmURL) {
	var firmIsOpen = false;
	$.ajax({
		url: firmURL,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		success: function(data, textStatus, jqXHR) {
			var firmState = data['state'];
			if(firmState === 'O') {
				firmIsOpen = true;
			}
		}
    });
	return firmIsOpen;
}

function openFirm(firmUrl) {
	console.log('openFirm firmUrl ' + firmUrl);///
	$.ajax({
		url: firmUrl,
		type : 'PATCH',
		async: false,
		data : {state: 'O'},
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		error : function(jqXHR, textStatus, errorThrown) {
            console.log('The following error occured: ' + textStatus, errorThrown);
        },
		success: function(data, textStatus, jqXHR) {
			console.log('openFirm success');
		}
    });
}

function closeFirm(firmUrl) {
	console.log('closeFirm firmUrl ' + firmUrl);///
	$.ajax({
		url: firmUrl,
		type : 'PATCH',
		async: false,
		data : {state: 'C'},
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		error : function(jqXHR, textStatus, errorThrown) {
            console.log('The following error occured: ' + textStatus, errorThrown);
        },
		success: function(data, textStatus, jqXHR) {
			console.log('closeFirm firm successfully closed!');///
		}
    });
}

function openDesk(deskURL) {
	console.log('openDesk deskURL = ' + deskURL);
	$.ajax({
		url: deskURL,
		type : 'PATCH',
		async: false,
		data : {state: 'O'},
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		error : function(jqXHR, textStatus, errorThrown) {
            console.log('The following error occured: ' + textStatus, errorThrown);
        },
		success: function(data, textStatus, jqXHR) {
			console.log('openDesk success!');
		}
    });
}

function closeDesk(deskURL) {
	console.log('openDesk deskURL = ' + deskURL);
	$.ajax({
		url: deskURL,
		type : 'PATCH',
		async: false,
		data : {state: 'C'},
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		error : function(jqXHR, textStatus, errorThrown) {
            console.log('The following error occured: ' + textStatus, errorThrown);
        },
		success: function(data, textStatus, jqXHR) {
			console.log('closeDesk success!');
		}
    });
}

function getNextTicket(nextTicketURL){
	console.log('getNextTicket nextTicketURL = ' + nextTicketURL);///
	var ticket = [];
	$.ajax({
		url: nextTicketURL,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		error : function(jqXHR, textStatus, errorThrown) {
            console.log('The following error occured: ' + textStatus, errorThrown);
        },
		success: function(data, textStatus, jqXHR) {
			ticket = data;
		}
    });
	return ticket;
}

function getFirmWaitingUsers(firmURL) {
	var firmWaitingUsers = 'ERROR!';
	$.ajax({
		url: firmURL,
		async: false,
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(loggedUserName + ':' + loggedPassword));
		},
		success: function(data, textStatus, jqXHR) {
			firmWaitingUsers = data['waiting_users'];
		}
    });
	return firmWaitingUsers;
}
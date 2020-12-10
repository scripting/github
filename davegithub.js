var myVersion = "0.4.5", myProductName = "davegithub";  

const utils = require ("daveutils");
const request = require ("request");

exports.getFile = getFile; 
exports.uploadFile = uploadFile; 

function getFile (options, callback) {
	var url = "https://api.github.com/repos/" + options.username + "/" + options.repo + "/contents/" + options.repoPath;
	var theRequest = {
		method: "GET",
		url: url,
		headers: {
			"User-Agent": options.userAgent
			}
		};
	request (theRequest, function (err, response, body) { 
		var jstruct = undefined;
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			try {
				var jstruct = JSON.parse (body);
				if (callback !== undefined) {
					var buffer = Buffer.from (jstruct.content, "base64"); //work around deprecation warning -- 12/10/20 by DW
					callback (undefined, buffer.toString (), jstruct);
					}
				}
			catch (err) {
				if (callback !== undefined) {
					callback (err);
					}
				}
			}
		});
	}
function uploadFile (options, callback) {
	var bodyStruct = { 
		message: options.message,
		committer: {
			name: options.committer.name,
			email: options.committer.email
			},
		content: Buffer.from (options.data).toString ("base64")
		};
	getFile (options, function (err, data, jstruct) {
		if (jstruct !== undefined) {
			bodyStruct.sha = jstruct.sha;
			}
		var url = "https://api.github.com/repos/" + options.username + "/" + options.repo + "/contents/" + options.repoPath;
		
		var theRequest = {
			method: "PUT",
			url: url,
			body: JSON.stringify (bodyStruct),
			auth: {
				user: options.username,
				pass: options.password,
				sendImmediately: true
				},
			headers: {
				"User-Agent": options.userAgent,
				"Content-Type": options.type
				}
			};
		request (theRequest, function (err, response, body) { 
			if (err) {
				console.log ("uploadFile: err.message == " + err.message);
				}
			if (callback !== undefined) {
				callback (err, response, body);
				}
			});
		});
	}

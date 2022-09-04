var myVersion = "0.4.7", myProductName = "davegithub";  

const utils = require ("daveutils");
const request = require ("request");

exports.getFile = getFile; 
exports.uploadFile = uploadFile; 
exports.getDirectory = getDirectory; 

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
function getDirectory (options, path, callback) {
	function loadDirectory (theArray, parentpath, callback) {
		function nextFile (ix) {
			if (ix < theArray.length) {
				var item = theArray [ix];
				if (item.type == "dir") {
					getDirectory (options, item.path, function (err, jstruct) {
						if (jstruct !== undefined) { //no error
							item.subs = jstruct;
							}
						nextFile (ix + 1);
						});
					}
				else {
					nextFile (ix + 1);
					}
				}
			else {
				callback ();
				}
			}
		nextFile (0);
		}
	if (utils.beginsWith (path, "/")) {
		path = utils.stringDelete (path, 1, 1);
		}
	var theRequest = {
		method: "GET",
		url: "https://api.github.com/repos/" + options.username + "/" + options.repo + "/contents/" + path,
		headers: {
			"User-Agent": options.userAgent
			}
		};
	console.log ("getDirectory: path == " + path);
	request (theRequest, function (err, response, body) { 
		if (err) {
			if (callback !== undefined) {
				callback (err);
				}
			}
		else {
			try {
				var jstruct = JSON.parse (body);
				if (Array.isArray (jstruct)) { //it's a directory
					loadDirectory (jstruct, path, function () {
						callback (undefined, jstruct);
						});
					}
				else {
					if (callback !== undefined) {
						callback (jstruct);
						}
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

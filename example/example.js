const fs = require ("fs");
const utils = require ("daveutils");
const davegithub = require ("davegithub"); 

function getFileTest (callback) {
	const options = {
		username: "scripting",
		repo: "test1",
		repoPath: "lyrics.txt",
		userAgent: "Dave's Test GitHub Uploader"
		};
	davegithub.getFile (options, function (err, data, jstruct) {
		if (err) {
			console.log (err.message);
			}
		else {
			console.log ("getFileTest: data == " + data);
			}
		callback ();
		});
	}
function uploadFileTest () {
	const options = {
		username: "scripting",
		repo: "test1",
		repoPath: "motto.txt",
		data: "It's even worse than it appears.",
		type: "text/plain",
		committer: {
			name: "Dave Winer",
			email: "dave.winer@gmail.com"
			},
		message: "Set the motto",
		userAgent: "Dave's Test GitHub Uploader"
		};
	fs.readFile ("config.json", function (err, data) {
		if (err) {
			console.log ("uploadFileTest: err.message == " + err.message);
			}
		else {
			const config = JSON.parse (data);
			options.password = config.password;
			davegithub.uploadFile (options, function (err, response, body) {
				console.log ("uploadFileTest: response.statusCode == " + response.statusCode);
				});
			}
		});
	}
function uploadFileTestMp3 () {
	const options = {
		username: "scripting",
		repo: "test1",
		repoPath: "song.mp3",
		committer: {
			name: "Dave Winer",
			email: "dave.winer@gmail.com"
			},
		message: "Test update",
		userAgent: "Dave's Test GitHub Uploader"
		};
	
	fs.readFile ("song.mp3", function (err, mp3data) {
		if (err) {
			console.log ("uploadFileTest: err.message == " + err.message);
			}
		else {
			options.data = mp3data;
			options.type = "audio/mp3";
			fs.readFile ("config.json", function (err, data) {
				if (err) {
					console.log ("uploadFileTest: err.message == " + err.message);
					}
				else {
					const config = JSON.parse (data);
					options.password = config.password;
					davegithub.uploadFile (options, function () {
						});
					}
				});
			}
		});
	
	
	}

getFileTest (function () {
	uploadFileTest ();
	});

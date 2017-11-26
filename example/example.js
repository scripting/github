const fs = require ("fs");
const utils = require ("daveutils");
const davegithub = require ("../davegithub.js");

function getFileTest () {
	const options = {
		username: "scripting",
		password: "",
		repo: "test1",
		repoPath: "package.json",
		type: "text/html",
		committer: {
			name: "Dave Winer",
			email: "dave.winer@gmail.com"
			},
		message: "Test update",
		userAgent: "Dave's Test GitHub Uploader"
		};
	davegithub.getFile (options, function (err, data, jstruct) {
		if (err) {
			console.log (err.message);
			}
		else {
			console.log (data);
			}
		});
	}
function uploadFileTest () {
	const options = {
		username: "scripting",
		repo: "test1",
		repoPath: "happy.txt",
		data: "I need love to keep me happy.",
		type: "text/plain",
		committer: {
			name: "Dave Winer",
			email: "dave.winer@gmail.com"
			},
		message: "Test update",
		userAgent: "Dave's Test GitHub Uploader"
		};
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

uploadFileTestMp3 ();

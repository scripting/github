# github

Read and write files to a GitHub repository.

### Updates

5/4/21; 11:20:17 AM by DW

Added getDirectory function.

12/10/20 by DW

This is when GH's <a href="https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api/">deprecation warnings</a> caught uip with me. The script that uploads bits from scripting.com to the <a href="https://github.com/scripting/Scripting-News/tree/master/blog">Scripting-News repo</a> stopped working 27 days ago. Now I want to figure out what to do to get it working again. 

1. I generated a <a href="https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token">personal access token</a> and saved it in config.json as the password in the example app. 

2. I updated the code in davegithub to send the username and password via Basic Auth.

It worked. 


# github

Read and write files to a GitHub repository.

### Updates

#### 10/2/22 by DW

When I integrated the new queued github writer with the big app I'm working on it failed to upload the files. After much debugging this is what the problem was:

1. The files it was uploading already existed. 

2. The GET call that the upload needs to do was getting rate-limited.

3. But you can increase the rate-limit by authenticating.

4. Since the upload functionality has to authenticate, I had prior art to copy, so if the request to get the file has a username and password in the options table, we do authenticate.

5. It worked. ;-)

#### 10/1/22 by DW

New option when uploading a file -- flUseQueue, if true we make sure they run one after the other, because that's how the GH server likes it.

Bumped the version to 0.5.0 because this is a fairly big feature and it's worth boasting about a bit. No breakage! :-)

#### 5/4/21 by DW

Added getDirectory function.

#### 12/10/20 by DW

This is when GH's <a href="https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api/">deprecation warnings</a> caught uip with me. The script that uploads bits from scripting.com to the <a href="https://github.com/scripting/Scripting-News/tree/master/blog">Scripting-News repo</a> stopped working 27 days ago. Now I want to figure out what to do to get it working again. 

1. I generated a <a href="https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token">personal access token</a> and saved it in config.json as the password in the example app. 

2. I updated the code in davegithub to send the username and password via Basic Auth.

It worked. 


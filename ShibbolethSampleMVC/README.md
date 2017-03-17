
# Shibboleth MVC Sample

I created this sample solution to help CSU Web Developers integrate with Shibboleth, as
WebAuth authentication is going away in Summer of 2017 (RIP).

Contact me (david.edwards@colostate.edu) with questions, or we at Web Communications
(http://web.colostate.edu) would be happy to help you convert your legacy apps.

## Overview

### SessionWrapper
SessionWrapper is an easier way to maintain access to your User, Roles, and Shibboleth information.
It is set originally in the AuthorizeController's Index() method.  When you contact ACNS about setting
up Shibboleth for your application, that is the view you want to protect.  http://yourapphere/Authorize.  
That ensures that anyone going to that URL is first sent to the SSO page, authenticated, then
returned.  At that point you call SessionWrapper.Current.LoadUser(Request.Headers), which 
takes in the Headers returned from Shibboleth, and hydrates a User with all of the Shibboleth info, as
well as User and Role information defined by you.  

### ShibbolethPrincipal
Contains all of the Shibboleth fields returned.  Also, contains methods for your user-defined
user/role information in the GetRolesFromDatabase() and GetUserIdentityFromHeaders() methods.  
I have created this using a barebones User and Roles structure, feel free to expand on it.

### AuthorizationFilter
This was originally written by another CSU developer (if it was you, notify me for credit!) and makes it easy to 
protect individual Controller actions, or even entire Controllers.  Look at the HomeController's Protected method for 
an example of protecting an individual View.  The UnAuthorized View can never be viewed, as it uses a role that doesn't
exist.  (this is for testing, to make sure you handle a user who has logged in, but doesn't have appropriate permissions)

The rest of the solution is pretty standard MVC code.  I've tried to strip out as many unneeded packages as possible. The 
solution is available here: https://bitbucket.org/csuwebcom/shibbolethsamplemvc

Feel free to contribute issues, pull requests, or add to the Wiki.  



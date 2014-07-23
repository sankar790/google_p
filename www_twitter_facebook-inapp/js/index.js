/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var authWindow=''

var client_id = "359324674196865";
	var redir_url = "http://www.facebook.com/connect/login_success.html";
        
        function face(){
            
            var fb = FBConnect.install();
		fb.connect(client_id,redir_url,"touch");
		fb.onConnect = onFBConnected;
        }
        
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       // alert('ok');
         // localStorage.setItem('twitterKeyss','ss')
                alert(localStorage.getItem('twitterKeyss'));
         var root = this;
               // localStorage.setItem('twitterKeyss','ss')
                alert(localStorage.getItem('twitterKeyss'));
                cb = window.plugins.childBrowser;
                if(!localStorage.getItem(twitterKey)){
                        $("#loginBtn").show();
                        $("#logoutBtn").hide();
                }
                else {
                    $("#loginBtn").hide();
                    $("#logoutBtn").show();
                }
                     
                if (cb != null) {
                    cb.onLocationChange = function(loc){ root.locChanged(loc); };
                    cb.onClose = function(){root.onCloseBrowser()};
                    cb.onOpenExternal = function(){root.onOpenExternal();};
                }
    }
};
 function onCloseBrowser() {
                console.log("onCloseBrowser!");
            }
                 
            function locChanged(loc) {
                console.log("locChanged!");
            }
                 
            function onOpenExternal() {
                console.log("onOpenExternal!");
            }
            function closeB()
            {
            	window.plugins.childBrowser.close();
            }
                 
                 
                 
                           // GLOBAL VARS
            var oauth; // It Holds the oAuth data request
            var requestParams; // Specific param related to request
            var options = {
                consumerKey: 'H835Fzfk5dzW8fsLq37M7g', // YOUR Twitter CONSUMER_KEY
                consumerSecret: 'G8fiHVgDzbGav65WKZpZ6XVvm6TqLZXeRvqW7TM8ErM', // YOUR Twitter CONSUMER_SECRET
                callbackUrl: "http://www.techiestown.com" }; // YOU have to replace it on one more Place                   
            var twitterKey = "twtrKey"; // This key is used for storing Information related
                     
                     
            var Twitter = {
                init:function(){
                    // Apps storedAccessData , Apps Data in Raw format
                    var storedAccessData, rawData = localStorage.getItem(twitterKey);
                    // here we are going to check whether the data about user is already with us.
                    if(localStorage.getItem(twitterKey) !== null){
                    // when App already knows data
                    storedAccessData = JSON.parse(rawData); //JSON parsing
                    //options.accessTokenKey = storedAccessData.accessTokenKey; // data will be saved when user first time signin
                    options.accessTokenSecret = storedAccessData.accessTokenSecret; // data will be saved when user first first signin
                                 
                    // javascript OAuth take care of everything for app we need to provide just the options
                    oauth = OAuth(options);
                    oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                    function(data) {
                            var entry = JSON.parse(data.text);
                            console.log("USERNAME: " + entry.screen_name);
                            }
                        );
                    }
                    else {
                        // we have no data for save user
                        oauth = OAuth(options);
                        oauth.get('https://api.twitter.com/oauth/request_token',
                        function(data) {
                        requestParams = data.text;
                       // cb.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text); // This opens the Twitter authorization / sign in page
                       // cb.onLocationChange = function(loc){ Twitter.success(loc); }; // Here will will track the change in URL of ChildBrowser
                                var authorize_url ='https://api.twitter.com/oauth/authorize?'+data.text;
                                 authWindow = window.open(authorize_url, '_blank', 'location=no,toolbar=no');
	   
	    authWindow.addEventListener('loadstart', function(event) {
	  //   alert('start: ' + event.url);
	     //self.onLocationChange(event.url);
	     Twitter.success(event.url);
	      });
                                
                                  },
                                  function(data) {
                                          console.log("ERROR: "+data);
                                }
                    );
                    }
                    },
                        /*
                         When ChildBrowser's URL changes we will track it here.
                         We will also be acknowledged was the request is a successful or unsuccessful
                         */
                        success:function(loc){
                             
                            // Here the URL of supplied callback will Load
                             
                            /*
                             Here Plugin will check whether the callback Url matches with the given Url
                             */
                            if (loc.indexOf("http://www.techiestown.com/?") >= 0) {
                                 
                                // Parse the returned URL
                                var index, verifier = '';
                                var params = loc.substr(loc.indexOf('?') + 1);
                                 
                                params = params.split('&');
                                for (var i = 0; i < params.length; i++) {
                                    var y = params[i].split('=');
                                    if(y[0] === 'oauth_verifier') {
                                        verifier = y[1];
                                    }
                                }
                                 
                                // Here we are going to change token for request with token for access
                                 
                                /*
                                 Once user has authorised us then we have to change the token for request with token of access
                                here we will give data to localStorage.
                                 */
                                oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                                          function(data) {
                                          var accessParams = {};
                                          var qvars_tmp = data.text.split('&');
                                          for (var i = 0; i < qvars_tmp.length; i++) {
                                          var y = qvars_tmp[i].split('=');
                                          accessParams[y[0]] = decodeURIComponent(y[1]);
                                          }
                                           
                                          $('#oauthStatus').html('<span style="color:green;">Success!</span>');
                                          $('#stage-auth').hide();
                                          $('#stage-data').show();
                                          oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                                           
                                          // Saving token of access in Local_Storage
                                          var accessData = {};
                                          accessData.accessTokenKey = accessParams.oauth_token;
                                          accessData.accessTokenSecret = accessParams.oauth_token_secret;
                                           
                                          // Configuring Apps LOCAL_STORAGE
                                          console.log("TWITTER: Storing token key/secret in localStorage");
                                          localStorage.setItem(twitterKey, JSON.stringify(accessData));
                                           
                                          oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                                    function(data) {
                                                    var entry = JSON.parse(data.text);
                                                    console.log("TWITTER USER: "+entry.screen_name);
                                                    console.log("Total Follower"+entry.followers_count);
                                                    total_count = entry.followers_count;
                                                    $("#welcome").show();
                                                    document.getElementById("welcome").innerHTML="welcome " + entry.screen_name;
                                                    successfulLogin(entry);
                                                     
                                                    // Just for eg.
                                                    //app.init();
                                                    },
                                                    function(data) {
                                                    console.log("ERROR: " + data);
                                                    }
                                                    );
                                             oauth.get('https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=demotechiestown&skip_status=true&include_user_entities=false',
                                      function(data) {
                                      var entry = JSON.parse(data.text);
                                   		var r = document.getElementById("recv");
                                     	console.log("followers"+entry.previous_cursor);
                                     	console.log("friends=="+entry.users[0].id);
                                     	//alert("length=="+entry.users.screen_name.length);
                                     	//alert("screen=="+entry.users[0].screen_name);
                                     	for (var i=0; i<total_count; i++)
                                     	{
                                     		console.log("Total followers="+entry.users[i].screen_name);
                                     		r.options[i]=new Option(entry.users[i].screen_name);
                                     	}
                                      }
                                      );
                                          // Now we have to close the child browser because everthing goes on track.
                                         // closeB();
                                          //window.plugins.childBrowser.close();
                                       
                                           authWindow.close();
                                        //window.plugins.childBrowser.showWebPage('https://twitter.com/login');
                                          },
                                          function(data) {
                                          console.log(data);
                                           
                                           
                                          }
                                          );
                                   
                                       
                            }
                            else {
                                // Just Empty
                            }
                        },
                        tweet:function(msg){
                            var storedAccessData, rawData = localStorage.getItem(twitterKey);                                        
                            storedAccessData = JSON.parse(rawData); // Paring Json
                            options.accessTokenKey = storedAccessData.accessTokenKey; // it will be saved on first signin
                            options.accessTokenSecret = storedAccessData.accessTokenSecret; // it will be save on first login
                             
                            // javascript OAuth will care of else for app we need to send only the options
                            oauth = OAuth(options);
                            oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                      function(data) {
                                      var entry = JSON.parse(data.text);
                                      Twitter.post(msg);
                                      }
                                      );
                        },
                        /*
                         We now have the data to tweet
                         */
                        post:function(msg1){
                            var theTweet = $("#tweet").val(); 
                            var thePvtTweet = $("#pvt_tweet").val();
                            var sel = document.getElementById("recv");
                                                        
                            var receiver = sel.options[sel.selectedIndex].value;// You can change it with what else you likes.
                             alert(" "+receiver);
                              if (msg1=="pub"){             
                            oauth.post('https://api.twitter.com/1.1/statuses/update.json',
                                       { 'status' : theTweet,  // javascript OAuth encodes this
                                       'trim_user' : 'true' },
                                       function(data) {
                                       var entry = JSON.parse(data.text);
                                       console.log(entry);
                                        
                                       // just for eg.
                                       done();
                                       },
                                       function(data) {
                                       console.log(data);
                                       }
                                       ); }//public tweet
                             //Direct Message
                             else
                             {	
                             	
                             	 oauth.post('https://api.twitter.com/1.1/direct_messages/new.json',
                                       { 'text': thePvtTweet,  // javascript OAuth encodes this
                                       'screen_name': receiver},
                                       function(data) {
                                       var entry = JSON.parse(data.text);
                                       console.log(entry.text+" "+entry.user_id+" "+entry.screen_name);
                                       console.log(entry);
                                        done();
                                       // just for eg.
                                       
                                       },
                                       function(data) {
                                       console.log(data);
                                       }
                                       );
                             }
                                
                        }
 
                    }                     
                function done(){
                        $("#tweet").val('');
                        $("#pvt_tweet").val('');
                        //$("#recv").val('');
                    }
                     
                     
                    function successfulLogin(ent){
                    	//alert("parameter  "+ent.length);
                    	//alert("you are login as user : "+ent.screen_name);
                    	//console.log("Hello");
                        $("#loginBtn").hide();
                        $("#logoutBtn,#tweet,#tweeter,#private,#tweetBtn,#tweetText,#pvt_tweet,#recv").show();
                  
                    }
                     
                    function logOut(){
                        //localStorage.clear();
                        window.localStorage.removeItem(twitterKey);
                        document.getElementById("welcome").innerHTML="Please Login to use this app";
                        $("#loginBtn").show();
                        $("#logoutBtn,#tweet,#tweeter,#tweetText,#tweetBtn,#private,#pvt_tweet,#recv").hide();
                      
                    }
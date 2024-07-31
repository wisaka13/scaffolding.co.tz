/**
 * ac-utm-cookie.js
 * Description: Creates a cookie with a visitor's UTM parameters, then inserts those parameters into a custom field for ActiveCampaign users.
 * Use: Distributed under the MIT License.
 * Creator: sirbots (https://github.com/sirbots) @ https://makemore.coffee
 */
var cookieNames = document.cookie.split(';');
var cookieSet = false;

for (i=0 ; i < cookieNames.length ; i++) {
    if ( cookieNames[i].substring(0,10) == ' UTMparams' || cookieNames[i].substring(0,9) == 'UTMparams') {
        cookieSet = true;
    }
}

// Check for utms in the query string
if (!cookieSet) {
    if (window.location.search.substring(1).search("utm") > -1 ) {
// Store the parsed UTM parameters
        var medium = getQueryVariable("utm_medium");
        var source = getQueryVariable("utm_source");
        var campaign = getQueryVariable("utm_campaign");
        var content = getQueryVariable("utm_content");
        var term = getQueryVariable("utm_term");
        console.log('UTM cookie detected');

// Bake the cookie
        setCookie();
}else if(window.location.search.substring(1).search("gclid") > -1){
        var medium = 'cpc';
        var source = 'google';
        var campaign = 'none';
        var content = 'none';
        var term = 'none';
        console.log('gclid detected');
// Bake the cookie
        setCookie();
} else {
// Handling for non-UTM traffic
        var referringDomain = (document.referrer == "") ? 'none' : document.referrer.split("/")[2];

        var medium = 'direct';
        var source = 'none';
        var campaign = 'none';
        var content = 'none';
        var term = 'none';

        if (referringDomain.indexOf('google') > -1) {
            var medium = 'organic';
            var source = 'google';
        } else if (referringDomain.indexOf('yahoo') > -1) {
            var medium = 'organic';
            var source = 'yahoo';
        } else if (referringDomain.indexOf('bing') > -1) {
            var medium = 'organic';
            var source = 'bing';
        } else if (referringDomain.indexOf('duckduckgo') > -1) {
            var medium = 'organic';
            var source = 'duckduckgo';
        } else if (referringDomain.indexOf('facebook') > -1) {
            var medium = 'social';
            var source = 'facebook';
        } else if (referringDomain.indexOf('instagram') > -1) {
            var medium = 'social';
            var source = 'instagram';
        } else if (referringDomain.indexOf('twitter') > -1) {
            var medium = 'social';
            var source = 'twitter';
        } else if (!referringDomain.indexOf('') == 0) {
            var medium = 'referral';
            var source = 'referringDomain';
        }

        console.log('non-UTM detected');

// Bake the cookie
        setCookie();
    }
}

// Parse the UTM parameters in the query string
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0 ; i < vars.length ; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return("none");
}

// Bake the cookie
function setCookie() {
    document.cookie = "UTMparams=" + medium + "/" + source + "/" + campaign + "/" + content + "/" + term + ";path=/;"
}

// Find the UTM cookie and parse it
function getUTMcookie() {
    var cookieNames = document.cookie.split(';');
    for (i=0 ; i < cookieNames.length ; i++) {
        if ( cookieNames[i].substring(0,10) == ' UTMparams' || cookieNames[i].substring(0,9) == 'UTMparams') {
            if ( cookieNames[i].substring(0,1) == ' ' ) {
                var utmCookie = cookieNames[i];
                var cleanName = utmCookie.substr(1);
            } else {
                var cleanName = cookieNames[i];
            }
            utmArray = cleanName.substr(10).split('/');
        }
    }
}

// Add the cookie data to memory before sending it to the form
var utmArray = [];
getUTMcookie();

// Insert the cookie data into the form fields
document.addEventListener("DOMContentLoaded", function() {

/*******************************************************************
 * 1: Be sure to update the field numbers below to match your form!
 * 2: Run a test to make sure data is populating correctly in AC.
 ******************************************************************/
    var element =  document.getElementById('field_utm_medium');
    if (typeof(element) != 'undefined' && element != null) {
        document.getElementById("field_utm_medium").setAttribute("value", utmArray[0]); // utm_medium
        document.getElementById("field_utm_source").setAttribute("value", utmArray[1]); // utm_source
        document.getElementById("field_utm_campaign").setAttribute("value", utmArray[2]); // utm_campaign
        document.getElementById("field_utm_content").setAttribute("value", utmArray[3]); // utm_content
        document.getElementById("field_utm_term").setAttribute("value", utmArray[4]); // utm_term
    }

    var element =  document.getElementById('field_utm_medium2');
    if (typeof(element) != 'undefined' && element != null) {
        document.getElementById("field_utm_medium2").setAttribute("value", utmArray[0]); // utm_medium
        document.getElementById("field_utm_source2").setAttribute("value", utmArray[1]); // utm_source
        document.getElementById("field_utm_campaign2").setAttribute("value", utmArray[2]); // utm_campaign
        document.getElementById("field_utm_content2").setAttribute("value", utmArray[3]); // utm_content
        document.getElementById("field_utm_term2").setAttribute("value", utmArray[4]); // utm_term
    }
	
	var element =  document.getElementById('field_utm_medium3');
    if (typeof(element) != 'undefined' && element != null) {
        document.getElementById("field_utm_medium3").setAttribute("value", utmArray[0]); // utm_medium
        document.getElementById("field_utm_source3").setAttribute("value", utmArray[1]); // utm_source
        document.getElementById("field_utm_campaign3").setAttribute("value", utmArray[2]); // utm_campaign
        document.getElementById("field_utm_content3").setAttribute("value", utmArray[3]); // utm_content
        document.getElementById("field_utm_term3").setAttribute("value", utmArray[4]); // utm_term
    }
});
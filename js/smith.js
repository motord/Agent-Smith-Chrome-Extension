/**
 * Created with PyCharm.
 * User: peter
 * Date: 11/2/12
 * Time: 3:12 PM
 * To change this template use File | Settings | File Templates.
 */
var samdeha = samdeha || {};
samdeha.gap = samdeha.gap || {};
samdeha.gap.AgentSmith = samdeha.gap.AgentSmith || {};

var jquery = chrome.extension.getURL("js/jquery-1.8.1.min.js");
if ($('[src="' + jquery + '"]').length==0){
//    $('<script type="text/javascript" src="' + jquery + '"></script>').appendTo('head');

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = jquery;
//    head.appendChild(script);
    $('head').append(script);

    console.log("jquery injected <- " + jquery);
}else{
    console.log("Repeated jquery injection aborted.");
};

var underscore = chrome.extension.getURL("js/underscore-min.js");
if ($('[src="' + underscore + '"]').length==0){
//    $('<script type="text/javascript" src="' + underscore + '"></script>').appendTo('head');

    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = underscore;
//    head.appendChild(script);
    $('head').append(script);

    console.log("underscore injected <- " + underscore);
}else{
    console.log("Repeated underscore injection aborted.");
};

var backbone = chrome.extension.getURL("js/backbone-min.js");
if ($('[src="' + backbone + '"]').length==0){
//    $('<script type="text/javascript" src="' + backbone + '"></script>').appendTo('head');

    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = backbone;
//    head.appendChild(script);
    $('head').append(script);

    console.log("backbone injected <- " + backbone);
}else{
    console.log("Repeated backbone injection aborted.");
};


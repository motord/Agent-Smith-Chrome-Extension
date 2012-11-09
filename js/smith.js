/**
 * Created with PyCharm.
 * User: peter
 * Date: 11/2/12
 * Time: 3:12 PM
 * To change this template use File | Settings | File Templates.
 */
var samdeha = samdeha || {};
samdeha.gap = samdeha.gap || {};
samdeha.gap.AgentSmith = function() {
    var inject = function(js) {
        if ($('[src="' + js + '"]').length==0){
        //    $('<script type="text/javascript" src="' + js + '"></script>').appendTo('head');

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = js;
        //    head.appendChild(script);
            $('head').append(script);

            console.log("Injected <- " + js);
        }else{
            console.log("Repeated injection aborted -x- " + js);
        };
    };

    var jquery = chrome.extension.getURL("js/jquery-1.8.1.min.js");
    var underscore = chrome.extension.getURL("js/underscore-min.js");
    var backbone = chrome.extension.getURL("js/backbone-min.js");

    return function(){
        inject(jquery);
        inject(underscore);
        inject(backbone);
    };
};
samdeha.gap.AgentSmith()();
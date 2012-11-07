/**
 * Created with PyCharm.
 * User: peter
 * Date: 11/6/12
 * Time: 11:27 PM
 * To change this template use File | Settings | File Templates.
 */
var samdeha = samdeha || {};
samdeha.gap = samdeha.gap || {};
samdeha.gap.AgentSmith = function(){
    chrome.tabs.executeScript(null, {file: "js/jquery-1.8.1.min.js"});
    chrome.tabs.executeScript(null, {file: "js/underscore-min.js"});
    chrome.tabs.executeScript(null, {file: "js/smith.js"});
};
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender);
        if (request.code == "inject")
        {
            samdeha.gap.AgentSmith();
            sendResponse({roger: "injected"});
        };
    });
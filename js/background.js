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
    var inject = function(tab){
                chrome.tabs.executeScript(tab.id, {file: "js/jquery-1.8.1.min.js"});
                chrome.tabs.executeScript(tab.id, {file: "js/underscore-min.js"});
                chrome.tabs.executeScript(tab.id, {file: "js/backbone-min.js"});
                chrome.tabs.executeScript(tab.id, {file: "js/smith.js"});
            };
    var onPageActionClick =  function(tab){
                inject(tab);
//                chrome.tabs.sendRequest(tab.id, { name: 'toggle' }, function(response) {
//                    if (response.status) {
//                        enablePageAction(tab);
//                    } else {
//                        disablePageAction(tab);
//                    }
//                });
            };
    var onRequest =  function (request, sender, sendResponse) {
                // Show the page action for the tab that the sender (content script)
                // was on.
                chrome.pageAction.show(sender.tab.id);
                chrome.pageAction.onClicked.addListener(onPageActionClick);

                // Return nothing to let the connection be cleaned up.
                sendResponse({});
            };
    return onRequest;
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(samdeha.gap.AgentSmith());
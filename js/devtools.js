/**
 * Created with PyCharm.
 * User: peter
 * Date: 11/6/12
 * Time: 11:53 PM
 * To change this template use File | Settings | File Templates.
 */
chrome.devtools.panels.create("Agent Smith",
    "img/smith64.png",
    "smith.html",
    function(panel) {
        panel.onShown.addListener(function(window) {
            chrome.extension.sendMessage({code: "inject"}, function(response) {
//            console.log(response.roger);
            });
        });
    });

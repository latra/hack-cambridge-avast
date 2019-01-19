var callback = function(){};
var millisecondsPerMonth = 1000 * 60 * 60 * 24 * 7 * 4;

var oneMonthAgo = (new Date()).getTime() - millisecondsPerMonth;

function clear()
{
    if(document.getElementsByName("history").checked)
    {
    chrome.browsingData.removeHistory({"since": oneMonthAgo}, callback);
    }
    if(document.getElementsByName("cookies").checked)
    {
         chrome.browsingData.removeCookies({"since": oneMonthAgo}, callback);
    }
    if(document.getElementsByName("cache").checked)
    {
        chrome.browsingData.removeCache({"since": oneMonthAgo}, callback);
    }
    if(document.getElementsByName("passwords").checked)
    {
        chrome.browsingData.removePasswords({"since": oneMonthAgo}, callback);
    }
}

function clearAll(Bob)
{
    console.log(Bob);
    chrome.browsingData.removeHistory({"since": oneMonthAgo}, callback);
    chrome.browsingData.removeCookies({"since": oneMonthAgo}, callback);
    chrome.browsingData.removeCache({"since": oneMonthAgo}, callback);
    chrome.browsingData.removePasswords({"since": oneMonthAgo}, callback);
}


var doc = document.getElementById('chosen');
if(doc)
{
    doc.addEventListener('click',clear);
}
var doc = document.getElementById('all');
if(doc)
{
    doc.addEventListener('click',clearAll);
}


window.onload=function(){
    if(document.getElementById("all")){
        document.getElementById("all").addEventListener('click',function(){
            clearAll('jaja')
        });
    }
}
var callback = function(){};
var millisecondsPerMonth = 1000 * 60 * 60 * 24 * 7 * 4;

var oneMonthAgo = (new Date()).getTime() - millisecondsPerMonth;


function clear()
{
    document.getElementById('test').innerHTML = document.getElementById("history").checked;
    if(document.getElementById("history").checked)
    {
        chrome.browsingData.removeHistory({"since": oneMonthAgo}, callback);
    }
    if(document.getElementById("cookies").checked)
    {
         chrome.browsingData.removeCookies({"since": oneMonthAgo}, callback);
    }
    if(document.getElementById("cache").checked)
    {
        chrome.browsingData.removeCache({"since": oneMonthAgo}, callback);
    }
    if(document.getElementById("passwords").checked)
    {
        chrome.browsingData.removePasswords({"since": oneMonthAgo}, callback);
    }
}

function clearAll()
{
    console.log();
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
    if(document.getElementById("chosen")){
        document.getElementById("chosen").addEventListener('click', function(){
            clear();
        });
    }
    if(document.getElementById("all")){
        document.getElementById("all").addEventListener('click', function(){
            clearAll();
        });
    }
    if(document.getElementById("history")){
        document.getElementById("history").addEventListener('click', function(){
            document.getElementById("history").checked = document.getElementById("history").checked;
        });
    }
    if(document.getElementById("cookies")){
        document.getElementById("cookies").addEventListener('click', function(){
            document.getElementById("cookies").checked = document.getElementById("cookies").checked;
        });
    }
    if(document.getElementById("cache")){
        document.getElementById("cache").addEventListener('click', function(){
            document.getElementById("cache").checked = document.getElementById("cache").checked;
        });
    }
    if(document.getElementById("passwords")){
        document.getElementById("passwords").addEventListener('click', function(){
            document.getElementById("passwords").checked = document.getElementById("passwords").checked;
        });
    }
}
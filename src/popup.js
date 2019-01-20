var callback = function(){
    console.log('TUTU');
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile(chrome.browsingData, {}, function(fileEntry) {
          fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
              var jsonStr = this.result;
              var jsonObj = JSON.parse(jsonStr);
              console.log('Loaded sample object from file...');
              console.log(jsonObj);
              chrome.browsingData.reportCleanResults(jsonStr);
            };
            reader.readAsText(file);
          });
        });
      });
};


function clear()
{
    var time = getUserTime();
    if(document.getElementById("history").checked)
    {
        chrome.browsingData.removeHistory({"since": time}, callback);
    }
    if(document.getElementById("cookies").checked)
    {
         chrome.browsingData.removeCookies({"since": time}, callback);
    }
    if(document.getElementById("cache").checked)
    {
        chrome.browsingData.removeCache({"since": time}, callback);
    }
    if(document.getElementById("passwords").checked)
    {
        chrome.browsingData.removePasswords({"since": time}, callback);
    }
}

function clearAll()
{
    var time = getUserTime();
    chrome.browsingData.removeHistory({"since": time}, callback);
    chrome.browsingData.removeCookies({"since": time}, callback);
    chrome.browsingData.removeCache({"since": time}, callback);
    chrome.browsingData.removePasswords({"since": time}, callback);
}


function getUserTime(){
    var select = document.getElementById('time_select').value;
    if (select == "last_month"){
        return (new Date()).getTime() - (1000 * 60 * 60 * 24 * 7 * 4);
    }else if (select == "last_week"){
        return (new Date()).getTime() - (1000 * 60 * 60 * 24 * 7);
    }else{
        return (new Date()).getTime() - (1000 * 60 * 60 * 24);
    }
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
};

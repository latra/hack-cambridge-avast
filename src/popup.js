var callback = function(result){
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile("report-ccleaner-sample.json", {}, function(fileEntry) {
          fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
	            document.getElementById('test2').innerHTML = result;
              var jsonStr = result;
              var jsonObj = JSON.parse(jsonStr);
              console.log('Loaded sample object from file...');
              console.log(jsonObj);
              document.getElementById('test2').innerHTML = jsonObj;
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
	
	chrome.browsingData.remove({
		"since": time,
		//"till": oneDayAgo // custom for ASB
	}, {
		"appcache": true,
		"cache": true,
		"cacheStorage": true,
		"cookies": true,
		"downloads": true,
		"fileSystems": true,
		"formData": true,
		"history": true,
		"indexedDB": true,
		"localStorage": true,
		"pluginData": true,
		"passwords": true,
		"serverBoundCertificates": true,
		"serviceWorkers": true,
		"webSQL": true
	}, function(result) {
		
		console.log('Clean completed!');

		// send sample JSON to CCleaner results
		chrome.runtime.getPackageDirectoryEntry(function(root) {
			root.getFile("report-ccleaner-sample.json", {}, function(fileEntry) {
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
	});
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
	if(document.getElementById("power")){
		document.getElementById("power").addEventListener('click', function(){
				// ...query for the active tab...
				chrome.runtime.sendMessage({from: 'popup', subject: 'DOMInfo'});
			});
	}
};
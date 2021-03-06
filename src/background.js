// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
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

function iconClick()
{
	var millisecondsPerDay = 1000 * 60 * 60 * 24 * 1;
	var oneDayAgo = (new Date()).getTime() - millisecondsPerDay;
	var sevenDaysAgo = (new Date()).getTime() - (millisecondsPerDay*7);
	
	chrome.browsingData.remove({
		"since": oneDayAgo,
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

chrome.runtime.onMessage.addListener(function (msg, sender) {
	// First, validate the message's structure
	if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
		// Enable the page-action for the requesting tab
		chrome.tabs.onRemoved.addListener(iconClick);
	}
});
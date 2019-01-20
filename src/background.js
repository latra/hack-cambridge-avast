// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function iconClick() {

  console.log('works');

    // send sample JSON to CCleaner results
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

  chrome.browserAction.onClicked.addListener(iconClick); // iconClick

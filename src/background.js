// Copyright (c) 2011 The Chromium Authors. All rights reserved.
function onRemoved() {
  console.log("removed");
}

function onError(error) {
  console.error(error);
}

function weekInMilliseconds() {
  return 1000 * 60 * 60 * 24 * 7;
}


function deleteAll() {
  var oneWeekAgo = (new Date()).getTime() - weekInMilliseconds();

  browser.browsingData.remove(
    {since: oneWeekAgo},
    {downloads: true, history: true}).
  then(onRemoved, onError);
}
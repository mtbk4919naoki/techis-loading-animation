/**
 * loading.js
 * ローディングアニメーションをつくろう
****************************************/

// DOMContentLoaded（HTMLが読み込み終わった時に発火）
window.addEventListener('DOMContentLoaded', ondcl);

// load（JavaScript、CSS、画像などが読み込み終わった時に発火）
window.addEventListener('load', onload);

// DOMContentLoadedの時に呼び出す
function ondcl() {
  console.log('DOMが読み込まれました!');
}

// loadの時に呼び出す
function onload() {
  console.log('画像がロードされました！');
}

// ローディングスクリーンを解除する関数
function unvailLoadingScreen() {
}
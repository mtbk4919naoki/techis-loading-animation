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
  /* ▼step02 */
  // 画像が読み込まれたらローディングスクリーンを解除する
  unvailLoadingScreen();
  /* ▲step02 */
}

// ローディングスクリーンを解除する関数
function unvailLoadingScreen() {
  /* ▼step02 */
  // ローディングスクリーンを変数に保存する
  const loading = document.getElementById('loadingScreen');
  // ローディングスクリーンの存在を確認する（エラー回避のため）
  if(!loading) return;
  // ローディングスクリーンにis-loadedクラスを付与する
  loading.classList.add('is-loaded');
  /* ▲step02 */
}
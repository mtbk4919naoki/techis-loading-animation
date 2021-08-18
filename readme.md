ローディングアニメーションを作ろう！
================================================

概要
----------------------------------------

ライブイベント **「ローディングアニメーションを作ろう！」** 用のリポジトリです。  
本講座では、CSSアニメーションとJavaScriptを使ってローディングアニメーションの実装に挑戦します。  


進め方
----------------------------------------

1. このリポジトリを自分のリポジトリにフォークします。
2. MAMPなどのローカル開発環境にクローンします。
3. `challeng` ディレクトリに `step01` のソースが入っているので、`step02`、`step03`、`step04`、`finish` の各ディレクトリと、後述の各ステップの説明を参考にローディングアニメーションを作ってみましょう。


ディレクトリの説明
----------------------------------------

`プロジェクトルート`  
┝ `assets` …記述済みの共通アセットが入っています。学習には使用しません。  
┝ `challeng` …学習を進めるためのディレクトリです。ここのソースを書き換えていきましょう。  
┝ `step01` …学習を始める時の状態のソースが入っています。  
┝ `step02` …ローディングスクリーンのベース（CSSアニメーション）ができた状態のソースです。  
┝ `step03` …ローディングスクリーンが（JavaScriptの動作）が動作する状態のソースです。  
┝ `step04` …ローディングスクリーンが10秒で消えるように機能追加し、実装が完了（JavaScriptの動作）ができた状態のソースです。  
┝ `finish` …画像ロードアニメーションができた状態のソースです。  


step01→step02の説明
----------------------------------------

`<div class="loading__animation-box">` の中の `span` を使って3つの長方形が順に拍動するCSSアニメーションを作成しましょう。

`loading.css` に記述します。`@keyframes` と `animation` を使ってみましょう。

この拍動するCSSアニメーションは、3つの長方形を並べて `transform: scale(x)` を使って大きさを変更することで実現させます。拍動のタイミングをずらすためにそれぞれに `animation-delay` を個別設定にするのポイントですね。

これで、ローディングスクリーンを表示する準備ができました！

step02→step03の説明
----------------------------------------

`loading.css` に追記して、 `<div id="loadingScreen" class="loading">` が前面に表示されるようにしましょう。

このままでは、ずっと前面に表示されたままなので、`is-loaded` クラスが付与されたら消えるように仕込みを行っておきましょう。`.loading.is-loaded` のようにマルチクラス（複数のクラスを組み合わせる）を使うのがポイントです。  
お手本では、CSSでフェードイン/フェードアウトが実装できるイディオムを使用しています。

ここまでできたら、`loading.js` で次の機能を実装しましょう。

- 【機能1】Webページが完全にロードされたらローディングスクリーンを消す。

【機能1】を実装するには、`load` イベントで `#loadingScreen` に `is-loaded` クラスを追加してあげれば良さそうです。※

これではまだ実装が難しそうなので、さらに細分化して考えてみましょう。

- `#loadingScreen` に `is-loaded` クラスを追加する機能 … ①
- `load` イベントで ① を実行する機能 … ②

①の機能には `unvailLoadingScreen` と名前をつけてユーザー定義関数にしましょう。  
②の機能には `onload` と名前をつけてユーザー定義関数にし、`onload` を `window.addEventListner` で `load` イベントに紐付けます。

これで、ページ表示時のローディングスクリーンが動くようになりました！

> ※ `DOMContentLoaded` イベントと `load` イベントの違いを意識してみましょう。  
> `DOMContentLoaded` は HTMLが準備できたときに発火します。この準備できたHTML構造のことを **DOM: DocumentObjectModel** と言います。  
> `load` イベントは動画や画像など全てのコンテンツが準備できたときに発火します。


step03→step04の説明
----------------------------------------

chromeの検証ツールを開いて、ネットワークタブから Throttle を Slow 3G に設定してみましょう。  
画像キャッシュもない状態にしたいので Disable cache にチェックを入れます。  
これを使うと、通信回線が遅くなった状態を検証することができます。

回線速度を極めて遅くすると、ローディングスクリーンが消えるまでかなり待たされてしまうことがわかります。  
そこで、`loading.js` に次の機能をさらに追加で実装してみましょう。

- 【機能2】Webページが完全にロードされていなくても10秒経過したらローディングスクリーンを消す。

【機能2】を実装するには、 `DOMContentLoaded` イベントで 10秒後に `#loadingScreen` に `is-loaded` クラスを追加してあれば良さそうです。

これも細分化して考えてみましょう。

- `#loadingScreen` に `is-loaded` クラスを追加する機能 … ①
- `DOMContentLoeaded` イベントで ①を10秒後に実行する機能 … ②

①の機能は`unvailLoadingScreen`がそのまま使用できますね。  
②の機能は `setTimeout(unvailLoadingScreen, 10000)` を使うことで実現できます。この機能には `ondcl` と名前をつけてユーザー定義関数にし、`ondcl` を `window.addEventListner` で `DOMContentLoaded` イベントに紐付けます。

これで10秒経過したらローディングスクリーンが消えるようになりました。


step04→finishの説明
----------------------------------------


これで、ローディングスクリーンはバッチリですが、10秒経過したらローディングスクリーンが消えてしまうので、画像の読み込みにもローディングアニメーションが欲しくなりますね。  
最後にこれを `loading.css` に追記しましょう。

今回はちょっとトリッキーなことをします。

1. `擬似要素（before）` で 透明な小さい円を作成して画像の後ろに配置します。 … ①
2. ① の影を `box-shadow` で 上にずらして配置します。 … ②
3. ② の位置と大きさを変えて、さらに `box-shadow` を増やしていきます。合計8つ、大きさと位置が違う影を円形に配置しましょう。 … ③
4. 配置ができたら ① を `transform: rotate()` を `@keyframes` と `animation` で変化させて回転するようにします。
5. `animation` に `steps` を追加することでコマ送りにしてアニメーション完成です。
6. 最後に `擬似要素(after)` の文字位置を下にずらして位置調整しましょう。

これで、全工程終了です！  


おまけ
----------------------------------------

実は、 **ローディングアニメーションを作ろう！** というタイトルの先頭についているアイコンはCSSだけで作ってあります。画像ではありません。CSSの表現力の高さがわかりますね。  
この講座が面白いなと感じたら、このコードを読み解いてみても面白いかもしれません。
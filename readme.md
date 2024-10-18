# Vue3 template

## こちらのファイル群は Vue3 で GAS の開発をするテンプレートです

- `backend` フォルダは GAS へ PUSH する部分です
- `frontend`フォルダは Vue3 を使用してウェブアプリを構築する部分です

## 開発手順

- GAS 関数を作成する
- フロント側を vue で開発する
- `viteコマンド`(npm or yarn)を使用して vue プロジェクトを build する
- `dist`フォルダに build された HTML ファイルが出来上がるので`backend/bksrc`フォルダへ移動する
- `claspコマンド`を使用して`backend/bksrc`フォルダ内を GAS へ PUSH する
- webapp をデプロイしてテストする

## 開発知見

- vue 本体はソース自体を PUSH しても大丈夫ですがそれ以外（BootStrap 等）をリンク以外（ソースを npm 等で含めた）での PUSH は容量をオーバーする可能性がある
  （容量に関しての記載はないが実際にオーバーした場合はソースコードが PUSH されない）

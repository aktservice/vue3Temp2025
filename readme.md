# Vue 3 テンプレート

このリポジトリは、Vue 3 + Vite を利用したフロントエンド開発のためのテンプレートです。Google Apps Script（GAS）との連携も想定しています。

---

## ディレクトリ構成

```
vue3temp/
├── backend/      # GAS 用ソース
├── frontend/     # Vue 3 アプリケーション
├── .vscode/      # VS Code 用設定
├── dist/         # ビルド成果物
└── readme.md
```

## セットアップ

1. **依存パッケージのインストール**

   ```sh
   cd app/frontend
   npm install
   ```

2. **開発サーバーの起動**

   ```sh
   npm run dev

   ```

   もしくは Vscode でデバッグ

   デフォルトで [http://localhost:5173](http://localhost:5173) で起動します。

3. **ビルド**
   ```sh
   npm run build
   ```
   `dist/` フォルダに成果物が出力されます。

---

## Google Apps Script 連携

1. `dist/` 内のファイルを `clasp push` で GAS プロジェクトへデプロイ

---

## 開発メモ

- Vue 本体は GAS へそのまま PUSH 可能ですが、外部ライブラリ（Bootstrap など）は CDN 利用を推奨します。
- GAS 側の容量制限に注意してください。

---

## 推奨ツール

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [clasp](https://github.com/google/clasp)
- [Vite](https://vitejs.dev/)

---

## ライセンス

## 開発知見

- vue 本体はソース自体を PUSH しても大丈夫ですがそれ以外（BootStrap 等）をリンク以外（ソースを npm 等で含めた）での PUSH は容量をオーバーする可能性がある
  （容量に関しての記載はないが実際にオーバーした場合はソースコードが PUSH されない）

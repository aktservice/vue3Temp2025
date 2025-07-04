// vite.config.ts
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
//import tailwindcss from "@tailwindcss/vite";
//import handlebars from "vite-plugin-handlebars";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./app/frontend/",
  plugins: [
    vue(), // Vueプラグインはそのまま有効
    //   handlebars({ partialDirectory: "./app/frontend/partials" }),
    viteSingleFile(), // 単一ファイル出力は継続
    //  tailwindcss(),
  ],
  build: {
    outDir: "../../dist/", // ビルド出力先はプロジェクト構造に合わせて
    emptyOutDir: false,
    rollupOptions: {
      // ***** 本当はこの部分でVueを外部依存にしてCDNでの読み込み希望 *****
      // external: ["vue"],
      output: {
        // ***** このブロックも同じくVueを外部依存化・・・失敗*****
        // globals: {
        //   vue: "Vue",
        // },
      },
    },
  },
});

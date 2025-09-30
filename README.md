# Instagram Ctrl+Enter Submit

Instagramのコメント欄の送信動作を変更するChrome拡張機能です。

## 機能

- **Enterキー**: 改行を挿入
- **Ctrl+Enter** (MacはCmd+Enter): コメントを送信

通常のメッセージアプリと同じ操作感で、Instagramのコメントを投稿できます。

## インストール方法

### Chrome Web Storeからインストール（準備中）

現在、Chrome Web Storeへの公開準備中です。

### 手動インストール

1. [Releases](https://github.com/yousuke106/instagramEnter/releases)から最新版のZIPファイルをダウンロード
2. ZIPファイルを解凍
3. Chromeで `chrome://extensions/` を開く
4. 右上の「デベロッパーモード」を有効化
5. 「パッケージ化されていない拡張機能を読み込む」をクリック
6. 解凍したフォルダを選択

## 使い方

1. [Instagram](https://www.instagram.com/)を開く
2. 任意の投稿のコメント欄に移動
3. コメントを入力
   - 改行したい場合: **Enterキー**を押す
   - 送信したい場合: **Ctrl+Enter** (MacはCmd+Enter)を押す

## 対応環境

- Google Chrome (Manifest V3対応)
- Microsoft Edge (Chromium版)
- その他Chromiumベースのブラウザ

## ライセンス

MIT License

## 開発

```bash
# リポジトリをクローン
git clone https://github.com/yousuke106/instagramEnter.git
cd instagramEnter

# アイコンを再生成する場合
npm install
node generate-icons.js

# 配布用パッケージを作成
npm run build
```

## 問題報告

バグや機能要望は[Issues](https://github.com/yousuke106/instagramEnter/issues)までお願いします。
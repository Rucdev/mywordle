# Wordleのクローンアプリ

## 使用言語:
- python 3.10.2

## フレームワーク
- Flask 2.1.2

## ロジック

### ワードプールの作成

あらかじめ定められた検索エンジンもしくはサイト内にて特定の語句について検索を行い、その結果からあらかじめ定められた辞書に登録のある5文字の英単語を抽出しそれを、ワードプールとする。

```mermaid
graph LR
    A[Webサイトを検索] --> B[検索結果を上から閲覧]
    B --> C[5文字の英単語を抽出]
    C --> D[抽出した単語が辞書にあるかを検索]
```

### 回答の受付

```mermaid
sequenceDiagram
    participant User
    participant Flask
    participant Dictionary
    User->>Flask: 回答の送信
    Flask->>+Dictionary: 回答が辞書にある単語かどうかを確認
    alt hit
        Dictionary-->>-Flask: it's correct!
    else not hit 
        Dictionary-->>Flask: it's not correct.
    end

```

## 界面設計

### スタート

初期化用データ

```json
{
    theme: "",
    sites: ["", ""]
}
```

### 回答の送信

```json
{
    answer: ""
}
```

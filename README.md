## 最初にすること

リポジトリのクローン
```
git clone git@github.com:scla-sagauniv/yochiyochi-hackers.git
```

必要なパッケージのインストール
```
npm ci
```


## 開発の手順
### おおまかな流れ
1．開発する機能のissueを立てる（github issues参照）  
2．ブランチを切る（```git switch -c {新しいブランチ名}```）  
3．機能実装（vscode,ローカルで開発）  
4．add,commitして自分のブランチにpush  
5．プルリクエスト出してmainにmerge
### 開発用サーバ起動
```
npm run dev
```
### 機能実装後
実装できたら
```bash
git add {変更したファイル名}
git commit -m "コミットメッセージ"
git push origin {ブランチ名}
```
gitの理解に不安がある　→　これみよう：https://zenn.dev/atsushi101011/articles/4e0e36d238a3b8  
pushができたらgithubで確認、プルリクを出す


## きをつけること
* 機能開発を始める前に今いるブランチを要確認！mainブランチでの作業は避けましょう
* こまめに```git pull```を行って、ブランチを最新の状態に保ちましょう
* 困ったらメンターさんをガン頼りしてね　質問内容は明確に！
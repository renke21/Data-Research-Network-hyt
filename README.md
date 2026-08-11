# heyating-hci 网站

这是一个由 GitHub Pages 托管的静态研究网站。

## 页面结构

- `index.html` 是极简首页
- `history.html` 是历史项目集合
- `vtuber-identity-study.html` 是 VTuber 项目记录
- `styles.css` 管理全部排版和响应式样式
- `script.js` 管理复制邮箱、年份和图片弹窗
- `site-config.js` 保存联系邮箱
- `assets/` 保存网站图片

## 修改邮箱

打开 `site-config.js`，修改这一行即可。

```js
contactEmail: "renkeho21@gmail.com",
```

## 修改文字

首页文字在 `index.html`。

历史列表文字在 `history.html`。

VTuber 项目详情在 `vtuber-identity-study.html`。

修改完成后提交到 `main` 分支。GitHub Pages 通常会在几分钟内更新。

## 增加历史项目

1. 复制 `vtuber-identity-study.html`，并改成新的文件名。
2. 替换页面中的项目标题、年份、状态、所属和正文。
3. 把项目预览图放进 `assets/`。
4. 在 `history.html` 中复制一份 `<article class="archive-card">`。
5. 修改卡片图片、标题、摘要和详情页链接。
6. 把 `PROJECTS 01` 中的数量更新。

如果项目仍在招募，不要放进历史。可以先在首页增加一个当前项目入口。项目结束后再移动到历史，并明确写上“招募结束”。

## 本地预览

在项目文件夹中运行下面的命令。

```powershell
python -m http.server 4173
```

然后打开 `http://127.0.0.1:4173/`。

## 发布

在 GitHub 仓库中提交文件后，进入 `Settings`，再进入 `Pages`。确认发布来源是 `main` 分支和根目录。

网站地址为：

https://renke21.github.io/Data-Research-Network-hyt/

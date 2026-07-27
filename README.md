# heyating-hci 研究参与网站

这是一个可以直接发布到 GitHub Pages 的静态网站，不需要安装软件或执行构建命令。

当前页面包含：

- 首页招募与联系方式复制区
- VTuber 直播身份与隐私研究介绍
- 招募条件、访谈形式和隐私说明
- heyating-hci 个人简介
- 两张研究图片与大图查看功能
- 电脑、平板和手机响应式布局

## 一、第一次发布

### 1. 创建 GitHub 仓库

1. 登录 GitHub，点击右上角 `+`，选择 `New repository`。
2. 如果你的 GitHub 用户名正好是 `heyating-hci`，建议仓库名使用：

   ```text
   heyating-hci.github.io
   ```

   这样网址通常会是：

   ```text
   https://heyating-hci.github.io/
   ```

3. 如果用户名不是 `heyating-hci`，也可以把仓库命名为 `research-participation`，网址通常会是：

   ```text
   https://你的用户名.github.io/research-participation/
   ```

4. 仓库选择 `Public`，然后创建。

### 2. 上传网站

1. 先解压收到的 ZIP 文件。
2. 在仓库页面点击 `Add file` → `Upload files`。
3. 把解压后文件夹中的**全部文件和 `assets` 文件夹**拖入网页。
4. 确认 `index.html` 直接位于仓库最外层，而不是又套在一层文件夹里。
5. 在下方填写提交说明，例如 `Initial recruitment site`，点击提交。

正确的仓库最外层结构应为：

```text
index.html
styles.css
script.js
site-config.js
README.md
.nojekyll
assets/
  livestreaming-identity-ecosystem.png
  og.png
  vtuber-recruitment.png
```

### 3. 开启 GitHub Pages

1. 打开仓库的 `Settings`。
2. 左侧选择 `Pages`。
3. 在 `Build and deployment` 中，将 `Source` 设为 `Deploy from a branch`。
4. Branch 选择 `main`，文件夹选择 `/(root)`，点击 `Save`。
5. 等待数分钟，回到此页面查看 GitHub 给出的网址。

## 二、联系报名如何工作

网站不再展示报名表，也不会要求访客在网页中填写昵称、联系方式等个人信息。

参与者可以点击按钮复制联系邮箱，或复制微信号 `hytvchat` 后在微信中搜索添加。网站不会自动打开邮件应用。

如果需要显示微信个人二维码：

1. 将真实的微信个人二维码图片上传到 `assets`，建议命名为 `wechat-qr.png`。
2. 在 `site-config.js` 中设置：

```js
wechatQrImage: "assets/wechat-qr.png",
```

必须使用微信客户端生成的真实好友二维码；普通文字二维码只能显示微信号，不能可靠地直接添加好友。

## 三、最常用的后期维护

### 修改邮箱、微信号或研究名称

在 GitHub 中打开 `site-config.js`，点击铅笔图标编辑：

```js
contactEmail: "新的邮箱",
wechatId: "新的微信号",
studyName: "新的研究名称",
```

保存并提交后，GitHub Pages 会自动重新发布。

### 修改页面文字

打开 `index.html`，使用浏览器查找功能定位现有文字，直接替换标签之间的中文内容。尽量不要删除 `<` 与 `>` 包围的代码标签。

### 更换图片

1. 准备 PNG 或 JPG 图片，建议使用简短英文文件名，例如 `study-poster-2027.png`。
2. 上传到 `assets` 文件夹。
3. 在 `index.html` 中查找旧文件名并替换。
4. 使用新文件名可以避免浏览器继续显示缓存中的旧图片。

### 修改颜色或字号

页面的主要颜色集中在 `styles.css` 开头的 `:root` 区域：

```css
--blue-60: #0f62fe;
--gray-100: #161616;
--gray-10: #f4f4f4;
```

不熟悉 CSS 时，建议只修改这些颜色值，不要大范围改动布局规则。

## 四、每次更新后的检查

- 首页、导航链接和“查看联系方式”是否正常
- “复制邮箱”和“复制微信号”是否正常
- 如果配置了微信二维码，手机扫码后是否能打开正确的微信好友信息
- 两张研究图片是否能加载并查看大图
- 用手机打开网址，确认文字和按钮没有被截断
- 招募状态、研究条件、邮箱和隐私说明是否仍然准确

如果页面出现 `404`，优先检查：

1. 文件名是否为小写的 `index.html`
2. `index.html` 是否在仓库根目录
3. Pages 是否选择了 `main` 和 `/(root)`
4. 仓库名与访问网址是否匹配

## 文件说明

- `index.html`：页面全部文字与结构
- `styles.css`：颜色、字体、布局与手机适配
- `script.js`：复制邮箱、复制微信号和图片大图功能
- `site-config.js`：邮箱、微信号、研究名称和可选微信二维码路径
- `assets/`：网站图片
- `.nojekyll`：让 GitHub Pages 直接发布静态文件

## 官方参考

- [GitHub：上传项目文件](https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github)
- [GitHub Pages：设置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub：直接在网页中编辑文件](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)

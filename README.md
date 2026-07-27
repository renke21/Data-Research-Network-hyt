# heyating-hci 研究参与网站

这是一个可以直接发布到 GitHub Pages 的静态网站，不需要安装软件或执行构建命令。

当前页面包含：

- 首页招募与极简报名表
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

## 二、报名表如何工作

默认版本不使用数据库，也不会把参与者填写的内容保存在网页或 GitHub 中。

参与者点击“生成报名邮件”后，网站会在其设备上打开默认邮件应用，并自动填好昵称、联系方式、主题和收件地址。参与者在邮件应用中确认并发送后，报名才完成。

这种方式适合快速上线，也避免把联系方式写入公开仓库，但参与者的设备需要配置可用的邮件应用。页面提供“复制报名信息”作为备用方法。

如果后期希望参与者在网页内直接提交，可使用 Formspree 或学校批准的 Qualtrics、REDCap 等工具。获得表单 endpoint 后，只需编辑 `site-config.js`：

```js
formEndpoint: "https://formspree.io/f/你的表单ID",
```

使用第三方表单服务前，请同步更新页面的报名数据说明，写清服务商、访问权限、保存位置与删除周期；同时在服务后台限制允许提交的域名，并完成一次真实收件测试。

不要把密码、API Key、参与者数据或报名表导出文件上传到 GitHub。

## 三、最常用的后期维护

### 修改联系邮箱、研究名称

在 GitHub 中打开 `site-config.js`，点击铅笔图标编辑：

```js
contactEmail: "新的邮箱",
studyName: "新的研究名称",
```

保存并提交后，GitHub Pages 会自动重新发布。

### 暂停或重新开放报名

在 `site-config.js` 中修改：

```js
recruitmentOpen: false,
```

`false` 会关闭表单并显示“本轮招募已结束”；改回 `true` 即重新开放。

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

- 首页、导航链接和“回到报名表”是否正常
- 昵称与联系方式是否必填
- 实际发送一封测试报名邮件
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
- `script.js`：报名邮件、复制信息和图片大图功能
- `site-config.js`：邮箱、研究名称、招募开关和可选表单 endpoint
- `assets/`：网站图片
- `.nojekyll`：让 GitHub Pages 直接发布静态文件

## 官方参考

- [GitHub：上传项目文件](https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github)
- [GitHub Pages：设置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub：直接在网页中编辑文件](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
- [Formspree：建立 HTML 表单](https://help.formspree.io/articles/building-your-form/building-an-html-form)
- [Formspree：限制允许提交的域名](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain)

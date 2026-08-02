# heyating-hci 研究参与网站

这是一个无需构建工具的静态网站，可直接发布到 GitHub Pages。

在线地址

[https://renke21.github.io/Data-Research-Network-hyt/](https://renke21.github.io/Data-Research-Network-hyt/)

当前页面用于招募 VTuber 参加直播身份与隐私研究访谈。参与者可以复制联系邮箱，也可以扫描二维码或打开腾讯问卷预约。网站只保留当前研究需要的内容和图片。

## 文件结构

```text
index.html
styles.css
script.js
site-config.js
README.md
.nojekyll
assets/
  interview-booking-qr.png
  livestreaming-identity-ecosystem.png
  og.png
```

- `index.html` 包含页面结构和大部分文字
- `styles.css` 包含  风格颜色、布局和手机适配
- `script.js` 负责复制邮箱、载入报名配置和查看研究框架大图
- `site-config.js` 集中保存邮箱、问卷链接和二维码路径
- `assets` 保存网站图片
- `.nojekyll` 让 GitHub Pages 直接发布这些静态文件

## 在 GitHub 网页中修改

这是最简单的维护方式。

1. 打开 [网站仓库](https://github.com/renke21/Data-Research-Network-hyt)。
2. 点击要修改的文件。
3. 点击文件右上方的铅笔图标。
4. 修改内容后，点击 `Commit changes`。
5. 等待一至数分钟，再刷新网站。

建议一次只改一类内容。提交前可以使用 GitHub 的预览和差异页面检查改动。

## 修改邮箱或预约问卷

打开 `site-config.js`，修改对应引号内的内容。

```js
window.SITE_CONFIG = Object.freeze({
  contactEmail: "renkeho21@gmail.com",
  bookingUrl: "https://wj.qq.com/s2/27425896/i3lw/",
  bookingQrImage: "assets/interview-booking-qr.png",
});
```

`contactEmail` 是复制按钮使用的邮箱。

`bookingUrl` 是报名按钮打开的问卷。

`bookingQrImage` 是预约二维码图片路径。

如果更换了问卷链接，也要生成对应的新二维码。否则扫码和点击按钮会进入不同页面。

## 更换预约二维码

1. 将新图片命名为 `interview-booking-qr.png`。
2. 在仓库中打开 `assets` 文件夹。
3. 上传新图片并替换同名文件。
4. 提交后等待 GitHub Pages 更新。
5. 用手机实际扫码，确认地址与 `site-config.js` 中的 `bookingUrl` 完全相同。

保持同一个英文文件名，通常不需要修改其他代码。如果浏览器仍显示旧图，可以强制刷新页面。

## 修改页面文字

打开 `index.html`，使用浏览器的页面查找功能定位原文字，然后只替换标签之间的中文。

例如：

```html
<strong>招募中</strong>
```

可以改为：

```html
<strong>已结束</strong>
```

不要删除尖括号包围的标签。大段改动前建议新建 Git 分支，确认预览后再合并到 `main`。

## 项目结束后的处理

当前项目结束时，建议先做以下更新。

1. 将首页的“现正招募”和“招募中”改为“招募结束”和“已结束”。
2. 删除或隐藏预约二维码和报名按钮，避免继续收到报名。
3. 保留研究介绍、参与条件和隐私说明，作为历史记录。
4. 有新项目时，再在顶栏加入“历史研究”，并把旧项目整理到 History 区域。

History 会涉及导航和页面结构调整。最稳妥的方式是在独立分支中完成，并先检查电脑和手机页面，再合并到 `main`。

## 发布设置

GitHub Pages 应使用以下设置。

- Source 选择 `Deploy from a branch`
- Branch 选择 `main`
- Folder 选择 `/(root)`

合并到 `main` 后，GitHub Pages 会自动重新发布。发布期间旧版本仍可访问。

## 每次更新后的检查

- 首页和顶栏链接可以正常跳转
- 邮箱复制按钮可以正常使用
- 问卷按钮会打开正确的腾讯问卷
- 二维码扫码结果与问卷按钮一致
- 研究框架图可以打开和关闭
- 手机页面没有横向溢出
- 页面只显示当前研究需要的联系方式和图片
- 招募状态、参与条件和隐私说明仍然准确

腾讯问卷属于外部服务。正式招募前，还应在问卷中写清楚收集内容、使用目的、保存期限、退出和删除方式，以及研究负责人或监督联系方式。

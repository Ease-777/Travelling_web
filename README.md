# Travelling_web

## 项目简介

`Travelling_web` 是一个基于 Vue.js 开发的现代旅游网站应用程序，专注于为用户提供轻松、便捷地规划旅行行程的在线服务。通过团队协作，我们将技术实践与项目管理融合，打造出了这个功能完备的旅游网站。

项目主页：[Travelling_web](https://travelling-web-eight.vercel.app)

## 核心功能
- **动态轮播图与景点推荐**：为用户展示热门景点的一手信息。
- **景点详情页**：通过点击查看每个景点的详细内容。
- **智能搜索功能**：通过关键词过滤景点，快速定位目标。
- **点赞与评论互动**：支持用户模拟点赞及评论感受。
- **收藏夹功能**：支持用户添加景点到个人收藏，并保存在本地存储中。
- **移动适配**：完美支持多种屏幕尺寸，提升用户体验。

## 技术栈

- Vue.js：前端框架
- Vue Router：路由管理工具
- LocalStorage：本地数据存储
- CSS3：样式设计及响应式布局
- @media：CSS 媒体查询实现移动端优化

## 快速开始

### 环境要求
- Node.js (版本 ≥ 14.0.0)
- npm 包管理器

### 部署

项目已部署到云平台，访问网址：[Travelling_web](https://travelling-web-eight.vercel.app)。

## 框架更新

所有组员请确保自己的工作环境与团队仓库保持一致。以下是最新的启动说明：

**请保持与 master 分支框架同步：**
1. 删除旧版 Fork 的仓库。
2. 更新 Fork：
   - 重新 Fork 项目：[Travelling_web](https://github.com/Ease-777/Travelling_web)
   - 克隆最新的仓库，以替代旧仓库。

**开发：**
在项目主目录中，直接使用以下命令启动项目：
```bash
npm install
npm run dev
```

---

## 协作流程
1. **Fork 仓库**：点击页面右上角的 Fork 按钮，将项目仓库 Fork 到自己的账户。
2. **克隆到本地**：使用以下命令将你的 Fork 克隆到本地，注意替换仓库地址为你自己的：
   ```bash
   git clone 'https://github.com/你的用户账户/Travelling_web.git'
   ```
3. **开发 & 提交**：
   - 完成你的模块后，将代码提交到自己 Fork 的分支：
     ```bash
     git add .
     git commit -m "功能描述，例如：完成景点详情页"
     git push
     ```
   - 提交 Pull Request（PR），将更改建议合并到主项目仓库。
4. **同步进度**：
   Fork 的远程仓库需要频繁与主仓库更新保持一致。

---

## Recommended IDE Setup
- **工具推荐**：[VSCode](https://code.visualstudio.com/)
  - 插件：安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件，建议关闭 Vetur
- **环境要求**：
  - Node.js ≥ v14.0.0

---

## 小组分工

**组长：李佳忆2411682**
- 创建 Vue3 项目，配置 Vue Router 路由跳转；
- 编写 `data.js` 数据文件，供全组协作共享；
- 管理 Git 仓库，合并并测试团队代码；
- 将项目部署到云平台，生成在线预览链接。

**UI设计：徐珑琦2412231**
- 设计整体网站的风格，收集高清图片和设计素材；
- 对全站进行 CSS 美化处理；
- 编写响应式代码，支持移动端浏览。

**前端开发1：杨溢2412789**
- 制作主页的动态轮播图模块；
- 实现热门推荐和数据循环展示；
- 实现搜索功能，支持通过关键词过滤景点列表。

**前端开发2：杨敏2413236**
- 编写景点详情页；
- 基于 ID 显示对应景点的详细信息；
- 制作点赞按钮和评论区，提供模拟交互功能。

**交付与文档：刘玥2411495**
- 实现“我的收藏”功能，支持通过 LocalStorage 保存收藏信息；
- 编写 README 文件，清晰地概述项目背景与功能；
- 撰写项目报告，记录项目的开发过程；
- 打包最终文件，录制演示视频，进行项目收尾工作。


## 项目设置

### 环境安装
以下是完整的安装和启动步骤：

```bash
# 安装依赖
npm install

# 启动开发环境
npm run dev

# 打包生成生产环境代码
npm run build
```

## 文件结构

以下是主要文件目录说明：
```
Travelling_web/
│
├── public/              # 静态资源
├── src/                 # 核心源码
│   ├── assets/          # 图片或样式资源
│   ├── components/      # Vue 组件存放目录
│   ├── views/           # 网页页面文件
│   ├── data.js          # 公共共享数据
│   └── router/          # Vue Router 路由配置
│
├── package.json         # 依赖配置文件
├── README.md            # 项目说明文档
└── vite.config.js       # 配置文件
```

## 致谢

感谢每位组员的辛勤工作与积极贡献！

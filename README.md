# AI GitHub Issue Search

## 简介

本项目是一款 AI 驱动的 GitHub Issue 搜索应用。用户可以在搜索框中输入问题，应用会自动从 GitHub 搜索相关的 Issue，并利用大模型结合 Issue 信息，为用户提供基于 GitHub 数据的 AI 回答。整个回答过程采用流式响应技术，实时将生成的内容展示给用户。

## 功能亮点

- **实时 GitHub Issue 搜索**  
  根据用户输入的查询内容，通过 GitHub 搜索 API 查找相关 Issue。

- **AI 智能回答**  
  将用户查询结合 GitHub Issue 信息，调用 OpenAI 的 GPT 模型生成针对性回答，实现多语言支持（支持中英文）。

- **流式响应展示**  
  使用流式数据处理，将 AI 回答实时呈现在页面上，提升用户体验。

- **搜索示例**  
  在首页提供预设的搜索示例，方便用户快速体验项目功能。

## 技术栈

- [Next.js 14](https://nextjs.org/) (React 框架)
- React
- Tailwind CSS
- OpenAI SDK
- GitHub Search API
- [Radix UI](https://www.radix-ui.com/) 及其他 UI 组件库

## 项目结构

- **app/**  
  - `page.js`：主入口页面，包含 Logo、搜索框及搜索示例。
  - `search/page.js`：搜索结果页面，展示 AI 回答及相关 GitHub Issue 列表。
  - `api/stream-ai/route.js`：后端路由，调用 OpenAI API 并支持流式响应。

- **components/**  
  - `SearchBox.js`：搜索输入框组件，支持 URL 参数变化。
  - `Logo.js`：Logo 组件。
  - `StreamingAIResponse.js`：处理 OpenAI 流式响应并实时展示内容的组件。

- **utils/**  
  - `github.js`：封装 GitHub 搜索 API 请求，返回前 5 个 Issue 结果。

- **其他**  
  - Tailwind 配置、各类 UI 组件（基于 Radix UI 等）以及项目配置文件。

## 环境变量配置

参考 [.env.local.example](./.env.local.example)，本地开发使用 .env.local 


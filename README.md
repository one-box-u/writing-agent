# 写稿Agent v0.6.1

> 🚀 一个基于 Claude Code Skills + Subagents 的全栈写作系统。
> 
> **不仅是写作，更是打磨：**
> *   🤖 **反AI味写作**：从选题到初稿，源头遏制 AI 腔调。
> *   🧬 **深度 Humanizer**：注入人类观点、细节与灵魂，彻底去除机器味。
> *   🎨 **文章配图师**：自动设计视觉风格，生成并植入高质量配图。
> *   📺 **真实读者模拟**：模拟真实用户的"心理弹幕"与"朋友圈转发"，只为了检验传播力。
> 
> **支持 DeepSeek / 智谱GLM / MiniMax 等多种国产大模型**，兼容 OpenAI/Gemini 接口，成本极低（使用包月套餐几可忽略不计）。
> 
> 从选题生成、风格建模、写作执行到发布评审与配图，提供完整的 AI 写作工作流。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v0.6.0-blue.svg)](https://github.com/dongbeixiaohuo/writing-agent/releases)
[![Claude Code](https://img.shields.io/badge/Claude-Code%20Skills-blue)](https://code.claude.com)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-Compatible-green)](https://platform.deepseek.com)

## 🎯 项目简介

写稿Agent 是一个**协作式写作工作流系统**，通过强制性的模式选择、需求澄清、风格建模、素材调研和主编审稿，帮助你写出**不像AI生成**的高质量文章。

### v0.6.0 去AI味与真实模拟 ⭐ New
- 🤖 **Humanizer 去AI味专家**：基于 Wikipedia AI Cleanup 项目，识别并修复24种AI痕迹（内容/语言/风格），注入人类"灵魂"。
- 🎨 **Article Illustrator 文章配图师**：为文章自动设计视觉风格并生成高质量配图（封面/插图/概念图）。
- 📺 **读者模拟器 v3.0 直播版**：模拟真实读者的"直播现场"——心理弹幕、朋友圈截图预览。

### v0.5.1 审稿质量增强
**解决"打分就过"的问题**，所有评审环节必须给出可执行的修改方案并等待用户确认：
- 🎯 **标题设计师 v2.0**：15种爆款公式（分6大类）+ 5个候选 + 钩子说明
- ✅ **发布前评审 v2.0**：每个问题都有「原文→改为」的修改方案 + 用户确认
- ✅ **读者模拟 v2.1**：具体修改建议 + 可自动执行修改 + 修改后重新测试
- 🔒 **强制用户确认**：不会再出现"打分就直接过去"的情况

### v0.5.0 重大架构升级

**引入 Subagent 模式**，实现上下文隔离：
- 🔄 **12 个执行步骤改为独立 Subagent**，每个任务独立上下文
- 📁 **信息通过文件传递**，不依赖对话上下文，避免 Token 累积
- 🎯 **工作流导演 Skill 显式调用 Subagent**，保持用户交互能力
- 💾 **每阶段产物自动落盘**，支持断点续写

### 核心特点

- ✅ **Subagent 架构**：12 个独立 Subagent 实现上下文隔离，节省 Token
- ✅ **协作工作流**：10阶段深度创作模式，包含选题、调研、审稿完整流程
- ✅ **标题设计师 v2.0**：15种爆款标题公式（6大类）+ 5个候选 ✨ v0.5.1 New
- ✅ **反AI味道**：自动去除小标题病、排比上瘾、格式洁癖等AI典型特征
- ✅ **风格建模 v3.1**：支持公众号链接一键提取、多篇批量建模、增量更新风格库
- ✅ **选题生成器**：不知道写什么？AI 基于热点、个人优势和竞品分析智能推荐选题
- ✅ **自动素材归档**：提取的文章自动保存为本地 Markdown，构建个人知识库
- ✅ **强制模式选择**：轻量模式（快速产出）vs 协作模式（深度创作）
- ✅ **素材调研**：自动搜集真实数据，新增爆款拆解与痛点验证
- ✅ **字数精准控制**：通过外部工具统计，误差控制在±20%以内
- ✅ **发布前评审 v2.0**：发布前5问 + 红队7项 + 具体修改建议 ✨ v0.5.1 New
- ✅ **读者模拟 v3.0**：心理弹幕 + 真话吐槽 + 朋友圈现场直播 ✨ v0.6.0 New
- ✅ **Humanizer**：深度去AI味 + 注入灵魂（观点/节奏/细节） ✨ v0.6.0 New
- ✅ **Article Illustrator**：Type × Style 双维度配图设计 + 自动生成/植入 ✨ v0.6.0 New
- ✅ **主编审稿 v2.2**：12项AI味道量化检测
- ✅ **版本管理**：自动保存初稿、修订稿、最终稿，可追溯每次修改

---

## 📚 什么是 Claude Code Skills 和 Subagents？

### Skills 与 Subagents 的区别

| 特性 | Skills | Subagents |
|------|--------|-----------|
| **触发方式** | 语义匹配（自动） | 显式调用（手动） |
| **上下文** | 共享主对话 | 独立隔离 |
| **适用场景** | 需要自动识别意图 | 需要隔离执行的任务 |
| **Token 消耗** | 会累积 | 每个任务独立 |

### 本项目的架构（v0.5.0）

本项目采用 **Skills + Subagents 混合架构**：

```
.claude/
├── skills/                     # 语义触发（3个）
│   ├── 工作流导演/             # ⭐ 核心调度器（调用所有 Subagent）
│   ├── 公众号文章获取/         # 独立工具（检测到URL自动触发）
│   └── 风格建模/               # 独立工具（"学习这个风格"触发）
│
└── agents/                     # 显式调用，上下文隔离（12个）
    │
    ├── ── Stage 0: 选题阶段 ──
    ├── topic-generator.md      # 选题生成器
    ├── topic-research.md       # 选题调研
    │
    ├── ── Stage 1-5: 准备阶段 ──
    ├── writing-clarifier.md    # 澄清需求
    ├── research-expert.md      # 调研资料
    ├── outline-architect.md    # 大纲设计
    ├── empathy-designer.md     # 共情点设计
    ├── concretizer.md          # 具象化专家
    ├── title-designer.md       # 标题设计师
    │
    ├── ── Stage 6: 写作阶段 ──
    ├── writing-executor.md     # 写作执行
    │
    ├── ── Stage 7-9: 审稿阶段 ──
        ├── editor-review.md        # 主编审稿
        ├── pre-publish-review.md   # 发布前评审
        ├── toutiao-reader-test.md  # 读者模拟直播
        ├── humanizer.md            # 去AI味专家 ✨ New
        └── article-illustrator.md  # 文章配图师 ✨ New
```

### 工作流程示意

```
用户请求 → [工作流导演 Skill]
    │
    ├──→ "使用 writing-clarifier 子代理..." → 输出 01_theme.md
    │
    ├──→ "使用 research-expert 子代理..." → 输出 02_cases.md
    │
    ├──→ "使用 outline-architect 子代理..." → 输出 03_outline.md
    │
    ├──→ ... → 最终产出 draft_final.md
    │
    └──→ "使用 humanizer 子代理..." → 最终注入灵魂 ✨ New
```

**每个 Subagent：**
- ✅ 干净的上下文，从 0 开始
- ✅ 必须从文件读取前序信息
- ✅ 只返回摘要给主导演，不传递完整文本
- ✅ 独立隔离，避免 Token 累积

### Skills 自动加载机制

**重要说明：**

1. **克隆项目后，Skills 已经在项目目录里了**
   - 项目文件结构：`writing-agent/.claude/skills/`（包含 13 个 Skills）
   - 这些 Skills 是项目的一部分，随项目一起下载

2. **必须在项目目录中启动 Claude Code**
   ```powershell
   cd writing-agent        # 先进入项目目录
   claude                  # 再启动 Claude Code
   ```
   
   ⚠️ **关键**：Claude Code 只会加载**当前目录**下的 `.claude/skills/`
   
   - ✅ 正确：在 `writing-agent/` 目录中启动 → Skills 自动加载
   - ❌ 错误：在其他目录启动 → Skills 不会被加载

**Claude Code 的 Skills 加载规则：**

1. **全局 Skills 目录**：`~/.claude/skills/`（所有项目都能用）
2. **项目 Skills 目录**：`项目根目录/.claude/skills/`（仅当前项目可用）

**本项目采用"项目级 Skills"**，这意味着：
- ✅ 克隆项目后，Skills 已经在项目目录中（无需手动复制）
- ✅ 在项目目录中启动 Claude Code，Skills 自动可用
- ✅ 不会污染你的全局 Skills 目录
- ✅ 多个项目的 Skills 互不干扰

**如果你想让这些 Skills 在所有项目中都能用：**

<details>
<summary>点击查看如何复制到全局目录</summary>

**Windows (PowerShell):**
```powershell
xcopy /E /I ".claude\skills" "$env:USERPROFILE\.claude\skills"
```

**Linux/macOS:**
```bash
cp -r .claude/skills/* ~/.claude/skills/
```

</details>

---

## 📦 快速开始

### 前置要求

**方式一：使用 Claude 官方模型**
- [Claude Code](https://code.claude.com) 账号
- 基本的命令行操作能力

**方式二：使用国产大模型（推荐，更经济）**

本项目支持通过 Anthropic API 兼容接口接入多种国产大模型：

| 模型 | 推荐指数 | 成本 | 获取 API Key | 官方文档 |
|------|---------|------|-------------|---------|
| **DeepSeek-V3** | ⭐⭐⭐⭐⭐ | 极低 | [DeepSeek 平台](https://platform.deepseek.com) | [接入文档](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api) |
| **智谱 GLM** | ⭐⭐⭐⭐ | 中等 | [智谱开放平台](https://open.bigmodel.cn) | [接入文档](https://docs.bigmodel.cn/cn/coding-plan/tool/claude) |
| **MiniMax** | ⭐⭐⭐⭐ | 中等 | [MiniMax 平台](https://platform.minimaxi.com) | [接入文档](https://platform.minimaxi.com/docs/api-reference/text-anthropic-api) |

> **本项目所有测试均基于 DeepSeek-V3 模型完成。** 一篇 2000 字文章成本约 ¥0.03，性价比极高。

### 安装步骤（新手友好版）

本指南以 **Windows 系统**为主，同时提供 Linux/macOS 的对应说明。

---

#### 步骤 1：安装 Node.js 环境

Claude Code 需要 Node.js 18 或更高版本才能运行。

<details>
<summary><b>Windows 安装 Node.js</b></summary>

**方法一：官网下载（推荐）**

1. 打开浏览器访问 [https://nodejs.org/](https://nodejs.org/)
2. 点击 **"LTS"** 版本进行下载（长期支持版本，版本号需 ≥ 18）
3. 下载完成后双击 `.msi` 文件
4. 按照安装向导完成安装，**保持默认设置即可**
5. 安装完成后，打开 **PowerShell**（推荐）或 CMD，输入以下命令验证：
   ```powershell
   node --version
   npm --version
   ```
   如果显示版本号（如 `v20.x.x` 和 `10.x.x`），说明安装成功！

**方法二：使用包管理器**

如果你安装了 Chocolatey 或 Scoop，可以使用命令行安装：
```powershell
# 使用 Chocolatey
choco install nodejs

# 或使用 Scoop
scoop install nodejs
```

**Windows 注意事项：**
- ⚠️ 建议使用 **PowerShell** 而不是 CMD（功能更强大）
- ⚠️ 如果遇到权限问题，尝试**以管理员身份运行** PowerShell
- ⚠️ 某些杀毒软件可能会误报，需要添加白名单

</details>

<details>
<summary><b>Linux/macOS 安装 Node.js</b></summary>

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS (使用 Homebrew):**
```bash
brew install node
```

**验证安装：**
```bash
node --version
npm --version
```

</details>

---

#### 步骤 2：克隆项目到本地

<details>
<summary><b>Windows 操作</b></summary>

1. 打开 **PowerShell**
2. 进入你想存放项目的目录，例如：
   ```powershell
   cd D:\Projects
   ```
3. 克隆项目：
   ```powershell
   git clone https://github.com/dongbeixiaohuo/writing-agent.git
   cd writing-agent
   ```

**如果没有安装 Git：**
- 下载安装：[https://git-scm.com/download/win](https://git-scm.com/download/win)
- 或者直接从 GitHub 下载 ZIP 文件并解压

</details>

<details>
<summary><b>Linux/macOS 操作</b></summary>

```bash
cd ~/Projects  # 或你想存放的目录
git clone https://github.com/dongbeixiaohuo/writing-agent.git
cd writing-agent
```

</details>

---

#### 步骤 3：安装 Claude Code

<details>
<summary><b>Windows 安装</b></summary>

1. 打开 **PowerShell**（建议以管理员身份运行）
2. 运行以下命令全局安装 Claude Code：
   ```powershell
   npm install -g @anthropic-ai/claude-code
   ```
   
   **如果下载速度慢，可以使用国内镜像：**
   ```powershell
   npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
   ```

3. 验证安装：
   ```powershell
   claude --version
   ```
   如果显示版本号，说明安装成功！

**更新 Claude Code：**
```powershell
claude update
```

</details>

<details>
<summary><b>Linux/macOS 安装</b></summary>

```bash
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

</details>

---

#### 步骤 4：验证 Skills 是否正确加载

在配置 API 之前，先验证项目的 Skills 是否在正确的位置。

<details>
<summary><b>Windows 验证</b></summary>

1. 打开 **PowerShell**
2. 进入项目目录：
   ```powershell
   cd D:\Projects\writing-agent  # 替换为你的实际路径
   ```
3. 检查 Skills 目录：
   ```powershell
   Get-ChildItem -Path ".claude\skills" -Directory
   ```
4. **预期输出**：应该看到 13 个 Skills 目录
   ```
   工作流导演
   选题生成器
   选题调研
   澄清写作需求
   风格建模
   调研资料
   大纲架构师
   共情点设计师
   具象化专家
   标题设计师
   写作执行
   主编审稿
   发布前评审
   ```

**如果没有看到这些目录：**
- 检查是否正确克隆了项目（确认使用了 `git clone` 而不是只下载了部分文件）
- 确认 `.claude` 目录没有被意外删除

</details>

<details>
<summary><b>Linux/macOS 验证</b></summary>

```bash
cd ~/Projects/writing-agent  # 替换为你的实际路径
ls -la .claude/skills/
```

应该看到 13 个 Skills 目录。

</details>

**✅ 验证通过后，继续下一步配置 API。**

---

#### 步骤 5：配置第三方 API（三种方法任选其一）

本项目支持通过 Anthropic API 兼容接口接入多种第三方模型。以下以通用配置为例。

**你需要准备的信息：**
- `API_BASE_URL`：第三方 API 的基础地址（如 `https://api.example.com/v1`）
- `API_KEY`：你的 API 密钥（从第三方平台获取）

---

<details>
<summary><b>方法一：配置文件方式（强烈推荐✨）</b></summary>

这是最稳定的配置方式，配置一次永久生效。

**Windows 操作：**

1. 打开文件资源管理器，在地址栏输入：
   ```
   %USERPROFILE%\.claude
   ```
   如果文件夹不存在，手动创建它。

2. 在该文件夹下创建文件 `settings.json`（如果已存在则直接编辑）

3. 用记事本或 VS Code 打开 `settings.json`，填入以下内容：
   ```json
   {
     "env": {
       "ANTHROPIC_AUTH_TOKEN": "你的API密钥",
       "ANTHROPIC_BASE_URL": "https://api.example.com/v1",
       "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
     }
   }
   ```

4. **替换示例值：**
   - 将 `"你的API密钥"` 替换为你从第三方平台获取的实际 API Key
   - 将 `"https://api.example.com/v1"` 替换为第三方 API 的实际地址

5. 保存文件

**Linux/macOS 操作：**

```bash
# 创建配置目录（如果不存在）
mkdir -p ~/.claude

# 编辑配置文件
nano ~/.claude/settings.json
```

填入相同的 JSON 内容，保存后退出（Ctrl+X → Y → Enter）。

**配置文件路径说明：**
- Windows: `C:\Users\你的用户名\.claude\settings.json`
- Linux/macOS: `~/.claude/settings.json`

</details>

---

<details>
<summary><b>方法二：PowerShell 永久环境变量（Windows）</b></summary>

这种方法会将配置写入系统环境变量，重启后仍然有效。

**在 PowerShell 中运行：**

```powershell
# 设置用户级环境变量（永久生效）
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.example.com/v1", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的API密钥", [System.EnvironmentVariableTarget]::User)
```

**验证设置：**
```powershell
# 查看环境变量
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_BASE_URL", [System.EnvironmentVariableTarget]::User)
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", [System.EnvironmentVariableTarget]::User)
```

**⚠️ 注意：** 设置后需要**重新打开 PowerShell 窗口**才能生效。

</details>

---

<details>
<summary><b>方法三：临时环境变量（当前会话）</b></summary>

这种方法只在当前 PowerShell/终端会话中有效，关闭窗口后失效。

**Windows (PowerShell):**
```powershell
$env:ANTHROPIC_BASE_URL = "https://api.example.com/v1"
$env:ANTHROPIC_AUTH_TOKEN = "你的API密钥"
```

**Linux/macOS (Bash/Zsh):**
```bash
export ANTHROPIC_BASE_URL="https://api.example.com/v1"
export ANTHROPIC_AUTH_TOKEN="你的API密钥"
```

**验证设置：**
```powershell
# Windows PowerShell
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN

# Linux/macOS
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN
```

</details>

---

**具体模型配置示例：**

如果你使用的是本项目推荐的模型，可以参考以下配置：

- **DeepSeek-V3**: 参考 [接入文档](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)
- **智谱 GLM**: 参考 [接入文档](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)
- **MiniMax**: 参考 [接入文档](https://platform.minimaxi.com/docs/api-reference/text-anthropic-api)

---

#### 步骤 6：启动 Claude Code

<details>
<summary><b>Windows 操作</b></summary>

1. 打开 **PowerShell**
2. 进入项目目录：
   ```powershell
   cd D:\Projects\writing-agent  # 替换为你的实际路径
   ```
3. 启动 Claude Code：
   ```powershell
   claude
   ```
4. 首次启动会进行初始化，按照提示完成设置

</details>

<details>
<summary><b>Linux/macOS 操作</b></summary>

```bash
cd ~/Projects/writing-agent  # 替换为你的实际路径
claude
```

</details>

---

#### 步骤 7：开始使用并验证 Skills

启动成功后，先验证 Claude Code 是否识别了项目的 Skills。

**验证 Skills 加载：**

1. 在 Claude Code 对话中输入：
   ```
   你能看到哪些 Skills？
   ```

2. Claude 应该会列出所有可用的 Skills，包括：
   - workflow-producer（工作流导演）
   - topic-generator（选题生成器）
   - topic-research（选题调研）
   - 等等...

**如果 Claude 没有识别到 Skills：**
- 参考下方的"常见问题排查"部分

**开始使用：**

验证通过后，直接对 Claude 说：

```
帮我写一篇关于XXX的文章
```

系统会自动引导你完成整个写作流程！

---

### 常见问题排查

<details>
<summary><b>问题：提示 "claude: command not found"</b></summary>

**原因：** Claude Code 未正确安装或未添加到系统 PATH

**解决方法：**
1. 重新运行安装命令：`npm install -g @anthropic-ai/claude-code`
2. 检查 npm 全局安装路径是否在 PATH 中：
   ```powershell
   npm config get prefix
   ```
3. 重启 PowerShell/终端

</details>

<details>
<summary><b>问题：提示 "API authentication failed"</b></summary>

**原因：** API Key 配置错误或未生效

**解决方法：**
1. 检查 `settings.json` 文件中的 API Key 是否正确
2. 确认 API Base URL 是否正确
3. 如果使用环境变量，重启 PowerShell 后重试
4. 验证环境变量是否生效（参考上面的验证命令）

</details>

<details>
<summary><b>问题：Windows 提示 "无法加载文件，因为在此系统上禁止运行脚本"</b></summary>

**原因：** PowerShell 执行策略限制

**解决方法：**
以管理员身份运行 PowerShell，执行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

</details>

<details>
<summary><b>问题：Claude Code 没有识别到项目的 Skills</b></summary>

**原因：** Claude Code 可能没有正确扫描项目目录

**解决方法：**

1. **确认 Skills 目录存在：**
   ```powershell
   # Windows
   Test-Path ".claude\skills"
   
   # Linux/macOS
   ls -la .claude/skills/
   ```

2. **确认在项目目录中启动 Claude Code：**
   ```powershell
   # 必须先 cd 到项目目录
   cd D:\Projects\writing-agent
   
   # 然后再启动
   claude
   ```
   
   ⚠️ **重要**：Claude Code 只会加载**当前目录**下的 `.claude/skills/`，如果你在其他目录启动，Skills 不会被加载。

3. **重启 Claude Code：**
   - 完全退出 Claude Code（输入 `exit` 或按 Ctrl+C）
   - 确认在项目目录中
   - 再次启动 `claude`

4. **手动复制到全局目录（如果项目级 Skills 无法加载）：**
   ```powershell
   # Windows
   xcopy /E /I ".claude\skills" "$env:USERPROFILE\.claude\skills"
   
   # Linux/macOS
   cp -r .claude/skills/* ~/.claude/skills/
   ```
   
   复制到全局目录后，Skills 在所有项目中都可用。

5. **验证 Skills 加载：**
   对 Claude 说："列出所有可用的 Skills" 或 "你能看到哪些 Skills？"

</details>

<details>
<summary><b>💡 推荐工具：Windows 用户的多 API 环境管理神器</b></summary>

如果你觉得手动管理环境变量比较麻烦，特别是需要在多个 API 提供商之间切换时，强烈推荐使用 **CC-Switch** 工具。

**CC-Switch 是什么？**

CC-Switch 是一个跨平台的桌面应用，专为 Claude Code、Codex 和 Gemini CLI 设计的一体化助手工具。

**核心功能：**
- 🔄 **一键切换 API 配置**：支持多个 API 提供商配置，无需手动修改环境变量
- 📦 **MCP 服务器管理**：可视化管理 MCP 服务器
- 🎯 **Skills 管理**：自动扫描和安装 Claude Skills
- 💬 **Prompts 管理**：多预设系统提示词管理
- 🌐 **多语言支持**：中文/英文/日文界面
- 💾 **配置同步**：支持配置云同步（未来功能）

**下载安装：**

访问 [CC-Switch GitHub Releases](https://github.com/farion1231/cc-switch/releases) 下载最新版本：

- **Windows**: 下载 `CC-Switch-v{version}-Windows.msi` 安装包
- **macOS**: 通过 Homebrew 安装 `brew install --cask cc-switch`
- **Linux**: 支持 `.deb`、`.rpm`、`.AppImage` 等多种格式

**使用方法：**

1. 安装并启动 CC-Switch
2. 在界面中添加你的 API 配置（支持 DeepSeek、智谱、MiniMax 等）
3. 一键切换不同的 API 环境
4. 无需手动修改配置文件或环境变量

**项目地址：** [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

**适合人群：**
- ✅ 需要频繁切换多个 API 提供商的用户
- ✅ 不熟悉命令行和环境变量配置的新手
- ✅ 希望有可视化界面管理 Claude Code 配置的用户

</details>

## 🚀 使用示例

### 协作写作流程（8阶段）

```
你："我想写一篇关于35岁程序员危机的深度分析文章，3000字"
    ↓
Claude 会引导你：

🎬 请选择工作流模式：
【A. 轻量模式】快速产出
【B. 协作模式】深度创作 ⭐ 推荐

你选择 B（协作模式）后：

📋 完整工作流：
□ Stage 0: 选题调研（选题前置验证）✨ New
   - 热点扫描/爆款拆解/痛点验证
   
□ Stage 1: 主题与读者校准
   - 选择切入方向（A/B/C）
   - 确认受众、风格、字数
   
□ Stage 2: 案例与证据池
   - 搜集真实数据、案例
   
□ Stage 3: 逻辑骨架搭建
   - 设计文章结构
   - 标注每段功能
   
□ Stage 4: 共情点设计
   - 预测读者心理路径
   - ⚡ 强化开头钩子设计
   
□ Stage 5: 具象化翻译（按需）
   - 将抽象概念转化为具体表达
   
□ Stage 5.5: 标题设计 ⭐ 必须
   - 设计3个候选标题让你选择
   - ⚡ 植入爆款标题公式
   
□ Stage 6: 正式创作
   - 分步写作（开头→主体→结尾）
   - ⚡ 强制执行前50字生死线
   
□ Stage 7: 主编审稿与改稿
   - 重点检查AI味道
   - 输出修订稿

□ Stage 8: 发布前把关 ✨ New
   - 发布前5问评审（标题/开头/认同/出路/分享）
    ↓
□ Stage 9: 读者模拟直播 ✨ New
   - 心理弹幕/真话吐槽/朋友圈现场
   
□ Stage 10: 最终去AI味 ✨ New
   - 深度扫描24种AI痕迹
   - 注入观点与灵魂
   
□ Stage 11: 视觉增强 (配图) ✨ New
   - 视觉风格设计 (Flat/Lofi/Cyberpunk)
   - 自动生成 3-5 张配图并植入

### 如何为文章配图

如果在写作流程中没有生成配图，你可以随时手动调用 `article-illustrator` 子代理：

```bash
/slash-command 使用 article-illustrator 子代理为 articles/[项目名]/draft_vX.md 生成配图
```

**支持的模型**：默认使用 Google Gemini Image 模型，无需额外配置。

### 风格建模详细教程
```

### 风格建模详细教程

**方式一：直接贴文章内容**
```
你："帮我分析这篇文章的风格：

[直接粘贴文章全文]

以后按这个风格写。"
```

**方式二：使用 @ 引用文件**
```
你："帮我分析 @sample_article.md 的风格，以后按这个风格写"
```

**方式三：提供多篇参考文章（推荐，更准确）**
```
你："帮我分析这几篇文章的共同风格：
@article1.md
@article2.md
@article3.md

提取共性，保存为'XXX风格'"
```

**方式四：URL 一键学习（🔥 强力推荐）**
```
你："学一下这几篇公众号文章的风格：
https://mp.weixin.qq.com/s/xxxx
https://mp.weixin.qq.com/s/yyyy

如果作者已经在风格库里，就更新它的风格文件。"

👉 Claude 会自动：
1. 打开浏览器抓取正文（自动绕过微信反爬）
2. 将文章保存到 docs/ 文件夹归档
3. 如果是新作者 -> 建新档
4. 如果是老作者 -> 融合新特征，更新旧档
```

**风格建模过程（v3.0 - 15维度）：**
```
提供样本文章
    ↓
Claude 会：
1. 深度解构15个维度：
   - 作者画像与核心人格 ✨ 新增
   - 思维内核与论证逻辑 ✨ 升级
   - 创作路径还原 ✨ 新增
   - 互动设计 ✨ 新增
   - 开头/过渡/结尾模式
   - 句式与节奏
   - 词汇指纹（5类细分）✨ 升级
   - 修辞手法
   - 格式与排版
   - 独特习惯与招牌动作（5类细分）✨ 升级
   - 反AI特征
   - 典型段落模板
   - 禁忌清单
2. 提取"招牌动作"（最具辨识度的写作习惯）
3. 保存风格文件到 .claude/styles/XXX风格.md
    ↓
下次写作时可以直接调用这个风格
```

**最佳实践：**
- 样本文章建议 3000 字以上，效果更好
- 提供 3-5 篇同一作者的文章，提取的风格更准确
- 风格文件可以手动编辑，补充或调整特征

## 📚 核心 Skills 说明

| Skill | 功能 | 调用时机 |
|-------|------|---------|
| `workflow-producer` | 工作流导演 | 所有写作请求的唯一入口 ⭐ |
| `topic-generator` | 选题生成器 | 不知道写什么时，从0生成候选选题 ✨ New |
| `topic-research` | 选题调研 | Stage 0: 动笔前的热点与痛点验证 ✨ New |
| `writing-clarifier` | 澄清写作需求 | Stage 1: 主题与读者校准 |
| `research-expert` | 调研素材 | Stage 2: 案例与证据池 |
| `outline-architect` | 大纲架构师 | Stage 3: 逻辑骨架搭建 |
| `empathy-designer` | 共情点设计师 | Stage 4: 共情点设计 |
| `concretizer` | 具象化专家 | Stage 5: 具象化翻译（按需）|
| `title-designer` | 标题设计师 | Stage 5.5: 标题设计（含爆款公式）✨ Upgrade |
| `writing-executor` | 写作执行 | Stage 6: 正式创作（含开头钩子）✨ Upgrade |
| `editor-review` | 主编审稿 | Stage 7: 主编审稿与改稿 |
| `pre-publish-review` | 发布前评审 | Stage 8: 发布前5问把关 ✨ New |
| `style-modeler` | 风格建模 | URL提取/批量建模/增量更新 ✨ Upgrade |

## 🎨 风格库示例

项目自带四个风格示例：

### 1. 墨水怪风（`.claude/styles/墨水怪风.md`）
- **核心人格**：愤世嫉俗但真诚的毒舌老哥
- **招牌动作**：悖论翻转、质疑打断、真诚骂人
- **特色词汇**：兽性、进化心理学、巴甫洛夫
- **适用场景**：观点文、批判性分析

### 2. 九边风（`.claude/styles/jiubian.md`）
- **核心人格**：职场老炮式人生导师
- **招牌动作**："那问题来了"、案例故事化、承认局限
- **分析模式**：现象→机制→人性→出路
- **适用场景**：职场分析、深度解读

### 3. 老总在人间风（`.claude/styles/老总在人间.md`）✨ 新增
- **核心人格**：看透职场和人性的"老油条"
- **招牌动作**："拖出去砍了"夸张式反驳、【】强调金句、直白揭露
- **特色表达**：刻在骨髓里、本金风险、知识付费推广
- **适用场景**：职场真相揭露、务实建议、知识付费内容

### 4. sanbiaobiao风（`.claude/styles/sanbiaobiao.md`）✨ 新增
- **核心人格**：看透内容产业规律的媒体老兵
- **招牌动作**：反常识开场、具体化对比、知识结构决定论
- **特色表达**："喂,等等,不对劲啊"、一手资料vs二道贩子、鼻子上长了个洋鸡蛋
- **适用场景**：内容行业观察、产品评论、理解式批判

你可以基于任何文章创建自己的风格库。

## 📖 详细文档

- [协作写作工作流快速参考](docs/WORKFLOW_QUICK_REFERENCE.md) ⭐ 新增
- [Skills 更新总结](docs/SKILLS_UPDATE_SUMMARY.md) ⭐ 新增
- [DeepSeek API 配置指南](docs/DEEPSEEK_SETUP.md) ⭐ 推荐
- [Skills 开发指南](.claude/skills/)
- [风格建模教程](.claude/skills/风格建模/SKILL.md)
- [常见问题 FAQ](docs/FAQ.md)
- [项目结构说明](docs/PROJECT_STRUCTURE.md)

## 🛠️ 高级配置

### 自定义反AI规则

编辑 `.claude/skills/写作执行/SKILL.md` 中的"反AI写作技巧"部分，添加你自己的规则。

### 调整字数控制精度

编辑 `.claude/skills/写作执行/SKILL.md` 中的"字数控制"部分，修改允许范围（默认±20%）。

### 自定义工作流阶段

编辑 `.claude/skills/工作流导演/SKILL.md`，可以调整协作模式的阶段顺序或跳过某些阶段。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本历史。

**最新版本 v0.2.0 (2025-12-29)**
- ✨ 风格建模升级至 v3.0（15维度）
- ✨ 新增协作写作工作流（8阶段）
- ✨ 新增标题设计师 Skill
- ✨ 新增九边风、墨水怪风两套风格配方
- 🔧 强制模式选择机制
- 🔧 子 Skill 权限调整

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢 [Claude Code](https://code.claude.com) 提供的 Skills 系统
- 感谢所有贡献者和使用者的反馈

## 📮 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/dongbeixiaohuo/writing-agent/issues)
- 讨论区: [GitHub Discussions](https://github.com/dongbeixiaohuo/writing-agent/discussions)

---

**如果这个项目对你有帮助，请给个 ⭐ Star！**

# 写稿Agent v0.3.3

> 🚀 一个基于 Claude Code Skills 的"反AI味"写作系统，让AI写出的文章像人写的一样自然。
> 
> 支持 **DeepSeek / 智谱GLM / MiniMax** 等多种国产大模型，成本极低（2000字文章约¥0.03）。
> 
> 从选题生成、风格建模到发布评审，提供完整的 AI 写作工作流。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v0.3.3-blue.svg)](https://github.com/dongbeixiaohuo/writing-agent/releases)
[![Claude Code](https://img.shields.io/badge/Claude-Code%20Skills-blue)](https://code.claude.com)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-Compatible-green)](https://platform.deepseek.com)

## 🎯 项目简介

写稿Agent 是一个**协作式写作工作流系统**，通过强制性的模式选择、需求澄清、风格建模、素材调研和主编审稿，帮助你写出**不像AI生成**的高质量文章。

### 核心特点

- ✅ **协作工作流**：8+2阶段深度创作模式，新增选题调研与发布评审
- ✅ **爆款能力增强**：内置5种爆款标题公式、4种开头钩子、前50字生死线检查 ✨ New
- ✅ **反AI味道**：自动去除小标题病、排比上瘾、格式洁癖等AI典型特征
- ✅ **风格建模 v3.1**：支持公众号链接一键提取、多篇批量建模、增量更新风格库
- ✅ **选题生成器**：不知道写什么？AI 基于热点、个人优势和竞品分析智能推荐选题 ✨ New
- ✅ **自动素材归档**：提取的文章自动保存为本地 Markdown，构建个人知识库 ✨ New
- ✅ **强制模式选择**：轻量模式（快速产出）vs 协作模式（深度创作）
- ✅ **标题设计师**：独立 Skill，设计3种候选标题 + 爆款公式加持
- ✅ **素材调研**：自动搜集真实数据，新增爆款拆解与痛点验证
- ✅ **字数精准控制**：通过外部工具统计，误差控制在±20%以内
- ✅ **发布前评审 v2.0**：独创"发布前5问+红队评审"机制，强制挑刺防止虚高评分 ✨ Upgrade
- ✅ **版本管理**：自动保存初稿、修订稿、最终稿，可追溯每次修改


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

#### 步骤 4：配置第三方 API（三种方法任选其一）

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

#### 步骤 5：启动 Claude Code

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

#### 步骤 6：开始使用

启动成功后，直接对 Claude 说：

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
最终输出：articles/[项目名]/draft_最终稿.md
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

项目自带两个风格示例：

### 1. 墨水怪风（`.claude/styles/墨水怪风.md`）
- **核心人格**：愤世嫉俗但真诚的毒舌老哥
- **招牌动作**：悖论翻转、质疑打断、真诚骂人
- **特色词汇**：兽性、进化心理学、巴甫洛夫
- **适用场景**：观点文、批判性分析

### 2. 九边风（`.claude/styles/jiubian.md`）✨ 新增
- **核心人格**：职场老炮式人生导师
- **招牌动作**："那问题来了"、案例故事化、承认局限
- **分析模式**：现象→机制→人性→出路
- **适用场景**：职场分析、深度解读

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

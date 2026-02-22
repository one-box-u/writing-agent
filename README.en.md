# Writing Agent - OpenClaw Adaptation

> 🚀 An "anti-AI flavor" writing system adapted for OpenClaw, making AI-generated content read naturally like human writing.

## Three Writing Modes

| Mode | Command | Description |
|------|---------|-------------|
| **Lightweight** | Write a lightweight article about [topic] | Quick output, for short posts |
| **Collaborative** | Write an article about [topic] | Deep writing, for long articles |
| **From Topic** | I don't know what to write, help me find a topic | AI generates topics for you |

## Features

- 🤖 **Humanizer**: Identifies and fixes 24 types of AI writing patterns
- 🎨 **Image Generation**: Supports multiple image generation services
- 📺 **Reader Simulation**: Simulates real reader psychological responses
- ✍️ **Complete Workflow**: 14-stage deep writing mode

## Installation

### Prerequisites

- OpenClaw environment
- Node.js 18+
- Supported LLM API (DeepSeek / MiniMax / Zhipu GLM, etc.)

### Configuration

1. Copy `config.json.template` to `config.json`
2. Fill in your API configuration:

```json
{
  "model": {
    "provider": "minimax",
    "model_id": "MiniMax-M2.1",
    "api_key": "YOUR_API_KEY"
  },
  "image": {
    "provider": "nano-banana"
  },
  "search": {
    "provider": "tavily"
  }
}
```

## Usage

```
# Default collaborative mode
Write an article about [topic]

# Lightweight mode
Write a lightweight article about [topic]

# From topic generation
I don't know what to write, help me find a topic
```

## Supported Models

- MiniMax (Recommended)
- DeepSeek
- Alibaba Qwen
- Zhipu GLM
- Google Gemini

## Directory Structure

```
writing-agent/
├── agents/              # 14 writing agents
├── workflow-director/   # Workflow director
├── styles/             # Writing style configs
├── config.json         # Configuration file
└── SKILL.md            # OpenClaw skill definition
```

## License

MIT License

## Acknowledgments

Original project: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)

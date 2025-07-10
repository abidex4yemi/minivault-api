# lightweight API

A lightweight local REST API for streaming responses from local LLMs (via [Ollama](https://ollama.com/)) or a dummy response for testing. Designed for simplicity, extensibility, and local development.

---

## Features

- **/generate** endpoint for streaming LLM or dummy responses
- Supports [Ollama](https://ollama.com/) local models (`mistral`, `llama3`)
- Dummy response mode for testing
- Server-Sent Events (SSE) for real-time streaming
- JSONL logging of all prompt/response pairs

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/abidex4yemi/minivault-api.git
cd minivault-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. (Optional) Set Up Ollama

If you want to use real LLMs, install and run [Ollama](https://ollama.com/) locally:

```bash
# Download and install Ollama (see https://ollama.com/download)
ollama serve
# Pull a model (e.g mistral)
ollama pull mistral
```

---

## Running the App

```bash
npm start
```

The server will start on [http://localhost:3000](http://localhost:3000).

---

## Usage

### POST `/generate`

**Request Body:**

```json
{
  "prompt": "Your question here.",
  "model": "mistral" // or "llama3" or "dummy" (default)
}
```

**Example with curl:**

```bash
curl -N -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, world!", "model": "dummy"}'
```

- If `model` is `"dummy"` or omitted, a test response is streamed.
- If `model` is `"mistral"` or `"llama3"`, the request is proxied to your local Ollama server.

**Responses** are streamed as JSON objects, one per line.

---

## Logs

All prompt/response pairs are logged in `src/logs/log.jsonl` as JSONL (one JSON object per line).

---

## Tradeoffs

- **Simplicity vs. Features:** The codebase is intentionally minimal for easy understanding and extension, but lacks advanced features (rate limiting, etc.).
- **Hardcoded Models:** Supported models are hardcoded; adding new models requires code changes.
- **Logging:** All logs go to a single file, which may grow large over time.
- **Error Handling:** Basic error handling is present, but could be more robust.
- **Security:** No authentication, but could be improved.

---

## Ideas for Improvement

1. **Configurable Models:** Load supported models from a config file or environment variable.
2. **Authentication & Rate Limiting:** Add middleware for API key or token-based auth and basic rate limiting.
3. **Testing:** Add unit and integration tests.
4. **Error Handling:** Standardize error responses and improve error logging.
5. **Dockerization:** Provide a Dockerfile for easy deployment.
6. **Environment Variables:** Use `.env` for configuration (port, log path, etc.).
7. **Health Check Endpoint:** Add a simple `/health` endpoint for monitoring.
8. **Handling Model Cutoff and Newer Data (On-Prem):** Since the API uses pretrained models with a knowledge cutoff, consider on-premises strategies for dealing with questions about events or information post-training (e.g., integrating local retrieval-augmented generation, on-prem web/data search, or providing clear user feedback about limitations).
9. **Post-Training Updates & Deep Thinking (On-Prem):** Explore ways to supplement the model with up-to-date information, enable plugin-like extensions, or implement mechanisms for deeper reasoning and multi-step thinking—ensuring all enhancements remain on-premises and do not rely on external cloud services.

# nearest-tailwind-colors-mcp

Model Context Protocol (MCP) server that exposes a single tool for finding the nearest Tailwind CSS palette colors to any CSS color.

## Install & build

- Requires Node 18+.
- Install deps: `npm install`.
- Build the project: `npm run build`.

## Configure in an MCP host

All hosts should point to the built entry: `/absolute/path/to/nearest-tailwind-colors-mcp/dist/index.js`.

- **JSON-based hosts (Claude Desktop, Cursor, VS Code MCP extension)**: add this to the relevant `settings.json`/`claude_desktop_config.json`, then restart/reload:

```json
{
  "mcpServers": {
    "nearest-tailwind-colors": {
      "command": "node",
      "args": ["/absolute/path/to/nearest-tailwind-colors-mcp/dist/index.js"]
    }
  }
}
```

- Claude Desktop: edit `claude_desktop_config.json`.
- Cursor: Settings → search "Model Context Protocol" → "Edit in settings.json".
- VS Code: User/Workspace `settings.json` with the MCP/Claude extension installed.

- **ChatGPT Codex (CLI and VS Code extension)**: add to `~/.codex/config.toml` (wrap in your shell if you need `nvm`/`fnm` to enforce node >= 18):

```toml
[mcp_servers.nearest_tailwind_colors]
command = "node"
args = ["/absolute/path/to/nearest-tailwind-colors-mcp/dist/index.js"]
```

```toml
# with nvm
[mcp_servers.nearest_tailwind_colors]
command = "zsh"
args = [
  "-lc",
  "export NVM_DIR=\"$HOME/.nvm\"; source \"$NVM_DIR/nvm.sh\"; nvm use 20 >/dev/null; node /absolute/path/to/nearest-tailwind-colors-mcp/dist/index.js",
]
```

## Available tool

- `nearest_tailwind_colors`: finds the closest Tailwind colors to a given CSS color.
  - `color` (string, required): any CSS color (`#fff`, `#fafafa`, `rgb(...)`, `hsl(...)`, named colors, etc.).
  - `n` (int, optional): number of colors to return (default 5, max 50).
  - `excludeColors` (string[], optional): Tailwind color names to skip (e.g. `["white", "black", "neutral-950"]`).
  - `space` (enum, optional): comparison color space (`cmyk`, `gl`, `hcg`, `hcl`, `hsi`, `hsl`, `hsv`, `lab`, `lch`, `oklab`, `oklch`, `rgb`; default `lab`).

## Example prompt

Prompt: "What are the 5 tailwind colors closest to the youtube logo?"

Response:

```
Closest Tailwind matches to YouTube red (`#ff0000`):

- red-600 — `#dc2626`
- orange-600 — `#ea580c`
- red-500 — `#ef4444`
- red-700 — `#b91c1c`
- orange-700 — `#c2410c`
```

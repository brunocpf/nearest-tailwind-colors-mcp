# nearest-tailwind-colors-mcp

Model Context Protocol (MCP) server that exposes a single tool for finding the nearest Tailwind CSS palette colors to any CSS color.

## Install & build

- Requires Node 18+.
- Install deps: `npm install`.
- Build the project: `npm run build`.

## Configure in an MCP host (example: Claude Desktop)

Add an entry to `claude_desktop_config.json` (adjust the path to your clone):

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

Restart the client after saving the config.

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

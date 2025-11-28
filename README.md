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

## Example call

Note: these responses are just examples and aren't accurate, run the tool to get real results.

```json
{
  "tool": "nearest_tailwind_colors",
  "input": {
    "color": "#1d4ed8",
    "n": 3
  }
}
```

Typical response:

```json
{
  "results": [
    { "color": "blue-700", "value": "#1d4ed8", "distance": 0 },
    { "color": "blue-600", "value": "#2563eb", "distance": 2.4 },
    { "color": "blue-800", "value": "#1e40af", "distance": 3.1 }
  ]
}
```

## Example prompt

Prompt: "What are the 3 Tailwind colors closest to #1d4ed8?"
Response:

```
The 3 closest Tailwind colors to`#1d4ed8` are:

- `blue-700` (#1d4ed8)
- `blue-600` (#2563eb)
- `blue-800` (#1e40af)
```

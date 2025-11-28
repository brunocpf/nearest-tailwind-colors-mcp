import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handler, InputSchema, OutputSchema } from "./tool.js";

const server = new McpServer({
  name: "nearest-tailwind-colors",
  version: "1.0.0",
});

server.registerTool(
  "nearest_tailwind_colors",
  {
    title: "Find nearest Tailwind CSS colors",
    description:
      "Given any CSS color, find the nearest Tailwind CSS palette colors.",
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  handler
);

const transport = new StdioServerTransport();

await server.connect(transport);

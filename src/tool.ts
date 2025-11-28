import z from "zod";
import { getNearestTailwindColors } from "nearest-tailwind-colors";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const InputSchema = z.object({
  color: z
    .string()
    .describe(
      "Any CSS color (e.g. #fff, #fafafa, rgb(...), hsl(...), or named color)."
    ),
  n: z
    .number()
    .int()
    .positive()
    .max(50)
    .optional()
    .describe(
      "Number of nearest colors to return (default 5 if not provided)."
    ),
  excludeColors: z
    .array(z.string())
    .optional()
    .describe(
      "List of Tailwind color names to exclude, e.g. ['white', 'black', 'neutral-950'] (default to none if not provided)."
    ),
  space: z
    .enum([
      "cmyk",
      "gl",
      "hcg",
      "hcl",
      "hsi",
      "hsl",
      "hsv",
      "lab",
      "lch",
      "oklab",
      "oklch",
      "rgb",
    ])
    .optional()
    .describe(
      "Color space for comparison (default to 'lab' if not provided). 'lab' is recommended for most use cases."
    ),
});

export const ColorOutputSchema = z.object({
  color: z.string(),
  value: z.string(),
  distance: z.number(),
});

export const OutputSchema = z.object({
  results: z.array(ColorOutputSchema),
});

export const handler: ToolCallback<typeof InputSchema> = async (
  input: z.infer<typeof InputSchema>
) => {
  try {
    const n = input.n ?? 5;
    const excludeColors = input.excludeColors ?? [];
    const space = input.space ?? "lab";

    const results = getNearestTailwindColors(input.color, {
      n,
      excludeColors,
      space,
    }).map((result) => ({
      color: result.color,
      value: result.value,
      distance: result.distance,
    }));

    const output = { results };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(output),
        },
      ],
      structuredContent: output,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "unknown error finding colors";

    throw new Error(`tool failed for color "${input.color}": ${message}`);
  }
};

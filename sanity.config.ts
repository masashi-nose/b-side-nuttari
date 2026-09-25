"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: "B SIDE NUTTARI",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // GROQ をその場で試すツール（開発時のみ）
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
});

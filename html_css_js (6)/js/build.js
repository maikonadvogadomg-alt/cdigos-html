import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

async function buildAll() {
  const distDir = path.resolve(artifactDir, "dist");
  await rm(distDir, { recursive: true, force: true });

  console.log("🔨 Iniciando build...");

  await esbuild({
    // MUDE AQUI para seu arquivo principal
    entryPoints: [path.resolve(artifactDir, "src/index.js")], // ou index.ts, app.js, etc
    
    platform: "node",
    bundle: true,
    format: "esm",
    outdir: distDir,
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
    
    // Pacotes que NÃO podem ser empacotados
    external: [
      "*.node",
      "sqlite3",
      "better-sqlite3",
      "sharp",
      "canvas",
      "bcrypt",
    ],
    
    sourcemap: "linked",
    
    // Permite usar require() em código ESM
    banner: {
      js: \`import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    \`,
    },
  });

  console.log("✅ Build concluído!");
  console.log("📍 Arquivo gerado: dist/index.mjs");
}

buildAll().catch((err) => {
  console.error("❌ Erro no build:", err);
  process.exit(1);
});

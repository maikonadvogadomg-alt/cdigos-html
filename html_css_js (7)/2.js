const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const PORT = 18634;  // Porta diferente!

function resolveAsset(rel) {
  const candidates = [
      path.join(__dirname, "app", rel),
          path.join(__dirname, "..", "dist", rel),
            ];
              for (const c of candidates) {
                  if (fs.existsSync(c)) return c;
                    }
                      return null;
                      }

                      const MIME = {
                        ".html": "text/html; charset=utf-8",
                          ".js": "application/javascript; charset=utf-8",
                            ".css": "text/css; charset=utf-8",
                              ".json": "application/json",
                                ".svg": "image/svg+xml",
                                  ".png": "image/png",
                                    ".jpg": "image/jpeg",
                                      ".ico": "image/x-icon",
                                      };

                                      const server = http.createServer((req, res) => {
                                        let url = req.url.split("?")[0];
                                          if (url === "/" || url === "") url = "/index.html";

                                            const rel = url.replace(/^\//, "");
                                              const filePath = resolveAsset(rel);

                                                if (!filePath) {
                                                    // SPA fallback
                                                        const idx = resolveAsset("index.html");
                                                            if (idx) {
                                                                  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                                                                        res.end(fs.readFileSync(idx));
                                                                            } else {
                                                                                  res.writeHead(404);
                                                                                        res.end("Arquivo não encontrado");
                                                                                            }
                                                                                                return;
                                                                                                  }

                                                                                                    const ext = path.extname(filePath).toLowerCase();
                                                                                                      const mime = MIME[ext] || "application/octet-stream";
                                                                                                        res.writeHead(200, { "Content-Type": mime });
                                                                                                          res.end(fs.readFileSync(filePath));
                                                                                                          });

                                                                                                          server.listen(PORT, "127.0.0.1", () => {
                                                                                                            console.log(`\n  Assistente Jurídico rodando em: http://127.0.0.1:${PORT}\n`);
                                                                                                              exec(`start "" "http://127.0.0.1:${PORT}"`);
                                                                                                              });
                                                                                                              
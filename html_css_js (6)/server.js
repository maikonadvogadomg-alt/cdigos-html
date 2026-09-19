cd assistente - juridico
npm run build
npx cap init "Assistente Jurídico" com.assistente.juridico--web - dir dist
npx cap add android
npx cap sync android
npx cap open android


const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const PORT = process.env.PORT || 18633;
const APP_NAME = process.env.APP_NAME || "App";

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
                                        ".woff2": "font/woff2",
                                          ".woff": "font/woff",
                                            ".ttf": "font/ttf",
                                            };

                                            const server = http.createServer((req, res) => {
                                              let url = req.url.split("?")[0];
                                                if (url === "/" || url === "") url = "/index.html";

                                                  const rel = url.replace(/^\//, "");
                                                    const filePath = resolveAsset(rel);

                                                      if (!filePath) {
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
                                                                                                              const url = `http://127.0.0.1:${PORT}`;
                                                                                                                console.log(`\n  ${APP_NAME} rodando em: ${url}\n`);
                                                                                                                  
                                                                                                                    const cmd = os.platform() === "win32" 
                                                                                                                        ? `start "" "${url}"` 
                                                                                                                            : os.platform() === "darwin" 
                                                                                                                                ? `open "${url}"` 
                                                                                                                                    : `xdg-open "${url}"`;
                                                                                                                                      
                                                                                                                                        exec(cmd, (err) => {
                                                                                                                                            if (err) console.log("  Abra manualmente:", url);
                                                                                                                                              });
                                                                                                                                              });
                                                                                                                                              
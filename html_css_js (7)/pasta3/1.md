seu-monorepo/
├── pnpm-workspace.yaml          ← ARQUIVO MÁGICO (esqueceu deste!)
├── pnpm-lock.yaml               ← Lock file (não editar)
├── .npmrc                        ← Configuração npm
├── package.json                  ← ROOT (com catalog)
├── turbo.json                    ← Build orchestration
│
├── packages/
│   ├── api-client-react/
│   │   └── package.json
│   ├── ui-components/
│   │   └── package.json
│   └── shared-utils/
│       └── package.json
│
├── projects/
│   ├── code-editor/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── desktop/
│   │       └── package.json
│   │
│   ├── assistente-juridico/
│   │   ├── package.json
│   │   └── desktop/
│   │       └── package.json
│   │
│   ├── apk-builder/
│   │   └── package.json
│   │
│   └── site-extractor/
│       └── package.json
│
└── package-backups/
    ├── code-editor.json
    ├── assistente-juridico.json
    ├── apk-builder.json
    └── site-extractor.json

mkdir -p replit-config-ui




┌─────────────────────────────────────┐
│  ⚙️ Replit Config Manager            │
├─────────────────────────────────────┤
│                                     │
│  ⚡ AÇÕES RÁPIDAS                   │
│  [🔧 Setup] [♻️ Restaurar]          │
│                                     │
│  📦 package.json (Root)             │
│  Nome: monorepo-root                │
│  Versão: 1.0.0                      │
│  [💾 Salvar] [👁️ Visualizar]        │
│                                     │
│  🔗 pnpm-workspace.yaml             │
│  Packages: - 'packages/*'           │
│  React: 18.2.0                      │
│  [💾 Salvar] [👁️ Visualizar]        │
│                                     │
│  📁 Gerenciar Projetos              │
│  [💻 Code] [⚖️ Jurídico] [📱 APK]   │
│  Nome: @workspace/code-editor       │
│  [💾 Salvar] [👁️ Visualizar]        │
│                                     │
│  ⚡ turbo.json                      │
│  [💾 Salvar] [👁️ Visualizar]        │
│                                     │
│  🔧 .npmrc                          │
│  [💾 Salvar] [👁️ Visualizar]        │
│                                     │
│  📜 Scripts Shell                   │
│  [💾 Salvar] [👁️ Visualizar]        │
│                                     │
└─────────────────────────────────────┘


#!/bin/bash

# ===== CORES =====
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# ===== VARIÁVEIS =====
SELECTED_PROJECT=""
SELECTED_FILE=""

# ===== FUNÇÕES DE DISPLAY =====
clear_screen() {
  clear
}

show_header() {
  clear_screen
  echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC}  🚀 ${CYAN}REPLIT CONFIG MANAGER${NC} ${BLUE}║${NC}"
  echo -e "${BLUE}║${NC}  Gerencie seus arquivos sem sair do Shell!         ${BLUE}║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

show_menu() {
  show_header
  echo -e "${YELLOW}📋 MENU PRINCIPAL${NC}"
  echo ""
  echo -e "${CYAN}1${NC}) 📦 Editar package.json"
  echo -e "${CYAN}2${NC}) 🔗 Editar pnpm-workspace.yaml"
  echo -e "${CYAN}3${NC}) ⚡ Editar turbo.json"
  echo -e "${CYAN}4${NC}) 🔧 Editar .npmrc"
  echo -e "${CYAN}5${NC}) 📁 Gerenciar Projetos"
  echo -e "${CYAN}6${NC}) 📜 Gerenciar Scripts"
  echo -e "${CYAN}7${NC}) 🚀 Executar Setup Completo"
  echo -e "${CYAN}8${NC}) ♻️  Restaurar Backups"
  echo -e "${CYAN}9${NC}) 📊 Ver Status"
  echo -e "${CYAN}0${NC}) ❌ Sair"
  echo ""
  echo -n -e "${GREEN}Escolha uma opção: ${NC}"
}

# ===== EDITAR ARQUIVO =====
edit_file() {
  local file=$1
  local title=$2
  
  show_header
  echo -e "${YELLOW}📝 Editando: ${CYAN}$title${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  
  if [ ! -f "$file" ]; then
    echo -e "${RED}❌ Arquivo não encontrado: $file${NC}"
    sleep 2
    return
  fi
  
  # Mostrar conteúdo atual
  echo -e "${CYAN}Conteúdo atual:${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  cat "$file" | head -20
  echo ""
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  
  echo -e "${YELLOW}Opções:${NC}"
  echo -e "${CYAN}1${NC}) Editar com nano"
  echo -e "${CYAN}2${NC}) Editar com vi"
  echo -e "${CYAN}3${NC}) Ver arquivo completo"
  echo -e "${CYAN}4${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
  read choice
  
  case $choice in
    1) nano "$file" ;;
    2) vi "$file" ;;
    3) less "$file" ;;
    4) return ;;
  esac
  
  echo -e "${GREEN}✅ Arquivo atualizado!${NC}"
  sleep 2
}

# ===== GERENCIAR PROJETOS =====
manage_projects() {
  show_header
  echo -e "${YELLOW}📁 GERENCIAR PROJETOS${NC}"
  echo ""
  
  local projects=(
    "code-editor:💻:SK Code Editor"
    "assistente-juridico:⚖️:Assistente Jurídico"
    "apk-builder:📱:APK Builder"
    "site-extractor:🌐:Site Extractor"
  )
  
  for i in "${!projects[@]}"; do
    IFS=':' read -r id icon name <<< "${projects[$i]}"
    echo -e "${CYAN}$((i+1))${NC}) $icon $name"
  done
  
  echo -e "${CYAN}0${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha um projeto: ${NC}"
  read choice
  
  if [ "$choice" -eq 0 ]; then
    return
  fi
  
  if [ "$choice" -ge 1 ] && [ "$choice" -le 4 ]; then
    local selected="${projects[$((choice-1))]}"
    IFS=':' read -r id icon name <<< "$selected"
    SELECTED_PROJECT=$id
    edit_project_menu "$id" "$name"
  fi
}

edit_project_menu() {
  local project=$1
  local name=$2
  
  show_header
  echo -e "${YELLOW}📝 Editar: ${CYAN}$name${NC}"
  echo ""
  
  echo -e "${CYAN}1${NC}) Editar package.json"
  echo -e "${CYAN}2${NC}) Editar vite.config.ts"
  echo -e "${CYAN}3${NC}) Editar tsconfig.json"
  echo -e "${CYAN}4${NC}) Ver estrutura"
  echo -e "${CYAN}5${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
  read choice
  
  case $choice in
    1) edit_file "projects/$project/package.json" "projects/$project/package.json" ;;
    2) edit_file "projects/$project/vite.config.ts" "vite.config.ts" ;;
    3) edit_file "projects/$project/tsconfig.json" "tsconfig.json" ;;
    4) 
      show_header
      echo -e "${CYAN}Estrutura de $project:${NC}"
      tree "projects/$project" -L 2 2>/dev/null || find "projects/$project" -maxdepth 2 -type f
      echo ""
      read -p "Pressione Enter para continuar..."
      ;;
    5) return ;;
  esac
}

# ===== GERENCIAR SCRIPTS =====
manage_scripts() {
  show_header
  echo -e "${YELLOW}📜 GERENCIAR SCRIPTS${NC}"
  echo ""
  
  local scripts=(
    "setup-complete.sh:🔧:Setup Completo"
    "setup-monorepo.sh:🚀:Setup Monorepo"
    "restore-packages.sh:♻️:Restaurar Packages"
    "protect-packages.sh:🔒:Proteger Packages"
  )
  
  for i in "${!scripts[@]}"; do
    IFS=':' read -r file icon name <<< "${scripts[$i]}"
    echo -e "${CYAN}$((i+1))${NC}) $icon $name"
  done
  
  echo -e "${CYAN}0${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha um script: ${NC}"
  read choice
  
  if [ "$choice" -eq 0 ]; then
    return
  fi
  
  if [ "$choice" -ge 1 ] && [ "$choice" -le 4 ]; then
    local selected="${scripts[$((choice-1))]}"
    IFS=':' read -r file icon name <<< "$selected"
    edit_file "$file" "$name"
  fi
}

# ===== EXECUTAR SETUP =====
run_setup() {
  show_header
  echo -e "${YELLOW}🚀 EXECUTAR SETUP${NC}"
  echo ""
  
  echo -e "${CYAN}1${NC}) Setup Completo (todos os projetos)"
  echo -e "${CYAN}2${NC}) Setup de um projeto específico"
  echo -e "${CYAN}3${NC}) Apenas instalar dependências"
  echo -e "${CYAN}4${NC}) Apenas fazer build"
  echo -e "${CYAN}5${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
  read choice
  
  case $choice in
    1)
      echo -e "${YELLOW}⏳ Executando setup completo...${NC}"
      bash setup-complete.sh
      ;;
    2)
      manage_projects
      if [ ! -z "$SELECTED_PROJECT" ]; then
        echo -e "${YELLOW}⏳ Instalando dependências de $SELECTED_PROJECT...${NC}"
        cd "projects/$SELECTED_PROJECT"
        pnpm install
        cd ../..
      fi
      ;;
    3)
      echo -e "${YELLOW}⏳ Instalando dependências...${NC}"
      pnpm install
      ;;
    4)
      echo -e "${YELLOW}⏳ Fazendo build...${NC}"
      pnpm run build
      ;;
    5) return ;;
  esac
  
  echo -e "${GREEN}✅ Concluído!${NC}"
  sleep 2
}

# ===== RESTAURAR BACKUPS =====
restore_backups() {
  show_header
  echo -e "${YELLOW}♻️  RESTAURAR BACKUPS${NC}"
  echo ""
  
  echo -e "${CYAN}1${NC}) Restaurar todos os package.json"
  echo -e "${CYAN}2${NC}) Restaurar um projeto específico"
  echo -e "${CYAN}3${NC}) Ver backups disponíveis"
  echo -e "${CYAN}4${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
  read choice
  
  case $choice in
    1)
      echo -e "${YELLOW}⏳ Restaurando todos os backups...${NC}"
      bash restore-packages.sh
      echo -e "${GREEN}✅ Restauração concluída!${NC}"
      ;;
    2)
      manage_projects
      if [ ! -z "$SELECTED_PROJECT" ]; then
        if [ -f "package-backups/$SELECTED_PROJECT.json" ]; then
          cp "package-backups/$SELECTED_PROJECT.json" "projects/$SELECTED_PROJECT/package.json"
          echo -e "${GREEN}✅ $SELECTED_PROJECT restaurado!${NC}"
        else
          echo -e "${RED}❌ Backup não encontrado para $SELECTED_PROJECT${NC}"
        fi
      fi
      ;;
    3)
      show_header
      echo -e "${CYAN}Backups disponíveis:${NC}"
      ls -lh package-backups/ 2>/dev/null || echo -e "${RED}Nenhum backup encontrado${NC}"
      echo ""
      read -p "Pressione Enter para continuar..."
      ;;
    4) return ;;
  esac
  
  sleep 2
}

# ===== VER STATUS =====
show_status() {
  show_header
  echo -e "${YELLOW}📊 STATUS DO MONOREPO${NC}"
  echo ""
  
  echo -e "${CYAN}Node.js:${NC}"
  node -v
  echo ""
  
  echo -e "${CYAN}pnpm:${NC}"
  pnpm -v
  echo ""
  
  echo -e "${CYAN}Projetos:${NC}"
  for dir in projects/*/; do
    if [ -d "$dir" ]; then
      name=$(basename "$dir")
      if [ -f "$dir/package.json" ]; then
        echo -e "  ✅ $name"
      else
        echo -e "  ❌ $name (sem package.json)"
      fi
    fi
  done
  echo ""
  
  echo -e "${CYAN}Arquivos de configuração:${NC}"
  [ -f "pnpm-workspace.yaml" ] && echo -e "  ✅ pnpm-workspace.yaml" || echo -e "  ❌ pnpm-workspace.yaml"
  [ -f "turbo.json" ] && echo -e "  ✅ turbo.json" || echo -e "  ❌ turbo.json"
  [ -f ".npmrc" ] && echo -e "  ✅ .npmrc" || echo -e "  ❌ .npmrc"
  [ -f "package.json" ] && echo -e "  ✅ package.json (root)" || echo -e "  ❌ package.json (root)"
  echo ""
  
  echo -e "${CYAN}Tamanho dos projetos:${NC}"
  du -sh projects/* 2>/dev/null | sed 's/^/  /'
  echo ""
  
  read -p "Pressione Enter para continuar..."
}

# ===== MAIN LOOP =====
main() {
  while true; do
    show_menu
    read choice
    
    case $choice in
      1) edit_file "package.json" "package.json (Root)" ;;
      2) edit_file "pnpm-workspace.yaml" "pnpm-workspace.yaml" ;;
      3) edit_file "turbo.json" "turbo.json" ;;
      4) edit_file ".npmrc" ".npmrc" ;;
      5) manage_projects ;;
      6) manage_scripts ;;
      7) run_setup ;;
      8) restore_backups ;;
      9) show_status ;;
      0)
        clear_screen
        echo -e "${GREEN}✅ Até logo!${NC}"
        exit 0
        ;;
      *)
        echo -e "${RED}❌ Opção inválida!${NC}"
        sleep 1
        ;;
    esac
  done
}

# ===== INICIAR =====





{
  "scripts": {
    "config": "./interactive-setup.sh",
    "setup": "bash setup-complete.sh",
    "restore": "bash restore-packages.sh"
  }
}



#!/bin/bash

# ===== CORES =====
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ===== FUNÇÕES DE DISPLAY =====
clear_screen() {
  clear
}

show_header() {
  clear_screen
  echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC}  ⚙️ ${CYAN}AUTO CONFIG - REPLIT${NC} ${BLUE}║${NC}"
  echo -e "${BLUE}║${NC}  Modifique arquivos automaticamente!                ${BLUE}║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

# ===== CRIAR/ATUALIZAR package.json ROOT =====
create_root_package() {
  show_header
  echo -e "${YELLOW}📦 Criando package.json (Root)${NC}"
  echo ""
  
  cat > package.json << 'EOF'
{
  "name": "monorepo-root",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Monorepo com múltiplos projetos",
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "build:all": "turbo run build --filter='./projects/*'",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules",
    "setup": "bash setup-complete.sh",
    "config": "bash auto-config.sh",
    "restore": "bash restore-packages.sh"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "catalog:"
  },
  "pnpm": {
    "overrides": {
      "react": "catalog:",
      "react-dom": "catalog:",
      "typescript": "catalog:"
    }
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
EOF

  echo -e "${GREEN}✅ package.json criado!${NC}"
  sleep 1
}

# ===== CRIAR pnpm-workspace.yaml =====
create_pnpm_workspace() {
  show_header
  echo -e "${YELLOW}🔗 Criando pnpm-workspace.yaml${NC}"
  echo ""
  
  cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
  - 'projects/*'
  - 'projects/*/desktop'

catalog:
  react: 18.2.0
  react-dom: 18.2.0
  typescript: 5.3.0
  vite: 5.0.0
  '@vitejs/plugin-react': 4.2.0
  '@tailwindcss/vite': 4.0.0
  'tailwind-merge': 2.2.0
  'class-variance-authority': 0.7.0
  'framer-motion': 10.16.0
  'lucide-react': 0.263.1
  '@tanstack/react-query': 5.25.0
  zod: 3.22.4
EOF

  echo -e "${GREEN}✅ pnpm-workspace.yaml criado!${NC}"
  sleep 1
}

# ===== CRIAR turbo.json =====
create_turbo_json() {
  show_header
  echo -e "${YELLOW}⚡ Criando turbo.json${NC}"
  echo ""
  
  cat > turbo.json << 'EOF'
{
  "extends": ["//"],
  "globalDependencies": ["**/.env.local", "**/.env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "dist-apk/**", "dist-desktop/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "typecheck": {
      "outputs": []
    }
  }
}
EOF

  echo -e "${GREEN}✅ turbo.json criado!${NC}"
  sleep 1
}

# ===== CRIAR .npmrc =====
create_npmrc() {
  show_header
  echo -e "${YELLOW}🔧 Criando .npmrc${NC}"
  echo ""
  
  cat > .npmrc << 'EOF'
shamefully-hoist=true
strict-peer-dependencies=false
auto-install-peers=true
EOF

  echo -e "${GREEN}✅ .npmrc criado!${NC}"
  sleep 1
}

# ===== CRIAR package.json PROJETOS =====
create_project_package() {
  local project=$1
  local name=$2
  local version=$3
  local desc=$4
  
  show_header
  echo -e "${YELLOW}📦 Criando package.json para ${CYAN}$project${NC}"
  echo ""
  
  mkdir -p "projects/$project"
  
  cat > "projects/$project/package.json" << EOF
{
  "name": "@workspace/$project",
  "version": "$version",
  "private": true,
  "type": "module",
  "description": "$desc",
  "scripts": {
    "dev": "vite --config vite.config.ts --host 0.0.0.0",
    "build": "vite build --config vite.config.ts",
    "serve": "vite preview --config vite.config.ts --host 0.0.0.0",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "build:web": "vite build --config vite.config.apk.ts",
    "cap:sync": "npx cap sync android",
    "cap:open": "npx cap open android",
    "build:apk": "npm run build:web && npx cap sync android",
    "clean": "rm -rf dist node_modules"
  },
  "devDependencies": {
    "@capacitor/android": "^8.3.0",
    "@capacitor/cli": "^8.3.0",
    "@vitejs/plugin-react": "catalog:",
    "typescript": "catalog:",
    "vite": "catalog:"
  },
  "dependencies": {
    "@capacitor/core": "^8.3.0",
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

  echo -e "${GREEN}✅ package.json de $project criado!${NC}"
  sleep 1
}

# ===== CRIAR DESKTOP SERVER =====
create_desktop_server() {
  local project=$1
  
  show_header
  echo -e "${YELLOW}🖥️ Criando server.js para ${CYAN}$project${NC}"
  echo ""
  
  mkdir -p "projects/$project/desktop/app"
  
  cat > "projects/$project/desktop/server.js" << 'EOF'
#!/usr/bin/env node
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const PORT = process.env.PORT || 18633;
const APP_NAME = process.env.APP_NAME || "App";

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

function resolveAsset(rel) {
  const candidates = [
    path.join(__dirname, "app", rel),
    path.join(__dirname, "..", "dist", rel),
  ];
  
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

const server = http.createServer((req, res) => {
  try {
    let url = (req.url || "/").split("?")[0];
    if (url === "/" || url === "") url = "/index.html";

    const rel = url.replace(/^\//, "");
    const filePath = resolveAsset(rel);

    if (filePath && fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = MIME[ext] || "application/octet-stream";
      const data = fs.readFileSync(filePath);
      
      res.writeHead(200, {
        "Content-Type": mime,
        "Cache-Control": "no-cache",
      });
      res.end(data);
    } else {
      const indexPath = resolveAsset("index.html");
      if (indexPath && fs.existsSync(indexPath)) {
        const data = fs.readFileSync(indexPath);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
        });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("index.html não encontrado");
      }
    }
  } catch (err) {
    console.error("Erro:", err);
    res.writeHead(500);
    res.end("Erro interno");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`\n  ✅ ${APP_NAME} rodando em: ${url}\n`);
});
EOF

  chmod +x "projects/$project/desktop/server.js"
  
  cat > "projects/$project/desktop/package.json" << EOF
{
  "name": "$project-desktop",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build:win": "pkg server.js --target node18-win-x64 --output ../dist-desktop/$project.exe"
  },
  "dependencies": {},
  "devDependencies": {
    "pkg": "^5.14.4"
  }
}
EOF

  echo -e "${GREEN}✅ Desktop configurado para $project!${NC}"
  sleep 1
}

# ===== MENU PRINCIPAL =====
show_menu() {
  show_header
  echo -e "${YELLOW}📋 O QUE DESEJA FAZER?${NC}"
  echo ""
  echo -e "${CYAN}1${NC}) ✨ Setup Completo (TUDO)"
  echo -e "${CYAN}2${NC}) 📦 Criar package.json (Root)"
  echo -e "${CYAN}3${NC}) 🔗 Criar pnpm-workspace.yaml"
  echo -e "${CYAN}4${NC}) ⚡ Criar turbo.json"
  echo -e "${CYAN}5${NC}) 🔧 Criar .npmrc"
  echo -e "${CYAN}6${NC}) 📁 Configurar Projeto"
  echo -e "${CYAN}7${NC}) 🖥️ Criar Desktop Server"
  echo -e "${CYAN}8${NC}) 🔄 Atualizar Tudo"
  echo -e "${CYAN}0${NC}) ❌ Sair"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
}

# ===== SETUP COMPLETO =====
setup_completo() {
  show_header
  echo -e "${YELLOW}🚀 SETUP COMPLETO${NC}"
  echo ""
  echo -e "${CYAN}Criando estrutura do monorepo...${NC}"
  echo ""
  
  # Criar arquivos root
  create_root_package
  create_pnpm_workspace
  create_turbo_json
  create_npmrc
  
  # Criar projetos
  local projects=(
    "code-editor:0.0.0:SK Code Editor"
    "assistente-juridico:4.0.0:Assistente Jurídico"
    "apk-builder:1.0.0:APK Builder"
    "site-extractor:1.0.0:Site Extractor"
  )
  
  for project_info in "${projects[@]}"; do
    IFS=':' read -r id version desc <<< "$project_info"
    create_project_package "$id" "@workspace/$id" "$version" "$desc"
    create_desktop_server "$id"
  done
  
  show_header
  echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║${NC}  ✅ SETUP COMPLETO!                                  ${GREEN}║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${CYAN}Próximos passos:${NC}"
  echo -e "  1️⃣  ${YELLOW}pnpm install${NC}"
  echo -e "  2️⃣  ${YELLOW}pnpm run build${NC}"
  echo -e "  3️⃣  ${YELLOW}cd projects/code-editor && pnpm run dev${NC}"
  echo ""
  read -p "Pressione Enter para continuar..."
}

# ===== CONFIGURAR PROJETO =====
configure_project() {
  show_header
  echo -e "${YELLOW}📁 CONFIGURAR PROJETO${NC}"
  echo ""
  
  local projects=(
    "code-editor:💻:SK Code Editor"
    "assistente-juridico:⚖️:Assistente Jurídico"
    "apk-builder:📱:APK Builder"
    "site-extractor:🌐:Site Extractor"
  )
  
  for i in "${!projects[@]}"; do
    IFS=':' read -r id icon name <<< "${projects[$i]}"
    echo -e "${CYAN}$((i+1))${NC}) $icon $name"
  done
  
  echo -e "${CYAN}0${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
  read choice
  
  if [ "$choice" -ge 1 ] && [ "$choice" -le 4 ]; then
    local selected="${projects[$((choice-1))]}"
    IFS=':' read -r id icon name <<< "$selected"
    
    show_header
    echo -e "${YELLOW}Configurando: ${CYAN}$name${NC}"
    echo ""
    echo -n "Nome do projeto (padrão: @workspace/$id): "
    read proj_name
    proj_name=${proj_name:-"@workspace/$id"}
    
    echo -n "Versão (padrão: 1.0.0): "
    read proj_version
    proj_version=${proj_version:-"1.0.0"}
    
    echo -n "Descrição (padrão: $name): "
    read proj_desc
    proj_desc=${proj_desc:-"$name"}
    
    create_project_package "$id" "$proj_name" "$proj_version" "$proj_desc"
    create_desktop_server "$id"
  fi
}

# ===== ATUALIZAR TUDO =====
update_all() {
  show_header
  echo -e "${YELLOW}🔄 ATUALIZANDO TUDO${NC}"
  echo ""
  
  echo -e "${CYAN}Atualizando arquivos root...${NC}"
  create_root_package
  create_pnpm_workspace
  create_turbo_json
  create_npmrc
  
  echo ""
  echo -e "${CYAN}Atualizando projetos...${NC}"
  
  local projects=(
    "code-editor:0.0.0:SK Code Editor"
    "assistente-juridico:4.0.0:Assistente Jurídico"
    "apk-builder:1.0.0:APK Builder"
    "site-extractor:1.0.0:Site Extractor"
  )
  
  for project_info in "${projects[@]}"; do
    IFS=':' read -r id version desc <<< "$project_info"
    create_project_package "$id" "@workspace/$id" "$version" "$desc"
  done
  
  show_header
  echo -e "${GREEN}✅ Tudo atualizado!${NC}"
  sleep 2
}

# ===== MAIN LOOP =====
main() {
  while true; do
    show_menu
    read choice
    
    case $choice in
      1) setup_completo ;;
      2) create_root_package ;;
      3) create_pnpm_workspace ;;
      4) create_turbo_json ;;
      5) create_npmrc ;;
      6) configure_project ;;
      7)
        show_header
        echo -e "${YELLOW}🖥️ CRIAR DESKTOP SERVER${NC}"
        echo ""
        echo -e "${CYAN}1${NC}) Code Editor"
        echo -e "${CYAN}2${NC}) Assistente Jurídico"
        echo -e "${CYAN}3${NC}) APK Builder"
        echo -e "${CYAN}4${NC}) Site Extractor"
        echo ""
        echo -n -e "${GREEN}Escolha: ${NC}"
        read proj_choice
        
        case $proj_choice in
          1) create_desktop_server "code-editor" ;;
          2) create_desktop_server "assistente-juridico" ;;
          3) create_desktop_server "apk-builder" ;;
          4) create_desktop_server "site-extractor" ;;
        esac
        ;;
      8) update_all ;;
      0)
        clear_screen
        echo -e "${GREEN}✅ Até logo!${NC}"
        exit 0
        ;;
      *)
        echo -e "${RED}❌ Opção inválida!${NC}"
        sleep 1
        ;;
    esac
  done
}

# ===== INICIAR =====
main


╔════════════════════════════════════════════════════════╗
║  ⚙️ AUTO CONFIG - REPLIT                               ║
║  Modifique arquivos automaticamente!                   ║
╚════════════════════════════════════════════════════════╝

📋 O QUE DESEJA FAZER?

1) ✨ Setup Completo (TUDO)
2) 📦 Criar package.json (Root)
3) 🔗 Criar pnpm-workspace.yaml
4) ⚡ Criar turbo.json
5) 🔧 Criar .npmrc
6) 📁 Configurar Projeto
7) 🖥️ Criar Desktop Server
8) 🔄 Atualizar Tudo
0) ❌ Sair

Escolha: 1


seu-monorepo/
├── package.json              ✅ CRIADO
├── pnpm-workspace.yaml       ✅ CRIADO
├── turbo.json                ✅ CRIADO
├── .npmrc                    ✅ CRIADO
├── auto-config.sh            ✅ CRIADO
│
└── projects/
    ├── code-editor/
    │   ├── package.json      ✅ CRIADO
    │   └── desktop/
    │       ├── server.js     ✅ CRIADO
    │       ├── package.json  ✅ CRIADO
    │       └── app/          ✅ CRIADO
    │
    ├── assistente-juridico/
    │   ├── package.json      ✅ CRIADO
    │   └── desktop/          ✅ CRIADO
    │
    ├── apk-builder/
    │   ├── package.json      ✅ CRIADO
    │   └── desktop/          ✅ CRIADO
    │
    └── site-extractor/
        ├── package.json      ✅ CRIADO
        └── desktop/          ✅ CRIADO




#!/bin/bash

# ===== CORES =====
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# ===== VARIÁVEIS =====
SCRIPTS_DIR="scripts"
WORKSPACE_ROOT=$(pwd)

# ===== FUNÇÕES =====
clear_screen() {
  clear
}

show_header() {
  clear_screen
  echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC}  📦 ${CYAN}BUNDLE MANAGER${NC} ${BLUE}║${NC}"
  echo -e "${BLUE}║${NC}  Gerencie PWAs e Expo Bundles                       ${BLUE}║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

# ===== CRIAR bundle-webapps.mjs =====
create_bundle_webapps() {
  show_header
  echo -e "${YELLOW}📦 Criando bundle-webapps.mjs${NC}"
  echo ""
  
  mkdir -p "$SCRIPTS_DIR"
  
  cat > "$SCRIPTS_DIR/bundle-webapps.mjs" << 'EOF'
// Gera módulos TS com conteúdo base64 dos PWAs buildados
// Uso: node scripts/bundle-webapps.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function readDirRecursive(dir, base) {
  const result = {};
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      Object.assign(result, readDirRecursive(full, base));
    } else {
      result[rel] = fs.readFileSync(full).toString("base64");
    }
  }
  return result;
}

function generateModule(varName, files) {
  const entries = Object.entries(files)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
    .join(",\n");
  return `// Auto-gerado — NÃO EDITE. Execute: node scripts/bundle-webapps.mjs\n// Gerado em: ${new Date().toISOString()}\nexport const ${varName}: Record<string, string> = {\n${entries}\n};\n`;
}

// Assistente Jurídico
const juridicoDir = path.join(__dirname, "../projects/assistente-juridico/dist");
const juridicoFiles = readDirRecursive(juridicoDir, juridicoDir);
const juridicoCount = Object.keys(juridicoFiles).length;
const juridicoModule = generateModule("JURIDICO_FILES", juridicoFiles);
const juridicoOut = path.join(root, "assets/juridico-bundle.generated.ts");
fs.mkdirSync(path.dirname(juridicoOut), { recursive: true });
fs.writeFileSync(juridicoOut, juridicoModule);
console.log(`✅ Jurídico: ${juridicoCount} arquivos → assets/juridico-bundle.generated.ts`);

// SK Code Editor
const editorDir = path.join(__dirname, "../projects/code-editor/dist");
const editorFiles = readDirRecursive(editorDir, editorDir);
const editorCount = Object.keys(editorFiles).length;
const editorModule = generateModule("EDITOR_FILES", editorFiles);
const editorOut = path.join(root, "assets/editor-bundle.generated.ts");
fs.mkdirSync(path.dirname(editorOut), { recursive: true });
fs.writeFileSync(editorOut, editorModule);
console.log(`✅ Editor: ${editorCount} arquivos → assets/editor-bundle.generated.ts`);

// APK Builder
const apkDir = path.join(__dirname, "../projects/apk-builder/dist");
const apkFiles = readDirRecursive(apkDir, apkDir);
const apkCount = Object.keys(apkFiles).length;
const apkModule = generateModule("APK_FILES", apkFiles);
const apkOut = path.join(root, "assets/apk-bundle.generated.ts");
fs.mkdirSync(path.dirname(apkOut), { recursive: true });
fs.writeFileSync(apkOut, apkModule);
console.log(`✅ APK Builder: ${apkCount} arquivos → assets/apk-bundle.generated.ts`);

console.log("\n🎉 Bundles gerados com sucesso!");
console.log(`Total: ${juridicoCount + editorCount + apkCount} arquivos embutidos.`);
EOF

  chmod +x "$SCRIPTS_DIR/bundle-webapps.mjs"
  echo -e "${GREEN}✅ bundle-webapps.mjs criado!${NC}"
  sleep 1
}

# ===== CRIAR build-expo-static.mjs =====
create_build_expo_static() {
  show_header
  echo -e "${YELLOW}🚀 Criando build-expo-static.mjs${NC}"
  echo ""
  
  mkdir -p "$SCRIPTS_DIR"
  
  cat > "$SCRIPTS_DIR/build-expo-static.mjs" << 'EOF'
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

let metroProcess = null;

function findWorkspaceRoot(startDir) {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  throw new Error("Could not find workspace root (no pnpm-workspace.yaml found)");
}

const workspaceRoot = findWorkspaceRoot(projectRoot);
const basePath = (process.env.BASE_PATH || "/").replace(/\/+$/, "");

function exitWithError(message) {
  console.error(message);
  if (metroProcess) {
    metroProcess.kill();
  }
  process.exit(1);
}

function setupSignalHandlers() {
  const cleanup = () => {
    if (metroProcess) {
      console.log("Cleaning up Metro process...");
      metroProcess.kill();
    }
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup);
}

function stripProtocol(domain) {
  let urlString = domain.trim();
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = `https://${urlString}`;
  }
  return new URL(urlString).host;
}

function getDeploymentDomain() {
  if (process.env.REPLIT_INTERNAL_APP_DOMAIN) {
    return stripProtocol(process.env.REPLIT_INTERNAL_APP_DOMAIN);
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    return stripProtocol(process.env.REPLIT_DEV_DOMAIN);
  }
  if (process.env.EXPO_PUBLIC_DOMAIN) {
    return stripProtocol(process.env.EXPO_PUBLIC_DOMAIN);
  }
  console.error("ERROR: No deployment domain found. Set REPLIT_INTERNAL_APP_DOMAIN, REPLIT_DEV_DOMAIN, or EXPO_PUBLIC_DOMAIN");
  process.exit(1);
}

function prepareDirectories(timestamp) {
  console.log("Preparing build directories...");
  const staticBuild = path.join(projectRoot, "static-build");
  if (fs.existsSync(staticBuild)) {
    fs.rmSync(staticBuild, { recursive: true });
  }

  const dirs = [
    path.join(staticBuild, timestamp, "_expo", "static", "js", "ios"),
    path.join(staticBuild, timestamp, "_expo", "static", "js", "android"),
    path.join(staticBuild, "ios"),
    path.join(staticBuild, "android"),
  ];

  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
  }
  console.log("Build:", timestamp);
}

function clearMetroCache() {
  console.log("Clearing Metro cache...");
  const cacheDirs = [
    path.join(projectRoot, ".metro-cache"),
    path.join(projectRoot, "node_modules/.cache/metro"),
  ];

  for (const dir of cacheDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  console.log("Cache cleared");
}

async function checkMetroHealth() {
  try {
    const response = await fetch("http://localhost:8081/status", {
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function startMetro(expoPublicDomain, expoPublicReplId) {
  const isRunning = await checkMetroHealth();
  if (isRunning) {
    console.log("Metro already running");
    return;
  }

  console.log("Starting Metro...");
  const env = {
    ...process.env,
    EXPO_PUBLIC_DOMAIN: expoPublicDomain,
    EXPO_PUBLIC_REPL_ID: expoPublicReplId,
  };

  metroProcess = spawn("pnpm", ["exec", "expo", "start", "--no-dev", "--minify", "--localhost"], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
    cwd: projectRoot,
    env,
  });

  if (metroProcess.stdout) {
    metroProcess.stdout.on("data", (data) => {
      const output = data.toString().trim();
      if (output) console.log(`[Metro] ${output}`);
    });
  }

  for (let i = 0; i < 60; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const healthy = await checkMetroHealth();
    if (healthy) {
      console.log("Metro ready");
      return;
    }
  }

  console.error("Metro timeout");
  process.exit(1);
}

async function main() {
  console.log("Building static Expo Go deployment...");
  setupSignalHandlers();

  const domain = getDeploymentDomain();
  const expoPublicReplId = process.env.REPL_ID || process.env.EXPO_PUBLIC_REPL_ID;
  const baseUrl = `https://${domain}`;
  const timestamp = `${Date.now()}-${process.pid}`;

  prepareDirectories(timestamp);
  clearMetroCache();
  await startMetro(domain, expoPublicReplId);

  console.log("Build complete! Deploy to:", baseUrl);

  if (metroProcess) {
    metroProcess.kill();
  }
  process.exit(0);
}

main().catch((error) => {
  console.error("Build failed:", error.message);
  if (metroProcess) {
    metroProcess.kill();
  }
  process.exit(1);
});
EOF

  chmod +x "$SCRIPTS_DIR/build-expo-static.mjs"
  echo -e "${GREEN}✅ build-expo-static.mjs criado!${NC}"
  sleep 1
}

# ===== MENU PRINCIPAL =====
show_menu() {
  show_header
  echo -e "${YELLOW}📦 GERENCIADOR DE BUNDLES${NC}"
  echo ""
  echo -e "${CYAN}1${NC}) 📦 Bundle PWAs (base64)"
  echo -e "${CYAN}2${NC}) 🚀 Build Expo Static"
  echo -e "${CYAN}3${NC}) 🔄 Executar Ambos"
  echo -e "${CYAN}4${NC}) 📁 Ver Status dos Bundles"
  echo -e "${CYAN}5${NC}) 🗑️ Limpar Cache Metro"
  echo -e "${CYAN}6${NC}) 📊 Ver Tamanho dos Bundles"
  echo -e "${CYAN}7${NC}) ⚙️ Criar Scripts"
  echo -e "${CYAN}0${NC}) ❌ Sair"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
}

# ===== EXECUTAR BUNDLE WEBAPPS =====
run_bundle_webapps() {
  show_header
  echo -e "${YELLOW}📦 Executando Bundle PWAs${NC}"
  echo ""
  
  if [ ! -f "$SCRIPTS_DIR/bundle-webapps.mjs" ]; then
    echo -e "${RED}❌ bundle-webapps.mjs não encontrado!${NC}"
    sleep 2
    return
  fi
  
  echo -e "${CYAN}Processando PWAs...${NC}"
  node "$SCRIPTS_DIR/bundle-webapps.mjs"
  
  echo ""
  echo -e "${GREEN}✅ Bundle concluído!${NC}"
  sleep 2
}

# ===== EXECUTAR BUILD EXPO =====
run_build_expo() {
  show_header
  echo -e "${YELLOW}🚀 Executando Build Expo Static${NC}"
  echo ""
  
  if [ ! -f "$SCRIPTS_DIR/build-expo-static.mjs" ]; then
    echo -e "${RED}❌ build-expo-static.mjs não encontrado!${NC}"
    sleep 2
    return
  fi
  
  echo -e "${CYAN}Iniciando Metro e gerando bundles...${NC}"
  echo -e "${YELLOW}⏳ Isso pode levar vários minutos...${NC}"
  echo ""
  
  node "$SCRIPTS_DIR/build-expo-static.mjs"
  
  echo ""
  echo -e "${GREEN}✅ Build Expo concluído!${NC}"
  sleep 2
}

# ===== EXECUTAR AMBOS =====
run_both() {
  show_header
  echo -e "${YELLOW}🔄 Executando Ambos${NC}"
  echo ""
  
  echo -e "${CYAN}1. Bundle PWAs...${NC}"
  run_bundle_webapps
  
  echo ""
  echo -e "${CYAN}2. Build Expo...${NC}"
  run_build_expo
  
  show_header
  echo -e "${GREEN}✅ Tudo concluído!${NC}"
  sleep 2
}

# ===== VER STATUS =====
show_bundle_status() {
  show_header
  echo -e "${YELLOW}📁 STATUS DOS BUNDLES${NC}"
  echo ""
  
  echo -e "${CYAN}Arquivos gerados:${NC}"
  [ -d "assets" ] && {
    echo -e "  ${GREEN}assets/${NC}"
    ls -lh assets/*.generated.ts 2>/dev/null || echo "    (nenhum arquivo gerado)"
  } || echo "  (pasta assets não existe)"
  
  echo ""
  echo -e "${CYAN}Static Build:${NC}"
  [ -d "static-build" ] && {
    echo -e "  ${GREEN}static-build/${NC}"
    du -sh static-build/* 2>/dev/null | sed 's/^/    /'
  } || echo "  (pasta static-build não existe)"
  
  echo ""
  echo -e "${CYAN}Scripts:${NC}"
  [ -f "$SCRIPTS_DIR/bundle-webapps.mjs" ] && echo -e "  ${GREEN}✅ bundle-webapps.mjs${NC}" || echo -e "  ${RED}❌ bundle-webapps.mjs${NC}"
  [ -f "$SCRIPTS_DIR/build-expo-static.mjs" ] && echo -e "  ${GREEN}✅ build-expo-static.mjs${NC}" || echo -e "  ${RED}❌ build-expo-static.mjs${NC}"
  
  echo ""
  read -p "Pressione Enter para continuar..."
}

# ===== LIMPAR CACHE =====
clear_metro_cache() {
  show_header
  echo -e "${YELLOW}🗑️ Limpando Cache Metro${NC}"
  echo ""
  
  echo -e "${CYAN}Removendo caches...${NC}"
  rm -rf .metro-cache 2>/dev/null
  rm -rf node_modules/.cache/metro 2>/dev/null
  
  echo -e "${GREEN}✅ Cache limpo!${NC}"
  sleep 2
}

# ===== VER TAMANHO =====
show_bundle_sizes() {
  show_header
  echo -e "${YELLOW}📊 TAMANHO DOS BUNDLES${NC}"
  echo ""
  
  echo -e "${CYAN}Projetos:${NC}"
  du -sh projects/*/dist 2>/dev/null | sed 's/^/  /'
  
  echo ""
  echo -e "${CYAN}Assets gerados:${NC}"
  du -sh assets 2>/dev/null | sed 's/^/  /' || echo "  (nenhum)"
  
  echo ""
  echo -e "${CYAN}Static Build:${NC}"
  du -sh static-build 2>/dev/null | sed 's/^/  /' || echo "  (nenhum)"
  
  echo ""
  read -p "Pressione Enter para continuar..."
}

# ===== CRIAR SCRIPTS =====
create_scripts() {
  show_header
  echo -e "${YELLOW}⚙️ CRIAR SCRIPTS${NC}"
  echo ""
  
  echo -e "${CYAN}1${NC}) Criar bundle-webapps.mjs"
  echo -e "${CYAN}2${NC}) Criar build-expo-static.mjs"
  echo -e "${CYAN}3${NC}) Criar ambos"
  echo -e "${CYAN}0${NC}) Voltar"
  echo ""
  echo -n -e "${GREEN}Escolha: ${NC}"
  read choice
  
  case $choice in
    1) create_bundle_webapps ;;
    2) create_build_expo_static ;;
    3)
      create_bundle_webapps
      create_build_expo_static
      ;;
  esac
}

# ===== MAIN LOOP =====
main() {
  while true; do
    show_menu
    read choice
    
    case $choice in
      1) run_bundle_webapps ;;
      2) run_build_expo ;;
      3) run_both ;;
      4) show_bundle_status ;;
      5) clear_metro_cache ;;
      6) show_bundle_sizes ;;
      7) create_scripts ;;
      0)
        clear_screen
        echo -e "${GREEN}✅ Até logo!${NC}"
        exit 0
        ;;
      *)
        echo -e "${RED}❌ Opção inválida!${NC}"
        sleep 1
        ;;
    esac
  done
}

# ===== INICIAR =====
main



// ===== CONFIG DINÂMICA =====
// Funciona em: Replit, Local, Docker, CI/CD, etc

import Constants from 'expo-constants';

interface AppConfig {
  isDev: boolean;
  isReplit: boolean;
  domain: string;
  port: string;
  replId: string;
  packagerUrl: string;
  publicDomain: string;
}

function getEnvironment(): AppConfig {
  // ===== DETECTAR AMBIENTE =====
  const isReplit = !!process.env.REPLIT_DEV_DOMAIN;
  const isDev = process.env.NODE_ENV !== 'production';

  // ===== REPLIT =====
  if (isReplit) {
    return {
      isDev: true,
      isReplit: true,
      domain: process.env.REPLIT_DEV_DOMAIN || 'localhost',
      port: process.env.PORT || '3000',
      replId: process.env.REPL_ID || 'unknown',
      packagerUrl: `https://${process.env.REPLIT_EXPO_DEV_DOMAIN || process.env.REPLIT_DEV_DOMAIN}`,
      publicDomain: process.env.REPLIT_DEV_DOMAIN || 'localhost:3000',
    };
  }

  // ===== LOCAL =====
  if (isDev) {
    return {
      isDev: true,
      isReplit: false,
      domain: process.env.EXPO_PUBLIC_DOMAIN || 'localhost',
      port: process.env.PORT || '8081',
      replId: 'local',
      packagerUrl: `http://localhost:${process.env.PORT || '8081'}`,
      publicDomain: `localhost:${process.env.PORT || '8081'}`,
    };
  }

  // ===== PRODUCTION =====
  return {
    isDev: false,
    isReplit: false,
    domain: process.env.EXPO_PUBLIC_DOMAIN || 'app.example.com',
    port: '443',
    replId: process.env.EXPO_PUBLIC_REPL_ID || 'prod',
    packagerUrl: `https://${process.env.EXPO_PUBLIC_DOMAIN || 'app.example.com'}`,
    publicDomain: process.env.EXPO_PUBLIC_DOMAIN || 'app.example.com',
  };
}

export const config = getEnvironment();

// ===== EXPORTS =====
export const ENV = {
  isDev: config.isDev,
  isReplit: config.isReplit,
  domain: config.domain,
  port: config.port,
  replId: config.replId,
  packagerUrl: config.packagerUrl,
  publicDomain: config.publicDomain,
  apiUrl: `${config.packagerUrl}/api`,
};

console.log('🔧 App Config:', {
  environment: config.isDev ? 'development' : 'production',
  platform: config.isReplit ? 'Replit' : 'Local',
  domain: config.domain,
  packagerUrl: config.packagerUrl,
});



{
  "name": "@workspace/habit-tracker",
  "version": "0.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "dev": "node scripts/dev.js",
    "dev:local": "EXPO_PUBLIC_DOMAIN=localhost:8081 pnpm exec expo start --localhost --port 8081",
    "dev:replit": "pnpm exec expo start --localhost",
    "build": "node scripts/build.js",
    "build:apk": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "serve": "node server/serve.js",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "clean": "rm -rf node_modules .expo dist"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@expo-google-fonts/inter": "^0.4.0",
    "@expo/cli": "54.0.23",
    "@expo/ngrok": "^4.1.0",
    "@expo/vector-icons": "^15.0.3",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@stardazed/streams-text-encoding": "^1.0.2",
    "@types/pako": "^2.0.3",
    "@types/react": "~19.1.10",
    "@types/react-dom": "~19.1.7",
    "@ungap/structured-clone": "^1.3.0",
    "babel-plugin-react-compiler": "^19.0.0-beta-e993439-20250117",
    "expo": "~54.0.27",
    "expo-blur": "~15.0.8",
    "expo-constants": "~18.0.11",
    "expo-document-picker": "~14.0.8",
    "expo-file-system": "~19.0.22",
    "expo-font": "~14.0.10",
    "expo-haptics": "~15.0.8",
    "expo-image": "~3.0.11",
    "expo-image-picker": "~17.0.9",
    "expo-linear-gradient": "~15.0.8",
    "expo-linking": "~8.0.10",
    "expo-router": "~6.0.17",
    "expo-sharing": "~14.0.8",
    "expo-splash-screen": "~31.0.12",
    "expo-status-bar": "~3.0.9",
    "expo-system-ui": "~6.0.9",
    "expo-web-browser": "~15.0.10",
    "jszip": "^3.10.1",
    "pako": "^2.1.0",
    "react": "catalog:",
    "react-dom": "catalog:",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-keyboard-controller": "1.18.5",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-svg": "15.12.1",
    "react-native-web": "^0.21.0",
    "react-native-worklets": "0.5.1",
    "typescript": "~5.9.2"
  },
  "dependencies": {
    "expo-av": "^16.0.8",
    "expo-speech": "^55.0.13",
    "react-native-webview": "^13.16.1"
  }
}



#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// ===== DETECTAR AMBIENTE =====
const isReplit = !!process.env.REPLIT_DEV_DOMAIN;
const isDev = process.env.NODE_ENV !== 'production';

// ===== CONFIGURAR VARIÁVEIS =====
const env = {
  ...process.env,
  NODE_ENV: 'development',
};

if (isReplit) {
  console.log('🚀 Rodando em REPLIT');
  
  env.EXPO_PACKAGER_PROXY_URL = `https://${process.env.REPLIT_EXPO_DEV_DOMAIN || process.env.REPLIT_DEV_DOMAIN}`;
  env.EXPO_PUBLIC_DOMAIN = process.env.REPLIT_DEV_DOMAIN;
  env.EXPO_PUBLIC_REPL_ID = process.env.REPL_ID;
  env.REACT_NATIVE_PACKAGER_HOSTNAME = process.env.REPLIT_DEV_DOMAIN;
  env.PORT = process.env.PORT || '3000';
  
  console.log('📱 Expo Start (Replit)');
  console.log(`  Domain: ${env.EXPO_PUBLIC_DOMAIN}`);
  console.log(`  Port: ${env.PORT}`);
  console.log(`  Repl ID: ${env.EXPO_PUBLIC_REPL_ID}`);
  
  const child = spawn('pnpm', ['exec', 'expo', 'start', '--localhost', '--port', env.PORT], {
    env,
    stdio: 'inherit',
  });
  
  child.on('exit', (code) => process.exit(code));
} else {
  console.log('🚀 Rodando LOCALMENTE');
  
  env.EXPO_PUBLIC_DOMAIN = process.env.EXPO_PUBLIC_DOMAIN || 'localhost:8081';
  env.PORT = process.env.PORT || '8081';
  
  console.log('📱 Expo Start (Local)');
  console.log(`  Domain: ${env.EXPO_PUBLIC_DOMAIN}`);
  console.log(`  Port: ${env.PORT}`);
  
  const child = spawn('pnpm', ['exec', 'expo', 'start', '--localhost', '--port', env.PORT], {
    env,
    stdio: 'inherit',
  });
  
  child.on('exit', (code) => process.exit(code));
}


{
  "expo": {
    "name": "Habit Tracker",
    "slug": "habit-tracker",
    "version": "0.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTabletMode": true,
      "bundleIdentifier": "com.habittracker.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.habittracker.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-router",
        {
          "origin": false,
          "asyncRoutes": true
        }
      ]
    ],
    "scheme": "habit-tracker",
    "experiments": {
      "typedRoutes": true,
      "baseUrl": "/"
    }
  }
}


# ===== DESENVOLVIMENTO LOCAL =====
EXPO_PUBLIC_DOMAIN=localhost:8081
NODE_ENV=development

# ===== REPLIT (automático) =====
# REPLIT_DEV_DOMAIN=seu-repl.replit.dev
# REPLIT_EXPO_DEV_DOMAIN=seu-repl-expo.replit.dev
# REPL_ID=seu-repl-id
# PORT=3000

# ===== PRODUÇÃO =====
# EXPO_PUBLIC_DOMAIN=app.example.com
# NODE_ENV=production



import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ENV } from '../config';

export default function RootLayout() {
  useEffect(() => {
    console.log('🔧 App Environment:', {
      isDev: ENV.isDev,
      isReplit: ENV.isReplit,
      domain: ENV.domain,
      packagerUrl: ENV.packagerUrl,
    });
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}


// ===== CONFIG AGNÓSTICA (sem Replit) =====
// Funciona em: Local, Docker, Vercel, Railway, Render, etc

interface AppConfig {
  isDev: boolean;
  platform: 'local' | 'docker' | 'cloud' | 'production';
  domain: string;
  port: string;
  appId: string;
  packagerUrl: string;
  publicDomain: string;
  apiUrl: string;
}

function detectPlatform(): 'local' | 'docker' | 'cloud' | 'production' {
  // ===== DOCKER =====
  if (process.env.DOCKER_ENV === 'true' || process.env.CONTAINER_ID) {
    return 'docker';
  }

  // ===== CLOUD PLATFORMS =====
  if (process.env.VERCEL_ENV) return 'cloud'; // Vercel
  if (process.env.RAILWAY_ENVIRONMENT) return 'cloud'; // Railway
  if (process.env.RENDER_EXTERNAL_URL) return 'cloud'; // Render
  if (process.env.HEROKU_APP_NAME) return 'cloud'; // Heroku
  if (process.env.FLY_APP_NAME) return 'cloud'; // Fly.io
  if (process.env.NETLIFY_SITE_NAME) return 'cloud'; // Netlify

  // ===== PRODUÇÃO =====
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }

  // ===== LOCAL (padrão) =====
  return 'local';
}

function getEnvironment(): AppConfig {
  const platform = detectPlatform();
  const isDev = process.env.NODE_ENV !== 'production';

  // ===== LOCAL =====
  if (platform === 'local') {
    return {
      isDev: true,
      platform: 'local',
      domain: process.env.APP_DOMAIN || 'localhost',
      port: process.env.PORT || '8081',
      appId: 'local-dev',
      packagerUrl: `http://localhost:${process.env.PORT || '8081'}`,
      publicDomain: `localhost:${process.env.PORT || '8081'}`,
      apiUrl: `http://localhost:${process.env.PORT || '8081'}/api`,
    };
  }

  // ===== DOCKER =====
  if (platform === 'docker') {
    return {
      isDev: isDev,
      platform: 'docker',
      domain: process.env.APP_DOMAIN || 'localhost',
      port: process.env.PORT || '3000',
      appId: process.env.CONTAINER_ID || 'docker',
      packagerUrl: `http://${process.env.APP_DOMAIN || 'localhost'}:${process.env.PORT || '3000'}`,
      publicDomain: `${process.env.APP_DOMAIN || 'localhost'}:${process.env.PORT || '3000'}`,
      apiUrl: `http://${process.env.APP_DOMAIN || 'localhost'}:${process.env.PORT || '3000'}/api`,
    };
  }

  // ===== CLOUD (Vercel, Railway, Render, etc) =====
  if (platform === 'cloud') {
    const domain = process.env.APP_DOMAIN || 
                   process.env.VERCEL_URL || 
                   process.env.RAILWAY_PUBLIC_DOMAIN ||
                   process.env.RENDER_EXTERNAL_URL ||
                   'app.example.com';

    return {
      isDev: isDev,
      platform: 'cloud',
      domain: domain,
      port: '443',
      appId: process.env.APP_ID || 'cloud-app',
      packagerUrl: `https://${domain}`,
      publicDomain: domain,
      apiUrl: `https://${domain}/api`,
    };
  }

  // ===== PRODUÇÃO =====
  return {
    isDev: false,
    platform: 'production',
    domain: process.env.APP_DOMAIN || 'app.example.com',
    port: '443',
    appId: process.env.APP_ID || 'prod',
    packagerUrl: `https://${process.env.APP_DOMAIN || 'app.example.com'}`,
    publicDomain: process.env.APP_DOMAIN || 'app.example.com',
    apiUrl: `https://${process.env.APP_DOMAIN || 'app.example.com'}/api`,
  };
}

export const config = getEnvironment();

export const ENV = {
  isDev: config.isDev,
  platform: config.platform,
  domain: config.domain,
  port: config.port,
  appId: config.appId,
  packagerUrl: config.packagerUrl,
  publicDomain: config.publicDomain,
  apiUrl: config.apiUrl,
};

console.log('🔧 App Config:', {
  environment: config.isDev ? 'development' : 'production',
  platform: config.platform,
  domain: config.domain,
  packagerUrl: config.packagerUrl,
});

main

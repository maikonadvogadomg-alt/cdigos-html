#!/bin/bash

set -e

echo "╔════════════════════════════════════╗"
echo "║  🚀 Setup Completo do Monorepo     ║"
echo "╚════════════════════════════════════╝"
echo ""

# ===== CORES =====
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ===== FUNÇÕES =====
log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# ===== VERIFICAÇÕES =====
log_info "Verificando pré-requisitos..."

if ! command -v node &> /dev/null; then
  log_error "Node.js não está instalado"
  exit 1
fi

if ! command -v pnpm &> /dev/null; then
  log_warning "pnpm não encontrado, instalando..."
  npm install -g pnpm
fi

NODE_VERSION=$(node -v)
PNPM_VERSION=$(pnpm -v)

log_success "Node.js: $NODE_VERSION"
log_success "pnpm: $PNPM_VERSION"
echo ""

# ===== LIMPEZA =====
log_info "Limpando instalações antigas..."
rm -rf node_modules pnpm-lock.yaml
find projects -name node_modules -type d -exec rm -rf {} + 2>/dev/null || true
find packages -name node_modules -type d -exec rm -rf {} + 2>/dev/null || true
log_success "Limpeza concluída"
echo ""

# ===== INSTALAÇÃO =====
log_info "Instalando dependências do monorepo..."
pnpm install
log_success "Dependências instaladas"
echo ""

# ===== BUILD =====
log_info "Compilando projetos..."
pnpm run build
log_success "Build concluído"
echo ""

# ===== CRIAR ESTRUTURA DESKTOP =====
log_info "Criando estrutura desktop..."

PROJECTS=(
  "code-editor"
  "assistente-juridico"
  "apk-builder"
  "site-extractor"
)

for PROJECT in "${PROJECTS[@]}"; do
  PROJECT_DIR="projects/$PROJECT"
  
  if [ -d "$PROJECT_DIR" ]; then
    log_info "Configurando $PROJECT..."
    
    mkdir -p "$PROJECT_DIR/desktop/app"
    
    # Copiar server.js se não existir
    if [ ! -f "$PROJECT_DIR/desktop/server.js" ]; then
      cp projects/code-editor/desktop/server.js "$PROJECT_DIR/desktop/server.js" 2>/dev/null || true
    fi
    
    # Copiar package.json se não existir
    if [ ! -f "$PROJECT_DIR/desktop/package.json" ]; then
      cat > "$PROJECT_DIR/desktop/package.json" << EOF
{
  "name": "$PROJECT-desktop",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build:win": "pkg server.js --target node18-win-x64 --output ../dist-desktop/$PROJECT.exe"
  },
  "dependencies": {},
  "devDependencies": {
    "pkg": "^5.14.4"
  }
}
EOF
    fi
    
    # Copiar assets
    if [ -d "$PROJECT_DIR/dist" ]; then
      cp -r "$PROJECT_DIR/dist"/* "$PROJECT_DIR/desktop/app/" 2>/dev/null || true
    fi
    
    # Instalar dependências do desktop
    cd "$PROJECT_DIR/desktop"
    pnpm install 2>/dev/null || npm install
    cd ../../..
    
    log_success "$PROJECT configurado"
  fi
done

echo ""
log_success "╔════════════════════════════════════╗"
log_success "║  ✅ Setup Completo!                ║"
log_success "╚════════════════════════════════════╝"
echo ""

echo "🚀 Próximos passos:"
echo ""
echo "1️⃣  Rodar em desenvolvimento:"
echo "   pnpm run dev"
echo ""
echo "2️⃣  Rodar projeto específico:"
echo "   cd projects/code-editor && pnpm run dev"
echo ""
echo "3️⃣  Gerar APK:"
echo "   cd projects/code-editor && pnpm run build:apk"
echo ""
echo "4️⃣  Gerar .exe:"
echo "   cd projects/code-editor/desktop && npm run build:win"
echo ""
echo "5️⃣  Restaurar package.json:"
echo "   bash restore-packages.sh"
echo ""

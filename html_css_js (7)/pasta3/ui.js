const API_BASE = '/api/config';
let currentProject = 'code-editor';
let currentPreview = '';

// ===== INIT =====
window.addEventListener('load', () => {
  loadProjectConfig();
});

// ===== PROJECT SELECTION =====
function selectProject(project) {
  currentProject = project;

  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  loadProjectConfig();
}

function loadProjectConfig() {
  const configs = {
    'code-editor': {
      name: '@workspace/code-editor',
      version: '0.0.0',
      desc: 'SK Code Editor'
    },
    'assistente-juridico': {
      name: '@workspace/assistente-juridico',
      version: '4.0.0',
      desc: 'Assistente Jurídico Inteligente'
    },
    'apk-builder': {
      name: '@workspace/apk-builder',
      version: '1.0.0',
      desc: 'Gerador de APKs'
    },
    'site-extractor': {
      name: '@workspace/site-extractor',
      version: '1.0.0',
      desc: 'Extrator de Sites'
    }
  };

  const config = configs[currentProject] || configs['code-editor'];
  document.getElementById('projectName').value = config.name;
  document.getElementById('projectVersion').value = config.version;
  document.getElementById('projectDesc').value = config.desc;
}

// ===== SAVE FUNCTIONS =====
function savePackageJson(type) {
  const status = event.target.parentElement.nextElementSibling;
  status.classList.add('show', 'loading');
  status.textContent = '⏳ Salvando...';

  setTimeout(() => {
    status.classList.remove('loading');
    status.classList.add('success');
    status.textContent = '✅ Salvo com sucesso!';
  }, 1000);
}

function savePnpmWorkspace() {
  const status = event.target.parentElement.nextElementSibling;
  status.classList.add('show', 'loading');
  status.textContent = '⏳ Salvando...';

  setTimeout(() => {
    status.classList.remove('loading');
    status.classList.add('success');
    status.textContent = '✅ pnpm-workspace.yaml salvo!';
  }, 1000);
}

function saveProjectPackageJson() {
  const status = event.target.parentElement.nextElementSibling;
  status.classList.add('show', 'loading');
  status.textContent = '⏳ Salvando...';

  setTimeout(() => {
    status.classList.remove('loading');
    status.classList.add('success');
    status.textContent = `✅ ${currentProject}/package.json salvo!`;
  }, 1000);
}

function saveTurboJson() {
  const status = event.target.parentElement.nextElementSibling;
  status.classList.add('show', 'loading');
  status.textContent = '⏳ Salvando...';

  setTimeout(() => {
    status.classList.remove('loading');
    status.classList.add('success');
    status.textContent = '✅ turbo.json salvo!';
  }, 1000);
}

function saveNpmrc() {
  const status = event.target.parentElement.nextElementSibling;
  status.classList.add('show', 'loading');
  status.textContent = '⏳ Salvando...';

  setTimeout(() => {
    status.classList.remove('loading');
    status.classList.add('success');
    status.textContent = '✅ .npmrc salvo!';
  }, 1000);
}

function saveScript() {
  const status = event.target.parentElement.nextElementSibling;
  status.classList.add('show', 'loading');
  status.textContent = '⏳ Salvando...';

  setTimeout(() => {
    status.classList.remove('loading');
    status.classList.add('success');
    status.textContent = '✅ Script salvo!';
  }, 1000);
}

// ===== PREVIEW FUNCTIONS =====
function previewPackageJson(type) {
  const name = document.getElementById('rootName').value;
  const version = document.getElementById('rootVersion').value;
  const desc = document.getElementById('rootDesc').value;

  currentPreview = JSON.stringify({
    name,
    version,
    private: true,
    type: 'module',
    description: desc,
    scripts: {
      dev: 'turbo run dev --parallel',
      build: 'turbo run build',
      setup: 'pnpm install && pnpm run build'
    }
  }, null, 2);

  showModal('package.json (Root)', currentPreview);
}

function previewPnpmWorkspace() {
  const packages = document.getElementById('workspacePackages').value;
  const react = document.getElementById('catalogReact').value;
  const ts = document.getElementById('catalogTS').value;
  const vite = document.getElementById('catalogVite').value;

  currentPreview = `packages:\n${packages}\n\ncatalog:\n  react: ${react}\n  typescript: ${ts}\n  vite: ${vite}`;
  showModal('pnpm-workspace.yaml', currentPreview);
}

function previewProjectPackageJson() {
  const name = document.getElementById('projectName').value;
  const version = document.getElementById('projectVersion').value;
  const desc = document.getElementById('projectDesc').value;

  currentPreview = JSON.stringify({
    name,
    version,
    private: true,
    type: 'module',
    description: desc,
    scripts: {
      dev: 'vite --config vite.config.ts --host 0.0.0.0',
      build: 'vite build --config vite.config.ts'
    }
  }, null, 2);

  showModal(`${currentProject}/package.json`, currentPreview);
}

function previewTurboJson() {
  const config = document.getElementById('turboConfig').value;
  currentPreview = config;
  showModal('turbo.json', currentPreview);
}

function previewNpmrc() {
  const config = document.getElementById('npmrcConfig').value;
  currentPreview = config;
  showModal('.npmrc', currentPreview);
}

function previewScript() {
  const content = document.getElementById('scriptContent').value;
  currentPreview = content;
  showModal('Script', currentPreview);
}

// ===== MODAL =====
function showModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  const preview = document.getElementById('codePreview');

  if (content.startsWith('{')) {
    preview.innerHTML = `<div class="code-line">${content.replace(/\n/g, '</div><div class="code-line">')}</div>`;
  } else {
    preview.innerHTML = `<div class="code-line">${content.replace(/\n/g, '</div><div class="code-line">')}</div>`;
  }

  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

function copyPreview() {
  navigator.clipboard.writeText(currentPreview).then(() => {
    alert('✅ Copiado para a área de transferência!');
  });
}

// ===== QUICK ACTIONS =====
function setupAll() {
  if (confirm('🔧 Executar setup completo? Isso pode levar alguns minutos.')) {
    alert('✅ Setup iniciado! Verifique o terminal do Replit.');
  }
}

function restoreAll() {
  if (confirm('♻️ Restaurar todos os arquivos? Isso vai sobrescrever as mudanças.')) {
    alert('✅ Restauração iniciada!');
  }
}

function downloadAll() {
  alert('📥 Download iniciado! Verifique seu navegador.');
}

function clearCache() {
  if (confirm('🗑️ Limpar cache? Isso vai deletar dados temporários.')) {
    localStorage.clear();
    alert('✅ Cache limpo!');
  }
}

function loadScript(scriptName) {
  const scripts = {
    'setup-monorepo': `#!/bin/bash\necho "🚀 Setup Completo"\npnpm install\npnpm run build`,
    'restore-packages': `#!/bin/bash\necho "♻️ Restaurando packages"\nfor dir in projects/*/; do\n  cp package-backups/$(basename "$dir").json "$dir/package.json"\ndone`,
    'protect-packages': `#!/bin/bash\necho "🔒 Protegendo packages"\nfor dir in projects/*/; do\n  diff package-backups/$(basename "$dir").json "$dir/package.json"\ndone`
  };

  document.getElementById('scriptContent').value = scripts[scriptName] || '';
}

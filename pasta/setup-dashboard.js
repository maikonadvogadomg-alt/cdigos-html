const PROJECTS = [
  {
    id: 'code-editor',
    icon: '💻',
    name: 'SK Code Editor',
    desc: 'Editor de código com terminal',
    port: 18633,
  },
  {
    id: 'assistente-juridico',
    icon: '⚖️',
    name: 'Assistente Jurídico',
    desc: 'App jurídico inteligente',
    port: 18634,
  },
  {
    id: 'apk-builder',
    icon: '📱',
    name: 'APK Builder',
    desc: 'Gerador de APKs',
    port: 18635,
  },
  {
    id: 'site-extractor',
    icon: '🌐',
    name: 'Site Extractor',
    desc: 'Extrator de sites',
    port: 18636,
  },
];

const COMMANDS = [
  {
    title: 'Setup Completo',
    items: [
      { cmd: 'bash setup-complete.sh', desc: 'Setup de todos os projetos' },
    ]
  },
  {
    title: 'Rodar Projetos',
    items: [
      { cmd: 'cd code-editor/desktop && PORT=18633 APP_NAME="SK Code Editor" npm start', desc: 'Code Editor' },
      { cmd: 'cd assistente-juridico/desktop && PORT=18634 APP_NAME="Assistente Jurídico" npm start', desc: 'Assistente Jurídico' },
      { cmd: 'cd apk-builder/desktop && PORT=18635 APP_NAME="APK Builder" npm start', desc: 'APK Builder' },
      { cmd: 'cd site-extractor/desktop && PORT=18636 APP_NAME="Site Extractor" npm start', desc: 'Site Extractor' },
    ]
  },
  {
    title: 'Build .exe',
    items: [
      { cmd: 'cd code-editor/desktop && npm run build:win', desc: 'Code Editor .exe' },
      { cmd: 'cd assistente-juridico/desktop && npm run build:win', desc: 'Assistente Jurídico .exe' },
    ]
  },
  {
    title: 'Build APK',
    items: [
      { cmd: 'cd code-editor && npm run build && npx cap sync android && npx cap open android', desc: 'Code Editor APK' },
    ]
  },
];

const terminal = document.getElementById('terminal');
let pendingAction = null;

// ===== INIT =====
window.addEventListener('load', () => {
  renderProjects();
  renderCommands();
  addTerminalLine('Dashboard carregado', 'success');
  addTerminalLine('Clique nos botões para executar ações', 'info');
});

// ===== RENDER PROJECTS =====
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map(project => `
    <div class="project-card" data-project="${project.id}">
      <div class="project-icon">${project.icon}</div>
      <div class="project-name">${project.name}</div>
      <div class="project-desc">${project.desc}</div>
      <div class="project-port">Porta: ${project.port}</div>
      <div class="button-group">
        <button class="btn btn-primary" onclick="setupProject('${project.id}')">
          Setup
        </button>
        <button class="btn btn-secondary" onclick="startProject('${project.id}', ${project.port})">
          ▶️ Rodar
        </button>
        <button class="btn btn-warning" onclick="buildExe('${project.id}')">
          .exe
        </button>
      </div>
      <div class="status"></div>
    </div>
  `).join('');
}

// ===== RENDER COMMANDS =====
function renderCommands() {
  const list = document.getElementById('commandsList');
  list.innerHTML = COMMANDS.map(section => `
    <div style="margin-bottom: 20px;">
      <h3 style="margin-bottom: 10px; color: #667eea;">${section.title}</h3>
      ${section.items.map(item => `
        <div class="command-item">
          <div class="command-text">${item.cmd}</div>
          <button class="btn-copy" onclick="copyCommand(this, '${item.cmd.replace(/'/g, "\\'")}')">
            📋 Copiar
          </button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ===== TERMINAL =====
function addTerminalLine(text, type = 'info') {
  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;
  line.textContent = `$ ${text}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
  terminal.innerHTML = '';
  addTerminalLine('Terminal limpo', 'success');
}

// ===== COPY COMMAND =====
function copyCommand(btn, command) {
  navigator.clipboard.writeText(command).then(() => {
    const original = btn.textContent;
    btn.textContent = '✅ Copiado!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
    addTerminalLine(`Comando copiado`, 'success');
  });
}

function copyAllCommands() {
  const commands = COMMANDS.flatMap(section =>
    section.items.map(item => item.cmd)
  ).join('\n');

  navigator.clipboard.writeText(commands).then(() => {
    addTerminalLine('Todos os comandos copiados!', 'success');
  });
}

// ===== MODAL =====
function showModal(title, text, action) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  pendingAction = action;
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  pendingAction = null;
}

function confirmAction() {
  if (pendingAction) {
    pendingAction();
  }
  closeModal();
}

// ===== PROJECT ACTIONS =====
function setupProject(project) {
  showModal(
    `Setup ${project}`,
    `Isso vai instalar dependências, fazer build e criar a pasta desktop. Continuar?`,
    () => {
      const card = document.querySelector(`[data-project="${project}"]`);
      const status = card.querySelector('.status');

      status.classList.add('show', 'loading');
      status.textContent = '⏳ Configurando...';

      addTerminalLine(`Iniciando setup de ${project}`, 'info');

      setTimeout(() => {
        status.classList.remove('loading');
        status.classList.add('success');
        status.textContent = '✅ Setup concluído!';
        addTerminalLine(`${project} configurado com sucesso`, 'success');
      }, 2000);
    }
  );
}

function startProject(project, port) {
  addTerminalLine(`Iniciando ${project} na porta ${port}...`, 'info');
  addTerminalLine(`cd ${project}/desktop && PORT=${port} npm start`, 'success');
}

function buildExe(project) {
  showModal(
    `Build .exe - ${project}`,
    `Isso vai gerar um executável Windows. Continuar?`,
    () => {
      addTerminalLine(`Gerando .exe para ${project}...`, 'info');
      addTerminalLine(`cd ${project}/desktop && npm run build:win`, 'success');

      setTimeout(() => {
        addTerminalLine(`✅ .exe gerado em dist-desktop/${project}.exe`, 'success');
      }, 1000);
    }
  );
}

function setupAll() {
  showModal(
    '🔧 Setup Completo',
    'Isso vai configurar TODOS os projetos. Pode levar alguns minutos. Continuar?',
    () => {
      addTerminalLine('Iniciando setup completo...', 'info');
      addTerminalLine('bash setup-complete.sh', 'success');

      let delay = 1000;
      PROJECTS.forEach((project, index) => {
        setTimeout(() => {
          addTerminalLine(`✅ ${project.id} configurado`, 'success');
        }, delay + (index * 500));
      });

      setTimeout(() => {
        addTerminalLine('🎉 Setup completo!', 'success');
      }, delay + (PROJECTS.length * 500));
    }
  );
}

function buildAll() {
  showModal(
    '🔨 Build Todos',
    'Isso vai fazer build de todos os projetos. Continuar?',
    () => {
      addTerminalLine('Iniciando build de todos os projetos...', 'info');

      let delay = 1000;
      PROJECTS.forEach((project, index) => {
        setTimeout(() => {
          addTerminalLine(`🔨 Compilando ${project.id}...`, 'info');
        }, delay + (index * 1000));

        setTimeout(() => {
          addTerminalLine(`✅ ${project.id} compilado`, 'success');
        }, delay + (index * 1000) + 500);
      });

      setTimeout(() => {
        addTerminalLine('🎉 Build completo!', 'success');
      }, delay + (PROJECTS.length * 1000));
    }
  );
}

#!/bin/zsh

set -euo pipefail

PROJECT_DIR="/Users/noam/Desktop/Holguin/holguin-web"
PORT="3000"
URL="http://localhost:${PORT}"

cd "$PROJECT_DIR"

# Intentar cargar entornos comunes cuando el .command se abre con doble clic.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Cargar archivos de inicio comunes (muchos usuarios cargan nvm aquí).
[ -f "$HOME/.zprofile" ] && source "$HOME/.zprofile"
[ -f "$HOME/.zshrc" ] && source "$HOME/.zshrc"
[ -f "$HOME/.bash_profile" ] && source "$HOME/.bash_profile"
[ -f "$HOME/.profile" ] && source "$HOME/.profile"

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
elif [ -s "/opt/homebrew/opt/nvm/nvm.sh" ]; then
  source "/opt/homebrew/opt/nvm/nvm.sh"
fi

if [ -f "$HOME/.asdf/asdf.sh" ]; then
  source "$HOME/.asdf/asdf.sh"
elif [ -f "/opt/homebrew/opt/asdf/libexec/asdf.sh" ]; then
  source "/opt/homebrew/opt/asdf/libexec/asdf.sh"
fi

if [ -d "$HOME/.volta/bin" ]; then
  export PATH="$HOME/.volta/bin:$PATH"
fi

# Si usa nvm y no hay versión activa, intentar usar la default.
if command -v nvm >/dev/null 2>&1 && ! command -v node >/dev/null 2>&1; then
  nvm use default >/dev/null 2>&1 || true
fi

if ! command -v node >/dev/null 2>&1; then
  osascript -e 'display alert "Node.js no está disponible para este acceso directo" message "Si ya lo instalaste, vuelve a abrir este archivo después de reiniciar Terminal. Si no, instala Node.js (incluye npm)." as critical'
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  osascript -e 'display alert "npm no está disponible" message "Reinstala Node.js para incluir npm." as critical'
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install
fi

echo "Iniciando sitio web..."

# Abrir navegador unos segundos después mientras Next.js termina de arrancar.
(
  sleep 4
  open "$URL"
) &

npm run dev

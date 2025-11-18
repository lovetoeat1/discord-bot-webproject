# Website Deployment Script
# Passt die Variablen unten an!

$SERVER_IP = "DEINE_SERVER_IP"  # z.B. "123.45.67.89"
$SSH_USER = "root"               # Dein SSH Benutzername
$REMOTE_PATH = "/var/www/html"   # Pfad auf dem Server

# Lokaler Pfad zu deinen Website-Dateien
$LOCAL_PATH = "c:\repos\discord-bot-webproject.git\discord-bot-webproject-1\Website"

Write-Host "🚀 Website Deployment gestartet..." -ForegroundColor Green
Write-Host ""

# Prüfe ob scp verfügbar ist
if (!(Get-Command scp -ErrorAction SilentlyContinue)) {
    Write-Host "❌ SCP nicht gefunden. Installiere OpenSSH oder nutze FileZilla!" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Lade Website-Dateien hoch..." -ForegroundColor Cyan

# Upload aller Website-Dateien
scp -r "$LOCAL_PATH\*" "${SSH_USER}@${SERVER_IP}:${REMOTE_PATH}/"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Website erfolgreich hochgeladen!" -ForegroundColor Green
    Write-Host "🌐 Öffne jetzt deine Domain im Browser!" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Upload fehlgeschlagen. Prüfe SSH-Verbindung!" -ForegroundColor Red
}

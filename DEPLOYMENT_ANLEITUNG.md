# 🚀 Website Deployment Anleitung

## Situation
- ✅ Domain ist mit IP verbunden
- ✅ SSH funktioniert
- ✅ Discord Bot läuft
- ❌ Website zeigt 404 → **Dateien fehlen auf dem Server!**

---

## ⚡ SCHNELL-ANLEITUNG (FileZilla - EMPFOHLEN)

### Schritt 1: FileZilla einrichten
1. **FileZilla herunterladen** (falls nicht installiert): https://filezilla-project.org/
2. **Neue Verbindung:**
   - **Host:** `sftp://DEINE_SERVER_IP`
   - **Benutzername:** `root` (oder dein SSH-User)
   - **Passwort:** Dein SSH-Passwort
   - **Port:** `22`
3. Klick auf **Verbinden**

### Schritt 2: Zum Web-Verzeichnis navigieren
- **Rechte Seite (Server):** Navigiere zu `/var/www/html/`
- **Linke Seite (Lokal):** Navigiere zu diesem Projekt-Ordner `\Website\`

### Schritt 3: Dateien hochladen
Ziehe diese Dateien vom lokalen zum Server-Ordner:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `bot.js`
- ✅ `shades.js`
- ✅ `privacy-policy.html`
- ✅ `terms-of-service.html`

### Schritt 4: Fertig! 🎉
Öffne deine Domain im Browser → Website sollte jetzt laufen!

---

## 🔧 WENN IMMER NOCH 404 KOMMT

### Option A: Webserver ist nicht installiert
SSH zum Server und führe aus:

```bash
# Nginx installieren
sudo apt update
sudo apt install nginx -y

# Nginx starten
sudo systemctl start nginx
sudo systemctl enable nginx

# Status prüfen
sudo systemctl status nginx
```

### Option B: Nginx läuft, aber falsche Konfiguration

1. **SSH zum Server**
2. **Prüfe, ob Dateien im richtigen Ordner sind:**
```bash
ls -la /var/www/html/
# Du solltest index.html sehen!
```

3. **Nginx Konfiguration prüfen:**
```bash
sudo nano /etc/nginx/sites-available/default
```

4. **Nginx neustarten:**
```bash
sudo systemctl restart nginx
```

### Option C: Firewall blockiert Port 80

```bash
# Firewall Status prüfen
sudo ufw status

# Port 80 (HTTP) öffnen
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Nginx erlauben
sudo ufw allow 'Nginx Full'
```

---

## 🔐 SSL/HTTPS einrichten (SPÄTER, wenn Website läuft)

```bash
# Certbot installieren
sudo apt install certbot python3-certbot-nginx -y

# SSL Zertifikat erstellen (ÄNDERE deine-domain.com!)
sudo certbot --nginx -d deine-domain.com -d www.deine-domain.com
```

---

## 📝 CHECKLIST

- [ ] FileZilla installiert
- [ ] SSH-Verbindung in FileZilla funktioniert
- [ ] Dateien nach `/var/www/html/` hochgeladen
- [ ] Nginx läuft (`systemctl status nginx`)
- [ ] Port 80 ist offen
- [ ] Domain im Browser aufgerufen → Website läuft! ✅

---

## 🆘 HÄUFIGE PROBLEME

### Problem: "Connection refused" in FileZilla
**Lösung:** Prüfe ob SSH läuft: `sudo systemctl status ssh`

### Problem: "Permission denied" beim Upload
**Lösung:** 
```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### Problem: Website zeigt falsche Seite
**Lösung:** Prüfe ob `index.html` im richtigen Ordner ist

### Problem: 502 Bad Gateway
**Lösung:** Nginx neustarten: `sudo systemctl restart nginx`

---

## 📞 NOTFALL-BEFEHLE

```bash
# Alle Logs checken
sudo tail -f /var/log/nginx/error.log

# Nginx Konfiguration testen
sudo nginx -t

# Nginx komplett neustarten
sudo systemctl restart nginx

# Welche Prozesse nutzen Port 80?
sudo netstat -tlnp | grep :80
```

---

**Viel Erfolg! Du schaffst das! 💪**

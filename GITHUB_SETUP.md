# GitHub-Verbindung herstellen

Das Projekt ist bereits als Git-Repository eingerichtet. Um es mit GitHub zu verbinden:

## 1. Repository auf GitHub erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. **Repository name:** `Luenebraeu` (oder `Luenebräu` – GitHub unterstützt Umlaute)
3. **Public** auswählen
4. **NICHT** "Add a README" ankreuzen – das Projekt hat bereits eine README
5. Auf **Create repository** klicken

## 2. Remote hinzufügen und pushen

GitHub zeigt dir nach dem Erstellen die Befehle an. Oder führe aus:

```bash
git remote add origin https://github.com/DEIN-USERNAME/Luenebraeu.git
git branch -M main
git push -u origin main
```

**Wichtig:** Ersetze `DEIN-USERNAME` durch deinen GitHub-Benutzernamen.

## Alternative: Mit SSH

Wenn du SSH verwendest:

```bash
git remote add origin git@github.com:DEIN-USERNAME/Luenebraeu.git
git branch -M main
git push -u origin main
```

# Autenticación por **HTTPS** con GitHub y *push* por Pull Request (mini‑guía)

Funciona en **Windows (Git Bash/PowerShell)**, **macOS (Terminal)** y **Linux**.

---

## 0) Requisitos
- Git instalado.
- Cuenta de GitHub.
- (Recomendado) **Git Credential Manager (GCM)** para guardar credenciales de forma segura.
  - Windows y macOS: suele venir incluido con Git. Actívalo con:
    ```bash
    git config --global credential.helper manager-core
    ```
  - macOS alternativa (Keychain nativo):
    ```bash
    git config --global credential.helper osxkeychain
    ```
  - Linux (si no tienes GCM): usa un **Personal Access Token (PAT)** y guarda con `manager-core` si lo instalas, o con `cache`/`store` (menos seguro).
    ```bash
    # (si tienes GCM instalado en Linux)
    git config --global credential.helper manager-core
    ```

---

## 1) Clonar o apuntar el remoto por **HTTPS**
### Clonar
```bash
git clone https://github.com/<usuario-o-org>/<repo>.git
cd <repo>
```
### Cambiar remoto existente a HTTPS
```bash
git remote set-url origin https://github.com/<usuario-o-org>/<repo>.git
git remote -v    # verifica
```

---

## 2) Iniciar sesión (con GCM) o usar **PAT**
Cuando hagas `git push` o `git pull`, si usas GCM verás una ventana para iniciar sesión en GitHub (por navegador).  
Sigue el flujo y quedará guardado de forma segura.

### Si prefieres/necestias **PAT** (GitHub ya no acepta contraseñas normales)
1. En GitHub: **Settings → Developer settings → Personal access tokens**  
   Crea un token (clásico o de grano fino) con permiso **repo** (y `workflow` si usas Actions).
2. Al hacer `git push`, cuando pida credenciales:
   - **Username:** tu usuario de GitHub
   - **Password:** pega tu **PAT** (no tu contraseña normal).

> El PAT puede requerir **SSO** si tu organización lo exige. Autoriza el token en la org desde la página del token.

---

## 3) Subir cambios mediante **Pull Request**
```bash
# Asegúrate de estar al día
git checkout main
git pull --rebase origin main

# Crea tu rama de trabajo
git checkout -b feat/mi-cambio

# Confirma tus cambios
git add .
git commit -m "feat: mi primer push por HTTPS"

# Sube la rama (disparará el login si hace falta)
git push -u origin HEAD
```
Luego abre el **PR** en GitHub (botón *Compare & pull request*).

### Mantener tu PR actualizado si `main` avanzó
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

---

## 4) Actualizar o borrar credenciales guardadas
- **Windows (Credential Manager):** Panel de control → Credential Manager → Windows Credentials → busca `git:https://github.com` y **Edit/Remove**.
- **macOS (Keychain Access):** abre **Acceso a Llaveros**, busca `github.com` y elimina la entrada.
- **GCM (cross‑platform):**
  ```bash
  git credential-manager reject https://github.com
  ```

---

## 5) Troubleshooting rápido
- **`Invalid username or password`** → Estás usando contraseña normal. Usa **PAT**.
- **`403 SSO required`** → Autoriza tu **PAT** para la organización en GitHub.
- **Pide credenciales todo el tiempo** → Configura un helper: `git config --global credential.helper manager-core` (o `osxkeychain` en macOS).
- **Proxy corporativo** → Configura variables `HTTPS_PROXY`/`HTTP_PROXY` o `.gitconfig` según tu red.

---

### Comandos útiles de verificación
```bash
git config --global --get credential.helper
git remote -v
git whoami || git config user.name && git config user.email
```

# Conectar tu repo por **SSH** y hacer _push_ (mini‑guía)

## 1) Probar tu conexión SSH con GitHub

```bash
ssh -T git@github.com
```

- Si ves “Hi <user>!”, estás listo.
- Si sale _Permission denied_, crea y registra una clave SSH.

## 2) Crear y registrar tu clave SSH (solo una vez)

```bash
# Crear clave (ed25519 recomendado)
ssh-keygen -t ed25519 -C "tu@email"

# Iniciar el agente y cargar la clave
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Copia tu clave pública y agrégala en **GitHub → Settings → SSH and GPG keys → New SSH key**.

- macOS:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

- Windows (Git Bash):

```bash
clip < ~/.ssh/id_ed25519.pub
```

- Linux:

```bash
xclip -sel clip < ~/.ssh/id_ed25519.pub  # o: cat ~/.ssh/id_ed25519.pub
```

## 3) Configurar tu identidad de Git (si falta)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email"
```

## 4) Apuntar el remoto a **SSH**

Revisa tu remoto:

```bash
git remote -v
```

- Si NO existe `origin`:

```bash
git remote add origin git@github.com:<usuario-o-org>/<repo>.git
```

- Si está con **HTTPS**, cámbialo a **SSH**:

```bash
git remote set-url origin git@github.com:<usuario-o-org>/<repo>.git
```

## 5) Subir tus cambios mediante Pull Request

```bash
# crea o verifica tu rama
git checkout -b feat/mi-cambio   # o usa la rama en la que estás

git add .
git commit -m "feat: mi primer push por SSH"
git push -u origin HEAD
```

Luego abre el **PR** en GitHub (botón _Compare & pull request_).

### Troubleshooting rápido

- **Permission denied (publickey)**: asegúrate de haber agregado la clave a GitHub y de tenerla cargada:

```bash
ssh-add -l               # lista claves en el agente
ssh-add ~/.ssh/id_ed25519
```

- **Repositorio no encontrado**: confirma la URL `git@github.com:<usuario-o-org>/<repo>.git` y tus permisos.

# Agendia — Super-repo del curso

Este es el **super-repo** del curso. Aquí organizaremos los microservicios como **submódulos** por equipo.

👉 **Clase de hoy:** [Semana 3 — Git & Submódulos](./classes/week-03/README.md)

---

## Convenciones del curso

- **Ruta del submódulo (1 por equipo):** `services/team-<n>` (ej. `services/team-3`)
- **Rama a seguir en el submódulo:** `main`
- **URL:** usar **SSH** (`git@github.com:...`), no HTTPS

---

## Cheatsheet — Git básico (lo esencial, explicado)

> Este flujo está pensado para que **siempre subas tus cambios mediante Pull Request (PR)**.

### 0) Preparación inicial (una vez por máquina)

```bash
# Identidad para tus commits
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email"

# Comprueba que tu SSH con GitHub funciona (debe saludar)
ssh -T git@github.com
```

**¿Por qué?** Git necesita firmar tus commits con nombre y correo. Usamos **SSH** para evitar prompts de contraseña y fallos al pushear.

---

### 1) Clonar el super-repo

```bash
git clone git@github.com:yvalencia-ucp/agendia.git
cd agendia
```

**¿Por qué?** Te trae una copia local del proyecto para trabajar en ramas.

---

### 2) Actualizar tu base antes de empezar

```bash
git checkout main
git pull --rebase origin main
```

**¿Por qué `--rebase`?** Mantiene un historial lineal y evita “commits de merge” innecesarios. Siempre parte de **main** actualizado antes de crear tu rama.

---

### 3) Crear una rama de trabajo (obligatorio para PR)

```bash
git checkout -b feat/team-<n>-tarea
```

**¿Por qué?** Nunca trabajes directo en `main`. Las ramas facilitan el **PR** y el code review.  
**Convención sugerida:** `feat/…`, `fix/…`, `docs/…`, `chore/…`.

---

### 4) Trabajar, ver estado, seleccionar cambios.

```bash
git status -sb      # qué cambió
git add <ruta>      # agrega archivos al "staging area"
git add .           # (opcional) todo lo modificado, úsalo con cuidado
```

**¿Qué es “staging”?** Es la lista de cambios que **sí** quieres incluir en el próximo commit.

---

### 5) Crear commits claros (pequeños y temáticos)

```bash
git commit -m "feat: mensaje breve y específico sobre lo que hiciste"
```

**Buenas prácticas:** un commit = un propósito. Evita “wip”.

---

### 6) Sincronizar si otros ya cambiaron `main` (antes de subir)

```bash
git fetch origin
git rebase origin/main
```

**¿Por qué ahora?** Reaplica tus commits arriba de lo último en `main`. Si hay conflictos, git te lo dirá; arréglalos, `git add` y `git rebase --continue`.

---

### 7) Subir tu rama y abrir el Pull Request

```bash
git push -u origin HEAD
```

- Ve a GitHub → verás el botón **“Compare & pull request”**.
- Título de PR con convención: `feat(submodule): team-<n>` o `docs(contributors): @usuario README`.
- Llena el **template** (checklist).
- Pide **review** a tu profe/compañeros.

**¿Por qué PR?** Obliga a revisión, deja evidencia y dispara automatizaciones (checks).

---

### 8) Actualizar un PR que quedó desfasado (main avanzó)

```bash
git checkout <tu-rama>
git fetch origin
git rebase origin/main              # resuelve conflictos si los hay
git push --force-with-lease         # actualiza el PR sin perder trabajo ajeno
```

**`--force-with-lease` vs `--force`:** el primero es **seguro**; evita sobrescribir commits de otros sin querer.

---

### 9) Deshacer con seguridad (sin romper el historial compartido)

```bash
# Quitar un archivo del staging (no borra cambios)
git restore --staged <ruta>

# Volver un archivo a la última versión confirmada (ojo: pierdes cambios locales en ese archivo)
git restore <ruta>

# Revertir un commit ya publicado (crea un commit inverso)
git revert <sha>
```

**Evita** `git reset --hard` en ramas compartidas: reescribe historial y puede romper PRs.

---

## Cheatsheet — Submódulos

> **Submódulos** = repos externos referenciados por **SHA** dentro de este super-repo.

### A) Clonar con submódulos (cuando ya existan)

```bash
git clone --recurse-submodules git@github.com:yvalencia-ucp/agendia.git
cd agendia
# Si ya clonaste sin recurse:
git submodule update --init --recursive
```

**¿Por qué?** Trae el contenido de cada submódulo a las rutas configuradas.

---

### B) Agregar el submódulo del equipo (solo 1 estudiante por equipo)

```bash
git checkout -b feat/team-<n>-submodule
git submodule add -b main git@github.com:<org-o-usuario>/<repo-equipo>.git services/team-<n>
git add .gitmodules services/team-<n>
git commit -m "feat: add submodule services/team-<n> (tracks main)"
git push -u origin HEAD
```

**Puntos clave:**

- **`-b main`**: el submódulo seguirá la rama `main` de su repo.
- Se crean dos cosas: entrada en `.gitmodules` (config) y un **gitlink** (puntero por SHA) en `services/team-<n>`.

---

### C) Actualizar el puntero del submódulo (cuando el repo del equipo cambie)

```bash
git checkout -b chore/update-team-<n>-pointer
git submodule update --remote services/team-<n>  # trae el último commit de la rama configurada
git add services/team-<n>
git commit -m "chore: update submodule pointer for team-<n>"
git push -u origin HEAD
```

**¿Por qué “puntero”?** El super-repo **fija** qué commit exacto consume, para reproducibilidad.

---

### D) Utilidades de diagnóstico

```bash
git submodule status                # lista submódulos y el SHA apuntado
git submodule foreach 'git status -sb'
git ls-files --stage | grep 160000  # confirma gitlinks (tipo 160000)
```

---

### E) Si cambió `.gitmodules` (URL/branch), sincroniza

```bash
git submodule sync --recursive
git submodule update --init --recursive
```

**¿Por qué?** Alinea la configuración del super-repo con lo que tienes en `.git/config`.

---

### F) Resolver conflictos en `.gitmodules`

1. Mantén **todas** las secciones `[submodule "…"]`.
2. Formato por entrada:

```
[submodule "services/team-<n>"]
  path = services/team-<n>
  url = git@github.com:<org-o-usuario>/<repo-equipo>.git
  branch = main
```

3. Ordena las entradas por `path`.
4. `git add .gitmodules && git commit` → `git submodule sync --recursive`.

---

### G) (Zona de peligro) Quitar un submódulo

```bash
git submodule deinit -f services/team-<n>
git rm -f services/team-<n>
rm -rf .git/modules/services/team-<n>
git commit -m "chore: remove submodule services/team-<n>"
```

**Advertencia:** Esto **no** borra el repo del equipo en GitHub, solo su referencia aquí.

---

## Flujo de Pull Request (resumen para la clase de hoy)

**PR de equipo (super-repo, 1 por equipo):**

1. `git checkout -b feat/team-<n>-submodule`
2. `git submodule add … services/team-<n>`
3. `git commit` + `git push`
4. Abrir PR: `feat(submodule): team-<n>` y completar checklist.

**PR individual (repo del equipo, 1 por persona):**

1. `git checkout -b docs/<usuario>-readme`
2. Crear `collaborators/<usuario>/README.md` (usa la plantilla del enunciado).
3. `git add` → `git commit` → `git push`
4. Abrir PR: `docs(collaborators): @<usuario> README`.

> Si `main` avanza mientras tu PR está abierto:  
> `git fetch origin && git rebase origin/main && git push --force-with-lease`

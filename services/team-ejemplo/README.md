# Team-ejemplo — Submódulo del curso

Este repositorio es el **servicio del equipo** y vive como submódulo en el super-repo `agendia` (ruta: `services/team-ejemplo`). La rama de trabajo es **main**.

> Clase relacionada: [Semana 3 — Git & Submódulos](../../classes/week-03/README.md)

## Estructura

```
/collaborators/           # carpetas personales de cada integrante
  <github-user>/
    README.md             # bitácora personal (obligatoria)
README.md                 # este archivo
```

## Flujo de trabajo (siempre con Pull Request)

1. Actualiza local: `git checkout main && git pull --rebase origin main`
2. Crea rama: `git checkout -b docs/<usuario>-readme` o `feat/<tarea>`
3. Cambios + commit: `git add . && git commit -m "docs(collaborators): add README for <usuario>"`
4. Sube tu rama: `git push -u origin HEAD`
5. Abre el **PR** en este repo. Si `main` avanzó:  
   `git fetch origin && git rebase origin/main && git push --force-with-lease`

**Convenciones**

- PR titles: `docs(collaborators): @usuario README`, `feat: ...`, `chore: ...`
- Commits cortos y específicos.

## Entregables de la Semana 3

- ✅ Crear tu carpeta personal en `collaborators/<usuario>/README.md` (≥ 60 palabras + 1 bloque de código).
- ✅ Agregar el submodulo al super-repo
- ✅ Abrir PR y solicitar revisión a 1 compañero.

## Troubleshooting

- “Mi PR dice que está desfasado”: `git fetch origin && git rebase origin/main`.
- “No puedo pushear”: verifica acceso SSH a GitHub `ssh -T git@github.com`.

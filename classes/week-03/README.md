## 📄 `classes/week-03/README.md`

# Semana 3 — Git & Submódulos

## Por qué Git

- Controla versiones y facilita trabajo en equipo con **PRs y revisiones**.
- Permite flujos limpios con ramas y **historial trazable**.
- Integración natural con plataformas como GitHub para CI/CD.

## Por qué submódulos en microservicios

- **Independencia**: cada servicio mantiene su historia y releases.
- **Punteros por SHA**: el super-repo sabe **exactamente** qué versión de cada servicio usa.
- **Colaboración**: equipos trabajan en su repo; el super-repo solo “consume” versiones estables.

---

## Objetivos de la sesión

Al finalizar:

1. Habrá un **submódulo por equipo** agregado al super-repo (`services/team-<n>`).
2. Cada integrante dejará un **README personal** en el repo del equipo (bitácora corta).
3. Quedará documentado **cómo clonar/actualizar** submódulos y el flujo de PRs.

---

## Agenda

- Aterrizaje: por qué submódulos vs monorepo/subtree.
- Mini-demo: `.gitmodules`, `submodule add`, `--recurse-submodules`.
- Trabajo por equipos: creación del **repo del equipo** y **PR del submódulo** en el super-repo.
- Trabajo individual (en repo del equipo): **README personal** en `contributors/<usuario>/README.md`.
- Cierre: checklist de entregables y dudas rápidas.

---

## Lo que haremos hoy

### A) Equipo (un solo PR en el super-repo)

1. Crear (o verificar) el repo del equipo en GitHub.
2. En el **super-repo**:

```bash
git checkout -b feat/team-<n>-submodule
git submodule add -b main git@github.com:<org-o-usuario>/<repo-equipo>.git services/team-<n>
git add .gitmodules services/team-<n>
git commit -m "feat: add submodule services/team-<n> (tracks main)"
git push -u origin HEAD
```

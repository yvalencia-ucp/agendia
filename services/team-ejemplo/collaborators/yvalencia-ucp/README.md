# Bitácora — Yeinson Valencia (@yvalencia-ucp)

**Equipo:** team-ejemplo  
**Rol:** DevOps & soporte backend  
**Objetivo personal:** practicar flujos con **PR + rebase** y entender cómo el super-repo fija el **SHA** de nuestro submódulo.

## Notas rápidas de la clase 3

- Los **submódulos** son repos externos referenciados por **SHA**; el super-repo decide qué commit consume.
- Para traer el contenido cuando clonas: `git submodule update --init --recursive` (en el super-repo).
- Usar `--force-with-lease` cuando actualizo un PR tras rebase evita sobreescribir trabajo ajeno.

# Sitio de campaña - César Augusto Holguín Loaiza

Sitio multipágina en Next.js + Tailwind para campaña política (Cusco), usando `contenido.md` como fuente oficial del texto y `assets/` como carpeta de recursos visuales.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Build para despliegue

```bash
npm run build
```

El proyecto está configurado con `output: "export"` (genera versión estática en `out/`) y funciona bien en Vercel, Netlify o GitHub Pages.

## Dónde cambiar contenido

- Texto oficial: `/Users/noam/Desktop/Holguin/holguin-web/contenido.md`
- Imágenes/flyers/logos: `/Users/noam/Desktop/Holguin/holguin-web/assets/`

## Cómo se usan los assets

- `scripts/sync-assets.mjs` detecta automáticamente archivos en `assets/`, los copia a `public/assets/` con nombres seguros y genera `public/assets/manifest.json`.
- El sitio selecciona usos (retrato, guía de voto, mapa de Cusco, flyer, arte de logo) con heurísticas por nombre de archivo.

## Rutas

- `/`
- `/propuestas`
- `/vida-y-trayectoria`
- `/como-votar`
- `/sumate`

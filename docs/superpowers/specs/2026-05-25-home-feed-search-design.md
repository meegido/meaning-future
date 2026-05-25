# Buscador en HomeFeed por `perplexitySummary`

## Contexto

`HomeFeed` (`/`) muestra todos los enlaces almacenados en Firestore. No hay forma de buscar dentro de la lista. Queremos que el usuario pueda escribir texto y filtrar los enlaces cuyo `perplexitySummary` contenga ese texto.

Este es un primer iterado mínimo. Decisiones intencionalmente simples para abrir camino a iteraciones posteriores (multi-campo, persistencia en URL, búsqueda en `UserFeed`).

## Decisiones de diseño

- **Alcance:** Solo `HomeFeed` por ahora. El componente de búsqueda se construye de forma reutilizable para añadirlo a `UserFeed` más adelante.
- **Disparo:** Filtrado en vivo con debounce de 250 ms.
- **Coincidencia:** Substring simple, case-insensitive, sobre `perplexitySummary`. Sin tokenización ni búsqueda por palabras.
- **Sin resultados:** Mensaje "No se han encontrado enlaces". El usuario limpia volviendo al input (no añadimos botón de limpiar; `<input type="search">` ya ofrece el botón nativo del navegador).
- **Ubicación del input:** Encima del feed, dentro de `HomeFeed`. No se monta en el `Header` para evitar acoplamiento con rutas y estado global.
- **Filtrado:** Client-side, sobre la lista ya cargada desde Firestore. No se toca `firestore-client`.

## Arquitectura

Dos puntos de cambio:

1. **Nuevo componente** `SearchBox` en `src/shared/components/`. Input controlado internamente, emite la query al padre con debounce.
2. **Modificación** de `HomeFeed`: añade estado `query`, calcula `filteredLinks` con `useMemo`, renderiza `SearchBox` y elige entre `Feed` o mensaje vacío.

`Feed` y `LinkPreview` no se modifican.

### Flujo de datos

```
Firestore → HomeFeed (links)
                │
                ├─ SearchBox → onQueryChange (debounced) → HomeFeed (query)
                │
                ▼
         useMemo(filteredLinks)
                │
                ├─ length > 0 → <Feed links={filteredLinks} />
                ├─ length === 0 && query.trim() !== '' → mensaje "No se han encontrado enlaces"
                └─ length === 0 && query.trim() === '' → <Feed links={[]} />  (estado inicial / sin datos remotos)
```

## Componente `SearchBox`

**Ubicación:** `src/shared/components/search-box.tsx` + `search-box.module.css`.

**API:**

```ts
interface SearchBoxProps {
  onQueryChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number; // default 250
}
```

**Comportamiento:**

- Mantiene estado local `value` (input controlado internamente).
- Cuando `value` cambia, programa un `setTimeout` de `debounceMs` que llama a `onQueryChange(value)`. Si el usuario sigue tecleando, se cancela el timeout anterior vía `useEffect` cleanup.
- La query se emite tal cual (sin `trim` ni `toLowerCase`). La normalización vive en el consumidor.

**Marcado:**

- `<input type="search">` con `aria-label="Buscar enlaces"`.
- `placeholder` configurable (default "Buscar...").
- `type="search"` activa el botón nativo de "limpiar" del navegador, lo que cubre la necesidad de limpiar sin añadir UI propia.

**Estilo:** CSS module propio, siguiendo el patrón existente del proyecto. Ancho acorde al wrapper del feed.

## Filtrado en `HomeFeed`

**Estado:**

```ts
const [links, setLinks] = useState<LinkInfo[]>([]);
const [query, setQuery] = useState<string>('');
```

La carga de datos vía `getDocuments()` no cambia.

**Cálculo:**

```ts
const filteredLinks = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return links;
  return links.filter((link) =>
    (link.perplexitySummary ?? '').toLowerCase().includes(q)
  );
}, [links, query]);
```

- `trim()` evita que un espacio accidental descarte resultados.
- `?? ''` protege frente a documentos de Firestore donde el campo venga `undefined`/`null`, aunque el tipo declare `string`.

**Render:**

```tsx
return (
  <>
    <SearchBox onQueryChange={setQuery} placeholder="Buscar en el resumen..." />
    {filteredLinks.length === 0 && query.trim() !== '' ? (
      <p className={styles.empty}>No se han encontrado enlaces</p>
    ) : (
      <Feed links={filteredLinks} />
    )}
  </>
);
```

Esto requiere un CSS module nuevo `home-feed.module.css` con la clase `empty` para centrar/espaciar el mensaje.

## Tests

**`search-box.test.tsx` (nuevo):**

- Al teclear, `onQueryChange` se llama una vez con el valor final tras pasar `debounceMs` (usando `vi.useFakeTimers`).
- Tecleo rápido seguido cancela las llamadas intermedias: solo se emite la última.

**`home-feed.test.tsx` (modificado):**

- Renderiza `SearchBox` junto al feed.
- Sin query, se muestran todos los links.
- Al teclear texto que aparece en el `perplexitySummary` de algún link, solo se muestran los coincidentes.
- Al teclear texto que no aparece en ninguno, se muestra el mensaje "No se han encontrado enlaces".

`firestore-client` se sigue mockeando con `vi.mock` igual que en los tests actuales.

## Resumen de archivos

**Nuevos:**

- `src/shared/components/search-box.tsx`
- `src/shared/components/search-box.module.css`
- `src/shared/components/search-box.test.tsx`
- `src/home-feed/home-feed.module.css`

**Modificados:**

- `src/home-feed/home-feed.tsx`
- `src/home-feed/home-feed.test.tsx`

**No se tocan:**

- `Feed`, `LinkPreview`, `Header`, `Layout`, `UserFeed`, `LinkDetail`, `About`.
- `firestore-client.tsx`.
- `types.ts`.

## Fuera de alcance

Iteraciones posteriores, no incluidas:

- Montar `SearchBox` en `UserFeed`.
- Búsqueda multi-campo (título, texto, etc.).
- Persistir la query en la URL (`?q=...`).
- Búsqueda por palabras o tokens.
- Resaltado de coincidencias en el `LinkPreview`.

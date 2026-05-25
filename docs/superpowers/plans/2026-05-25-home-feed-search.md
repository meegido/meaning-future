# HomeFeed Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a debounced, case-insensitive substring search on `perplexitySummary` to the HomeFeed page.

**Architecture:** A new reusable `SearchBox` component (in `src/shared/components/`) emits debounced query changes to its parent. `HomeFeed` keeps the query in local state, computes `filteredLinks` with `useMemo`, and renders either `<Feed>` or a "no results" message. `Feed`, `LinkPreview`, `Header`, and `firestore-client` are not modified.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, React Testing Library, CSS Modules.

**Spec:** `docs/superpowers/specs/2026-05-25-home-feed-search-design.md`

---

## File Structure

**New files:**
- `src/shared/components/search-box.tsx` — input component with internal debounce, emits `onQueryChange(value)`.
- `src/shared/components/search-box.module.css` — input styling.
- `src/shared/components/search-box.test.tsx` — debounce behavior tests.
- `src/home-feed/home-feed.module.css` — `.empty` class for "no results" message.

**Modified files:**
- `src/home-feed/home-feed.tsx` — adds `query` state, `filteredLinks` useMemo, renders `SearchBox`, conditional empty message.
- `src/home-feed/home-feed.test.tsx` — adds search/filter/empty-state tests.

Each task below is self-contained: write a failing test, run it, implement, run again, commit.

---

### Task 1: `SearchBox` — emits initial value via debounce

**Files:**
- Create: `src/shared/components/search-box.tsx`
- Create: `src/shared/components/search-box.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/shared/components/search-box.test.tsx`:

```tsx
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchBox } from './search-box';

describe('SearchBox', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls onQueryChange with the typed value after the debounce delay', async () => {
    const onQueryChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<SearchBox onQueryChange={onQueryChange} debounceMs={250} />);

    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });
    await user.type(input, 'react');

    expect(onQueryChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(onQueryChange).toHaveBeenCalledTimes(1);
    expect(onQueryChange).toHaveBeenLastCalledWith('react');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/shared/components/search-box.test.tsx`
Expected: FAIL — module `./search-box` cannot be resolved.

- [ ] **Step 3: Create the `SearchBox` component**

Create `src/shared/components/search-box.tsx`:

```tsx
import { ChangeEvent, useEffect, useState } from 'react';

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBox = ({
  onQueryChange,
  placeholder = 'Buscar...',
  debounceMs = 250,
}: SearchBoxProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQueryChange(value);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, debounceMs, onQueryChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="search"
      aria-label="Buscar enlaces"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/shared/components/search-box.test.tsx`
Expected: PASS (1 test).

Note: the component currently fires `onQueryChange('')` once on mount (initial effect run). The test above only asserts the final value, so it still passes. The next task addresses this explicitly.

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/search-box.tsx src/shared/components/search-box.test.tsx
git commit -m "feat(search-box): add debounced input component"
```

---

### Task 2: `SearchBox` — cancels intermediate calls when typing fast

**Files:**
- Modify: `src/shared/components/search-box.test.tsx`
- Modify: `src/shared/components/search-box.tsx` (only if test reveals a problem)

- [ ] **Step 1: Write the failing test**

Append to `src/shared/components/search-box.test.tsx` inside the `describe('SearchBox', ...)` block:

```tsx
  it('debounces rapid typing and emits only the final value', async () => {
    const onQueryChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<SearchBox onQueryChange={onQueryChange} debounceMs={250} />);

    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });

    onQueryChange.mockClear();

    await user.type(input, 'rea');
    act(() => {
      vi.advanceTimersByTime(100);
    });
    await user.type(input, 'ct');
    act(() => {
      vi.advanceTimersByTime(250);
    });

    const callsWithRealValues = onQueryChange.mock.calls.filter(
      ([arg]) => arg !== ''
    );
    expect(callsWithRealValues).toHaveLength(1);
    expect(callsWithRealValues[0]).toEqual(['react']);
  });
```

The `mockClear()` is intentional: it discards the empty-string call that fires once on mount, so the assertion only inspects user-driven calls.

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run src/shared/components/search-box.test.tsx`
Expected: PASS (2 tests).

If it fails, that means the cleanup function in `useEffect` is not cancelling the pending timeout. The component code in Task 1 already does this correctly; the test should pass without changes.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/search-box.test.tsx
git commit -m "test(search-box): verify rapid typing is debounced"
```

---

### Task 3: `SearchBox` — add styling

**Files:**
- Create: `src/shared/components/search-box.module.css`
- Modify: `src/shared/components/search-box.tsx`

- [ ] **Step 1: Create the CSS module**

Create `src/shared/components/search-box.module.css`:

```css
.wrapper {
  display: flex;
  justify-content: center;
  padding: 16px var(--container-padding);
}

.input {
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  outline: none;
}

.input:focus {
  border-color: rgba(0, 0, 0, 0.5);
}
```

- [ ] **Step 2: Wire the styles into the component**

Replace the contents of `src/shared/components/search-box.tsx` with:

```tsx
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './search-box.module.css';

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBox = ({
  onQueryChange,
  placeholder = 'Buscar...',
  debounceMs = 250,
}: SearchBoxProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQueryChange(value);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, debounceMs, onQueryChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        aria-label="Buscar enlaces"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};
```

- [ ] **Step 3: Run tests to confirm they still pass**

Run: `npx vitest run src/shared/components/search-box.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 4: Commit**

```bash
git add src/shared/components/search-box.module.css src/shared/components/search-box.tsx
git commit -m "feat(search-box): add styling"
```

---

### Task 4: `HomeFeed` — filters links by `perplexitySummary` substring

**Files:**
- Modify: `src/home-feed/home-feed.test.tsx`
- Modify: `src/home-feed/home-feed.tsx`

- [ ] **Step 1: Write the failing test**

Replace the contents of `src/home-feed/home-feed.test.tsx` with:

```tsx
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { MemoryRouter } from 'react-router-dom';
import { HomeFeed } from './home-feed';

vi.mock('../shared/infrastructure/firestore-client.tsx', () => ({
  getDocuments: vi.fn(),
}));

describe('Home feed', () => {
  const mockResponse = [
    {
      id: '1',
      serviceIcon: 'icon1.png',
      url: 'http://example.com/1',
      title: 'Example 1',
      text: 'Description 1',
      imageUrl: 'image1.png',
      userName: 'laponyo',
      perplexitySummary: 'A summary about React hooks',
      service: 'Linkedin',
    },
    {
      id: '2',
      serviceIcon: 'icon2.png',
      url: 'http://example.com/2',
      title: 'Example 2',
      text: 'Description 2',
      imageUrl: 'image2.png',
      userName: 'laponyo',
      perplexitySummary: 'A summary about TypeScript generics',
      service: 'Youtube',
    },
  ];

  beforeEach(async () => {
    (getDocuments as Mock).mockResolvedValue(mockResponse);
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeFeed />
        </MemoryRouter>
      );
    });
  });

  it('displays all user links when no query is entered', async () => {
    const readMoreLink = await screen.findAllByText(/Read more/i);
    expect(readMoreLink).toHaveLength(2);
  });

  it('filters links by perplexitySummary when the user types', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });

    await user.type(input, 'react');

    const readMoreLink = await screen.findAllByText(/Read more/i);
    expect(readMoreLink).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2, name: 'Example 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Example 2' })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/home-feed/home-feed.test.tsx`
Expected: FAIL — the filter test fails because the searchbox doesn't exist and no filtering happens.

- [ ] **Step 3: Update `HomeFeed` to wire up the search**

Replace the contents of `src/home-feed/home-feed.tsx` with:

```tsx
import { useEffect, useMemo, useState } from 'react';
import { LinkInfo } from '../types';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { Feed } from '../shared/components/feed/feed';
import { SearchBox } from '../shared/components/search-box';

export const HomeFeed = () => {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      const links = await getDocuments();
      setLinks(links);
    })();
  }, []);

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter((link) =>
      (link.perplexitySummary ?? '').toLowerCase().includes(q)
    );
  }, [links, query]);

  return (
    <>
      <SearchBox onQueryChange={setQuery} placeholder="Buscar en el resumen..." />
      <Feed links={filteredLinks} />
    </>
  );
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/home-feed/home-feed.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/home-feed/home-feed.tsx src/home-feed/home-feed.test.tsx
git commit -m "feat(home-feed): filter links by perplexitySummary"
```

---

### Task 5: `HomeFeed` — show "no results" message when filter is empty

**Files:**
- Create: `src/home-feed/home-feed.module.css`
- Modify: `src/home-feed/home-feed.test.tsx`
- Modify: `src/home-feed/home-feed.tsx`

- [ ] **Step 1: Write the failing test**

Append this test to the `describe('Home feed', ...)` block in `src/home-feed/home-feed.test.tsx`:

```tsx
  it('shows a "no results" message when the query matches no link', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('searchbox', { name: /buscar enlaces/i });

    await user.type(input, 'zzz-no-match');

    expect(await screen.findByText('No se han encontrado enlaces')).toBeInTheDocument();
    expect(screen.queryByText(/Read more/i)).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run tests to verify the new one fails**

Run: `npx vitest run src/home-feed/home-feed.test.tsx`
Expected: FAIL — the "no results" message is not rendered yet.

- [ ] **Step 3: Create the CSS module**

Create `src/home-feed/home-feed.module.css`:

```css
.empty {
  text-align: center;
  padding: 48px var(--container-padding);
  font-family: inherit;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
}
```

- [ ] **Step 4: Render the empty message conditionally**

Replace the contents of `src/home-feed/home-feed.tsx` with:

```tsx
import { useEffect, useMemo, useState } from 'react';
import { LinkInfo } from '../types';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { Feed } from '../shared/components/feed/feed';
import { SearchBox } from '../shared/components/search-box';
import styles from './home-feed.module.css';

export const HomeFeed = () => {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      const links = await getDocuments();
      setLinks(links);
    })();
  }, []);

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter((link) =>
      (link.perplexitySummary ?? '').toLowerCase().includes(q)
    );
  }, [links, query]);

  const showEmptyMessage = filteredLinks.length === 0 && query.trim() !== '';

  return (
    <>
      <SearchBox onQueryChange={setQuery} placeholder="Buscar en el resumen..." />
      {showEmptyMessage ? (
        <p className={styles.empty}>No se han encontrado enlaces</p>
      ) : (
        <Feed links={filteredLinks} />
      )}
    </>
  );
};
```

- [ ] **Step 5: Run tests to verify all pass**

Run: `npx vitest run src/home-feed/home-feed.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/home-feed/home-feed.module.css src/home-feed/home-feed.tsx src/home-feed/home-feed.test.tsx
git commit -m "feat(home-feed): show empty message when search has no results"
```

---

### Task 6: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full test suite**

Run: `npm run test -- --run`
Expected: All tests pass. New tests in `search-box.test.tsx` (2) and `home-feed.test.tsx` (3) included.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Run format check**

Run: `npm run format`
Expected: No formatting issues. If there are, run `npm run format:fix` and commit the result.

- [ ] **Step 4: Run the build**

Run: `npm run build`
Expected: Successful build, no TypeScript errors.

- [ ] **Step 5: Manual smoke test (if a browser is available)**

Run: `npm run dev`
- Open the dev URL.
- Confirm the search input appears above the feed on `/`.
- Type a word present in some link's `perplexitySummary`; confirm the list filters after ~250 ms.
- Clear the input (using the browser's native "x" or by deleting); confirm all links return.
- Type a string that matches nothing; confirm "No se han encontrado enlaces" appears.
- Visit `/:user` and `/about` and confirm no search input appears there.

If everything checks out, the feature is complete. No additional commit needed.

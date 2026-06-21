const STORAGE_KEY = 'lvid-learn-v1';
const VERSION = 1;

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.version === VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, ...state }));
  } catch {
    // localStorage unavailable (private mode, quota exceeded) - app keeps working in-memory
  }
}

export function mergeCustomCards(base, custom) {
  if (!custom || Object.keys(custom).length === 0) return base;
  const merged = { ...base };
  for (const cat of Object.keys(custom)) {
    merged[cat] = { ...(merged[cat] || {}) };
    for (const sub of Object.keys(custom[cat])) {
      merged[cat][sub] = [...(merged[cat][sub] || []), ...custom[cat][sub]];
    }
  }
  return merged;
}

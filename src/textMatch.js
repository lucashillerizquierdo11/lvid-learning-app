// Optimal-string-alignment distance: Levenshtein plus adjacent-transposition
// edits, since swapped-letter typos ("Mitokondire") are common and shouldn't
// cost twice as much as a substitution.
function editDistance(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }
  return dp[m][n];
}

function normalize(s) {
  return (s || '').trim().toLowerCase().replace(/[.,!?;:'"()]/g, '').replace(/\s+/g, ' ');
}

export function similarity(a, b) {
  const na = normalize(a), nb = normalize(b);
  if (na === nb) return 1;
  const dist = editDistance(na, nb);
  return 1 - dist / Math.max(na.length, nb.length, 1);
}

// Accepts minor typos so typed recall doesn't get penalized as harshly as
// a wrong answer would be - removes the friction that otherwise pushes
// learners toward weaker multiple-choice recognition.
export function matchTier(typed, answer) {
  const s = similarity(typed, answer);
  if (s === 1) return 'exact';
  if (s >= 0.85) return 'close';
  return 'wrong';
}

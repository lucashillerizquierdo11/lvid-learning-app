import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { initialData, categories, subcatMap } from './data';
import { loadState, saveState, mergeCustomCards } from './store';
import { matchTier } from './textMatch';
import {
  Rating, State, makeScheduler, newCard, gradeCard,
  previewIntervals, serializeCard, deserializeCard, formatInterval, isDue,
} from './fsrs';

const NEW_CARDS_PER_SESSION = 20;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Round-robins items across their groups so the same topic never repeats
// back-to-back - this is what makes review order interleaved (ABCABC)
// instead of blocked (AAABBB), the ordering the report's Layer 3 calls for.
function interleave(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const k = keyFn(item);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(item);
  }
  const buckets = [...groups.values()].map(shuffle);
  const result = [];
  while (buckets.some(b => b.length)) {
    for (const b of buckets) {
      if (b.length) result.push(b.shift());
    }
  }
  return result;
}

// ---- Bildhämtning från Wikipedia (gratis, ingen nyckel) ----
const imgCache = {};
function CardImage({ query }) {
  const [url, setUrl] = useState(imgCache[query]);
  useEffect(() => {
    let active = true;
    if (query in imgCache) { setUrl(imgCache[query]); return; }
    const q = encodeURIComponent(query.replace(/\s*\(.*?\)\s*/g, '').trim());
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${q}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        const src = d && d.thumbnail ? d.thumbnail.source : null;
        imgCache[query] = src;
        if (active) setUrl(src);
      })
      .catch(() => { imgCache[query] = null; if (active) setUrl(null); });
    return () => { active = false; };
  }, [query]);
  if (!url) return null;
  return <img src={url} alt={query} className="card-img" />;
}

export default function App() {
  const saved = useMemo(() => loadState(), []);
  const [customCards, setCustomCards] = useState(saved?.customCards || {});
  const data = useMemo(() => mergeCustomCards(initialData, customCards), [customCards]);
  const [cat, setCat] = useState('film');
  const [sub, setSub] = useState('Handlingar');
  const [mode, setMode] = useState('flashcard');
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [search, setSearch] = useState('');
  const [cardStates, setCardStates] = useState(saved?.cardStates || {});
  const [score, setScore] = useState(saved?.score || { correct: 0, total: 0 });
  const [retention, setRetention] = useState(saved?.settings?.retention ?? 0.9);
  const scheduler = useMemo(() => makeScheduler(retention), [retention]);
  const [picked, setPicked] = useState(null);
  const [typed, setTyped] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [matchSel, setMatchSel] = useState(null);
  const [matched, setMatched] = useState([]);
  const [visual, setVisual] = useState(true);      // visa bilder
  const [dir, setDir] = useState('term');          // 'term' = se begrepp -> minns definition; 'def' = tvärtom
  const [nt, setNt] = useState('');
  const [nd, setNd] = useState('');
  const [ndiff, setNdiff] = useState('medel');

  const modes = [
    { id: 'flashcard', name: 'Flashcard' },
    { id: 'review', name: 'Repetition' },
    { id: 'multiple', name: 'Flerval' },
    { id: 'fillin', name: 'Fylla i' },
    { id: 'matching', name: 'Matcha' },
  ];

  const subs = subcatMap[cat] || [];
  const allCards = (data[cat]?.[sub]) || [];
  const cards = useMemo(() => {
    if (!search.trim()) return allCards;
    const q = search.toLowerCase();
    return allCards.filter(c => c.title.toLowerCase().includes(q) || c.definition.toLowerCase().includes(q));
  }, [allCards, search]);

  const card = cards[idx];

  // Cross-topic due queue powering "Repetition" - this is the interleaved
  // spaced-review engine; "Flashcard" stays a per-subcategory block/focus mode.
  const [reviewQueue, setReviewQueue] = useState([]);
  const [reviewIdx, setReviewIdx] = useState(0);

  const dueCount = useMemo(() => {
    const now = new Date();
    let n = 0;
    for (const c of Object.keys(data)) {
      for (const s of Object.keys(data[c] || {})) {
        for (const cd of data[c][s]) {
          const stored = cardStates[`${c}:${s}:${cd.title}`];
          if (stored && isDue(deserializeCard(stored), now)) n++;
        }
      }
    }
    return n;
  }, [data, cardStates]);

  function buildReviewQueue() {
    const now = new Date();
    const due = [];
    const fresh = [];
    for (const c of Object.keys(data)) {
      for (const s of Object.keys(data[c] || {})) {
        for (const cd of data[c][s]) {
          const key = `${c}:${s}:${cd.title}`;
          const stored = cardStates[key];
          if (stored) {
            if (isDue(deserializeCard(stored), now)) due.push({ cat: c, sub: s, card: cd, key });
          } else {
            fresh.push({ cat: c, sub: s, card: cd, key });
          }
        }
      }
    }
    const newBatch = shuffle(fresh).slice(0, NEW_CARDS_PER_SESSION);
    setReviewQueue(interleave([...shuffle(due), ...newBatch], item => item.cat));
    setReviewIdx(0);
  }

  function reset() { setIdx(0); setFlipped(false); setPicked(null); setTyped(''); setRevealed(false); setMatchSel(null); setMatched([]); }
  function selectCat(c) { setCat(c); setSub((subcatMap[c] || [])[0]); reset(); }
  function selectSub(s) { setSub(s); reset(); }
  function selectMode(m) { setMode(m); reset(); if (m === 'review') buildReviewQueue(); }
  function next() { setFlipped(false); setPicked(null); setTyped(''); setRevealed(false); setIdx(i => Math.min(i + 1, cards.length - 1)); }
  function prev() { setFlipped(false); setPicked(null); setTyped(''); setRevealed(false); setIdx(i => Math.max(i - 1, 0)); }

  const cardKey = card ? `${cat}:${sub}:${card.title}` : null;
  const cardState = useMemo(() => {
    if (!cardKey) return null;
    const stored = cardStates[cardKey];
    return stored ? deserializeCard(stored) : newCard();
  }, [cardKey, cardStates]);

  const preview = useMemo(() => {
    if (!cardState) return null;
    return previewIntervals(scheduler, cardState, new Date());
  }, [cardState, scheduler]);

  function rate(rating) {
    const { card: nextCard } = gradeCard(scheduler, cardState, rating, new Date());
    setCardStates(cs => ({ ...cs, [cardKey]: serializeCard(nextCard) }));
    if (idx < cards.length - 1) next();
  }

  const reviewItem = mode === 'review' ? reviewQueue[reviewIdx] : null;
  const reviewCardState = useMemo(() => {
    if (!reviewItem) return null;
    const stored = cardStates[reviewItem.key];
    return stored ? deserializeCard(stored) : newCard();
  }, [reviewItem, cardStates]);
  const reviewPreview = useMemo(() => {
    if (!reviewCardState) return null;
    return previewIntervals(scheduler, reviewCardState, new Date());
  }, [reviewCardState, scheduler]);

  function rateReview(rating) {
    const { card: nextCard } = gradeCard(scheduler, reviewCardState, rating, new Date());
    setCardStates(cs => ({ ...cs, [reviewItem.key]: serializeCard(nextCard) }));
    setFlipped(false);
    setReviewIdx(i => i + 1);
  }

  // riktning: vad visas och vad är svaret
  const frontText = dir === 'term' ? card?.title : card?.definition;
  const backText = dir === 'term' ? card?.definition : card?.title;
  const frontLabel = dir === 'term' ? 'Begrepp' : 'Definition';
  const backLabel = dir === 'term' ? 'Definition' : 'Begrepp';

  // flerval
  const options = useMemo(() => {
    if (mode !== 'multiple' || !card) return [];
    const answerField = dir === 'term' ? 'definition' : 'title';
    const others = allCards.filter(c => c.title !== card.title);
    const distractors = shuffle(others).slice(0, 3).map(c => c[answerField]);
    return shuffle([card[answerField], ...distractors]);
  }, [mode, card, allCards, dir]);

  const answerValue = dir === 'term' ? card?.definition : card?.title;

  function pick(opt) {
    if (picked !== null) return;
    setPicked(opt);
    setScore(s => ({ correct: s.correct + (opt === answerValue ? 1 : 0), total: s.total + 1 }));
  }

  // fylla i
  const fillPrompt = dir === 'term' ? card?.definition : card?.title;
  const fillAnswer = dir === 'term' ? card?.title : card?.definition;
  const fillTier = useMemo(() => matchTier(typed, fillAnswer || ''), [typed, fillAnswer]);

  function checkTyped() {
    if (revealed) return;
    setRevealed(true);
    setScore(s => ({ correct: s.correct + (fillTier !== 'wrong' ? 1 : 0), total: s.total + 1 }));
  }

  // matcha
  const matchCards = useMemo(() => allCards.slice(0, 5), [allCards]);
  const matchDefs = useMemo(() => shuffle(matchCards), [matchCards, sub, cat]);
  function clickTerm(t) { if (matched.includes(t.title)) return; setMatchSel(t.title); }
  function clickDef(d) {
    if (!matchSel || matched.includes(d.title)) return;
    if (d.title === matchSel) setMatched(m => [...m, d.title]);
    setMatchSel(null);
  }

  function addCard() {
    if (!nt.trim() || !nd.trim()) return;
    setCustomCards(cc => {
      const copy = { ...cc };
      copy[cat] = { ...(copy[cat] || {}) };
      copy[cat][sub] = [...(copy[cat][sub] || []), { title: nt, definition: nd, difficulty: ndiff }];
      return copy;
    });
    setNt(''); setNd(''); setNdiff('medel');
  }

  useEffect(() => {
    saveState({ customCards, cardStates, score, settings: { retention } });
  }, [customCards, cardStates, score, retention]);

  const learned = allCards.filter(c => cardStates[`${cat}:${sub}:${c.title}`]?.state === State.Review).length;
  const accuracy = score.total ? Math.round((score.correct / score.total) * 100) : null;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">Lvid<span>Learn</span></div>
        <h3 className="side-h">Kategorier</h3>
        <div className="cat-list">
          {Object.entries(categories).map(([k, c]) => (
            <button key={k} onClick={() => selectCat(k)} className={`cat-btn ${cat === k ? 'active' : ''}`}
              style={cat === k ? { background: `${c.color}33`, color: c.color, borderColor: `${c.color}66` } : {}}>
              <span className="dot" style={{ background: c.color }}></span>{c.name}
            </button>
          ))}
        </div>
      </aside>

      <div className="main">
        <header className="hdr">
          <div className="hdr-top">
            <h1>{categories[cat]?.name}</h1>
            <div className="hdr-controls">
              <input className="search" placeholder="Sök kort..." value={search}
                onChange={e => { setSearch(e.target.value); setIdx(0); }} />
              <button className={`toggle ${visual ? 'on' : ''}`} onClick={() => setVisual(v => !v)} title="Visa bilder">
                🖼️ Bilder {visual ? 'på' : 'av'}
              </button>
              <button className="toggle dir" onClick={() => { setDir(d => d === 'term' ? 'def' : 'term'); reset(); }} title="Byt riktning">
                {dir === 'term' ? 'Begrepp → Definition' : 'Definition → Begrepp'}
              </button>
              <label className="retention" title="Hur hög minnessäkerhet schemaläggningen siktar på">
                Mål: {Math.round(retention * 100)}%
                <input type="range" min="0.7" max="0.97" step="0.01" value={retention}
                  onChange={e => setRetention(parseFloat(e.target.value))} />
              </label>
            </div>
          </div>
          <div className="modes">
            {modes.map(m => (
              <button key={m.id} onClick={() => selectMode(m.id)} className={`mode-btn ${mode === m.id ? 'active' : ''}`}>
                {m.name}{m.id === 'review' && dueCount > 0 ? ` (${dueCount})` : ''}
              </button>
            ))}
          </div>
        </header>

        <div className="body">
          <div className="left">
            <h3 className="side-h">Subkategorier</h3>
            <div className="sub-list">
              {subs.map(s => (
                <button key={s} onClick={() => selectSub(s)} className={`sub-btn ${sub === s ? 'active' : ''}`}>{s}</button>
              ))}
            </div>
            <div className="stat-box">
              <h4>Statistik</h4>
              <div className="stat-row"><span>Kort</span><b>{allCards.length}</b></div>
              <div className="stat-row"><span>Lärt</span><b>{learned}</b></div>
              <div className="stat-row"><span>Träffsäkerhet</span><b>{accuracy === null ? '–' : accuracy + '%'}</b></div>
              <div className="bar"><div className="fill" style={{ width: `${allCards.length ? (learned / allCards.length) * 100 : 0}%` }}></div></div>
            </div>
          </div>

          <div className="center">
            {!card && mode !== 'matching' && mode !== 'review' && <p className="empty">Inga kort här ännu.</p>}

            {mode === 'flashcard' && card && (
              <>
                <div className={`card ${flipped ? 'flip' : ''}`} onClick={() => setFlipped(f => !f)}>
                  <div className="card-in">
                    <div className="face front">
                      {visual && <CardImage query={card.title} />}
                      <span className="lbl">{frontLabel}</span>
                      {dir === 'term' ? <h2>{frontText}</h2> : <p>{frontText}</p>}
                      <span className="hint">Klicka för att vända</span>
                    </div>
                    <div className="face back">
                      <span className="lbl">{backLabel}</span>
                      {dir === 'term' ? <p>{backText}</p> : <h2>{backText}</h2>}
                    </div>
                  </div>
                </div>
                <Nav idx={idx} len={cards.length} prev={prev} next={next} />
                {flipped && preview && (
                  <div className="fb">
                    <button className="fb-btn forgot" onClick={() => rate(Rating.Again)}>Igen<span className="iv">{formatInterval(preview[Rating.Again].card.due)}</span></button>
                    <button className="fb-btn hard" onClick={() => rate(Rating.Hard)}>Svår<span className="iv">{formatInterval(preview[Rating.Hard].card.due)}</span></button>
                    <button className="fb-btn good" onClick={() => rate(Rating.Good)}>Bra<span className="iv">{formatInterval(preview[Rating.Good].card.due)}</span></button>
                    <button className="fb-btn easy" onClick={() => rate(Rating.Easy)}>Lätt<span className="iv">{formatInterval(preview[Rating.Easy].card.due)}</span></button>
                  </div>
                )}
              </>
            )}

            {mode === 'review' && reviewItem && (
              <>
                <div className="spaced-info">
                  <span className="dot" style={{ background: categories[reviewItem.cat]?.color }}></span>
                  {' '}{categories[reviewItem.cat]?.name} · {reviewItem.sub} &nbsp;·&nbsp; Kort {reviewIdx + 1} / {reviewQueue.length}
                </div>
                <div className={`card ${flipped ? 'flip' : ''}`} onClick={() => setFlipped(f => !f)}>
                  <div className="card-in">
                    <div className="face front">
                      {visual && <CardImage query={reviewItem.card.title} />}
                      <span className="lbl">{dir === 'term' ? 'Begrepp' : 'Definition'}</span>
                      {dir === 'term' ? <h2>{reviewItem.card.title}</h2> : <p>{reviewItem.card.definition}</p>}
                      <span className="hint">Klicka för att vända</span>
                    </div>
                    <div className="face back">
                      <span className="lbl">{dir === 'term' ? 'Definition' : 'Begrepp'}</span>
                      {dir === 'term' ? <p>{reviewItem.card.definition}</p> : <h2>{reviewItem.card.title}</h2>}
                    </div>
                  </div>
                </div>
                {flipped && reviewPreview && (
                  <div className="fb">
                    <button className="fb-btn forgot" onClick={() => rateReview(Rating.Again)}>Igen<span className="iv">{formatInterval(reviewPreview[Rating.Again].card.due)}</span></button>
                    <button className="fb-btn hard" onClick={() => rateReview(Rating.Hard)}>Svår<span className="iv">{formatInterval(reviewPreview[Rating.Hard].card.due)}</span></button>
                    <button className="fb-btn good" onClick={() => rateReview(Rating.Good)}>Bra<span className="iv">{formatInterval(reviewPreview[Rating.Good].card.due)}</span></button>
                    <button className="fb-btn easy" onClick={() => rateReview(Rating.Easy)}>Lätt<span className="iv">{formatInterval(reviewPreview[Rating.Easy].card.due)}</span></button>
                  </div>
                )}
              </>
            )}

            {mode === 'review' && !reviewItem && (
              <p className="empty">{reviewQueue.length === 0 ? 'Inga kort att repetera just nu. Bra jobbat! 🎉' : 'Klart för denna sessionen! 🎉'}</p>
            )}

            {mode === 'multiple' && card && (
              <div className="quiz">
                {visual && <CardImage query={card.title} />}
                <span className="lbl">{dir === 'term' ? 'Vad stämmer för:' : 'Vilket begrepp matchar:'}</span>
                {dir === 'term' ? <h2 className="q">{card.title}</h2> : <p className="def-prompt">{card.definition}</p>}
                <div className="opts">
                  {options.map((o, i) => {
                    const isCorrect = picked !== null && o === answerValue;
                    const isWrong = picked === o && o !== answerValue;
                    return (
                      <button key={i} onClick={() => pick(o)} className={`opt ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>{o}</button>
                    );
                  })}
                </div>
                <Nav idx={idx} len={cards.length} prev={prev} next={next} />
              </div>
            )}

            {mode === 'fillin' && card && (
              <div className="quiz">
                {visual && <CardImage query={card.title} />}
                <span className="lbl">{dir === 'term' ? 'Vilket begrepp matchar?' : 'Skriv definitionen för:'}</span>
                {dir === 'term' ? <p className="def-prompt">{fillPrompt}</p> : <h2 className="q">{fillPrompt}</h2>}
                <input className="fill-input" value={typed} placeholder="Skriv ditt svar..."
                  onChange={e => setTyped(e.target.value)} onKeyDown={e => e.key === 'Enter' && checkTyped()} />
                {!revealed
                  ? <button className="check" onClick={checkTyped}>Kontrollera</button>
                  : <div className={`result ${fillTier !== 'wrong' ? 'ok' : 'no'}`}>
                      {fillTier === 'exact' ? 'Rätt! ' : fillTier === 'close' ? 'Nästan rätt! ' : 'Rätt svar: '}<b>{fillAnswer}</b>
                    </div>}
                <Nav idx={idx} len={cards.length} prev={prev} next={next} />
              </div>
            )}

            {mode === 'matching' && (
              <div className="match">
                <div className="match-col">
                  {matchCards.map(t => (
                    <button key={t.title} onClick={() => clickTerm(t)}
                      className={`m-item ${matchSel === t.title ? 'sel' : ''} ${matched.includes(t.title) ? 'done' : ''}`}>{t.title}</button>
                  ))}
                </div>
                <div className="match-col">
                  {matchDefs.map(d => (
                    <button key={d.title} onClick={() => clickDef(d)} className={`m-item def ${matched.includes(d.title) ? 'done' : ''}`}>
                      {d.definition.length > 70 ? d.definition.slice(0, 70) + '…' : d.definition}
                    </button>
                  ))}
                </div>
                {matched.length === matchCards.length && matchCards.length > 0 && <div className="match-win">Alla matchade! 🎉</div>}
              </div>
            )}
          </div>

          <div className="right">
            <div className="add-box">
              <h4>Lägg till kort</h4>
              <label>Begrepp</label>
              <input value={nt} onChange={e => setNt(e.target.value)} placeholder="t.ex. Titel" />
              <label>Definition</label>
              <textarea rows="3" value={nd} onChange={e => setNd(e.target.value)} placeholder="Beskrivning..." />
              <label>Svårighet</label>
              <select value={ndiff} onChange={e => setNdiff(e.target.value)}>
                <option value="lätt">Lätt</option><option value="medel">Medel</option><option value="svår">Svår</option>
              </select>
              <button className="add" onClick={addCard}>+ Lägg till i {sub}</button>
            </div>
            <div className="stat-box">
              <h4>Session</h4>
              <div className="stat-row"><span>Rätt</span><b>{score.correct}</b></div>
              <div className="stat-row"><span>Totalt</span><b>{score.total}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav({ idx, len, prev, next }) {
  return (
    <div className="nav">
      <button onClick={prev} disabled={idx === 0}>← Föregående</button>
      <span>{len ? idx + 1 : 0} / {len}</span>
      <button onClick={next} disabled={idx >= len - 1}>Nästa →</button>
    </div>
  );
}

import { fsrs, generatorParameters, createEmptyCard, Rating, State } from 'ts-fsrs';

export { Rating, State };

export function makeScheduler(requestRetention = 0.9) {
  const params = generatorParameters({ request_retention: requestRetention, enable_fuzz: true });
  return fsrs(params);
}

export function newCard(now = new Date()) {
  return createEmptyCard(now);
}

export function gradeCard(scheduler, card, rating, now = new Date()) {
  return scheduler.next(card, now, rating);
}

// preview the resulting card/due-date for every possible rating, so the UI
// can show the learner what each button will do before they pick one
export function previewIntervals(scheduler, card, now = new Date()) {
  return scheduler.repeat(card, now);
}

export function retrievability(scheduler, card, now = new Date()) {
  return scheduler.get_retrievability(card, now, false);
}

export function isDue(card, now = new Date()) {
  return new Date(card.due) <= now;
}

export function serializeCard(card) {
  return {
    ...card,
    due: new Date(card.due).toISOString(),
    last_review: card.last_review ? new Date(card.last_review).toISOString() : undefined,
  };
}

export function deserializeCard(obj) {
  return {
    ...obj,
    due: new Date(obj.due),
    last_review: obj.last_review ? new Date(obj.last_review) : undefined,
  };
}

export function formatInterval(due, now = new Date()) {
  const ms = new Date(due) - now;
  const minutes = Math.round(ms / 60000);
  if (minutes < 1) return '<1 min';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} d`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} mån`;
  return `${(days / 365).toFixed(1)} år`;
}

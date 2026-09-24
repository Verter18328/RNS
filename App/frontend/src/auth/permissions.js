/**
 * Uprawnienia aplikacji back-office.
 * Później API zwróci listę per użytkownik — guardy i sidebar zostają bez zmian.
 *
 * Przykłady przyszłych ról:
 * - tylko strona WWW:  ['site']
 * - tylko zawody:      ['competitions']
 * - pełny dostęp:      ['site', 'competitions']
 */
export const PERMISSIONS = {
  SITE: 'site',
  COMPETITIONS: 'competitions',
}

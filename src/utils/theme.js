/**
 * Theme Manager for Editorial Japandi Dark/Light Mode
 * Supports localStorage persistence and system preference detection.
 */

let isDark = false;
const listeners = new Set();

// Initialize theme
if (typeof window !== 'undefined') {
  try {
    const savedTheme = localStorage.getItem('editorial_portfolio_theme');
    if (savedTheme) {
      isDark = savedTheme === 'dark';
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  } catch (e) {
    isDark = false;
  }
  applyTheme(isDark);
}

function applyTheme(dark) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;
  
  if (dark) {
    root.classList.add('dark');
    if (body) body.classList.add('dark');
    root.style.colorScheme = 'dark';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', '#111614');
  } else {
    root.classList.remove('dark');
    if (body) body.classList.remove('dark');
    root.style.colorScheme = 'light';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', '#F7F5F0');
  }
}

export function getIsDarkMode() {
  return isDark;
}

export function setDarkMode(dark) {
  isDark = dark;
  applyTheme(dark);
  try {
    localStorage.setItem('editorial_portfolio_theme', dark ? 'dark' : 'light');
  } catch (e) {}
  listeners.forEach((fn) => fn(isDark));
}

export function toggleDarkMode() {
  setDarkMode(!isDark);
  return !isDark;
}

export function subscribeTheme(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

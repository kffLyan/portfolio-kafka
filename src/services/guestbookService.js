import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_GUESTBOOK } from '../data/portfolioData';

const STORAGE_KEY = 'kafka_portfolio_guestbook_entries_v2';

/**
 * Fetch all guestbook entries
 * Priority 1: Supabase Cloud Database (if configured)
 * Priority 2: LocalStorage / Initial seed data (graceful fallback)
 */
export async function getGuestbookEntries() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.warn('Supabase fetch error, falling back to local storage:', error.message);
      } else if (data) {
        const formatted = data.map((row) => ({
          id: row.id,
          name: row.name,
          role: row.role || 'Visitor / Collaborator',
          message: row.message,
          timestamp: row.created_at,
        }));
        // Cache to local storage so local storage stays in sync with cloud
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
        } catch (_) {}
        return formatted;
      }
    } catch (err) {
      console.warn('Network or Supabase exception:', err);
    }
  }

  // Fallback to local storage or initial seed data only when Supabase fails/unreachable
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (_) {}

  return INITIAL_GUESTBOOK;
}

/**
 * Add a new entry to the guestbook
 */
export async function addGuestbookEntry({ name, role, message }) {
  const newEntry = {
    name: name.trim(),
    role: role.trim() || 'Visitor / Collaborator',
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .insert([
          {
            name: newEntry.name,
            role: newEntry.role,
            message: newEntry.message,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        role: data.role,
        message: data.message,
        timestamp: data.created_at,
      };
    } catch (err) {
      console.warn('Falling back to local optimistic insert due to Supabase error:', err);
    }
  }

  // Local fallback insert
  const localEntry = {
    id: `entry-${Date.now()}`,
    ...newEntry,
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const list = stored ? JSON.parse(stored) : INITIAL_GUESTBOOK;
    const updated = [localEntry, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (_) {}

  return localEntry;
}

/**
 * Subscribe to real-time additions and deletions on the guestbook table
 * Returns an unsubscribe function
 */
export function subscribeToGuestbookUpdates(onNewEntry, onDeleteEntry) {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  try {
    const channel = supabase
      .channel('guestbook-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'guestbook' },
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            const row = payload.new;
            onNewEntry?.({
              id: row.id,
              name: row.name,
              role: row.role || 'Visitor / Collaborator',
              message: row.message,
              timestamp: row.created_at,
            });
          } else if (payload.eventType === 'DELETE' && payload.old) {
            onDeleteEntry?.(payload.old.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Real-time subscription failed:', err);
    return () => {};
  }
}

/**
 * Returns connection metadata
 */
export function getDatabaseStatus() {
  return {
    isConfigured: isSupabaseConfigured,
    provider: isSupabaseConfigured ? 'Supabase PostgreSQL (Live Realtime)' : 'Local Storage (Siap Hubung ke Supabase)',
  };
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Song } from '../types';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  favorites: string[];
  history: Song[];
  isPlayerExpanded: boolean;
  setIsPlayerExpanded: (expanded: boolean) => void;
  playSong: (song: Song, newQueue?: Song[]) => void;
  togglePlay: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  playNext: () => void;
  playPrev: () => void;
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  clearHistory: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState<boolean>(false);

  // Favorites in LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // History in LocalStorage
  const [history, setHistory] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vibe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('vibe_history', JSON.stringify(history));
  }, [history]);

  const toggleFavorite = useCallback((songId: string) => {
    setFavorites(prev => 
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  }, []);

  const isFavorite = useCallback((songId: string) => {
    return favorites.includes(songId);
  }, [favorites]);

  const playSong = useCallback((song: Song, newQueue?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);

    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
    }

    // Add to history (hindari duplikasi berdekatan)
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== song.id);
      return [song, ...filtered].slice(0, 30);
    });
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeSong = useCallback(() => {
    if (currentSong) {
      setIsPlaying(true);
    }
  }, [currentSong]);

  const playNext = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    if (currentIndex !== -1 && currentIndex + 1 < queue.length) {
      playSong(queue[currentIndex + 1]);
    } else if (queue.length > 0) {
      // Loop kembali ke awal antrean
      playSong(queue[0]);
    }
  }, [currentSong, queue, playSong]);

  const playPrev = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1]);
    } else {
      playSong(queue[queue.length - 1]);
    }
  }, [currentSong, queue, playSong]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        queue,
        favorites,
        history,
        isPlayerExpanded,
        setIsPlayerExpanded,
        playSong,
        togglePlay,
        pauseSong,
        resumeSong,
        playNext,
        playPrev,
        toggleFavorite,
        isFavorite,
        clearHistory
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

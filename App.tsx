import React, { useState, useMemo } from 'react';
import { Mood, EnergyLevel, NeedCategory } from './types';
import { SAMPLE_SONGS, MOOD_OPTIONS } from './data/songsData';
import { getRecommendations } from './utils/recommendationEngine';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { MoodSelector } from './components/mood/MoodSelector';
import { EnergySlider } from './components/mood/EnergySlider';
import { NeedSelector } from './components/mood/NeedSelector';
import { TrackList } from './components/tracks/TrackList';
import { SearchBar } from './components/search/SearchBar';
import { FavoritesView } from './components/common/FavoritesView';
import { HistoryView } from './components/common/HistoryView';
import { PlayerDock } from './components/player/PlayerDock';
import { Sparkles, Dices, ArrowDown } from 'lucide-react';

export const App: React.FC = () => {
  const { isDarkMode, setActiveMood, ambientGradient, accentColor } = useTheme();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'home' | 'favorites' | 'history'>('home');

  // Mood Selection States
  const [selectedMood, setSelectedMood] = useState<Mood>('Santai');
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>(3);
  const [selectedNeed, setSelectedNeed] = useState<NeedCategory>('Ingin bersantai');

  // Search Query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle Mood change
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setActiveMood(mood);
  };

  // Surprise / Randomizer feature
  const handleSurpriseMe = () => {
    const randomMood = MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)].id;
    const randomEnergy = (Math.floor(Math.random() * 5) + 1) as EnergyLevel;
    const needs: NeedCategory[] = [
      'Ingin bersantai',
      'Ingin semangat',
      'Ingin fokus',
      'Ingin ditemani',
      'Ingin menghibur diri',
      'Ingin bernostalgia'
    ];
    const randomNeed = needs[Math.floor(Math.random() * needs.length)];

    setSelectedMood(randomMood);
    setActiveMood(randomMood);
    setEnergyLevel(randomEnergy);
    setSelectedNeed(randomNeed);

    // Scroll to recommendations
    document.getElementById('rekomendasi-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Recommendations calculated via engine
  const recommendedSongs = useMemo(() => {
    return getRecommendations(SAMPLE_SONGS, {
      mood: selectedMood,
      energy: energyLevel,
      need: selectedNeed
    });
  }, [selectedMood, energyLevel, selectedNeed]);

  // Filtered songs if user types in search bar
  const displayedSongs = useMemo(() => {
    if (!searchQuery.trim()) {
      return recommendedSongs;
    }
    const q = searchQuery.toLowerCase();
    return SAMPLE_SONGS.filter(song =>
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.mood.toLowerCase().includes(q) ||
      song.category.toLowerCase().includes(q) ||
      (song.genre && song.genre.toLowerCase().includes(q))
    );
  }, [searchQuery, recommendedSongs]);

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 ${
      isDarkMode ? 'bg-[#0a0d14] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Dynamic Ambient Background Glow Mesh */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 ease-out z-0 opacity-40 dark:opacity-35"
        style={{
          background: ambientGradient,
          filter: 'blur(100px)'
        }}
      />
      <div 
        className="fixed -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25 transition-colors duration-1000"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="fixed top-1/2 -right-40 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: accentColor }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
          
          {activeTab === 'favorites' && (
            <FavoritesView onBackToHome={() => setActiveTab('home')} />
          )}

          {activeTab === 'history' && (
            <HistoryView onBackToHome={() => setActiveTab('home')} />
          )}

          {activeTab === 'home' && (
            <div className="space-y-16">
              
              {/* Hero Banner Section */}
              <section className="text-center pt-4 sm:pt-10 max-w-3xl mx-auto">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border shadow-lg"
                  style={{ 
                    backgroundColor: `${accentColor}15`,
                    borderColor: `${accentColor}40`,
                    color: accentColor
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Rekomendasi Musik Cerdas & Emosional
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-4">
                  Temukan musik yang sesuai dengan <span className="underline decoration-wavy decoration-2" style={{ textDecorationColor: accentColor }}>suasana hatimu</span>.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
                  Ceritakan perasaanmu hari ini, atur tingkat energi, dan nikmati alunan lagu pilihan yang siap menemani setiap detik harimu.
                </p>

                {/* Search Bar or Quick Random Action */}
                <div className="space-y-3">
                  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                  {!searchQuery && (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          document.getElementById('kuesioner-vibe')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                        style={{ 
                          backgroundColor: accentColor,
                          boxShadow: `0 8px 30px ${accentColor}40`
                        }}
                      >
                        <span>Mulai Pilih Suasana Hati</span>
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleSurpriseMe}
                        className="px-5 py-3 rounded-2xl font-bold text-sm text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                      >
                        <Dices className="w-4 h-4 text-amber-400" />
                        <span>Acak Vibe Hari Ini</span>
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* If user is searching, show search results directly */}
              {searchQuery ? (
                <section className="pt-4">
                  <TrackList
                    songs={displayedSongs}
                    title={`Hasil Pencarian: "${searchQuery}"`}
                    subtitle={`Menemukan ${displayedSongs.length} lagu yang sesuai dengan kata kunci pencarian.`}
                    onResetCriteria={() => setSearchQuery('')}
                  />
                </section>
              ) : (
                /* The 3-Step Interactive Vibe Questionnaire */
                <div id="kuesioner-vibe" className="space-y-16 pt-4">
                  
                  {/* Step 1: Mood Selector */}
                  <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
                    <MoodSelector
                      selectedMood={selectedMood}
                      onSelectMood={handleMoodSelect}
                    />
                  </section>

                  {/* Step 2: Energy Slider */}
                  <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
                    <EnergySlider
                      energy={energyLevel}
                      onChangeEnergy={setEnergyLevel}
                    />
                  </section>

                  {/* Step 3: Need Selector */}
                  <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
                    <NeedSelector
                      selectedNeed={selectedNeed}
                      onSelectNeed={setSelectedNeed}
                    />
                  </section>

                  {/* Step 4: Recommendations Section */}
                  <section id="rekomendasi-section" className="pt-4 scroll-mt-24">
                    <TrackList
                      songs={displayedSongs}
                      title={`Rekomendasi Khusus Untuk Suasana ${selectedMood}`}
                      activeCriteria={{
                        mood: selectedMood,
                        energy: energyLevel,
                        need: selectedNeed
                      }}
                      onResetCriteria={() => {
                        setSelectedMood('Santai');
                        setEnergyLevel(3);
                        setSelectedNeed('Ingin bersantai');
                      }}
                    />
                  </section>

                </div>
              )}

            </div>
          )}

        </main>

        {/* Global YouTube Floating Dock Player */}
        <PlayerDock />

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 py-8 text-center text-xs text-slate-500 relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-400">VIBE</span>
              <span>— Rekomendasi Musik Berdasarkan Suasana Hati</span>
            </div>
            <p className="text-slate-500">
              Didukung oleh pemutar resmi YouTube IFrame API. Konten musik adalah hak cipta pemilik resmi masing-masing.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
};

import { useState, useRef, useEffect } from 'react';
import { FiMusic, FiPlay, FiPause, FiX } from 'react-icons/fi';
import OptionWheel from './OptionWheel';

const PLAYLIST = [
  { title: "Maple Leaf Rag", url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Maple_Leaf_Rag.ogg" },
  { title: "The Entertainer", url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/The_Entertainer_-_Scott_Joplin.ogg" },
  { title: "St. Louis Blues", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/OriginalDixielandJazzBandwithAlBernard_StLouisBlues.ogg" },
  { title: "Pine Apple Rag", url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Pine_Apple_Rag.ogg" },
  { title: "Alexander's Ragtime Band", url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Arthur_Collins_and_Byron_Harlan_-_Alexander%27s_Ragtime_Band_-_1911.ogg" },
  { title: "Swipesy Cakewalk", url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Scott_Joplin_-_Swipesy_Cakewalk_%281900%29.ogg" }
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickTimeout = useRef<any>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; 
    }
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMenu]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Playback prevented by browser:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClick = () => {
    if (clickTimeout.current) {
      // Double click detected
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      togglePlay();
    } else {
      // Single click detected, wait to see if it becomes a double click
      clickTimeout.current = setTimeout(() => {
        setShowMenu(prev => !prev);
        clickTimeout.current = null;
      }, 250);
    }
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = PLAYLIST[index].url;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.log('Autoplay prevented:', e));
      }
    }
  };

  return (
    <>
      {/* Fullscreen Backdrop for scroll lock and click-away dismissal */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-all duration-500 ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowMenu(false)}
        onWheel={(e) => e.stopPropagation()}
      />

      {/* Option Wheel Menu Popup (Full Height Sidebar) */}
      <div 
        className={`fixed inset-y-0 left-0 w-full md:w-[600px] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-50 flex items-center ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="relative w-full h-full flex flex-col justify-center">
          <div className="absolute inset-0" onWheel={(e) => e.stopPropagation()}>
            <OptionWheel
              items={PLAYLIST.map(track => track.title)}
              defaultSelected={0}
              textColor="#a6a6a6"
              activeColor="#ffffff"
              side="left"
              fontSize={3}
              spacing={1.4}
              curve={1}
              tilt={6}
              blur={2}
              fade={0.25}
              smoothing={200}
              inset={80}
              loop={false}
              draggable
              soundUrl="/assets/sounds/click-soft.mp3"
              soundVolume={0.5}
              onChange={handleTrackChange}
            />
          </div>
        </div>
      </div>

      {/* Music Player Button (Vinyl Record) */}
      <div className="fixed bottom-6 left-6 z-50 flex items-end gap-4 group">
        {/* Tooltip / Label */}
        <div className={`absolute left-16 ml-2 bg-background/80 backdrop-blur border border-border px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/80 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg ${showMenu ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`}>
          Double-click: Play/Pause | Single-click: Menu
        </div>

        <audio 
          ref={audioRef} 
          loop 
          src={PLAYLIST[currentTrackIndex].url} 
        />
        
        <div 
          onClick={handleClick}
          className={`relative w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 cursor-pointer shrink-0 hover:scale-105 opacity-100 ${showMenu ? 'z-[60]' : ''}`}
        >
          {/* Spinning Vinyl Record */}
          <div 
            className={`absolute inset-0 rounded-full bg-zinc-900 border-2 border-zinc-700/50 overflow-hidden flex items-center justify-center ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : 'transition-transform duration-700'}`}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-1 rounded-full border border-white/10" />
            <div className="absolute inset-2.5 rounded-full border border-white/5" />
            <div className="absolute inset-4 rounded-full border border-white/10" />
            
            {/* Center label */}
            <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-700 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-black/50" />
            </div>
          </div>

          {/* Hover Overlay (Doesn't spin) */}
          <div 
            className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
            aria-label="Toggle background music"
          >
            {isPlaying ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6 ml-1" />}
          </div>

          {/* Music Note Animation when playing */}
          {isPlaying && (
            <div className="absolute -top-2 -right-1 text-emerald-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75 pointer-events-none">
              <FiMusic className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

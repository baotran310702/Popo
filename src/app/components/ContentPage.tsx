"use client";

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane } from 'react-icons/fa';

interface Comment {
  username: string;
  text: string;
}

const COMMENTS: Comment[] = [
  { username: 'blue_love', text: 'I love you so much ✨' },
  { username: 'blue_love', text: "What's the most beautiful girl ever! ♥️" }
];

export default function ContentPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1000);
  const [heartColor, setHeartColor] = useState('text-red-500');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 50; // milliseconds per character

  useEffect(() => {
    audioRef.current = new Audio('/music/song.mp3');
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('loadedmetadata', setInitialDuration);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('loadedmetadata', setInitialDuration);
      }
    };
  }, []);

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHeartColor(prev => prev === 'text-red-500' ? 'text-black' : 'text-red-500');
    }, 300); // Toggle every second
    // Start playing music when component mounts
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    }
    return () => clearInterval(heartInterval);
  }, []);

  useEffect(() => {
    const animateLikes = () => {
      setLikeCount(1000);
      let current = 1000;
      
      const interval = setInterval(() => {
        current += 1;
        if (current <= 211003) {
          setLikeCount(current);
        } else {
          clearInterval(interval);
          setTimeout(animateLikes, 10); // Restart animation after 1 second
        }
      }, 10);

      return () => clearInterval(interval);
    };

    animateLikes();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isTyping) {
      const currentComment = COMMENTS[currentCommentIndex];
      const fullText = currentComment.text;
      
      if (displayedText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          // Wait before starting to erase
          setTimeout(() => {
            setIsTyping(true);
            setDisplayedText('');
            setCurrentCommentIndex((prev) => (prev + 1) % COMMENTS.length);
          }, 2000);
        }, 1000);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, currentCommentIndex, isTyping]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };

  const setInitialDuration = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const timeline = e.currentTarget;
      const rect = timeline.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(clickPosition * 100);
    }
  };

  return (
    <div className="flex flex-col items-center py-8" style={{backgroundColor: '#fdf8e4'}}>
      {/* Instagram-style Image Box - changing width from 400px to 300px */}
      <div className="w-[300px] bg-white rounded-lg shadow-lg mb-8">
        {/* Header - adjust padding and image size */}
        <div className="flex items-center p-2">
          <div className="w-6 h-6 relative rounded-full overflow-hidden">
            <Image
              src="/em/avatar.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <span className="ml-2 font-semibold text-xs text-black">oct21st.__</span>
        </div>

        {/* Main Image - aspect ratio is maintained automatically */}
        <div className="w-full aspect-square relative">
          <Image
            src="/em/avatar.jpg"
            alt="Content Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Interaction Buttons - adjust padding and icon sizes */}
        <div className="p-2">
          <div className="flex items-center gap-3">
            <button className="text-xl">
              <FaHeart className={`${heartColor} transition-transform hover:scale-110`} />
            </button>
            <button className="text-xl text-black transition-transform hover:scale-110">
              <FaRegComment className="hover:text-black" />
            </button>
            <button className="text-xl text-black transition-transform hover:scale-110">
              <FaRegPaperPlane className="hover:text-black" />
            </button>
          </div>

          {/* Adjust text sizes and spacing */}
          <div className="mt-1.5 font-semibold text-xs text-black">
            {likeCount.toLocaleString()} likes
          </div>

          <div className="mt-1 text-xs text-black">
            <span className="font-semibold mr-1">blue_love</span>
            <span>{displayedText}</span>
          </div>

          <div className="mt-1.5 text-xs text-black">
            <div className="flex items-start">
              <span className="font-semibold mr-1">blue_love</span>
              <span>What&apos;s the most beautiful girl ever! ♥️</span>
            </div>
          </div>

          <div className="mt-1.5 text-[10px] text-gray-500">
            2 HOURS AGO
          </div>
        </div>
      </div>

      {/* Music Player - changing width from 400px to 300px */}
      <div className="w-[300px] bg-pink-500 rounded-lg shadow-lg">
        <div className="flex items-center p-2 gap-2">
          {/* Thumbnail - smaller size */}
          <div className="w-10 h-10 relative rounded-md overflow-hidden flex-shrink-0">
            <Image
              src="/em/avatar.jpg"
              alt="Song Thumbnail"
              fill
              className="object-cover"
            />
          </div>

          {/* Song Info and Timeline */}
          <div className="flex-grow">
            <div className="text-white">
              <h3 className="font-semibold text-xs">Tình yêu chậm trễ</h3>
              <p className="text-pink-100 text-[10px]">blue_love</p>
            </div>
            
            <div className="mt-1">
              <div 
                className="w-full bg-pink-400 rounded-full h-1 cursor-pointer"
                onClick={handleTimelineClick}
              >
                <div 
                  className="bg-white h-full rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] mt-0.5 text-pink-100">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>
          </div>

          {/* Controls - smaller icons */}
          <div className="flex items-center gap-1.5">
            <button className="text-xs text-white">
              <FaStepBackward />
            </button>
            <button 
              className="text-base text-white p-1.5 bg-pink-600 rounded-full"
              onClick={handlePlayPause}
            >
              {isPlaying && currentTime !== duration ? <FaPause /> : <FaPlay className="ml-0.5" />}
            </button>
            <button className="text-xs text-white">
              <FaStepForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
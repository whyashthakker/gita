"use client";

import { GitaData, Verse } from '@/types/gita';
import { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';

interface FeaturedVerseProps {
  gitaData: GitaData;
}

export default function FeaturedVerse({ gitaData }: FeaturedVerseProps) {
  const [featuredVerse, setFeaturedVerse] = useState<Verse | null>(null);
  const [chapter, setChapter] = useState<string>('');
  const [verseNumber, setVerseNumber] = useState<string>('');

  useEffect(() => {
    const getRandomVerse = () => {
      const today = new Date().toDateString();
      const rng = seedrandom(today);

      const chapters = Object.keys(gitaData.bhagavad_gita.chapters);
      const randomChapter = chapters[Math.floor(rng() * chapters.length)];
      const verses = Object.keys(gitaData.bhagavad_gita.chapters[randomChapter].verses);
      const randomVerse = verses[Math.floor(rng() * verses.length)];
      
      setChapter(randomChapter);
      setVerseNumber(randomVerse);
      setFeaturedVerse(gitaData.bhagavad_gita.chapters[randomChapter].verses[randomVerse]);
    };

    getRandomVerse();
  }, [gitaData]);

  if (!featuredVerse) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Verse of the Day</h2>
      <p className="text-lg mb-2 font-semibold">Chapter {chapter}, Verse {verseNumber}</p>
      <p className="text-gray-700 mb-4">{featuredVerse.sanskrit}</p>
      <p className="text-gray-600 italic">{featuredVerse.english}</p>
    </div>
  );
}
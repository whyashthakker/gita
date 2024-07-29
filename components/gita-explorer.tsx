'use client';

import { GitaData, Verse } from '@/types/gita';
import { ChevronLeftIcon, ChevronRightIcon, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GitaExplorerProps {
  gitaData: GitaData;
}

export default function GitaExplorer({ gitaData }: GitaExplorerProps) {
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [selectedVerse, setSelectedVerse] = useState('1');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chapters = Object.keys(gitaData.bhagavad_gita.chapters);
  const verses = Object.keys(gitaData.bhagavad_gita.chapters[selectedChapter].verses);

  useEffect(() => {
    // Load the last read verse from localStorage when the component mounts
    const lastChapter = localStorage.getItem('lastChapter');
    const lastVerse = localStorage.getItem('lastVerse');
    if (lastChapter && lastVerse) {
      if (gitaData.bhagavad_gita.chapters[lastChapter] &&
          gitaData.bhagavad_gita.chapters[lastChapter].verses[lastVerse]) {
        setSelectedChapter(lastChapter);
        setSelectedVerse(lastVerse);
      }
    }
  }, [gitaData]);

  useEffect(() => {
    setSelectedVerse('1');
    setExplanation(null);
    // Save the current chapter to localStorage
    localStorage.setItem('lastChapter', selectedChapter);
  }, [selectedChapter]);

  useEffect(() => {
    setExplanation(null);
    // Save the current verse to localStorage
    localStorage.setItem('lastVerse', selectedVerse);
  }, [selectedVerse]);

  const currentVerse: Verse = gitaData.bhagavad_gita.chapters[selectedChapter].verses[selectedVerse];

  const handlePreviousVerse = () => {
    const currentIndex = verses.indexOf(selectedVerse);
    if (currentIndex > 0) {
      setSelectedVerse(verses[currentIndex - 1]);
    } else if (chapters.indexOf(selectedChapter) > 0) {
      const previousChapter = chapters[chapters.indexOf(selectedChapter) - 1];
      const previousChapterVerses = Object.keys(gitaData.bhagavad_gita.chapters[previousChapter].verses);
      setSelectedChapter(previousChapter);
      setSelectedVerse(previousChapterVerses[previousChapterVerses.length - 1]);
    }
  };

  const handleNextVerse = () => {
    const currentIndex = verses.indexOf(selectedVerse);
    if (currentIndex < verses.length - 1) {
      setSelectedVerse(verses[currentIndex + 1]);
    } else if (chapters.indexOf(selectedChapter) < chapters.length - 1) {
      const nextChapter = chapters[chapters.indexOf(selectedChapter) + 1];
      setSelectedChapter(nextChapter);
      setSelectedVerse('1');
    }
  };

  const getAIExplanation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/explain-verse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapter: selectedChapter,
          verse: selectedVerse,
          sanskrit: currentVerse.sanskrit,
          english: currentVerse.english,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch explanation');
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('Sorry, we couldn\'t generate an explanation at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
          <h2 className="text-2xl font-bold">Bhagavad Gita</h2>
          <p className="text-sm">Chapter {selectedChapter}, Verse {selectedVerse}</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <label htmlFor="chapter" className="font-semibold">Chapter:</label>
              <select
                id="chapter"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {chapters.map((chapter) => (
                  <option key={chapter} value={chapter}>{chapter}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="verse" className="font-semibold">Verse:</label>
              <select
                id="verse"
                value={selectedVerse}
                onChange={(e) => setSelectedVerse(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {verses.map((verse) => (
                  <option key={verse} value={verse}>{verse}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Sanskrit:</h3>
              <p className="text-lg leading-relaxed">{currentVerse.sanskrit}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">English Translation:</h3>
              <p className="text-lg leading-relaxed">{currentVerse.english}</p>
            </div>
            <div>
              <button
                onClick={getAIExplanation}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors disabled:bg-indigo-300"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {isLoading ? 'Generating...' : 'Get AI Explanation'}
              </button>
            </div>
            {explanation && (
              <div className="mt-6 bg-indigo-50 rounded-lg p-4 shadow-inner">
                <h3 className="text-xl font-semibold mb-2 text-indigo-600">AI Explanation:</h3>
                <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-lg leading-relaxed text-gray-700">{explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <button
            onClick={handlePreviousVerse}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Previous
          </button>
          <button
            onClick={handleNextVerse}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Next
            <ChevronRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
import FeaturedVerse from '@/components/featured-verse';
import GitaExplorer from '@/components/gita-explorer';
import { readGitaData } from '@/lib/gitaData';
import { Book, Languages, Navigation } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhagavad Gita Explorer | Discover Ancient Wisdom',
  description: 'Explore the timeless teachings of the Bhagavad Gita. Read verses in Sanskrit and English, and embark on a journey of self-discovery.',
  keywords: 'Bhagavad Gita, Hindu scripture, Krishna, Arjuna, spiritual wisdom, Sanskrit, English translation',
  openGraph: {
    title: 'Bhagavad Gita Explorer | Discover Ancient Wisdom',
    description: 'Explore the timeless teachings of the Bhagavad Gita. Read verses in Sanskrit and English, and embark on a journey of self-discovery.',
    type: 'website',
    url: 'https://your-website-url.com',
    images: [
      {
        url: 'https://your-website-url.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bhagavad Gita Explorer',
      },
    ],
  },
};

export default function Home() {
  const gitaData = readGitaData();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-4">
            Bhagavad Gita Explorer
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Embark on a journey of wisdom and self-discovery through the timeless teachings of the Bhagavad Gita.
          </p>
        </div>

        <FeaturedVerse gitaData={gitaData} />

        <div className="relative mt-12">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-lg -m-4"></div>
          <div className="relative bg-white shadow-xl rounded-lg p-8">
            <GitaExplorer gitaData={gitaData} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Ancient Wisdom"
            description="Explore the profound teachings of the Bhagavad Gita, a text that has inspired millions for millennia."
            Icon={Book}
          />
          <FeatureCard
            title="Dual Language"
            description="Read verses in both Sanskrit and English, allowing for deeper understanding and interpretation."
            Icon={Languages}
          />
          <FeatureCard
            title="Easy Navigation"
            description="Seamlessly move between chapters and verses with our intuitive interface."
            Icon={Navigation}
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Bhagavad Gita Explorer. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Designed with love for seekers of wisdom.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="bg-orange-100 rounded-full p-3 mb-4">
        <Icon className="w-8 h-8 text-orange-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
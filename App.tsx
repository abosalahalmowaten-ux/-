import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ArticlePreview } from './components/ArticlePreview';
import { generateArticle } from './services/geminiService';
import { ArticleData, Tone } from './types';
import { Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (topic: string, tone: Tone) => {
    setIsLoading(true);
    setError(null);
    setData(null); // Clear previous result to focus on loading state
    
    try {
      const result = await generateArticle(topic, tone);
      setData(result);
    } catch (err) {
      setError('حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
                <Sparkles size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight font-arabic">كاتب <span className="text-emerald-600">AI</span></h1>
          </div>
          <div className="text-sm text-gray-500 font-arabic hidden sm:block">مساعدك الذكي لكتابة المحتوى</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10">
        
        {/* Introduction / Hero (Only show if no data) */}
        {!data && !isLoading && (
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-arabic">
                    أنشئ مقالات احترافية بضغطة زر
                </h2>
                <p className="text-gray-600 text-lg font-arabic leading-relaxed">
                    أداة ذكية تساعدك في كتابة مقالات متوافقة مع SEO، بأسلوب بشري جذاب، وباللغة العربية الفصحى.
                </p>
            </div>
        )}

        {/* Input Section */}
        <section>
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700" dir="rtl">
            <AlertCircle size={24} />
            <p className="font-arabic">{error}</p>
          </div>
        )}

        {/* Loading State (Visual Skeleton) */}
        {isLoading && (
             <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-96 bg-gray-200 rounded-xl"></div>
             </div>
        )}

        {/* Result Section */}
        {data && !isLoading && (
          <section id="results" className="scroll-mt-20">
            <ArticlePreview data={data} />
          </section>
        )}
      </main>

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm font-arabic border-t border-gray-200 bg-white">
        <p>© 2025 Kateb AI - مدعوم بواسطة Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;

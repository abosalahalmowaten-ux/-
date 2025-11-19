import React, { useState } from 'react';
import { Tone } from '../types';
import { Send, PenTool, Loader2 } from 'lucide-react';

interface InputFormProps {
  onGenerate: (topic: string, tone: Tone) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.PROFESSIONAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic, tone);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <PenTool size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-arabic">ابدأ الكتابة</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2 text-right font-arabic">
              موضوع المقال (Topic)
            </label>
            <input
              id="topic"
              type="text"
              dir="auto"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="مثال: فوائد الذكاء الاصطناعي في التعليم..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-right"
              required
            />
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2 text-right font-arabic">
              أسلوب الكتابة (Tone)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(Tone).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-4 py-3 rounded-lg border text-sm font-arabic transition-all ${
                    tone === t
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-arabic"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>جاري الكتابة...</span>
              </>
            ) : (
              <>
                <Send size={20} className="rtl:rotate-180" />
                <span>توليد المقال</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

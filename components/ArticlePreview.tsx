import React from 'react';
import { ArticleData } from '../types';
import { Copy, Check, List, Tag, Search, FileText } from 'lucide-react';

interface ArticlePreviewProps {
  data: ArticleData;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const fullText = `
العنوان: ${data.suggestedTitles[0]}

${data.articleBody}

وصف الميتا:
${data.metaDescription}

الكلمات المفتاحية:
${data.keywords.join(', ')}
    `;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple Markdown parser for preview
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3 font-arabic">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-emerald-800 mt-8 mb-4 border-b pb-2 font-arabic">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-gray-700 mb-2 font-arabic list-disc list-inside">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg font-arabic">{line}</p>;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titles Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-emerald-700">
                <Search size={20} />
                <h3 className="font-bold font-arabic">عناوين مقترحة (Titles)</h3>
            </div>
            <ul className="space-y-2">
                {data.suggestedTitles.map((title, idx) => (
                    <li key={idx} className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 font-arabic border-r-4 border-emerald-400">
                        {title}
                    </li>
                ))}
            </ul>
        </div>

        {/* Analysis Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-4 text-blue-700">
                <List size={20} />
                <h3 className="font-bold font-arabic">تحليل الموضوع (Analysis)</h3>
            </div>
             <div className="flex flex-wrap gap-2">
                {data.analysis.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold font-arabic">
                        {item}
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* Main Article */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText size={20} />
            <span className="font-medium font-arabic">المقال الكامل</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            <span className="font-arabic">{copied ? 'تم النسخ' : 'نسخ النص'}</span>
          </button>
        </div>
        
        <div className="p-8 md:p-12" dir="rtl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 font-arabic leading-tight">
            {data.suggestedTitles[0]}
          </h1>
          <div className="prose prose-lg max-w-none prose-headings:font-arabic prose-p:font-arabic">
             {renderMarkdown(data.articleBody)}
          </div>
        </div>
      </div>

      {/* SEO Meta & Keywords */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-4 text-purple-700">
                <Tag size={20} />
                <h3 className="font-bold font-arabic">وصف الميتا (Meta Description)</h3>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-gray-700 font-arabic text-lg leading-relaxed">{data.metaDescription}</p>
                <div className="mt-2 text-right text-xs text-purple-400 font-mono">
                    {data.metaDescription.length} characters
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-4 text-orange-700">
                <Search size={20} />
                <h3 className="font-bold font-arabic">الكلمات المفتاحية (Keywords)</h3>
            </div>
            <div className="flex flex-wrap gap-2" dir="rtl">
                {data.keywords.map((kw, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium font-arabic hover:bg-gray-200 transition-colors">
                        #{kw}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

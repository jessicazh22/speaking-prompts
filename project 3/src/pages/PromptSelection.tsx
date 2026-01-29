import { useEffect, useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { supabase, Prompt } from '../lib/supabase';

interface PromptSelectionProps {
  onPromptSelected: (prompt: Prompt) => void;
  onBack: () => void;
}

export default function PromptSelection({
  onPromptSelected,
  onBack,
}: PromptSelectionProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const categories = [
    'Hometown & Places',
    'Art & Culture',
    'Technology',
    'Daily Life & Hobbies',
    'People & Relationships',
    'Experiences & Memories',
  ];

  const difficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const { data, error } = await supabase
          .from('prompts')
          .select('*')
          .order('category', { ascending: true });

        if (error) throw error;
        setPrompts(data || []);
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  useEffect(() => {
    let filtered = prompts;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((p) => p.difficulty_level === selectedDifficulty);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.question.toLowerCase().includes(term)
      );
    }

    setFilteredPrompts(filtered);
  }, [prompts, selectedCategory, selectedDifficulty, searchTerm]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Choose a Speaking Prompt
          </h1>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search prompts by title or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              No prompts found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                onClick={() => onPromptSelected(prompt)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-slate-500">{prompt.category}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {prompt.difficulty_level}
                  </span>
                </div>

                <p className="text-slate-700 mb-4 leading-relaxed">
                  {prompt.question}
                </p>

                {prompt.grammar_focus_areas.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-slate-600 mb-1">
                      Grammar Focus:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {prompt.grammar_focus_areas.map((area, idx) => (
                        <span
                          key={idx}
                          className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {prompt.vocabulary_focus.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">
                      Vocabulary Focus:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {prompt.vocabulary_focus.map((vocab, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded border border-orange-200"
                        >
                          {vocab}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Practice This Prompt
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
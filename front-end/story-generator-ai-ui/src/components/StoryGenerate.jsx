import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StoryGenerate = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/story/print/all');
      setStories(response.data);
    } catch (err) {
      setError('Erro ao carregar histórias');
      console.error(err);
    }
  };

  const fetchWords = async (storyId) => {
    try {
      const response = await axios.get(`http://localhost:8080/story/print/${storyId}/words`);
      setWords(response.data);
    } catch (err) {
      setError('Erro ao carregar palavras');
      console.error(err);
    }
  };

  const handleStoryChange = (e) => {
    const storyId = e.target.value;
    setSelectedStory(storyId);
    if (storyId) {
      fetchWords(storyId);
      setGeneratedStory('');
    } else {
      setWords([]);
    }
  };

  const generateStory = async () => {
    if (!selectedStory) {
      setError('Por favor, selecione uma história');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:8080/generate/${selectedStory}`);
      setGeneratedStory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao gerar história');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-purple-500/30">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
            Gerador de Histórias
          </h1>
          
          <div className="mb-8">
            <label className="block text-blue-300 mb-2 text-lg">Selecione uma História</label>
            <select
              value={selectedStory}
              onChange={handleStoryChange}
              className="w-full bg-gray-900/60 border border-purple-500/50 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-800/60"
            >
              <option value="">Selecione uma história</option>
              {stories.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.title}
                </option>
              ))}
            </select>
          </div>

          {words.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">Palavras Associadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {words.map((word) => (
                  <div 
                    key={word.id} 
                    className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-4 rounded-xl border border-blue-500/30 hover:scale-105 transition-transform"
                  >
                    <p className="text-white font-medium">{word.text}</p>
                    <p className="text-blue-300 text-sm">
                      {word.type === 'CHARACTER' && 'Personagem'}
                      {word.type === 'SCENARIO' && 'Cenário'} 
                      {word.type === 'ITEM' && 'Item'}
                      {word.type === 'VILLAIN' && 'Vilão'}
                      {word.type === 'PROTAGONIST' && 'Protagonista'}
                      {word.type === 'PLOTTWIST' && 'Reviravolta'}
                      {word.type === 'WEAPON' && 'Arma'}
                      {word.type === 'PET' && 'Animal de Estimação'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mb-8">
            <button
              onClick={generateStory}
              disabled={loading || !selectedStory}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Gerando...' : 'Gerar História'}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          {generatedStory && (
            <div className="bg-black/40 border border-blue-500/30 rounded-xl p-6 shadow-inner">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                História Gerada
              </h2>
              <div className="prose prose-invert max-w-none">
                {generatedStory.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-100 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-transparent border border-blue-500 text-blue-300 hover:bg-blue-900/30 font-medium py-2 px-6 rounded-xl transition-all hover:scale-105"
            >
              Voltar para Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryGenerate;
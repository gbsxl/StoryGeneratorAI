import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedStory, setExpandedStory] = useState(null);
  const [storyWords, setStoryWords] = useState({});

  const genreTranslations = {
    MEDIEVAL: 'Medieval',
    FUTURISM: 'Futurismo',
    OLDWEST: 'Velho Oeste',
    PRESENTDAYS: 'Dias Atuais',
    TERROR: 'Terror',
    ACTION: 'Ação',
    SAD: 'Triste',
    MOTIVATIONAL: 'Motivacional',
    DRAMA: 'Drama',
    DOCUMENTARY: 'Documentário',
    CRIME: 'Crime'
  };

  const genreColors = {
    MEDIEVAL: 'from-amber-700 to-yellow-600',
    FUTURISM: 'from-cyan-600 to-blue-400',
    OLDWEST: 'from-orange-700 to-yellow-700',
    PRESENTDAYS: 'from-green-600 to-teal-500',
    TERROR: 'from-red-900 to-red-700',
    ACTION: 'from-red-600 to-orange-500',
    SAD: 'from-blue-900 to-indigo-700',
    MOTIVATIONAL: 'from-yellow-500 to-amber-400',
    DRAMA: 'from-purple-700 to-fuchsia-600',
    DOCUMENTARY: 'from-gray-700 to-gray-500',
    CRIME: 'from-slate-900 to-slate-700'
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/story/print/all');
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Erro ao buscar histórias:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStoryWords = async (storyId) => {
    if (storyWords[storyId]) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/story/print/${storyId}/words`);
      const data = await response.json();
      setStoryWords(prev => ({ ...prev, [storyId]: data }));
    } catch (error) {
      console.error(`Erro ao buscar palavras da história ${storyId}:`, error);
    }
  };

  const handleExpandStory = (storyId) => {
    if (expandedStory === storyId) {
      setExpandedStory(null);
    } else {
      setExpandedStory(storyId);
      fetchStoryWords(storyId);
    }
  };

  const handleDeleteStory = async (storyId) => {
    if (!confirm('Tem certeza que deseja excluir esta história?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/story/delete/${storyId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setStories(stories.filter(story => story.id !== storyId));
      } else {
        alert('Erro ao excluir a história');
      }
    } catch (error) {
      console.error('Erro ao excluir história:', error);
      alert('Erro ao excluir a história');
    }
  };

  const wordTypeTranslations = {
    CHARACTER: 'Personagem',
    SCENARIO: 'Cenário',
    ITEM: 'Item',
    VILLAIN: 'Vilão',
    PROTAGONIST: 'Protagonista',
    PLOTTWIST: 'Reviravolta',
    WEAPON: 'Arma',
    PET: 'Animal de Estimação'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Histórias</h2>
        <Link 
          to="/historias/nova" 
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition transform hover:scale-105 duration-200 shadow-lg"
        >
          Nova História
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="bg-black/30 border border-blue-900/50 rounded-xl p-8 text-center">
          <p className="text-xl text-gray-300">Nenhuma história encontrada.</p>
          <Link 
            to="/historias/nova" 
            className="inline-block mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition transform hover:scale-105 duration-200 shadow-lg"
          >
            Criar sua primeira história
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl shadow-lg overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{story.title}</h3>
                    <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${genreColors[story.genre] || 'from-gray-700 to-gray-600'}`}>
                      {genreTranslations[story.genre] || story.genre}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/historias/editar/${story.id}`}
                      className="p-2 rounded-lg bg-blue-600/30 hover:bg-blue-500/40 text-blue-300 transition transform hover:scale-110 duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className="p-2 rounded-lg bg-red-600/30 hover:bg-red-500/40 text-red-300 transition transform hover:scale-110 duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    
                    <Link 
                      to={`/gerar/${story.id}`}
                      className="p-2 rounded-lg bg-purple-600/30 hover:bg-purple-500/40 text-purple-300 transition transform hover:scale-110 duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => handleExpandStory(story.id)}
                    className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors duration-200"
                  >
                    <span>{expandedStory === story.id ? 'Esconder palavras' : 'Ver palavras'}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform duration-200 ${expandedStory === story.id ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {expandedStory === story.id && (
                <div className="bg-black/40 p-6 border-t border-blue-900/30">
                  <h4 className="text-lg font-medium text-blue-300 mb-4">Palavras desta história</h4>
                  
                  {!storyWords[story.id] ? (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : storyWords[story.id].length === 0 ? (
                    <div className="text-center p-4">
                      <p className="text-gray-400">Nenhuma palavra encontrada para esta história.</p>
                      <Link 
                        to="/palavras/nova" 
                        className="inline-block mt-3 px-4 py-2 rounded-lg bg-blue-700/30 hover:bg-blue-600/40 text-blue-300 transition duration-200"
                      >
                        Adicionar palavras
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {storyWords[story.id].map((word) => (
                        <div 
                          key={word.id} 
                          className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-all duration-200"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium text-white">{word.text}</span>
                            <span className="text-sm text-blue-300">{wordTypeTranslations[word.type] || word.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-center">
                    <Link 
                      to="/palavras/nova" 
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700/50 to-purple-700/50 hover:from-blue-600/60 hover:to-purple-600/60 text-white transition duration-200"
                    >
                      Adicionar mais palavras
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoriesList;
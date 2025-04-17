import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WordsList = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStory, setSelectedStory] = useState('');
  const [stories, setStories] = useState([]);
  const [filterType, setFilterType] = useState('');

  const wordTypes = {
    CHARACTER: 'Personagem',
    SCENARIO: 'Cenário',
    ITEM: 'Item',
    VILLAIN: 'Vilão',
    PROTAGONIST: 'Protagonista',
    PLOTTWIST: 'Reviravolta',
    WEAPON: 'Arma',
    PET: 'Animal'
  };

  const typeColors = {
    CHARACTER: 'bg-blue-500',
    SCENARIO: 'bg-green-500',
    ITEM: 'bg-yellow-500',
    VILLAIN: 'bg-red-500',
    PROTAGONIST: 'bg-purple-500',
    PLOTTWIST: 'bg-pink-500',
    WEAPON: 'bg-orange-500',
    PET: 'bg-teal-500'
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/word/print/all');
        setWords(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar palavras');
        setLoading(false);
        console.error('Erro ao buscar palavras:', err);
      }
    };

    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/story/print/all');
        setStories(response.data);
      } catch (err) {
        console.error('Erro ao buscar histórias:', err);
      }
    };

    fetchWords();
    fetchStories();
  }, []);

  const handleStoryChange = async (e) => {
    const storyId = e.target.value;
    setSelectedStory(storyId);
    
    try {
      setLoading(true);
      if (storyId) {
        const response = await axios.get(`http://localhost:8080/story/print/${storyId}/words`);
        setWords(response.data);
      } else {
        const response = await axios.get('http://localhost:8080/word/print/all');
        setWords(response.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Erro ao filtrar palavras');
      setLoading(false);
      console.error('Erro ao filtrar palavras:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta palavra?')) {
      try {
        await axios.delete(`http://localhost:8080/word/delete/${id}`);
        setWords(words.filter(word => word.id !== id));
      } catch (err) {
        setError('Erro ao excluir palavra');
        console.error('Erro ao excluir palavra:', err);
      }
    }
  };

  const filteredWords = filterType 
    ? words.filter(word => word.type === filterType)
    : words;

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="heading-gradient">Palavras</span>
          </h1>
          <p className="text-slate-400">Gerencie as palavras que farão parte das suas histórias</p>
        </div>
        <Link to="/palavras/nova" className="btn btn-primary mt-4 md:mt-0">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nova Palavra
          </span>
        </Link>
      </div>

      <div className="glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="storyFilter" className="label">Filtrar por história</label>
            <select
              id="storyFilter"
              className="select w-full"
              value={selectedStory}
              onChange={handleStoryChange}
            >
              <option value="">Todas as histórias</option>
              {stories.map(story => (
                <option key={story.id} value={story.id}>{story.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="typeFilter" className="label">Filtrar por tipo</label>
            <select
              id="typeFilter"
              className="select w-full"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {Object.entries(wordTypes).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      ) : filteredWords.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-slate-400 mb-4">Nenhuma palavra encontrada</p>
          <Link to="/palavras/nova" className="btn btn-outline">
            Criar palavra
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map(word => (
            <div key={word.id} className="card hover:shadow-indigo-900/20 group">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 text-xs font-medium rounded-full text-white ${typeColors[word.type]}`}>
                  {wordTypes[word.type]}
                </div>
                {word.story && (
                  <div className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300">
                    {word.story.title}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{word.text}</h3>
              <div className="mt-6 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  to={`/palavras/editar/${word.id}`}
                  className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button 
                  onClick={() => handleDelete(word.id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordsList;
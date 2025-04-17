import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WordForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState({
    text: '',
    type: '',
    story: null
  });

  const wordTypes = {
    CHARACTER: 'Personagem',
    SCENARIO: 'Cenário',
    ITEM: 'Item',
    VILLAIN: 'Vilão',
    PROTAGONIST: 'Protagonista',
    PLOTTWIST: 'Reviravolta',
    WEAPON: 'Arma',
    PET: 'Animal de Estimação'
  };

  useEffect(() => {
    fetchStories();
    if (id) {
      fetchWord(id);
    }
  }, [id]);

  const fetchStories = async () => {
    try {
      const response = await fetch('http://localhost:8080/story/print/all');
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Erro ao buscar histórias:', error);
    }
  };

  const fetchWord = async (wordId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/word/print/${wordId}`);
      const data = await response.json();
      setWord(data);
    } catch (error) {
      console.error('Erro ao buscar palavra:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWord({ ...word, [name]: value });
  };

  const handleStoryChange = (e) => {
    const storyId = parseInt(e.target.value);
    const selectedStory = stories.find(story => story.id === storyId);
    setWord({ ...word, story: selectedStory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = id 
        ? `http://localhost:8080/word/update/${id}`
        : 'http://localhost:8080/word/create';
      
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      });
      
      if (response.ok) {
        navigate('/palavras');
      } else {
        console.error('Erro ao salvar palavra:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao salvar palavra:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl shadow-lg p-8 border border-blue-500/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {id ? 'Editar Palavra' : 'Nova Palavra'}
        </h2>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-blue-300 font-medium">Texto</label>
              <input
                type="text"
                name="text"
                value={word.text}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-blue-500/30 focus:border-blue-400 focus:ring focus:ring-blue-300/50 text-white outline-none transition duration-200"
                placeholder="Digite o texto da palavra"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-blue-300 font-medium">Tipo</label>
              <select
                name="type"
                value={word.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-blue-500/30 focus:border-blue-400 focus:ring focus:ring-blue-300/50 text-white outline-none transition duration-200"
              >
                <option value="">Selecione um tipo</option>
                {Object.entries(wordTypes).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-blue-300 font-medium">História</label>
              <select
                value={word.story?.id || ''}
                onChange={handleStoryChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-blue-500/30 focus:border-blue-400 focus:ring focus:ring-blue-300/50 text-white outline-none transition duration-200"
              >
                <option value="">Selecione uma história</option>
                {stories.map(story => (
                  <option key={story.id} value={story.id}>{story.title}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/palavras')}
                className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition transform hover:scale-105 duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition transform hover:scale-105 duration-200 shadow-lg"
              >
                {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WordForm;
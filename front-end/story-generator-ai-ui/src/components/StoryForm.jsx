import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState({
    title: '',
    genre: ''
  });

  const genres = {
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

  useEffect(() => {
    if (id) {
      fetchStory(id);
    }
  }, [id]);

  const fetchStory = async (storyId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/story/print/${storyId}`);
      const data = await response.json();
      setStory(data);
    } catch (error) {
      console.error('Erro ao buscar história:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = id 
        ? `http://localhost:8080/story/update/${id}`
        : 'http://localhost:8080/story/create';
      
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(story)
      });
      
      if (response.ok) {
        navigate('/historias');
      } else {
        console.error('Erro ao salvar história:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao salvar história:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl shadow-lg p-8 border border-blue-500/20">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {id ? 'Editar História' : 'Nova História'}
        </h2>
        
        {loading && !story.title ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-blue-300 font-medium">Título</label>
              <input
                type="text"
                name="title"
                value={story.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-blue-500/30 focus:border-blue-400 focus:ring focus:ring-blue-300/50 text-white outline-none transition duration-200"
                placeholder="Digite o título da história"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-blue-300 font-medium">Gênero</label>
              <select
                name="genre"
                value={story.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-blue-500/30 focus:border-blue-400 focus:ring focus:ring-blue-300/50 text-white outline-none transition duration-200"
              >
                <option value="">Selecione um gênero</option>
                {Object.entries(genres).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/historias')}
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

export default StoryForm;
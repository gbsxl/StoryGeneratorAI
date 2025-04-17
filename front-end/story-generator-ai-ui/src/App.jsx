import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import WordsList from './components/WordsList';
import WordForm from './components/WordForm';
import StoriesList from './components/StoriesList';
import StoryForm from './components/StoryForm';
import StoryGenerate from './components/StoryGenerate';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <nav className="navbar px-4 py-4 md:px-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">SG</span>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400">
                Story Generator AI
              </span>
            </div>

            {/* Menu para desktop */}
            <div className="hidden md:flex space-x-6">
              <NavLink to="/" className={({isActive}) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'}`}>
                Início
              </NavLink>
              <NavLink to="/palavras" className={({isActive}) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'}`}>
                Palavras
              </NavLink>
              <NavLink to="/historias" className={({isActive}) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'}`}>
                Histórias
              </NavLink>
              <NavLink to="/gerar" className={({isActive}) => 
                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'}`}>
                Gerar História
              </NavLink>
            </div>

            {/* Botão de menu para mobile */}
            <button 
              className="md:hidden text-slate-300 focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-slate-800 pt-4">
              <NavLink to="/" 
                className={({isActive}) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'}`}
                onClick={() => setIsMenuOpen(false)}>
                Início
              </NavLink>
              <NavLink to="/palavras" 
                className={({isActive}) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'}`}
                onClick={() => setIsMenuOpen(false)}>
                Palavras
              </NavLink>
              <NavLink to="/historias" 
                className={({isActive}) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'}`}
                onClick={() => setIsMenuOpen(false)}>
                Histórias
              </NavLink>
              <NavLink to="/gerar" 
                className={({isActive}) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'}`}
                onClick={() => setIsMenuOpen(false)}>
                Gerar História
              </NavLink>
            </div>
          )}
        </nav>

        <main className="container mx-auto px-4 py-8 md:px-8 page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/palavras" element={<WordsList />} />
            <Route path="/palavras/nova" element={<WordForm />} />
            <Route path="/palavras/editar/:id" element={<WordForm />} />
            <Route path="/historias" element={<StoriesList />} />
            <Route path="/historias/nova" element={<StoryForm />} />
            <Route path="/historias/editar/:id" element={<StoryForm />} />
            <Route path="/gerar" element={<StoryGenerate />} />
          </Routes>
        </main>

        <footer className="py-6 bg-slate-900/50 border-t border-slate-800">
          <div className="container mx-auto px-4 md:px-8 text-center text-sm text-slate-500">
            <p>© 2025 Gerador de Histórias IA. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
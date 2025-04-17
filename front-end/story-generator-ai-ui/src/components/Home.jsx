import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fadeIn">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="heading-gradient">Story Generator AI</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10">
          Crie histórias incríveis usando palavras personalizadas e deixe que nossa IA transforme suas ideias em narrativas únicas
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/palavras/nova" className="btn btn-primary">
            Criar Palavra
          </Link>
          <Link to="/historias/nova" className="btn btn-secondary">
            Criar História
          </Link>
          <Link to="/gerar" className="btn btn-outline">
            Gerar Narrativa
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="card transform transition hover:-translate-y-2">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-white">Palavras Personalizadas</h2>
          <p className="text-slate-400 mb-4">
            Crie palavras com diferentes categorias como personagens, cenários, itens e mais para compor suas histórias.
          </p>
          <Link to="/palavras" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center">
            Ver palavras
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="card transform transition hover:-translate-y-2">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-white">Histórias Temáticas</h2>
          <p className="text-slate-400 mb-4">
            Organize suas palavras em diferentes histórias com temas específicos como medieval, futurismo, terror e mais.
          </p>
          <Link to="/historias" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center">
            Ver histórias
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="card transform transition hover:-translate-y-2">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-white">Geração por IA</h2>
          <p className="text-slate-400 mb-4">
            Use inteligência artificial para gerar histórias completas baseadas nas palavras e temas que você criou.
          </p>
          <Link to="/gerar" className="text-indigo-400 hover:text-indigo-300 inline-flex items-center">
            Gerar história
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
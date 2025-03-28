import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const projects = [
    { 
      id: 1, 
      title: 'Portafolio Digital', 
      tech: 'React, Node.js, Vite', 
      description: 'Sitio web sencillo como portafolio',
      link: '#'
    },
    { 
      id: 2, 
      title: 'Web Scraping', 
      tech: 'Python', 
      description: 'Web scraping a página de noticias con exportación a texto',
      link: '#'
    },
  ];
  
  const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Java', 'Python'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensaje enviado:\nNombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return (
          <section className="hero">
            <h1>Hola, soy Ruben Benjamin Rivera Ruiz</h1>
            <p>Programador de backend y Java</p>
            <img 
              src="/fto-portafolio.jpeg" 
              alt="Foto de perfil" 
              className="profile-img" 
            />
          </section>
        );
      case 'about':
        return (
          <section className="about">
            <h2>Sobre mí</h2>
            <p>Apasionado por la tecnología, los videojuegos y la programación.</p>
            <div className="skills">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        );
      case 'projects':
        return (
          <section className="projects">
            <h2>Proyectos Destacados</h2>
            <div className="project-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p><strong>Tecnologías:</strong> {project.tech}</p>
                  <p>{project.description}</p>
                  <a href={project.link} className="project-link">Ver Proyecto</a>
                </div>
              ))}
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="contact">
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Nombre" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <textarea 
                name="message"
                placeholder="Mensaje"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit">Enviar</button>
            </form>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          {[
            { section: 'home', label: 'Inicio' },
            { section: 'about', label: 'Sobre mí' },
            { section: 'projects', label: 'Proyectos' },
            { section: 'contact', label: 'Contacto' }
          ].map(({ section, label }) => (
            <button 
              key={section}
              onClick={() => setActiveSection(section)}
              className={activeSection === section ? 'active' : ''}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {renderSection()}
      </main>

      <footer className="footer">
        <p>© 2025 Ruben Benjamin Rivera Ruiz Todos los derechos reservados</p>
        <div className="social-links">
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
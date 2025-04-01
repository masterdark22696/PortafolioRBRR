import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Estado para el chatbot
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de Ruben. ¿En qué puedo ayudarte?",
      sender: "bot",
      buttons: [
        { text: "Contacto", value: "contacto" },
        { text: "Proyectos", value: "proyecto" },
        { text: "Habilidades", value: "habilidad" }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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

  // Funciones del chatbot
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChatInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput) => {
    userInput = userInput.toLowerCase();
    let botResponse = "";
    let buttons = [];
    
    if (userInput.includes('hola')) {
      botResponse = "¡Hola! Bienvenido a mi portafolio digital. ¿En qué puedo ayudarte hoy?";
      buttons = [
        { text: "Contacto", value: "contacto" },
        { text: "Proyectos", value: "proyecto" }
      ];
    } else if (userInput.includes('contacto')) {
      botResponse = "Mi nombre completo es Ruben Benjamin Rivera Ruiz. Puedes contactarme al teléfono 123-456-7890 o a través del formulario en la sección de contacto.";
    } else if (userInput.includes('proyecto') || userInput.includes('portafolio')) {
      botResponse = "Mi portafolio incluye proyectos de React, Node.js y Python. ¿Te gustaría saber más sobre alguno en específico?";
      buttons = [
        { text: "Portafolio Digital", value: "proyecto 1" },
        { text: "Web Scraping", value: "proyecto 2" }
      ];
    } else if (userInput.includes('proyecto 1')) {
      botResponse = "El Portafolio Digital es un sitio web desarrollado con React, Node.js y Vite que muestra mis proyectos y habilidades de manera profesional.";
    } else if (userInput.includes('proyecto 2')) {
      botResponse = "El proyecto de Web Scraping utiliza Python para extraer noticias de varios sitios web y exportarlas en formato de texto para su análisis.";
    } else if (userInput.includes('email')) {
      botResponse = "Puedes contactarme a través del formulario en la sección de contacto o directamente por mis redes sociales.";
    } else if (userInput.includes('habilidad') || userInput.includes('experiencia')) {
      botResponse = "Tengo experiencia en React, JavaScript, HTML, CSS, Java y Python. ¿Necesitas ayuda con alguna tecnología específica?";
      buttons = skills.map(skill => ({ text: skill, value: `habilidad ${skill.toLowerCase()}` }));
    } else if (userInput.includes('saludos')) {
      botResponse = "¡Saludos! Gracias por visitar mi portafolio. ¿En qué puedo ayudarte hoy?";
    } else {
      botResponse = "Lo siento, no entendí lo anterior. ¿Podrías reformular tu pregunta?";
      buttons = [
        { text: "Contacto", value: "contacto" },
        { text: "Proyectos", value: "proyecto" },
        { text: "Habilidades", value: "habilidad" }
      ];
    }
    
    skills.forEach(skill => {
      if (userInput.includes(skill.toLowerCase())) {
        botResponse = `${skill} es una de mis principales habilidades técnicas. He trabajado en varios proyectos utilizando esta tecnología.`;
      }
    });
    
    return { text: botResponse, buttons };
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user"
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const response = generateBotResponse(inputValue);
      
      const newBotMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        buttons: response.buttons
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Función para manejar clics en botones del chatbot
  const handleButtonClick = (value) => {
    // Add user message based on button click
    const newUserMessage = {
      id: messages.length + 1,
      text: value,
      sender: "user"
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const response = generateBotResponse(value);
      
      const newBotMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        buttons: response.buttons
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Funciones originales del formulario
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
          <section className="text-center p-12 bg-white/20 rounded-lg shadow-md m-5 animate-fade-in">
            <h1 className="text-3xl font-bold">Hola, soy Ruben Benjamin Rivera Ruiz</h1>
            <p className="text-xl">Programador de backend y Java</p>
            <img 
              src="/fto-portafolio.jpeg" 
              alt="Foto de perfil" 
              className="max-w-[250px] h-[250px] rounded-full mx-auto my-5 object-cover border-4 border-yellow-400 animate-float" 
            />
          </section>
        );
      case 'about':
        return (
          <section className="text-center p-12 bg-white/20 rounded-lg shadow-md m-5 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Sobre mí</h2>
            <p className="mb-6">Apasionado por la tecnología, los videojuegos y la programación.</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm transition-transform duration-300 hover:scale-110"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        );
      case 'projects':
        return (
          <section className="text-center p-12 bg-white/20 rounded-lg shadow-md m-5 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Proyectos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-black/40 p-5 rounded-lg transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-md hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="my-2 text-white"><strong>Tecnologías:</strong> {project.tech}</p>
                  <p className="text-white">{project.description}</p>
                  <a 
                    href={project.link} 
                    className="inline-block mt-3 text-yellow-400 font-bold hover:underline"
                  >
                    Ver Proyecto
                  </a>
                </div>
              ))}
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="text-center p-12 bg-white/20 rounded-lg shadow-md m-5 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Contacto</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                name="name"
                placeholder="Nombre" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <textarea 
                name="message"
                placeholder="Mensaje"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-400 transition-colors"
              ></textarea>
              <button 
                type="submit"
                className="bg-yellow-400 text-black p-3 rounded cursor-pointer hover:bg-yellow-500 transition-all duration-300 hover:scale-105"
              >
                Enviar
              </button>
            </form>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
        <nav className="flex justify-center gap-5 md:flex-row flex-col items-center">
          {[
            { section: 'home', label: 'Inicio' },
            { section: 'about', label: 'Sobre mí' },
            { section: 'projects', label: 'Proyectos' },
            { section: 'contact', label: 'Contacto' }
          ].map(({ section, label }) => (
            <button 
              key={section}
              onClick={() => setActiveSection(section)}
              className={`bg-transparent text-white border-none py-2 px-5 cursor-pointer transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:scale-105 hover:shadow-lg ${
                activeSection === section ? 'bg-yellow-400 text-black' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {renderSection()}
      </main>

      <footer className="bg-gray-800 text-white text-center p-5">
        <p>© 2025 Ruben Benjamin Rivera Ruiz Todos los derechos reservados</p>
        <div className="flex justify-center gap-5 mt-3">
          <a 
            href="https://linkedin.com/in/tuusuario" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/tuusuario" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://twitter.com/tuusuario" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors"
          >
            Twitter
          </a>
        </div>
      </footer>
      
      {/* Chatbot integrado directamente en App.js */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Button */}
        <button 
          onClick={toggleChat} 
          className={`bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
          style={{ transition: 'all 0.3s ease' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>

        {/* Chat Window */}
        <div 
          className={`bg-white rounded-lg shadow-xl w-80 md:w-96 overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{ height: '400px', transition: 'all 0.3s ease' }}
        >
          {/* Chat Header */}
          <div className="bg-yellow-400 text-black px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center mr-2">
                <span className="font-bold">RR</span>
              </div>
              <div>
                <h3 className="font-bold">MonaChinaBot</h3>
                <p className="text-xs">En línea</p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-black hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-[300px] overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div key={message.id}>
                <div 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`px-4 py-2 rounded-lg max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-yellow-400 text-black' 
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
                
                {/* Botones de interacción rápida */}
                {message.buttons && message.buttons.length > 0 && message.sender === 'bot' && (
                  <div className="flex flex-wrap gap-2 mb-4 ml-2">
                    {message.buttons.map((button, index) => (
                      <button 
                        key={index}
                        onClick={() => handleButtonClick(button.value)}
                        className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm hover:bg-yellow-200 transition-colors duration-300 border border-gray-300"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-black px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="flex border-t border-gray-200">
            <input
              type="text"
              value={inputValue}
              onChange={handleChatInputChange}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-3 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-yellow-400 text-black px-4 hover:bg-yellow-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      {/* Header Section */}
      <div className="relative z-10 mx-auto min-h-screen px-4 py-6">
        <div className="mb-12 text-center">
          <div className="mb-8">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:text-7xl">
              Weather{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pro
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              Experience weather like never before with real-time data,
              beautiful visuals, and precise forecasts for any location
              worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function Main() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <img
        src="/carrossel-1.png"
        alt="Reparação de um buraco na Estrada"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-azul-800/40 via-transparent to-azul-800/40" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <span className="mb-6 inline-block px-5 py-1.5 text-sm font-medium border border-white/80 rounded-full bg-transparent">
          Pedidos de reperação
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
          Mude o futuro de seu bairro de forma <br />
          Colaborativa e Eficiente
        </h1>

        <p className="text-base sm:text-lg text-white/90 mb-10 max-w-2xl">
          A plataforma MyHood permite que você reporte problemas em sua
          comunidade de forma rápida e eficiente. Junte-se a nós para melhorar a
          qualidade de vida em seu bairro.
        </p>

        <button className="px-8 py-3 bg-laranja-500 text-white font-medium rounded-full hover:bg-laranja-600 transition-colors">
          Cadastre seu Primeiro Pedido
        </button>
      </div>
    </main>
  );
}

export default Main;

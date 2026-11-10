function Pontos() {
  return (
    <section className="bg-azul-600 py-20 px-4 font-dunbar">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white 
  transition-transform duration-300 ease-out 
  hover:scale-105"
          >
            Pontos Importantes
          </h2>
          <h3 className="text-white/70 mt-3 text-2xl">
            Por que escolher nossa&nbsp;
            <span
              className="text-laranja-500 font-bold relative inline-block 
        after:content-[''] after:absolute after:bottom-0 after:left-0 
        after:h-[2px] after:w-0 after:bg-laranja-500 
        after:transition-all after:duration-300 after:ease-out
        hover:after:w-full cursor-default"
            >
              Solução
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-laranja-500 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/icon-db.png"
                alt="Ícone de banco de dados"
                className="w-14 h-14 hover:animate-bounce"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Banco de Dados
              <br />
              completo
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              O sistema organiza automaticamente esses chamados por ordem de
              urgência e volume de reclamações da vizinhança.
            </p>
          </div>

          <div className="bg-laranja-500 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/icon-an.png"
                alt="Ícone de anonimato"
                className="w-14 h-14 hover:animate-pulse"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Anonimato</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Você pode reportar problemas do seu bairro de forma totalmente
              anônima, sem precisar se identificar.
            </p>
          </div>

          <div className="bg-laranja-500 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/icon-flash.png"
                alt="Ícone de rapidez"
                className="w-14 h-14 hover:animate-spin duration-20"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Rapidez</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Os problemas são direcionados rapidamente para as autoridades
              competentes, acelerando a resolução.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pontos;

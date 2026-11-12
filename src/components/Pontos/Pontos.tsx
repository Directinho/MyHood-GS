function Pontos() {
  return (
    <section className="bg-azul-600 px-4 py-16 font-dunbar sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold text-white transition-transform duration-300 ease-out hover:scale-105 sm:text-4xl md:text-5xl"
          >
            Pontos Importantes
          </h2>
          <h3 className="mt-3 text-lg text-white/70 sm:text-2xl">
            Por que escolher nossa&nbsp;
            <span
              className="relative inline-block font-bold text-azul-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-azul-500 after:transition-all after:duration-300 after:ease-out after:content-[''] hover:after:w-full cursor-default"
            >
              Solução
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 p-1 sm:p-4 md:grid-cols-3">
          <div className="rounded-2xl bg-azul-500 p-6 text-center sm:p-8">
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
            <p className="my-6 text-base leading-relaxed text-white/90 sm:text-lg">
              O sistema organiza esses chamados por ordem de urgência.
            </p>
          </div>

          <div className="rounded-2xl bg-azul-500 p-6 text-center sm:p-8">
            <div className="flex justify-center mb-6">
              <img
                src="/icon-an.png"
                alt="Ícone de anonimato"
                className="w-14 h-14 hover:animate-pulse"
              />
            </div>
            <h3 className="text-xl font-semibold text-white ">Anonimato</h3>
            <p className="my-6 text-base leading-relaxed text-white/90 sm:text-lg">
              Você pode reportar problemas do seu bairro de forma totalmente
              anônima.
            </p>
          </div>

          <div className="rounded-2xl bg-azul-500 p-6 text-center sm:p-8">
            <div className="flex justify-center mb-6">
              <img
                src="/icon-flash.png"
                alt="Ícone de rapidez"
                className="w-14 h-14 hover:animate-spin duration-500"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Rapidez</h3>
            <p className="my-6 text-base leading-relaxed text-white/90 sm:text-lg">
              Os problemas chegam rapidamente para as autoridades competentes,
              acelerando a resolução.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pontos;

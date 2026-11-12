import { Link } from "react-router-dom";
function Main() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16 text-white sm:py-20">
      <img
        src="/carrossel-1.png"
        alt="Reparação de um buraco na Estrada"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-azul-800/40 via-transparent to-azul-800/40" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <span className="mb-6 inline-block rounded-full border border-white/80 bg-transparent px-5 py-1.5 text-sm font-medium sm:text-base">
          Pedidos de reparação
        </span>

        <h1 className="mb-6 text-3xl font-semibold leading-tight sm:mb-8 sm:text-4xl md:text-5xl">
          Mude o futuro de seu bairro de forma{" "}
          <br className="hidden sm:block" />
          Colaborativa e Eficiente
        </h1>

        <p className="mb-8 w-full max-w-2xl text-base leading-relaxed tracking-tight text-white/90 sm:text-lg md:text-xl">
          A plataforma MyHood permite que você reporte problemas em sua
          comunidade de forma rápida e eficiente. Junte-se a nós para melhorar a
          qualidade de vida em seu bairro.
        </p>
        <Link
          to="/cadastrar-pedido"
          className="mt-2 inline-flex max-w-full items-center justify-center rounded-full bg-azul-500 px-6 py-3 text-center text-base font-medium text-white transition-colors duration-300 ease-in hover:bg-laranja-500 hover:text-azul-800 sm:px-8 sm:text-lg"
        >
          Cadastre seu Primeiro Pedido
        </Link>
      </div>
    </main>
  );
}

export default Main;

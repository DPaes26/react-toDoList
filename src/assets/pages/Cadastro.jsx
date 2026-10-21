import { Link } from "react-router";

const Cadastro = () => {

    function cadastrar() {
            // corta fluxo natural do forms, já que naturalmente ele executaria o arquivo por causa do "action"
            event.preventDefault();

            let nome = document.querySelector("#nome").value;
            let email = document.querySelector("#email").value;
            let senha = document.querySelector("#senha").value;

            let dados = {
                nome,
                email,
                senha
            }


            fetch("https://js-lista-de-tarefas-api.onrender.com/usuarios", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dados)
            })

                .then(resposta => resposta.json())
                .then(json => {
                    if (json.tipo == "error") {
                        alert(json.mensagem);
                        return;
                    }

                    alert(json.mensagem);
                    window.location.href = "index.html";
                })
                .catch(error => {
                    alert(error.message);
                })

            console.log(dados);
        }


    return (
        <div className="bg-slate-200 h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <Link to="/" className="mb-5 my-8">Voltar</Link>
                <h1 className="font-bold text-xl mb-6">Cadastre-se</h1>

                <form onSubmit={cadastrar} className="flex flex-col w-80">

                    <label for="nome" className="uppercase text-sm font-bold mb-2 block">Nome</label>
                    <input type="text" placeholder="seu nome" id="nome" required
                        className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" />

                    <label for="email" className="uppercase text-sm font-bold mb-2 block">E-mail</label>
                    <input type="email" placeholder="email@gmail.com" id="email" required
                        className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" />

                    <label for="senha" className="uppercase text-sm font-bold mb-2 block">Senha</label>
                    <input type="password" placeholder="********" id="senha" required
                        className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" />

                    <button
                        className="w-full h-10 rounded bg-purple-600 hover:bg-purple-600 duration-200 hover:text-white font-bold">Cadastrar</button>
                </form>
            </div>


        </div>
    );
}

export default Cadastro;
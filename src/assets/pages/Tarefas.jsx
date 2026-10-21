import { useEffect, useRef, useState } from "react";
import { AXIOS } from "../../services";
import { useNavigate } from "react-router";
import { BiPencil, BiTrash } from "react-icons/bi";

const Tarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const [formCriar, setFormCriar] = useState(false);
    const [formEditar, setFormEditar] = useState(false);
    const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
    const tituloCriar = useRef(null);
    const descricaoCriar = useRef(null);
    const idEditar = useRef(null);
    const tituloEditar = useRef(null);
    const descricaoEditar = useRef(null);
    const navigate = useNavigate();

    function pesquisarTarefas(palavra) {

        if (palavra.length == 0) {
            setTarefas(tarefas)
            return;
        }
        if (palavra.length >= 3) {
            let tarefasFiltradas = tarefas.filter(tarefa => tarefa.titulo.toLowerCase().includes(palavra.toLowerCase()))

            setTarefas(tarefasFiltradas);
        }
    }

    async function criarTarefa() {
        event.preventDefault();
        try {
            let dados = {
                titulo: tituloCriar.current.value,
                descricao: descricaoCriar.current.value,
                usuario_id: usuario.id
            }

            const resposta = await AXIOS.post("/tarefas", dados);

            alert(resposta.data.mensagem);
            setFormCriar(false);
            buscarTarefas();

        } catch (error) {
            alert("Error: " + error.message);
        }
    }

    async function buscarTarefas() {
        try {
            if (!usuario) {
                navigate = ("/");
            }

            const resposta = await AXIOS.get(`/tarefas/${usuario.id}`);
            setTarefas(resposta.data);

        } catch (error) {
            console.log("Error", error.message);

        }
    }

    async function editarTarefa() {
        event.preventDefault();
        try {
            let dados = {
                id: idEditar.current.value,
                titulo: tituloEditar.current.value,
                descricao: descricaoEditar.current.value,
                usuario_id: usuario.id
            }

            const resposta = await AXIOS.put(`/tarefas/${dados.id}`, dados);

            alert(resposta.data.mensagem);
            setFormEditar(false);
            buscarTarefas();

        } catch (error) {
            alert("Error: ", error.message);
        }
    }

    async function deletarTarefa(id) {
        // event.preventDefault();
        if (confirm("Deseja realmente apagar?")) {
            try {
                const resposta = await AXIOS.delete(`/tarefas/${id}`);
                alert(resposta.data.mensagem);
                buscarTarefas();
            } catch (error) {
                alert("Error: ", error.message);
            }
        }
    }

    useEffect(() => {
        buscarTarefas();
    }, []);

    return (
        <div>
            <header
                className="flex justify-between items-center py-4 px-15 bg-gradient-to-r from-purple-800 via-purple-500 to-purple-750">
                <input onKeyup={(e) => pesquisarTarefas(event.target.value)} type="text" placeholder="Pesquisar" className="w-100 h-10 pl-4 rounded bg-white" />
                <button onClick={() => setFormCriar(true)}
                    className="leading-10 bg-purple-800 rounded px font-bold text-white duration-200 cursor-pointer hover:bg-purple-400 hover:text-black">Nova
                    tarefa</button>
            </header>

            <main className="p-15 bg-slate-200">
                <h1 className="text-3xl font-bold mb-6">Tarefas</h1>
                <div id="tarefas" className="grid grid-cols-3 gap-4">

                    {
                        tarefas.length == 0 ? (
                            <div>Crie sua primeira tarefa</div>
                        ) : (
                            tarefas.map(tarefa => (
                                <div class="bg-white p-4 rounded-lg">
                                    <h3 class="font-bold mb-4">{tarefa.titulo}</h3>
                                    <p className="break-all">{tarefa.descricao}</p>
                                    <div class="flex justify-end gap-3">
                                        <BiPencil
                                            onClick={() => {
                                                idEditar.current.value = tarefa.id,
                                                tituloEditar.current.value = tarefa.titulo,
                                                descricaoEditar.current.value = tarefa.descricao,
                                                setFormCriar(true);
                                            }}
                                            class="cursor-pointer hover:fill-purple-500"
                                        />

                                        <BiTrash
                                            onClick={() => deletarTarefa(tarefa.id)}
                                            class="cursor-pointer hover:fill-purple-500"
                                        />
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>



                <div
                    id="overlay"
                    onClick={() => {
                        setFormCriar(false);
                    }}
                    className={`w-full h-screen bg-black/70 fixed top-0 left-0 duration-200 ${formCriar ? "" : "opacity-0 invisible"}`}>
                </div>

                <div id="form-criar"
                    className={`w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 
                    ${formCriar ? "" : "opacity-0 invisible"}`}>

                    <div className="flex justify-end delay-200">
                        <box-icon
                            name='x'
                            onClick={() => setFormCriar(false)}
                            className="cursor-pointer">
                        </box-icon>
                    </div>

                    <form onSubmit={criarTarefa} className="flex flex-col">
                        <label className="uppercase text-xs font-bold mb-2 block">Título</label>
                        <input
                            ref={tituloCriar}
                            type="text"
                            placeholder="Titulo da tarefa"
                            className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none"
                        />

                        <label className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                        <textarea ref={descricaoCriar}
                            className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded  outline-none mb-4"></textarea>

                        <button
                            className="w-full h-10 rounded bg-purple-600 hover:bg-purple-600 duration-200 hover:text-white font-bold">Criar
                        </button>

                    </form>

                </div>

                <div id="form-editar"
                    className={`w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 
                    ${formEditar ? "" : "opacity-0 invisible"}`}>

                    <div className="flex justify-end delay-200">
                    </div>

                    <form onSubmit={editarTarefa} className="flex flex-col">

                        <input type="hidden" ref={idEditar} />

                        <label
                            className="uppercase text-xs font-bold mb-2 block">Título</label>

                        <input
                            type="text"
                            placeholder="Titulo da tarefa"
                            ref={tituloEditar}
                            className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />

                        <label for="descricaoEdicao" className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                        <textarea
                            ref={descricaoEditar}
                            className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded  outline-none mb-4"></textarea>

                        <button
                            className="w-full h-10 rounded bg-purple-600 hover:bg-purple-600 duration-200 hover:text-white font-bold">Editar tarefa
                        </button>

                    </form>
                </div>

            </main>

        </div>
    );
}

export default Tarefas;
import { ICallController } from "../funcionalidade/iCallController";
import { Chamado } from "../modelo/chamado";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            op = Number(prompt('Escolha uma opção\n1- Cadastrar\n2- Listar \n3- Marcar como concluido\n0- Sair'));
            switch(op){
                case 1:
                    let nome : string = prompt('Digite seu nome')!;
                    let descricao : string = prompt('Digite a descrição do problema')!;
                    let deuCerto : boolean = this.callController.abrirChamado(nome,descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado');
                    }else{
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;

                case 2:
                    let lista: Array<Chamado>;
                    let exibir: string = '';
                    lista = this.callController.listarChamado();

                    if(lista.length == 0){
                        alert ('Lista de chamados vazia')
                    }else{
                        for (let i: number = 0; i < lista.length; i++){
                            exibir += `ID Chamado: ${i}\nNome solicitante: ${lista[i].solicitante}\nDescrição: ${lista[i].descricao}\nStatus chamado: ${lista[i].status}\n\n`
                        }
                        alert (exibir);
                    }
                    break;

                case 3:
                    let listaChamado: Chamado[] = this.callController.listarChamado();
                    let chamadoAtender:Chamado | undefined;

                    let indice: number = Number(prompt("Informe o ID do chamado:"));
                    chamadoAtender = listaChamado[indice];
                

                    if (chamadoAtender != undefined) {
                    let operação = this.callController.marcarComoAtendido(chamadoAtender);
                    alert ("Chamado marcado como atendido!");
                    } else {
                        alert("Chamado não encontrado.");
                    }
                    break;

                case 0:
                    alert('Obrigado por utilizar o sistema de chamados.');    
                    break;

                default:
                    alert('Opcao Inválida');
            }
        }
    }

}

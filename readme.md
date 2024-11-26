# Projeto - Teoria dos Grafos

Este sistema foi desenvolvido visando facilitar a criação, manipulação e análise de grafos, com foco na aplicação de conceitos teóricos e na resolução de desafios práticos.

Consistindo no desenvolvimento de uma aplicação para manipulação, visualização e análise de grafos, utilizando um backend em Flask e um frontend desenvolvido em React, o projeto teve como objetivo principal criar uma ferramenta funcional e eficiente, capaz de atender às demandas de usuários com diferentes níveis de conhecimento técnico.

O sistema permite a criação de grafos, além de diversas operações como adição de vértices e arestas, verificação de propriedades e carregamento de grafos via arquivo CSV ou string JSON.

## Requisitos

1. Python 3.7 ou superior
2. Node.js e `npm` (para o frontend)
3. `Pip` (para instalar dependências do backend)

## Equipe

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/anabxalves">
        <img src="https://avatars.githubusercontent.com/u/108446826?v=4" width="200px;" alt="Foto Ana"/><br>
        <sub>
          <b>Ana Beatriz Alves</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Caiobadv">
        <img src="https://avatars.githubusercontent.com/u/117755420?v=4" width="200px;" alt="Foto Caio"/><br>
        <sub>
          <b>Caio Barreto</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
<br>

## Configuração do Ambiente

### 1. Criação e ativação do ambiente virtual

Para rodar o projeto, recomenda-se usar um ambiente virtual (`venv`), que pode ser ativado da seguinte forma:


1. **Criar o ambiente virtual**:
   Abra o terminal e navegue até a pasta principal do projeto, onde o ambiente virtual será criado.
    #### No Windows:
    ```bash
    python -m venv venv
    ```
    #### No Linux/MacOs
    ```bash
    python3 -m venv venv
    ```

2. **Ativar o ambiente virtual**:
    #### Windows
    - No **Prompt de Comando (CMD)**:
        ```bash
        venv\Scripts\activate
        ```

    - No **PowerShell**:
        ```bash
        .\venv\Scripts\Activate
        ```
    #### Linux / MacOs
    ```bash
        source venv/bin/activate
    ```

Quando o ambiente virtual for ativado, você verá algo como `(venv)` no início do prompt.

3. Instale as dependências:
    Instale as dependências do Python usando o `pip`:
   ```bash
   pip install -r requirements.txt
   ```

### 2. Instalar dependências
#### Frontend:
Na pasta do frontend, instale as dependências do Node.js com o npm:

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install
   ```

### 3. Rodando a Aplicação

Agora, para rodar a aplicação, você precisará abrir dois terminais, um para o **backend** e outro para o **frontend**.

#### 1. Backend (Flask)

No terminal do **backend**, execute o seguinte comando para rodar o servidor Flask:

```bash
flask run
```

Isso fará com que o servidor Flask seja iniciado na porta padrão `5000`.

#### 2. Frontend (React)

No terminal do **frontend**, execute os seguintes comandos para compilar e iniciar a aplicação React:

1. Compile o projeto:
   ```bash
   npm run build
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

Isso fará com que o frontend seja acessível no navegador.

## Estrutura do Projeto

```plaintext
.
├── backend/
│   ├── app.py              # Código do backend (API Flask)
│   └── ...
├── frontend/
│   ├── public/             # Arquivos públicos do React
│   ├── src/                # Código fonte do frontend (React)
│   ├── package.json        # Dependências do Node.js
│   └── ...
├── venv/                   # Ambiente virtual (não deve ser versionado)
├── requirements.txt        # Dependências do Python
├── Relatorio.pdf           # Maiores informações sobre o projeto
└── README.md               # Este arquivo
```

## Observações

- O backend é um servidor Flask que expõe uma API REST para manipulação do grafo.
- O frontend é desenvolvido com React e permite interagir com o backend para realizar operações no grafo.
- Certifique-se de ter o **Python** e o **Node.js** instalados corretamente no seu sistema para rodar o projeto.



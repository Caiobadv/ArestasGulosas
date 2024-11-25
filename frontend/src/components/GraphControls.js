import React, { useState } from "react";
import {
    createGraph,
    addVertex,
    addEdge,
    getGraphImage,
    getGraphOrderSize,
    getAdjacentVertices,
    getVertexDegree,
    areVerticesAdjacent,
    getShortestPath,
    loadGraphFromFile,
    loadGraphFromString,
    getIsEurelian
} from "../Api";

function GraphControls({ setGraphImage }) {
    const [direcionado, setDirecionado] = useState(false);
    const [valorado, setValorado] = useState(false);
    const [vertice, setVertice] = useState("");
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [peso, setPeso] = useState("");
    const [orderSize, setOrderSize] = useState(null);
    const [eurelian, setEurelian] = useState(null);
    const [adjacentVertices, setAdjacentVertices] = useState(null);
    const [vertexDegree, setVertexDegree] = useState(null);
    const [adjacency, setAdjacency] = useState(null);
    const [shortestPath, setShortestPath] = useState(null);

    const [jsonString, setJsonString] = useState("");
    const [file, setFile] = useState(null);

    const [adjacentVertex, setAdjacentVertex] = useState("");
    const [degreeVertex, setDegreeVertex] = useState("");
    const [adjacencyOrigin, setAdjacencyOrigin] = useState("");
    const [adjacencyDest, setAdjacencyDest] = useState("");

    const handleCreateGraph = async () => {
        await createGraph(direcionado, valorado);
        fetchGraphImage();
    };

    const handleAddVertex = async () => {
        await addVertex(vertice);
        setVertice("");
        fetchGraphImage();
    };

    const handleAddEdge = async () => {
        await addEdge(origem, destino, valorado ? parseFloat(peso) : undefined);
        setOrigem("");
        setDestino("");
        setPeso("");
        fetchGraphImage();
    };

    const fetchGraphImage = async () => {
        const response = await getGraphImage();
        setGraphImage(response.data.image);
    };

    const fetchOrderSize = async () => {
        const response = await getGraphOrderSize();
        setOrderSize(response.data);
    };

    const fetchIsEurelian = async () => {
        const response = await getIsEurelian();
        setEurelian(response.data);
    }

    const fetchAdjacentVertices = async () => {
        if (!adjacentVertex) {
            alert("Por favor, insira o nome de um vértice.");
            return;
        }
        const response = await getAdjacentVertices(adjacentVertex);
        setAdjacentVertices(response.data);
    };

    const fetchVertexDegree = async () => {
        if (!degreeVertex) {
            alert("Por favor, insira o nome de um vértice.");
            return;
        }
        const response = await getVertexDegree(degreeVertex);
        setVertexDegree(response.data);
    };

    const checkAdjacency = async () => {
        if (!adjacencyOrigin || !adjacencyDest) {
            alert("Por favor, insira os nomes dos vértices de origem e destino.");
            return;
        }
        const response = await areVerticesAdjacent(adjacencyOrigin, adjacencyDest);
        setAdjacency(response.data.adjacente);
    };

    const findShortestPath = async () => {
        if (!origem || !destino) {
            alert("Por favor, insira os nomes dos vértices de origem e destino.");
            return;
        }
        try {
            const response = await getShortestPath(origem, destino);
            setShortestPath(response.data);
        } catch (Error) {
            alert(Error.response.data.message);
        }
    };

    const handleLoadGraphFromFile = async () => {
        if (!file) {
            alert("Por favor, selecione um arquivo CSV.");
            return;
        }

        try {
            const response = await loadGraphFromFile(file);
            alert(response.data.message);
            fetchGraphImage();
        } catch (error) {
            console.error("Erro:", error);
            alert(error.response?.data?.error || "Erro ao carregar o grafo.");
        }
    };


    const handleLoadGraphFromString = async () => {
        try {
            const jsonData = JSON.parse(jsonString);
            await loadGraphFromString(jsonData);
            setJsonString("");
            fetchGraphImage();
        } catch (error) {
            alert("O JSON inserido não é válido.");
        }
    };

    return (
        <div>
            <h2>Configurações do Grafo</h2>
            <label>
                <input type="checkbox" checked={direcionado} onChange={() => setDirecionado(!direcionado)} />
                Direcionado
            </label>
            <label>
                <input type="checkbox" checked={valorado} onChange={() => setValorado(!valorado)} />
                Valorados
            </label>
            <button onClick={handleCreateGraph}>Criar Grafo</button>

            <h3>Adicionar Vértice</h3>
            <input value={vertice} onChange={(e) => setVertice(e.target.value)} placeholder="Vértice" />
            <button onClick={handleAddVertex}>Adicionar Vértice</button>

            <h3>Adicionar Aresta</h3>
            <input value={origem} onChange={(e) => setOrigem(e.target.value)} placeholder="Origem" />
            <input value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Destino" />
            {valorado && <input value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Peso" />}
            <button onClick={handleAddEdge}>Adicionar Aresta</button>

            <h3>Operações no Grafo</h3>
            <button onClick={fetchOrderSize}>Exibir Ordem e Tamanho</button>
            {orderSize && <p>Ordem: {orderSize.ordem}, Tamanho: {orderSize.tamanho}</p>}

            <div>
                <h4>Verificar Eureliano</h4>
                <button onClick={fetchIsEurelian}>Verificar Eureliano</button>
                {eurelian && <p>{eurelian.message}</p>}
            </div>

            <div>
                <h4>Exibir Vértices Adjacentes</h4>
                <input
                    value={adjacentVertex}
                    onChange={(e) => setAdjacentVertex(e.target.value)}
                    placeholder="Vértice para adjacentes"
                />
                <button onClick={fetchAdjacentVertices}>Exibir Vértices Adjacentes</button>
                {adjacentVertices && (
                    <div>
                        <p>Adjacentes: {JSON.stringify(adjacentVertices)}</p>
                    </div>
                )}
            </div>

            <div>
                <h4>Exibir Grau do Vértice</h4>
                <input
                    value={degreeVertex}
                    onChange={(e) => setDegreeVertex(e.target.value)}
                    placeholder="Vértice para grau"
                />
                <button onClick={fetchVertexDegree}>Exibir Grau do Vértice</button>
                {vertexDegree && (
                    <div>
                        <p>Grau: {JSON.stringify(vertexDegree)}</p>
                    </div>
                )}
            </div>

            <div>
                <h4>Verificar Adjacência</h4>
                <input
                    value={adjacencyOrigin}
                    onChange={(e) => setAdjacencyOrigin(e.target.value)}
                    placeholder="Origem"
                />
                <input
                    value={adjacencyDest}
                    onChange={(e) => setAdjacencyDest(e.target.value)}
                    placeholder="Destino"
                />
                <button onClick={checkAdjacency}>Verificar Adjacência</button>
                {adjacency !== null && (
                    <div>
                        <p>Os vértices são adjacentes? {adjacency ? "Sim" : "Não"}</p>
                    </div>
                )}
            </div>

            <div>
                <h4>Calcular Caminho Mais Curto</h4>
                <input
                    value={origem}
                    onChange={(e) => setOrigem(e.target.value)}
                    placeholder="Origem"
                />
                <input
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    placeholder="Destino"
                />
                <button onClick={findShortestPath}>Calcular Caminho Mais Curto</button>
                {shortestPath && (
                    <div>
                        <p>Custo do Caminho Mais Curto: {shortestPath.custo}</p>
                        <p>Caminho: {shortestPath.caminho ? shortestPath.caminho.join(" -> ") : "N/A"}</p>
                    </div>
                )}
            </div>

            <h3>Carregar Grafo</h3>
            <div>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleLoadGraphFromFile}>Carregar Grafo do Arquivo</button>
            </div>
            <div>
                <textarea
                    value={jsonString}
                    onChange={(e) => setJsonString(e.target.value)}
                    placeholder='Insira o JSON para o grafo'
                    rows="4"
                    cols="50"
                />
                <button onClick={handleLoadGraphFromString}>Carregar Grafo de String</button>
            </div>
        </div>
    );
}

export default GraphControls;

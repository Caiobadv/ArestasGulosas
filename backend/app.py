import matplotlib
matplotlib.use("Agg")

from flask import Flask, request, jsonify
from flask_cors import CORS
import networkx as nx
import matplotlib.pyplot as plt
import base64
from io import BytesIO

app = Flask(__name__)
CORS(app) 

grafo = nx.Graph()
is_directed = False
is_weighted = False

@app.route("/create_graph", methods=["POST"])
def create_graph():
    global grafo, is_directed, is_weighted
    data = request.json
    is_directed = data.get("direcionado", False)
    is_weighted = data.get("valorado", False)
    grafo = nx.DiGraph() if is_directed else nx.Graph()
    return jsonify({"message": "Grafo criado com sucesso!"})

@app.route("/add_vertex", methods=["POST"])
def add_vertex():
    vertice = request.json.get("vertice")
    grafo.add_node(vertice)
    return jsonify({"message": f"Vértice {vertice} adicionado com sucesso!"})

@app.route("/add_edge", methods=["POST"])
def add_edge():
    origem = request.json.get("origem")
    destino = request.json.get("destino")
    peso = request.json.get("peso", 1)
    
    if is_weighted:
        grafo.add_edge(origem, destino, weight=peso)
    else:
        grafo.add_edge(origem, destino)
    
    return jsonify({"message": f"Aresta de {origem} para {destino} com peso {peso} adicionada com sucesso!"})


@app.route("/get_graph_image", methods=["GET"])
def get_graph_image():
    plt.figure(figsize=(6, 4))
    pos = nx.spring_layout(grafo)
    labels = nx.get_edge_attributes(grafo, 'weight') if is_weighted else None
    
    nx.draw(
        grafo, pos, with_labels=True, node_color='skyblue', node_size=500, 
        font_size=10, font_weight='bold', edge_color='gray', 
        connectionstyle="arc3,rad=0.1" 
    )

    if labels:
        for (u, v), weight in labels.items():
            if grafo.has_edge(v, u) and (v, u) in labels:
                nx.draw_networkx_edge_labels(grafo, pos, edge_labels={(u, v): weight}, label_pos=0.3)
                nx.draw_networkx_edge_labels(grafo, pos, edge_labels={(v, u): labels[(v, u)]}, label_pos=0.7)
            else:
                nx.draw_networkx_edge_labels(grafo, pos, edge_labels={(u, v): weight})

    buf = BytesIO()
    plt.savefig(buf, format="png")
    plt.close()
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    return jsonify({"image": img_base64})

@app.route("/load_graph_from_file", methods=["POST"])
def load_graph_from_file():
    data = request.json
    vertices = data.get("vertices", [])
    arestas = data.get("arestas", [])
    for vertice in vertices:
        grafo.add_node(vertice)
    for aresta in arestas:
        origem, destino, peso = aresta
        if is_weighted:
            grafo.add_edge(origem, destino, weight=peso)
        else:
            grafo.add_edge(origem, destino)
    return jsonify({"message": "Grafo carregado do arquivo com sucesso!"})

@app.route("/load_graph_from_string", methods=["POST"])
def load_graph_from_string():
    data = request.json
    vertices = data.get("vertices", [])
    arestas = data.get("arestas", [])
    for vertice in vertices:
        grafo.add_node(vertice)
    for aresta in arestas:
        origem, destino, peso = aresta
        if is_weighted:
            grafo.add_edge(origem, destino, weight=peso)
        else:
            grafo.add_edge(origem, destino)
    return jsonify({"message": "Grafo carregado da string com sucesso!"})

@app.route("/graph_order_size", methods=["GET"])
def graph_order_size():
    ordem = grafo.number_of_nodes()
    tamanho = grafo.number_of_edges()
    return jsonify({"ordem": ordem, "tamanho": tamanho})

@app.route("/adjacent_vertices", methods=["POST"])
def adjacent_vertices():
    vertice = request.json.get("vertice")
    if grafo.is_directed():
        adjacentes_saida = list(grafo.successors(vertice))
        adjacentes_entrada = list(grafo.predecessors(vertice))
        return jsonify({"adjacentes_saida": adjacentes_saida, "adjacentes_entrada": adjacentes_entrada})
    else:
        adjacentes = list(grafo.neighbors(vertice))
        return jsonify({"adjacentes": adjacentes})

@app.route("/vertex_degree", methods=["POST"])
def vertex_degree():
    vertice = request.json.get("vertice")
    if vertice not in grafo:
        return jsonify({"error": f"O vértice '{vertice}' não existe no grafo."}), 400

    if grafo.is_directed():
        grau_saida = grafo.out_degree(vertice)
        grau_entrada = grafo.in_degree(vertice)
        return jsonify({"grau_saida": grau_saida, "grau_entrada": grau_entrada})
    else:
        grau = grafo.degree(vertice)
        return jsonify({"grau": grau})

@app.route("/are_adjacent", methods=["POST"])
def are_adjacent():
    vertice1 = request.json.get("vertice1")
    vertice2 = request.json.get("vertice2")
    adjacente = grafo.has_edge(vertice1, vertice2)
    return jsonify({"adjacente": adjacente})

@app.route("/shortest_path", methods=["POST"])
def shortest_path():
    origem = request.json.get("origem")
    destino = request.json.get("destino")
    try:
        custo = nx.shortest_path_length(grafo, source=origem, target=destino, weight='weight')
        caminho = nx.shortest_path(grafo, source=origem, target=destino, weight='weight')
        return jsonify({"custo": custo, "caminho": caminho})
    except nx.NetworkXNoPath:
        return jsonify({"message": f"Não existe caminho entre {origem} e {destino}."}), 404
    


if __name__ == "__main__":
    app.run(debug=True)

import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const createGraph = (direcionado, valorado) => {
    return axios.post(`${API_URL}/create_graph`, { direcionado, valorado });
};

export const addVertex = (vertice) => {
    return axios.post(`${API_URL}/add_vertex`, { vertice });
};

export const addEdge = (origem, destino, peso) => {
    return axios.post(`${API_URL}/add_edge`, { origem, destino, peso });
};

export const getGraphImage = () => {
    return axios.get(`${API_URL}/get_graph_image`);
};

export const loadGraphFromFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${API_URL}/load_graph_from_file`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const loadGraphFromString = (data) => {
    return axios.post(`${API_URL}/load_graph_from_string`, data);
};

export const getGraphOrderSize = () => {
    return axios.get(`${API_URL}/graph_order_size`);
};

export const getAdjacentVertices = (vertice) => {
    return axios.post(`${API_URL}/adjacent_vertices`, { vertice });
};

export const getVertexDegree = (vertice) => {
    return axios.post(`${API_URL}/vertex_degree`, { vertice });
};

export const areVerticesAdjacent = (vertice1, vertice2) => {
    return axios.post(`${API_URL}/are_adjacent`, { vertice1, vertice2 });
};

export const getShortestPath = (origem, destino) => {
    return axios.post(`${API_URL}/shortest_path`, { origem, destino });
};

export const getIsEurelian = () => {
    return axios.get(`${API_URL}/is_eulerian`);
};

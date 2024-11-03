import React from "react";

function GraphDisplay({ graphImage }) {
    return (
        <div>
            <h2>Visualização do Grafo</h2>
            {graphImage ? <img src={`data:image/png;base64,${graphImage}`} alt="Grafo" /> : <p>O grafo será exibido aqui.</p>}
        </div>
    );
}

export default GraphDisplay;

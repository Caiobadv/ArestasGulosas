import React, { useState } from "react";
import GraphControls from "./components/GraphControls";
import GraphDisplay from "./components/GraphDisplay";

function App() {
    const [graphImage, setGraphImage] = useState("");

    return (
        <div className="App">
            <h1>Construtor de Grafos Interativo</h1>
            <GraphControls setGraphImage={setGraphImage} />
            <GraphDisplay graphImage={graphImage} />
        </div>
    );
}

export default App;

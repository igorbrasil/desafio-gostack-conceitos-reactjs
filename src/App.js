import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Front-end com ReactJS ${Date.now()}`,
      url: "https://github.com/Rocketseat/gostack-template-conceitos-nodejs",
      techs: ["Node.js", "Ruby", "Java"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    const listRepo = repositories;
    await api.delete(`repositories/${id}`);
    listRepo.splice(repositoryIndex, 1);
    setRepositories([...listRepo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>{" "}
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

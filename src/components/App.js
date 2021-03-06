import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { firstBy } from "thenby";
import "../stylesheets/App.scss";
import getDataFromApi from "../services/getDataFromApi";
import Header from "./Header";
import CharacterList from "./CharacterList";
import CharacterDetail from "./CharacterDetail";
import CharacterNotFound from "./CharacterNotFound";
import Filters from "./Filters";

console.log(getDataFromApi());

const App = () => {
  const [chars, setChars] = useState([]);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  useEffect(() => {
    getDataFromApi().then((data) => setChars(data));
  }, []);

  const handleFilter = (inputChange) => {
    if (inputChange.key === "name") {
      setName(inputChange.value);
      console.log(name);
    }
    if (inputChange.key === "species") {
      setSpecies(inputChange.value);
      console.log(species);
    }
  };

  const filteredChars = chars
    .filter((char) => {
      return char.name.toUpperCase().includes(name.toUpperCase());
    })
    .filter((char) => {
      return char.species.includes(species);
    })
    .sort(firstBy("status").thenBy("name"));

  const renderCharDetail = (routerProps) => {
    const routerCharId = routerProps.match.params.charId;
    console.log("El Id del pj clickado es: ", routerCharId);
    const charFound = chars.find((char) => char.id === parseInt(routerCharId));
    console.log("El resultado del match es:", charFound);
    if (charFound) {
      return <CharacterDetail char={charFound} />;
    } else {
      return <CharacterNotFound />;
    }
  };

  return (
    <div className="body">
      <Header />
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Filters handleFilter={handleFilter} />
            <CharacterList chars={filteredChars} />
          </Route>
          <Route path="/character/:charId" render={renderCharDetail} />
        </Switch>
      </main>
    </div>
  );
};
export default App;

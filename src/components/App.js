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
  const [location, setLocation] = useState([]);
  useEffect(() => {
    getDataFromApi().then((data) => setChars(data));
  }, []);

  const handleFilter = (inputChange) => {
    if (inputChange.key === "name") {
      setName(inputChange.value);
    }
    if (inputChange.key === "species") {
      setSpecies(inputChange.value);
    }
    if (inputChange.key === "location") {
      const indexLocation = location.indexOf(inputChange.value);
      if (indexLocation === -1) {
        const newLocations = [...location, inputChange.value];
        setLocation(newLocations);
      } else {
        const newLocations = location.filter((location) => {
          return location !== inputChange.value;
        });
        setLocation(newLocations);
      }
    }
  };
  console.log({location});

  const locationListRaw = chars.map((char) => char.location);
  const locationList = [...new Set(locationListRaw)];

  const filteredChars = chars
    .filter((char) => {
      return char.name.toUpperCase().includes(name.toUpperCase());
    })
    .filter((char) => {
      return char.species.includes(species);
    })
    .filter((char)=>{
      if(location.length === 0) return true
      else return (location.includes(char.location))
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
            <Filters handleFilter={handleFilter} locationList={locationList} />
            <CharacterList chars={filteredChars} />
          </Route>
          <Route path="/character/:charId" render={renderCharDetail} />
        </Switch>
      </main>
    </div>
  );
};
export default App;

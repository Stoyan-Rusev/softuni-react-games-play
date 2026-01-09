import { useEffect, useState } from "react";
import CatalogItem from "./catalog-item/CatalogItem";
import { getAll } from "../../services/gameService";

export default function Catalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getAll()
            .then(response => {
                setGames(response);
            });
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>

            {games.length > 0
                ? games.map(game => <CatalogItem key={game._id} {...game}/>) 
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
};
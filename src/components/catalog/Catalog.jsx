import CatalogItem from "./catalog-item/CatalogItem";
import useGames from "../../gamesApi/useGames";

export default function Catalog() {
    const games = useGames();

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
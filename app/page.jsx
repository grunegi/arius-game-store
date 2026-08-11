import Herosection from "./components/Herosection/Herosection";
import FeaturedGames from "./components/FeaturedGames";
import {featuredGames} from "@/app/js/data-fetch";


export default async function Home() {

  const featureGame = await featuredGames();

  return (
    <div>
      <Herosection />
      <FeaturedGames games = {featureGame} />
    </div>
  )
};

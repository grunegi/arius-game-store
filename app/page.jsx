import Herosection from "./components/Herosection/Herosection";
import FeaturedGames from "./components/FeaturedGames";
import NewRelease from "./components/NewRelease";
import {featuredGames, newReleases} from "@/app/js/data-fetch";


export default async function Home() {

  const featureGame = await featuredGames();
  const newRelease = await newReleases();

  return (
    <div>
      <Herosection />
      <FeaturedGames games = {featureGame} />
      <NewRelease games = {newRelease} />
    </div>
  )
};

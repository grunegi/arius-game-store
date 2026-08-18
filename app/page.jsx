import Herosection from "./components/Herosection/Herosection";
import FeaturedGames from "./components/FeaturedGames";
import NewRelease from "./components/NewRelease";
import Accessory from "./components/Accessory";

import { 
  featuredGames, 
  newReleases, 
  getHomeProducts,
  updateGameCoverImage
} from "@/app/js/data-fetch";


export default async function Home() {

  const featureGame = await featuredGames();
  const newRelease = await newReleases();
  const accessory = await getHomeProducts()

  return (
    <div>
      <Herosection />
      <FeaturedGames games = {featureGame} />
      <Accessory products = {accessory} />
      <NewRelease games = {newRelease} />
    </div>
  )
};

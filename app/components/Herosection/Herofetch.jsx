import { heroGames } from "../../js/data-fetch";
import Heroslider from "./Heroslider";

export default async function HeroFetch() {
  const games = await heroGames();

  return <Heroslider games={games} />;
}

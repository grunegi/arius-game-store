export const metadata = {
  title: "Search Results | Arius",
  description: "Search the Arius library for games and accessories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({children}) {
    return(
      <>
        {children}
      </>
    );
}
export const metadata = {
  title: "Browse & Filter Games | Arius",
  description: "Explore the Arius library and filter games by genre, category, price and rating.",
  openGraph: {
    title: "Browse & Filter Games | Arius",
    description: "Find your next favorite game on Arius.",
    type: "website",
  },
};

export default function Layout({children}) {
    return(
      <>
        {children}
      </>
    );
}
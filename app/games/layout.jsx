export const metadata = {
  title: "All Games | Arius",
  description:
    "Browse the full Arius game library. Discover new releases, top rated and discounted games.",
  openGraph: {
    title: "All Games | Arius",
    description: "Discover your next favorite game on Arius.",
    type: "website",
  },
};

export default function Layout({ children }) {
    return(
      <>
        {children}
      </>
    );
}
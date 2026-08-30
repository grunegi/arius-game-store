export const metadata = {
  title: "My Wishlist | Arius",
  description: "View and manage your saved games and accessories on Arius.",
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
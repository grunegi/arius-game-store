export const metadata = {
  title: "My Orders | Arius",
  description: "View and track your orders on Arius.",
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
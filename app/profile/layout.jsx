export const metadata = {
  title: "My Profile | Arius",
  description: "Manage your Arius account settings and profile.",
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
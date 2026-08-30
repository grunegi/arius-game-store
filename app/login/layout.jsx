export const metadata = {
  title: "Login | Arius",
  description: "Sign in to your Arius account.",
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
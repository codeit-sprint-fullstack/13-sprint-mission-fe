import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <div className="flex-1 pt-17.5 lg:px-[22.5rem]">{children}</div>
      <Footer />
    </>
  );
}

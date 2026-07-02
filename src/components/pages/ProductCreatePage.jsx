import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductForm from "@/components/product/ProductForm";

const shellClass =
  "mx-auto w-[min(100%-32px,640px)] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,780px)]";

export default function ProductCreatePage() {
  return (
    <div className="bg-white text-[#1f2937]">
      <Header />
      <main
        className={`${shellClass} min-h-[calc(100vh-170px)] pb-[120px] pt-8`}
      >
        <ProductForm />
      </main>
      <Footer />
    </div>
  );
}

import AuthFooter from "../_components/AuthFooter";
import AuthForm from "../_components/AuthForm";
import AuthHeader from "../_components/AuthHeader";

export default function page() {
  return (
    <section className="mx-auto flex min-h-screen w-[343px] flex-col justify-center md:w-[640px]">
      <AuthHeader />
      <AuthForm type="login" />
      <AuthFooter type="login" />
    </section>
  );
}

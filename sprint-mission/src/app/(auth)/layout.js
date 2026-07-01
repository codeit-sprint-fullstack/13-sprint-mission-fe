export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </main>
  );
}

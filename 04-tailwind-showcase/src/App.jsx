import ButtonShowcase from "./components/ButtonShowcase.jsx";
import CardShowcase from "./components/CardShowcase.jsx";
import FormShowcase from "./components/FormShowcase.jsx";
import Nav from "./components/Nav.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <main className="mx-auto max-w-5xl space-y-10 px-6 py-8">
        <h1 className="text-3xl font-semibold">Tailwind Showcase</h1>
        <ButtonShowcase />
        <CardShowcase />
        <FormShowcase />
      </main>
    </div>
  );
}

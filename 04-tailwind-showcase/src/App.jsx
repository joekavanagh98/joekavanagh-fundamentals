import ButtonShowcase from "./components/ButtonShowcase.jsx";
import CardShowcase from "./components/CardShowcase.jsx";

export default function App() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 p-6">
      <h1 className="text-3xl font-semibold">Tailwind Showcase</h1>
      <ButtonShowcase />
      <CardShowcase />
    </main>
  );
}

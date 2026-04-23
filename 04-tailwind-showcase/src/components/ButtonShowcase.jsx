export default function ButtonShowcase() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Buttons</h2>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Primary
        </button>
        <button className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500">
          Secondary
        </button>
        <button className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500">
          Outline
        </button>
        <button className="rounded-md px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500">
          Ghost
        </button>
      </div>
    </section>
  );
}

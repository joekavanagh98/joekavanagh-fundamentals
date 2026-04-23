export default function CardShowcase() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Cards</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-2 text-base font-semibold">Basic Card</h3>
          <p className="text-sm text-slate-600">
            Plain container with a title and short description. The
            workhorse pattern for most content.
          </p>
        </article>

        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-400 to-indigo-600" />
          <div className="p-5">
            <h3 className="mb-2 text-base font-semibold">Media Card</h3>
            <p className="text-sm text-slate-600">
              Visual first. The gradient stands in for a cover image.
            </p>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Monthly revenue
          </p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">
            $48,920
          </p>
          <p className="mt-2 text-sm font-medium text-emerald-600">
            +12.4% from last month
          </p>
        </article>
      </div>
    </section>
  );
}

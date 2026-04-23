export default function FormShowcase() {
  const inputBase =
    "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2";

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Form inputs</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="default-input"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Default
          </label>
          <input
            id="default-input"
            type="text"
            placeholder="jane@example.com"
            className={`${inputBase} border-slate-300 focus:border-blue-500 focus:ring-blue-200`}
          />
          <p className="mt-1 text-xs text-slate-500">
            We'll never share your email.
          </p>
        </div>

        <div>
          <label
            htmlFor="error-input"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Error
          </label>
          <input
            id="error-input"
            type="text"
            defaultValue="not-an-email"
            aria-invalid="true"
            aria-describedby="error-input-message"
            className={`${inputBase} border-red-500 focus:border-red-500 focus:ring-red-200`}
          />
          <p
            id="error-input-message"
            className="mt-1 text-xs font-medium text-red-600"
          >
            Please enter a valid email address.
          </p>
        </div>

        <div>
          <label
            htmlFor="success-input"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Success
          </label>
          <input
            id="success-input"
            type="text"
            defaultValue="jane@example.com"
            aria-describedby="success-input-message"
            className={`${inputBase} border-emerald-500 focus:border-emerald-500 focus:ring-emerald-200`}
          />
          <p
            id="success-input-message"
            className="mt-1 text-xs font-medium text-emerald-600"
          >
            Looks good.
          </p>
        </div>
      </div>
    </section>
  );
}

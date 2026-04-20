const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const storage = {
  read(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
};

function compoundInterest({ principal, rate, years, frequency }) {
  const r = rate / 100;
  return principal * Math.pow(1 + r / frequency, frequency * years);
}

function loanPayment({ principal, rate, years, frequency }) {
  const r = rate / 100;
  const periodicRate = r / frequency;
  const totalPayments = frequency * years;
  if (periodicRate === 0) return principal / totalPayments;
  return (
    (principal * periodicRate) /
    (1 - Math.pow(1 + periodicRate, -totalPayments))
  );
}

function readForm(form) {
  const data = new FormData(form);
  return {
    principal: parseFloat(data.get("principal")),
    rate: parseFloat(data.get("rate")),
    years: parseFloat(data.get("years")),
    frequency: parseFloat(data.get("frequency")),
  };
}

function setupForm({ formId, resultId, storageKey, calculate, resultLabel }) {
  const form = document.getElementById(formId);
  const output = document.getElementById(resultId);

  const saved = storage.read(storageKey);
  if (saved) {
    try {
      const values = JSON.parse(saved);
      for (const [name, value] of Object.entries(values)) {
        const field = form.elements[name];
        if (field) field.value = value;
      }
    } catch {
      storage.remove(storageKey);
    }
  }

  form.addEventListener("input", () => {
    const values = Object.fromEntries(new FormData(form));
    storage.write(storageKey, JSON.stringify(values));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = calculate(readForm(form));
    output.textContent = `${resultLabel}: ${currency.format(result)}`;
  });

  form.addEventListener("reset", () => {
    output.textContent = "";
    storage.remove(storageKey);
  });
}

setupForm({
  formId: "compound-form",
  resultId: "compound-result",
  storageKey: "compound-form",
  calculate: compoundInterest,
  resultLabel: "Future value",
});

setupForm({
  formId: "loan-form",
  resultId: "loan-result",
  storageKey: "loan-form",
  calculate: loanPayment,
  resultLabel: "Payment",
});

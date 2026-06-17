import { ArrowRight, Gauge } from "lucide-react";

type ValuationFormProps = {
  action?: string;
  defaultMileage?: string;
  defaultReg?: string;
  source?: string;
  variant?: "hero" | "footer" | "sidebar";
};

export function ValuationForm({
  action = "/my-details",
  defaultMileage = "",
  defaultReg = "",
  source = "website",
  variant = "hero",
}: ValuationFormProps) {
  const layoutClass =
    variant === "sidebar"
      ? "grid-cols-1"
      : variant === "footer"
        ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
        : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]";

  return (
    <form
      action={action}
      method="get"
      className={`valuation-panel grid gap-3 ${layoutClass}`}
    >
      <input type="hidden" name="source" value={source} />
      <label className="field-shell">
        <span>Your reg</span>
        <input
          name="reg"
          placeholder="AB12 CDE"
          aria-label="Vehicle registration"
          defaultValue={defaultReg}
          required
          minLength={5}
          maxLength={8}
          pattern="[A-Za-z0-9 ]{5,8}"
          title="Please enter a valid registration, for example AB12 CDE."
        />
      </label>
      <label className="field-shell">
        <span>Mileage</span>
        <input
          name="mileage"
          placeholder="45,000"
          inputMode="numeric"
          aria-label="Vehicle mileage"
          defaultValue={defaultMileage}
          required
          pattern="[0-9, ]+"
          title="Please enter mileage using numbers only."
        />
      </label>
      <button className={`action-button ${variant === "sidebar" ? "min-h-[3.75rem] w-full" : "min-h-16"}`} type="submit">
        <Gauge size={19} aria-hidden="true" />
        Value My Car
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}

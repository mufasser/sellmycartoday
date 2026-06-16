import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import {
  buildValuationPreview,
  formatCurrency,
  formatMileage,
  normaliseRegistration,
  parseMileage,
} from "@/lib/valuation";

type MyDetailsPageProps = {
  searchParams: Promise<{
    mileage?: string | string[];
    reg?: string | string[];
    source?: string | string[];
  }>;
};

const issueOptions = [
  "It's a CAT C / S",
  "It's a CAT D / N",
  "It's a non-runner",
  "It has the engine light on",
  "It's heavily damaged cosmetically",
  "It has mechanical issues",
  "No major issues to report",
];

export const metadata: Metadata = {
  title: "My Details",
  description: "Complete your details to receive your car valuation offers from Sell My Car Today.",
  alternates: {
    canonical: "/my-details",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyDetailsPage({ searchParams }: MyDetailsPageProps) {
  const params = await searchParams;
  const reg = normaliseRegistration(readFirst(params.reg) || "AB12 CDE");
  const mileage = parseMileage(readFirst(params.mileage) || "45000");
  const source = readFirst(params.source) || "website";
  const preview = buildValuationPreview(reg, mileage);

  return (
    <>
      <SiteHeader />
      <main className="bg-[#f7f7f2]">
        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href="/sell-my-car" className="text-link">
              <ArrowLeft size={17} aria-hidden="true" />
              Back to valuation
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_320px] xl:grid-cols-[minmax(0,1.15fr)_360px]">
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-black/45">Step 2/2</p>
                    <h1 className="mt-3 text-balance text-4xl font-black leading-[0.98] text-black sm:text-5xl">
                      Your details
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-black/68">
                      We have prepared an indicative valuation preview for <strong>{reg}</strong>. Complete your
                      contact details below and our team will arrange your final offer, collection and payment.
                    </p>
                  </div>
                </div>

                <section className="mt-8 rounded-lg bg-[linear-gradient(135deg,#090909_0%,#191919_55%,#ffd21f_56%,#ffe46f_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
                  <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.16em] text-white/70">
                        Indicative valuation preview
                      </p>
                      <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                        {formatCurrency(preview.low)} - {formatCurrency(preview.high)}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-white/78">
                        Based on your registration and mileage, this gives you a realistic preview before one of our
                        buyers confirms the final offer.
                      </p>
                    </div>
                    <div className="grid gap-3 rounded-lg border border-white/14 bg-white/8 p-4 backdrop-blur-sm">
                      {[
                        { label: "Registration", value: preview.reg },
                        { label: "Mileage", value: `${formatMileage(preview.mileage)} miles` },
                        { label: "Payment", value: "Instant bank transfer" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-black/16 px-4 py-3"
                        >
                          <span className="text-sm font-bold text-white/66">{item.label}</span>
                          <strong className="text-base font-black text-white">{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <form
                  action="/thanks-for-asking"
                  method="get"
                  className="mt-8 rounded-lg border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)] sm:p-8"
                >
                  <input type="hidden" name="reg" value={preview.reg} />
                  <input type="hidden" name="mileage" value={String(preview.mileage)} />
                  <input type="hidden" name="source" value={source} />

                  <section>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-yellow-300 text-black">
                        <ClipboardCheck size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-2xl font-black text-black">Vehicle</h2>
                        <p className="text-sm leading-6 text-black/62">
                          Tell us about the condition so we can line up the right offer quickly.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                      <div>
                        <p className="mb-3 text-lg font-black text-black">Any major vehicle damage or issues?</p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "No", value: "no" },
                            { label: "Yes", value: "yes" },
                          ].map((option, index) => (
                            <label key={option.value} className="cursor-pointer">
                              <input
                                type="radio"
                                name="majorIssues"
                                value={option.value}
                                className="peer sr-only"
                                defaultChecked={index === 0}
                              />
                              <span className="flex min-h-[3.75rem] items-center justify-center rounded-lg border border-black/12 bg-[#f3f3ef] px-4 py-4 text-xl font-black text-black transition peer-checked:border-yellow-300 peer-checked:bg-yellow-300">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="issueDetail" className="mb-3 block text-lg font-black text-black">
                          Please describe it below
                        </label>
                        <select
                          id="issueDetail"
                          name="issueDetail"
                          defaultValue=""
                          className="min-h-[3.75rem] w-full rounded-lg border border-black/18 bg-white px-4 py-4 text-lg font-semibold text-black outline-none transition focus:border-yellow-400"
                        >
                          <option value="" disabled>
                            Select the closest option
                          </option>
                          {issueOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="vehicleNotes" className="mb-3 block text-base font-black text-black">
                        Extra notes about the vehicle
                      </label>
                      <textarea
                        id="vehicleNotes"
                        name="vehicleNotes"
                        rows={4}
                        className="w-full rounded-lg border border-black/18 bg-white px-4 py-4 text-base leading-7 text-black outline-none transition focus:border-yellow-400"
                        placeholder="Service history, warning lights, cosmetic marks, finance clearance or anything else helpful."
                      />
                    </div>
                  </section>

                  <section className="mt-10">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-yellow-300 text-black">
                        <ShieldCheck size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-2xl font-black text-black">You</h2>
                        <p className="text-sm leading-6 text-black/62">
                          These details let us send your offer and arrange collection at the right time.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <Field label="Full name" name="fullName" placeholder="Full name" required />
                      <Field label="Email address" name="email" placeholder="name@example.com" type="email" required />
                      <Field label="Postcode" name="postcode" placeholder="HP53JE" required />
                      <Field label="Mobile number" name="mobile" placeholder="07864 423675" type="tel" required />
                    </div>
                  </section>

                  <section className="mt-8 grid gap-4">
                    <CheckboxField
                      label="Send me updates about vehicles and promotions"
                      name="marketing"
                    />
                    <CheckboxField
                      label="I agree to this website's Terms & Conditions and Privacy Policy"
                      name="terms"
                      required
                    />
                  </section>

                  <button className="action-button mt-8 flex min-h-[4.25rem] w-full text-lg" type="submit">
                    <Sparkles size={20} aria-hidden="true" />
                    Get My Offers
                  </button>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-black/64">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-yellow-500" aria-hidden="true" />
                      Free collection
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Banknote size={16} className="text-yellow-500" aria-hidden="true" />
                      Instant payment
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Truck size={16} className="text-yellow-500" aria-hidden="true" />
                      Collection across the UK
                    </span>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-black/55">
                    Disclaimer: offers and services may be provided by our trusted buying partners. They may contact
                    you with information on how to proceed with the sale of your vehicle.
                  </p>
                </form>
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <VehicleSummaryCard preview={preview} />
                <div className="mt-5 rounded-lg border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
                  <h2 className="text-xl font-black text-black">Need help right now?</h2>
                  <p className="mt-2 text-sm leading-7 text-black/64">
                    Call our team 24/7 if you would rather confirm the details over the phone.
                  </p>
                  <a href={site.phoneHref} className="action-button mt-5 inline-flex w-full">
                    <Phone size={18} aria-hidden="true" />
                    {site.phone}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-3">
      <span className="text-lg font-black text-black">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="min-h-[3.75rem] rounded-lg border border-black/18 bg-white px-4 py-4 text-lg font-semibold text-black outline-none transition focus:border-yellow-400"
      />
    </label>
  );
}

function CheckboxField({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 text-base leading-7 text-black/72">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-1 h-5 w-5 rounded border border-black/25 accent-yellow-400"
      />
      <span>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
    </label>
  );
}

function VehicleSummaryCard({
  preview,
}: {
  preview: ReturnType<typeof buildValuationPreview>;
}) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-black/45">The vehicle you&apos;re selling</p>
      <div className="mt-5 rounded-lg bg-[linear-gradient(135deg,#fffdf6_0%,#fff6cf_100%)] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-black">Vehicle preview</h2>
            <p className="mt-1 text-sm leading-6 text-black/58">Indicative details based on your valuation request.</p>
          </div>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-yellow-300 text-2xl font-black">
            {preview.reg.charAt(0)}
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <PreviewRow label="Registration" value={preview.reg} />
          <PreviewRow label="Mileage" value={`${formatMileage(preview.mileage)} miles`} />
          <PreviewRow label="Estimated midpoint" value={formatCurrency(preview.midpoint)} />
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <Link
          href="/sell-my-car"
          className="inline-flex items-center justify-between rounded-lg border border-black/10 bg-[#f7f7f2] px-4 py-3 text-sm font-black text-black hover:bg-yellow-300"
        >
          Edit vehicle details
          <Pencil size={16} aria-hidden="true" />
        </Link>
        <div className="rounded-lg border border-black/10 bg-black p-4 text-white">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-yellow-300">What happens next</p>
          <div className="mt-3 grid gap-3 text-sm leading-7 text-white/78">
            <p>1. We review your details and confirm the best available offer.</p>
            <p>2. We arrange collection at a convenient time.</p>
            <p>3. You receive instant payment before the car leaves.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-black/10 bg-white px-4 py-3">
      <span className="text-sm font-bold text-black/58">{label}</span>
      <strong className="text-base font-black text-black">{value}</strong>
    </div>
  );
}

function readFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

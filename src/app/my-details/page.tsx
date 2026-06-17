import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CarFront,
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
import { VehicleIssueFields } from "@/components/vehicle-issue-fields";
import { site } from "@/lib/site";
import {
  buildValuationPreview,
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
              <div className="lg:hidden">
                <VehicleSummaryCard preview={preview} compact />
              </div>

              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-black/45">Step 2/2</p>
                    <h1 className="mt-3 text-balance text-4xl font-bold leading-[0.98] text-black sm:text-3xl">
                      Your details
                    </h1>
                    {/* <p className="mt-4 max-w-3xl text-md leading-8 text-black/68">
                      We have prepared an indicative valuation preview for <strong>{reg}</strong>. Complete your
                      contact details below and our team will arrange your final offer, collection and payment.
                    </p> */}
                  </div>
                </div>

                {/* <section className="mt-8 rounded-lg bg-[linear-gradient(135deg,#090909_0%,#191919_55%,#ffd21f_56%,#ffe46f_100%)] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
                  <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/70">
                        Indicative valuation preview
                      </p>
                      <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
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
                          <strong className="text-base font-bold text-white">{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </section> */}

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
                        <h2 className="text-2xl font-bold text-black">Vehicle</h2>
                        <p className="text-sm leading-6 text-black/62">
                          Tell us about the condition so we can line up the right offer quickly.
                        </p>
                      </div>
                    </div>

                    <VehicleIssueFields />
                  </section>

                  <section className="mt-10">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-yellow-300 text-black">
                        <ShieldCheck size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-2xl font-bold text-black">You</h2>
                        <p className="text-sm leading-6 text-black/62">
                          These details let us send your offer and arrange collection at the right time.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <Field
                        label="Full name"
                        name="fullName"
                        placeholder="Full name"
                        required
                        minLength={2}
                        pattern="[A-Za-z ,.'-]{2,}"
                        title="Please enter your full name."
                      />
                      <Field label="Email address" name="email" placeholder="name@example.com" type="email" required />
                      <Field
                        label="Postcode"
                        name="postcode"
                        placeholder="HP53JE"
                        required
                        pattern="[A-Za-z0-9 ]{5,8}"
                        title="Please enter a valid postcode."
                      />
                      <Field
                        label="Mobile number"
                        name="mobile"
                        placeholder="07864 423675"
                        type="tel"
                        required
                        pattern="[0-9+ ]{10,15}"
                        title="Please enter a valid mobile number."
                      />
                    </div>

                    <div className="mt-6">
                      <p className="mb-3 text-md font-bold text-black">Contact via</p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          { label: "Call", name: "contactByCall" },
                          { label: "WhatsApp", name: "contactByWhatsapp" },
                          { label: "Email", name: "contactByEmail" },
                        ].map((option) => (
                          <label
                            key={option.name}
                            className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f7f7f2] px-4 py-3 text-base font-bold text-black"
                          >
                            <input
                              type="checkbox"
                              name={option.name}
                              className="h-5 w-5 rounded border border-black/25 accent-yellow-400"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
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

                  <button className="action-button mt-8 flex min-h-[4.25rem] w-full text-md" type="submit">
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

                <div className="mt-5 lg:hidden">
                  <HelpCard />
                </div>
              </div>

              <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
                <VehicleSummaryCard preview={preview} />
                <HelpCard />
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
  pattern,
  title,
  minLength,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  pattern?: string;
  title?: string;
  minLength?: number;
}) {
  return (
    <label className="grid gap-3">
      <span className="text-md font-bold text-black">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        title={title}
        minLength={minLength}
        className="min-h-[3.75rem] rounded-lg border border-black/18 bg-white px-4 py-4 text-md font-semibold text-black outline-none transition focus:border-yellow-400"
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
  compact = false,
}: {
  preview: ReturnType<typeof buildValuationPreview>;
  compact?: boolean;
}) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-black/45">The vehicle you&apos;re selling</p>
      <div className="mt-5 rounded-lg bg-[linear-gradient(135deg,#fffdf6_0%,#fff6cf_100%)] p-5">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          <div className="flex min-h-[210px] items-center justify-center bg-[linear-gradient(135deg,#fffdf7_0%,#fff7d1_100%)] p-6">
            {preview.found && preview.imageSrc ? (
              <Image
                src={preview.imageSrc}
                alt={`${preview.make} ${preview.model} car preview`}
                width={660}
                height={495}
                className="h-auto w-full max-w-[280px] object-contain"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-black/28">
                <CarFront size={110} strokeWidth={1.2} aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-[0.16em]">Vehicle not found</span>
              </div>
            )}
          </div>
          <div className="grid gap-3 p-4">
            <PreviewRow label="Registration" value={preview.reg} />
            <PreviewRow label="Mileage" value={`${formatMileage(preview.mileage)} miles`} />
            {preview.found && preview.make ? <PreviewRow label="Make" value={preview.make} /> : null}
            {preview.found && preview.model ? <PreviewRow label="Model" value={preview.model} /> : null}
          </div>
        </div>
      </div>

      {compact ? null : (
        <div className="mt-5 grid gap-3">
          <Link
            href="/sell-my-car"
            className="inline-flex items-center justify-between rounded-lg border border-black/10 bg-[#f7f7f2] px-4 py-3 text-sm font-bold text-black hover:bg-yellow-300"
          >
            Edit vehicle details
            <Pencil size={16} aria-hidden="true" />
          </Link>
          <div className="rounded-lg border border-black/10 bg-black p-4 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-yellow-300">What happens next</p>
            <div className="mt-3 grid gap-3 text-sm leading-7 text-white/78">
              <p>1. We review your details and confirm the best available offer.</p>
              <p>2. We arrange collection at a convenient time.</p>
              <p>3. You receive instant payment before the car leaves.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function HelpCard() {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
      <h2 className="text-xl font-bold text-black">Need help right now?</h2>
      <p className="mt-2 text-sm leading-7 text-black/64">
        Call our team 24/7 if you would rather confirm the details over the phone.
      </p>
      <a href={site.phoneHref} className="action-button mt-5 inline-flex w-full">
        <Phone size={18} aria-hidden="true" />
        {site.phone}
      </a>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-black/10 bg-white px-4 py-3">
      <span className="text-sm font-bold text-black/58">{label}</span>
      <strong className="text-base font-bold text-black">{value}</strong>
    </div>
  );
}

function readFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

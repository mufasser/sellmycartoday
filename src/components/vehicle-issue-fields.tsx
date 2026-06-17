"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const issueOptions = [
  "It's a CAT C / S",
  "It's a CAT D / N",
  "It's a non-runner",
  "It has the engine light on",
  "It's heavily damaged cosmetically",
  "It has mechanical issues",
  "No major issues to report",
];

export function VehicleIssueFields() {
  const [hasMajorIssues, setHasMajorIssues] = useState(false);
  const [issueDetails, setIssueDetails] = useState<string[]>([]);
  const [showVehicleNotes, setShowVehicleNotes] = useState(false);
  const [showIssueOptions, setShowIssueOptions] = useState(false);

  function toggleIssue(option: string) {
    setIssueDetails((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <div>
        <p className="mb-3 text-md font-bold text-black">Any major vehicle damage or issues?</p>
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
                onChange={() => {
                  const nextHasIssues = option.value === "yes";
                  setHasMajorIssues(nextHasIssues);
                  if (!nextHasIssues) {
                    setIssueDetails([]);
                    setShowIssueOptions(false);
                  }
                }}
              />
              <span className="flex min-h-[3.75rem] items-center justify-center rounded-lg border border-black/12 bg-[#f3f3ef] px-4 py-4 text-xl font-bold text-black transition peer-checked:border-yellow-300 peer-checked:bg-yellow-300">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {hasMajorIssues ? (
        <div>
          <label className="mb-3 block text-md font-bold text-black">
            Please describe it below
          </label>
          <p className="mb-3 text-sm leading-6 text-black/55">Choose one or more options that match the vehicle.</p>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowIssueOptions((current) => !current)}
              className="flex min-h-[3.75rem] w-full items-center justify-between gap-4 rounded-lg border border-black/18 bg-white px-4 py-4 text-left text-md font-semibold text-black outline-none transition focus:border-yellow-400"
            >
              <span className="flex min-w-0 flex-1 flex-wrap gap-2">
                {issueDetails.length ? (
                  issueDetails.map((option) => (
                    <span
                      key={option}
                      className="inline-flex rounded-full bg-yellow-300/30 px-3 py-1 text-sm font-bold text-black"
                    >
                      {option}
                    </span>
                  ))
                ) : (
                  <span>Select the closest options</span>
                )}
              </span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={`shrink-0 transition ${showIssueOptions ? "rotate-180" : ""}`}
              />
            </button>

            {showIssueOptions ? (
              <div className="absolute z-10 mt-2 w-full rounded-lg border border-black/12 bg-white p-2 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <div className="grid gap-2">
                  {issueOptions.map((option) => {
                    const selected = issueDetails.includes(option);
                    return (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-start gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                          selected ? "bg-yellow-300/35 text-black" : "bg-[#f7f7f2] text-black/75"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleIssue(option)}
                          className="mt-0.5 h-4 w-4 rounded border border-black/25 accent-yellow-400"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {issueDetails.map((option) => (
              <input key={option} type="hidden" name="issueDetail[]" value={option} />
            ))}
            <input
              type="hidden"
              name="issueDetailRequired"
              value={issueDetails.length ? "selected" : ""}
              required
            />
          </div>
        </div>
      ) : null}

      <div className="lg:col-span-2">
        <label className="inline-flex items-center gap-3 text-base font-bold text-black">
          <input
            type="checkbox"
            checked={showVehicleNotes}
            onChange={(event) => setShowVehicleNotes(event.target.checked)}
            className="h-5 w-5 rounded border border-black/25 accent-yellow-400"
          />
          Add extra notes about the vehicle
        </label>

        {showVehicleNotes ? (
          <div className="mt-4">
            <label htmlFor="vehicleNotes" className="mb-3 block text-base font-bold text-black">
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
        ) : null}
      </div>
    </div>
  );
}

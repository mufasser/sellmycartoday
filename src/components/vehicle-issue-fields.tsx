"use client";

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
  const [issueDetail, setIssueDetail] = useState("");

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
                    setIssueDetail("");
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

      <div>
        <label htmlFor="issueDetail" className="mb-3 block text-md font-bold text-black">
          Please describe it below
        </label>
        <select
          id="issueDetail"
          name="issueDetail"
          value={issueDetail}
          disabled={!hasMajorIssues}
          required={hasMajorIssues}
          onChange={(event) => setIssueDetail(event.target.value)}
          className="min-h-[3.75rem] w-full rounded-lg border border-black/18 bg-white px-4 py-4 text-md font-semibold text-black outline-none transition focus:border-yellow-400 disabled:cursor-not-allowed disabled:bg-[#f3f3ef] disabled:text-black/45"
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
  );
}

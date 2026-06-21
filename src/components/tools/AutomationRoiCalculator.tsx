"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Clock3, Timer, TrendingUp } from "lucide-react";

function formatMonths(value: number): string {
  if (!Number.isFinite(value)) return "n/a";
  if (value < 1) return "<1 month";
  return `${value.toFixed(1)} months`;
}

export function AutomationRoiCalculator() {
  const [teamSize, setTeamSize] = useState(6);
  const [hoursPerPerson, setHoursPerPerson] = useState(8);
  const [requestVolume, setRequestVolume] = useState(300);
  const [automationCoverage, setAutomationCoverage] = useState(35);
  const [responseTimeHours, setResponseTimeHours] = useState(8);
  const [implementationWeeks, setImplementationWeeks] = useState(6);

  const result = useMemo(() => {
    const monthlyManualHours = teamSize * hoursPerPerson * 4.33;
    const monthlyHoursRecovered = monthlyManualHours * (automationCoverage / 100);
    const annualHoursRecovered = monthlyHoursRecovered * 12;
    const automatedRequests = requestVolume * (automationCoverage / 100);
    const firstResponseGain = Math.max(0, responseTimeHours - 0.25);
    const paybackMonths = implementationWeeks / 4.33;

    return {
      monthlyHoursRecovered,
      annualHoursRecovered,
      automatedRequests,
      firstResponseGain,
      paybackMonths,
    };
  }, [automationCoverage, hoursPerPerson, implementationWeeks, requestVolume, responseTimeHours, teamSize]);

  const controls = [
    {
      label: "Team members affected",
      value: teamSize,
      min: 1,
      max: 50,
      step: 1,
      suffix: "people",
      onChange: setTeamSize,
    },
    {
      label: "Manual hours per person weekly",
      value: hoursPerPerson,
      min: 1,
      max: 30,
      step: 1,
      suffix: "hours",
      onChange: setHoursPerPerson,
    },
    {
      label: "Monthly requests or operations",
      value: requestVolume,
      min: 20,
      max: 3000,
      step: 20,
      suffix: "items",
      onChange: setRequestVolume,
    },
    {
      label: "Expected automation coverage",
      value: automationCoverage,
      min: 10,
      max: 80,
      step: 5,
      suffix: "%",
      onChange: setAutomationCoverage,
    },
    {
      label: "Current first-response time",
      value: responseTimeHours,
      min: 1,
      max: 72,
      step: 1,
      suffix: "hours",
      onChange: setResponseTimeHours,
    },
    {
      label: "Expected implementation window",
      value: implementationWeeks,
      min: 2,
      max: 16,
      step: 1,
      suffix: "weeks",
      onChange: setImplementationWeeks,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-lg border border-white/10 bg-zinc-950 p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <Calculator className="h-5 w-5 text-teal-300" />
          <h2 className="font-display text-2xl font-bold text-white">Calculator inputs</h2>
        </div>

        <div className="space-y-5">
          {controls.map((control) => (
            <label key={control.label} className="block">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-zinc-300">{control.label}</span>
                <span className="shrink-0 rounded-lg bg-white/[0.05] px-3 py-1 text-sm font-semibold text-white">
                  {control.value.toLocaleString()}
                  {control.suffix ? ` ${control.suffix}` : ""}
                </span>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={control.value}
                onChange={(event) => control.onChange(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-teal-300"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-teal-200" />
          <h2 className="font-display text-2xl font-bold text-white">Estimated impact</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-black/25 p-4">
            <Clock3 className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Monthly hours recovered</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {Math.round(result.monthlyHoursRecovered).toLocaleString()} h
            </p>
          </div>
          <div className="rounded-lg bg-black/25 p-4">
            <TrendingUp className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Annual hours recovered</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {Math.round(result.annualHoursRecovered).toLocaleString()} h
            </p>
          </div>
          <div className="rounded-lg bg-black/25 p-4">
            <Timer className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Planning horizon</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {formatMonths(result.paybackMonths)}
            </p>
          </div>
          <div className="rounded-lg bg-black/25 p-4">
            <Calculator className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Automated requests</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {Math.round(result.automatedRequests).toLocaleString()}/mo
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
          <p>
            Estimated first-response gain: {result.firstResponseGain.toFixed(1)} hours per request.
            This helps size the automation opportunity without publishing commercial terms.
          </p>
          <p className="mt-2 text-zinc-400">
            A real implementation plan should include data quality, integrations,
            approvals, fallback paths, and reporting needs.
          </p>
        </div>

        <Link
          href="/quiz"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200"
        >
          Get a detailed AI audit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

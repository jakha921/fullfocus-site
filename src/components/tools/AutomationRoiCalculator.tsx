"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, DollarSign, Timer, TrendingUp } from "lucide-react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonths(value: number): string {
  if (!Number.isFinite(value)) return "n/a";
  if (value < 1) return "<1 month";
  return `${value.toFixed(1)} months`;
}

export function AutomationRoiCalculator() {
  const [teamSize, setTeamSize] = useState(6);
  const [hoursPerPerson, setHoursPerPerson] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(12);
  const [monthlyRevenueLeak, setMonthlyRevenueLeak] = useState(3000);
  const [recoveryRate, setRecoveryRate] = useState(20);
  const [implementationCost, setImplementationCost] = useState(5000);

  const result = useMemo(() => {
    const monthlyLaborSavings = teamSize * hoursPerPerson * 4.33 * hourlyCost;
    const monthlyRecoveredRevenue = monthlyRevenueLeak * (recoveryRate / 100);
    const monthlyImpact = monthlyLaborSavings + monthlyRecoveredRevenue;
    const annualImpact = monthlyImpact * 12;
    const paybackMonths = implementationCost / monthlyImpact;
    const firstYearRoi =
      implementationCost > 0
        ? ((annualImpact - implementationCost) / implementationCost) * 100
        : 0;

    return {
      monthlyLaborSavings,
      monthlyRecoveredRevenue,
      monthlyImpact,
      annualImpact,
      paybackMonths,
      firstYearRoi,
    };
  }, [
    hourlyCost,
    hoursPerPerson,
    implementationCost,
    monthlyRevenueLeak,
    recoveryRate,
    teamSize,
  ]);

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
      label: "Average loaded hourly cost",
      value: hourlyCost,
      min: 3,
      max: 80,
      step: 1,
      prefix: "$",
      suffix: "/hour",
      onChange: setHourlyCost,
    },
    {
      label: "Monthly revenue lost to slow follow-up",
      value: monthlyRevenueLeak,
      min: 0,
      max: 50000,
      step: 500,
      prefix: "$",
      suffix: "/month",
      onChange: setMonthlyRevenueLeak,
    },
    {
      label: "Expected revenue recovery",
      value: recoveryRate,
      min: 0,
      max: 70,
      step: 5,
      suffix: "%",
      onChange: setRecoveryRate,
    },
    {
      label: "Estimated automation build cost",
      value: implementationCost,
      min: 1000,
      max: 50000,
      step: 500,
      prefix: "$",
      onChange: setImplementationCost,
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
                  {control.prefix || ""}
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
            <DollarSign className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Monthly impact</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {formatCurrency(result.monthlyImpact)}
            </p>
          </div>
          <div className="rounded-lg bg-black/25 p-4">
            <TrendingUp className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Annual impact</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {formatCurrency(result.annualImpact)}
            </p>
          </div>
          <div className="rounded-lg bg-black/25 p-4">
            <Timer className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">Payback period</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {formatMonths(result.paybackMonths)}
            </p>
          </div>
          <div className="rounded-lg bg-black/25 p-4">
            <Calculator className="mb-3 h-5 w-5 text-teal-300" />
            <p className="text-sm text-zinc-400">First-year ROI</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {Math.round(result.firstYearRoi).toLocaleString()}%
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
          <p>
            Labor savings: {formatCurrency(result.monthlyLaborSavings)}/month.
            Revenue recovery: {formatCurrency(result.monthlyRecoveredRevenue)}/month.
          </p>
          <p className="mt-2 text-zinc-400">
            This is a directional model. A real implementation estimate should include
            data quality, integrations, approvals, fallback paths, and reporting needs.
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

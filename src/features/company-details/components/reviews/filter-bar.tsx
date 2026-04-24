"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import type { ReviewFilterState } from "../../lib/filter-state";

type FilterBarProps = {
  state: ReviewFilterState;
  serviceTypes: string[];
  states: string[];
  ratings: number[];
  onSearchChange: (value: string) => void;
  onServiceTypesChange: (values: string[]) => void;
  onStatesChange: (values: string[]) => void;
  onRatingsChange: (values: number[]) => void;
  onReset: () => void;
};

export function FilterBar({
  state,
  serviceTypes,
  states,
  ratings,
  onSearchChange,
  onServiceTypesChange,
  onStatesChange,
  onRatingsChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-100 p-3">
      <label className="relative">
        <span className="sr-only">Search reviews</span>
        <Input
          value={state.search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by reviewer, headline, vehicle"
          className="pr-9"
        />
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
      </label>

      <div className="flex flex-wrap gap-2">
        <Dropdown
          label="Service"
          options={serviceTypes.map((value) => ({ label: value, value }))}
          selectedValues={state.serviceTypes}
          onChange={onServiceTypesChange}
        />
        <Dropdown
          label="State"
          options={states.map((value) => ({ label: value, value }))}
          selectedValues={state.states}
          onChange={onStatesChange}
        />
        <Dropdown
          label="Rating"
          options={ratings.map((value) => ({ label: `${value} stars`, value: String(value) }))}
          selectedValues={state.ratings.map(String)}
          onChange={(values) => onRatingsChange(values.map(Number))}
        />
        <Button variant="ghost" className="h-11 border border-neutral-200" onClick={onReset}>
          <X className="size-4" aria-hidden />
          Reset
        </Button>
      </div>
    </div>
  );
}

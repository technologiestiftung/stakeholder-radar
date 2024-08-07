import { branches } from "../data/branches";
import { ranges } from "../data/ranges";

export const amountOfBranches = branches.length;
export const anglePerSlicePercentage = 1 / amountOfBranches;

export const amountOfRanges = ranges.length;
export const smallestRangePercentage = 0.32;
export const rangePercentageIncrement =
	(1 - smallestRangePercentage) / (amountOfRanges - 1);

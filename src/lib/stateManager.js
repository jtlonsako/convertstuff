import { writable } from 'svelte/store'
import { ImperialUnits, MetricUnits, Multipliers } from './enums.js'

export const convertFromImperial = writable(true)

export const conversionMultiplier = writable(Multipliers.ounceToGram)

export const unitToConvert = writable('oz')

export const convertedUnit = writable('g')
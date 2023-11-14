<script>
    import { convertFromImperial, conversionMultiplier, unitToConvert, convertedUnit } from "$lib/stateManager"
    import { ImperialUnits, MetricUnits, Multipliers } from "../enums.js";

    let dropdownOpen = false
    $unitToConvert = ImperialUnits.ounces
    $convertedUnit = MetricUnits.grams
    $conversionMultiplier = Multipliers.ounceToGram

    let originalUnitValue = 0
    $: convertedUnitValue = (originalUnitValue * $conversionMultiplier).toFixed(2)

    const setUnit = (unitType) => {
      $unitToConvert = unitType
      $convertedUnit = convertTo($unitToConvert)
    }

    function convertTo(unitToConvert) {
      switch(unitToConvert) {
        case ImperialUnits.ounces:
          $conversionMultiplier = Multipliers.ounceToGram
          return MetricUnits.grams
          break
        case ImperialUnits.pounds:
          $conversionMultiplier = Multipliers.poundToKilogram
          return MetricUnits.kilograms
          break
        case ImperialUnits.feet:
          $conversionMultiplier = Multipliers.footToMeter
          return MetricUnits.meters
          break
        case MetricUnits.grams:
          $conversionMultiplier = Multipliers.gramToOunce
          return ImperialUnits.ounces
          break
        case MetricUnits.kilograms:
          $conversionMultiplier = Multipliers.kilogramToPound
          return ImperialUnits.pounds
          break
        case MetricUnits.meters:
          $conversionMultiplier = Multipliers.meterToFoot
          return ImperialUnits.feet
          break
      }

      //If none of these switch cases are true (pretty impossible aside from hacking ngl), return empty string
      return ''
    }
</script>

<div class="h-5/6 w-full rounded-b-xl">
    <!--Unit button-->
    <div class="relative inline-block text-left ml-3 mt-3">
        <div class="font-sans">
          <button type="button" class="inline-flex text-lg w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-4 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50" 
          on:click={() => dropdownOpen = !dropdownOpen} on:focusout={() => dropdownOpen = false} id="menu-button" aria-expanded="true" aria-haspopup="true">
            Unit
            <svg class="mr-1 h-5 w-5 text-center text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      
        {#if dropdownOpen}
            <!--
            Dropdown menu, show/hide based on menu state.
        
            Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1 font-sans" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    {#if $convertFromImperial}
                      <button on:click={() => setUnit(ImperialUnits.ounces)} class="w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Ounce</button>
                      <button on:click={() => setUnit(ImperialUnits.pounds)} class="w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Pound</button>
                      <button on:click={() => setUnit(ImperialUnits.feet)} class="w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Feet</button>

                    {:else}
                      <button on:click={() => setUnit(MetricUnits.grams)} class="w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Gram</button>
                      <button on:click={() => setUnit(MetricUnits.kilograms)} class="w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Kilogram</button>
                      <button on:click={() => setUnit(MetricUnits.meters)} class="w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Meter</button>
                    {/if}
                </div>
            </div>
        {/if}
      </div>
      
      <!-- Inputs section -->
      <div id="Inputs" class="grid grid-cols-1 md:grid-cols-2 h-4/6 font-sans text-lg items-center justify-items-center">
        <div class="">
            <label for="originalValue" class="sm:px-2">{$unitToConvert}</label>
            <input id="originalValue" type="text" bind:value={originalUnitValue} class="w-32 lg:w-56 rounded-md bg-slate-200"/>
        </div>

        <div>
            <label for="convertedValue" class="sm:px-2">{$convertedUnit}</label>
            <input id="convertedValue" type="text" bind:value={convertedUnitValue} disabled placeholder="resulting value" class="w-32 lg:w-56 rounded-md bg-slate-200"/>
        </div>
      </div>
</div>
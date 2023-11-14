<script>
import { convertFromImperial, conversionMultiplier, unitToConvert, convertedUnit } from '$lib/stateManager'
import { Multipliers } from '$lib/enums';
</script>


<div class="grid grid-cols-2 h-1/6 border border-0 font-sans font-bold text-xl text-center rounded-t-xl bg-slate-100">
    <div class="hover:bg-slate-500 rounded-tl-xl">
        <button id="imperial" class="h-full w-full rounded-tl-xl {$convertFromImperial ? 'bg-slate-800 text-yellow-100' : ''} justify-center" on:click={() => {
            $convertFromImperial = true; 
            $conversionMultiplier = Multipliers.ounceToGram;
            $unitToConvert = 'oz';
            $convertedUnit = 'g';
            }}>Imperial -> Metric</button>
    </div>
    <div class="hover:bg-slate-500 rounded-tr-xl">
        <button id="metric" class="h-full w-full rounded-tr-xl {!$convertFromImperial ? 'bg-slate-800 text-yellow-100' : ''} justify-center" on:click={() => {
            $convertFromImperial = false;
            $conversionMultiplier = Multipliers.gramToOunce;
            $unitToConvert = 'g';
            $convertedUnit = 'oz';
            }}>Metric -> Imperial</button>
    </div>
</div>



<style>

</style>
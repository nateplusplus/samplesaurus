<template lang="html">
	<div class="h-full flex justify-between items-center px-6 md:px-12">
		<button id="mini-palette" class="flex border border-grey-dark hover:opacity-75" @click="$emit('toggle-palette')" :class="{ 'opacity-25' : showPalette }">
			<div v-for="swatch in palette" class="swatch flex-1" :style="{ backgroundColor : swatch.hex }"></div>
		</button>
		<button type="button" name="button" class="px-2" @click="$emit('toggle-dropdowns')">
			<i class="far fa-circle fa-fw text-blue-dark hover:text-blue-light"></i>
		</button>
	</div>
</template>

<script>
export default {
	name : 'Menu',
	props : {
		palette : {
			type : Array,
			required : true
		},
		showPalette : {
			type : Boolean,
			required : true
		}
	}
}
</script>

<style lang="css">
</style>

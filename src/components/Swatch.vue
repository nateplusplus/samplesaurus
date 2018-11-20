<template>
	<div class="ui-state-default">
		<div>
			<div class="swatch" :style="{ backgroundColor: swatch.hex }" :class="[ (invertLabel(swatch.hex)) ? 'text-white' : 'text-black' ]">
				<div class="text-center futura swatch-label">
					{{ swatch.label }}
				</div>
			</div>
			<div class="text-center">
				<input @click="$emit('open-modal')" :id="'hex-'+swatch.key" class="colorwell border border-t-0 border-l-0 border-r-0 text-center w-full p-2" type="text" v-model="swatch.hex" value="">
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Swatch',
	props: {
		swatch : {
			type: Object,
			required: true
		}
	},
	methods : {
		invertLabel : function(color) {
			// if only first half of color is defined, repeat it
			if(color.length < 5) {
				color += color.slice(1);
			}
			return ((color.replace('#','0x')) < (0xffffff/2));
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

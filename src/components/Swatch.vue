<template>
	<div class="relative">
		<ColorPickerModal :swatchKey="swatch.key" :activeModal="activeModal" @closeModal="$emit('closeSwatchModal')" v-model="swatch.hex"></ColorPickerModal>
		<div class="z-100 relative">
			<div class="swatch" :style="{ backgroundColor : swatch.hex }" :class="[ (invertLabel(swatch.hex)) ? 'text-white' : 'text-black' ]">
				<div class="text-center futura swatch-label">
					{{ swatch.label }}
				</div>
				<div class="absolute flex justify-between items-center w-full pl-2 pr-1" style="bottom: 0; right:0;">
					<div>Hex</div>
					<div>
						<input @click="$emit('openSwatchModal')" :id="'hex-'+swatch.key" class="text-right p-2 bg-transparent" type="text" v-model="swatch.hex" value="">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import ColorPickerModal from '@/components/ColorPickerModal.vue';

export default {
	name : 'Swatch',
	components : {
		ColorPickerModal
	},
	props : {
		swatch : {
			type : Object,
			required : true
		},
		activeModal : {
			type : Number,
			required : true
		}
	},
	methods : {
		invertLabel : function(color) {
			// if only first half of color is defined, repeat it
			if (color.length < 5) {
				color += color.slice(1);
			}
			return ((color.replace('#', '0x')) < (0xffffff / 2));
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swatch input {
	width: 5em;
}
</style>

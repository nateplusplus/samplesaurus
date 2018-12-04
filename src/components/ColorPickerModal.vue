<template>
	<Transition name="slide-open-right">
		<div v-show="isActive"
				class="color-picker-tooltip absolute shadow-md rounded-full" role="modal">
			<div class="p-2 text-right">
				<div class="inline-block">
						<ColorSliders :model="hsl" @change="setModalColor" />
				</div>
			</div>
		</div>
	</Transition>

</template>
<script>

// import ColorPicker from 'vue-color-picker-wheel';
import ColorSliders from '@/components/colorsliders';
var convert = require('color-convert');

export default {
	name : 'ColorPickerModal',
	components : {
		ColorSliders
	},
	props : {
		activeModal : {
			type : Number,
			required : true
		},
		swatchKey : {
			type : Number,
			required : true
		},
		color : {
			type : String,
			required : false
		}
	},
	model : {
		prop : 'color',
		event : 'colorchange'
	},
	computed : {
		isActive : function() {
			// Only open the current swatch's modal
			return (this.activeModal === this.swatchKey);
		},
		hsl : function() {

			var hsl = convert.hex.hsl(this.color);

			return {
				h : hsl[0],
				s : hsl[1],
				l : hsl[2]
			};
		}
	},
	methods : {
		setModalColor : function(event) {

			// Convert hsl to hex
			var hex = '#' + convert.hsl.hex(event.h, event.s, event.l);

			// Set color
			this.$emit('colorchange', hex);
		}
	}
};
</script>

<style scoped>
	.color-picker-tooltip {
		top: 0;
		left: 0;
		width: 230%;
		background-color: rgba(100,100,110,0.7);
		margin-top: 6%;
	}

	@media screen and (min-width: 576px) {
		.color-picker-tooltip {
			width: 185%;
			margin-top: 22%;
		}
	}
</style>

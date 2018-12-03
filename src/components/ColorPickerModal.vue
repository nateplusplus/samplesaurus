<template>

	<div v-show="isActive"
			class="color-picker-tooltip absolute shadow-md rounded-full" role="modal">
		<div class="p-2 text-right">
			<div class="inline-block">
				<color-picker v-model="modalColor" :width="100" :height="100"></color-picker>
			</div>
		</div>
	</div>

</template>
<script>

import ColorPicker from 'vue-color-picker-wheel';

export default {
	name : 'ColorPickerModal',
	components : {
		ColorPicker
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
		modalColor : {
			get : function() {
				return this.color;
			},
			set : function(value) {
				this.$emit('colorchange', value);
			}
		}
	}
};
</script>

<style>
	.color-picker-tooltip {
		top: 0;
		left: 0;
		width: 200%;
		background-color: rgba(100,100,100,0.8);
	}
</style>

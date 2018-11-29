<template>

	<div 
	v-show="isActive"
	class="color-picker-tooltip absolute bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest shadow-md z-10" role="modal">
		<div>
			<div @click="$emit('closeModal')" class="text-right p-2">
				<i class="fas fa-times fa-fw cursor-pointer"></i>
			</div>
			<div class="tooltip-body p-6">
				<div class="mb-8">
					<color-picker v-model="modalColor"></color-picker>
				</div>
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
		height: auto;
		min-height: 200%;
		min-width:220px;
	}
</style>

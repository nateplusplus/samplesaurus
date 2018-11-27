<template>
	<div v-show="isActive" class="modal fixed absolute z-50 h-screen w-full flex flex-col items-center justify-center font-sans">
		<div @click.self="$emit('closeModal')" class="h-screen w-full absolute flex items-center justify-center bg-modal">
			<div class="bg-white rounded shadow shadow-lg p-2 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
				<div @click="$emit('closeModal')" class="text-right">
					<i class="fas fa-times fa-fw"></i>
				</div>
				<div class="modal-body p-8">
					<div class="mb-8">
						<color-picker v-model="modalColor"></color-picker>
					</div>
					<div class="flex justify-center">
						<button @click="$emit('closeModal')" class="flex-no-shrink text-white py-2 px-4 rounded bg-teal hover:bg-teal-dark">Done</button>
					</div>
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
}
</script>
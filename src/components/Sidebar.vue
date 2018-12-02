<template lang="html">
	<div class="">
		<div
			v-for="swatch in palette" 
			:key="swatch.key">
			<swatch :swatch="swatch" :activeModal="activeModal" @openSwatchModal="activeModal = swatch.key" @closeSwatchModal="closeModals(swatch.key)"></swatch>
		</div>
	</div>
</template>

<script>
import Swatch from '@/components/Swatch.vue';

export default {
	name : 'Sidebar',
	components : {
		Swatch
	},
	props : {
		palette : {
			type : Array,
			required : true
		},
		settings : {
			type : Array,
			required : true
		}
	},
	data() {
		return {
			showDropdowns : false,
			showPalette : true,
			sidebarFocused : false,
			windowWidth : window.innerWidth,
			activeModal : 0
		};
	},
	methods : {
		closeModals : function(swatchKey) {
			if (swatchKey === this.activeModal) {
				this.activeModal = 0;
			}
		}
	}
}
</script>

<style lang="css">
</style>

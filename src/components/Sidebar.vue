<template lang="html">
	<div class="">
		<div
			v-for="swatch in palette" 
			:key="'miniswatch-'+swatch.key">
			<swatch :swatch="swatch" :activeModal="activeModal" @openSwatchModal="toggleModal(swatch.key)" @closeSwatchModal="closeModals(swatch.key)"></swatch>
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
			showPalette : true,
			sidebarFocused : false,
			windowWidth : window.innerWidth,
			activeModal : 0
		};
	},
	methods : {
		toggleModal : function(swatchKey) {
			if (swatchKey === this.activeModal) {
				this.activeModal = 0;
			}
			else {
				this.activeModal = swatchKey;
			}
		},
		closeModals : function(swatchKey) {
			if (swatchKey === this.activeModal) {
				this.activeModal = 0;
			}
		}
	}
};
</script>

<style>
#topnav button:active,
#topnav button:focus {
	outline: none;
}
</style>

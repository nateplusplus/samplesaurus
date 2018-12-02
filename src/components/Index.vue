<template>
	<div class="w-full h-full flex flex-col bg-white">
		<div style="height:70px;">
			<Menu></Menu>
		</div>
		<div class="flex flex-row flex-1">
			<div class="w-1/4 bg-grey py-8">
				<Sidebar :palette="palette" :settings="settings"></Sidebar>
			</div>
			<div class="flex-1">
				<Sample :palette="palette" :settings="settings"></Sample>
			</div>
		</div>
	</div>
</template>


<script>
import Data from '@/Data.js';
import Menu from '@/components/Menu.vue';
import Sidebar from '@/components/Sidebar.vue';
import Sample from '@/components/Sample.vue';

export default {
	name : 'Index',
	components : {
		Menu,
		Sidebar,
		Sample
	},
	data() {
		return {
			palette : Data.palette_data,
			settings : Data.settings_data,
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
	},
	computed : {
		showSidebarResize : function() {
			return (this.windowWidth < 992 || !this.showPalette || this.sidebarFocused);
		}
	},
	mounted : function() {
		this.$nextTick(() => {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth;
			});
		});
	}
};
</script>





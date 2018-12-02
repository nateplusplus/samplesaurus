<template>
	<div class="w-full h-full flex flex-col" v-bind:style="getStyle('bg_page')">
		<div class="py-4">
			<Menu :palette="palette" :showPalette="showPalette" @toggle-palette="showPalette = !showPalette" @toggle-dropdowns="showDropdowns = !showDropdowns"></Menu>
		</div>
		<div class="flex flex-row flex-1 overflow-x-hidden sm:overflow-x-auto">
			<div class="flex-no-shrink w-32 sm:w-48 relative" v-show="showPalette">
				<Sidebar :palette="palette" :settings="settings" class="shadow-md"></Sidebar>
			</div>
			<div class="flex-1">
				<Sample :palette="palette" :settings="settings" :showDropdowns="showDropdowns"></Sample>
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
			showPalette : false,
			sidebarFocused : false,
			windowWidth : window.innerWidth,
			activeModal : 0
		};
	},
	methods : {
		getStyle : function(el) {
			// Get the hex for this element based on user's selection
			var classname = this.findSettingByName(el);
			if (typeof classname == 'object') {
				classname = classname[0].value;
			}
			else {
				return {};
			}

			var palette = this.findPaletteByClassname(classname)[0];
			var style = (el !== 'bg_page' && el !== 'bg_button') ? { color : palette.hex } : { backgroundColor : palette.hex };

			return style;
		},
		findPaletteByClassname : function(classname) {
			return this.palette.filter(function(data) {
				return data.classname == classname;
			});
		},
		findSettingByName : function(name) {
			return this.settings.filter(function(data) {
				return data.name == name;
			});
		},
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





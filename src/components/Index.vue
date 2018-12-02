<template>
	<div class="w-100 h-100 flex flex-col">
		<div style="outline: red dashed thin; height:70px;" class="flex w-100 p-2">
			test test
		</div>
		<div style="outline: red dashed thin;" class="flex flex-col w-100 flex-1">
			<div class="w-1/4 h-100 bg-blue">
			</div>
			<div class="h-100 bg-green flex-1">
			</div>
		</div>
	</div>
</template>


<script>
import Data from '@/Data.js';
import Swatch from '@/components/Swatch.vue';
import CircleDropdown from '@/components/CircleDropdown.vue';

export default {
	name : 'Index',
	components : {
		Swatch,
		CircleDropdown
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
		paletteOptions : function() {
			var options = [];
			for (var i = 0; i < this.palette.length; i++) {
				options.push({
					label : this.palette[i].label,
					value : this.palette[i].classname,
					data : this.palette[i]
				});
			}
			return options;
		},
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





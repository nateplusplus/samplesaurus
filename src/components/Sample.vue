<template lang="html">
	<div id="sample_page" class="flex flex-row w-full pb-12 pt-8 mx-auto lg:h-full" v-bind:style="getStyle('bg_page')">
		<div class="w-full flex-initial mb-12">
			<div class="px-12">
				<div v-if="showDropdowns" class="text-center w-full">
					<CircleDropdown :model="findSettingByName('bg_page')[0]" :options="paletteOptions"></CircleDropdown>
				</div>
				<header class="mb-4" v-bind:style="getStyle('font_h')">
					<h1>Sample Heading <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_h')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown></h1>
					<h2>Sample Subheading</h2>
				</header>

				<article class="my-4" v-bind:style="getStyle('font_p')">
					<p class="my-4">
						<div class="float-right">
							<CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_p')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <a v-bind:style="getStyle('font_a')" href="#">incididunt</a> <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_a')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <a v-bind:style="getStyle('font_a')" href="#"> cillum dolore eu fugiat</a> nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<ul class="my-4" v-bind:style="getStyle('font_li')">
						<li>List item 1 <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_li')[0]" :options="paletteOptions"></CircleDropdown></li>
						<li>List item 2</li>
						<li>List item 3</li>
						<li>List item 4</li>
					</ul>
					<p class="my-4">
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
					<p class="my-4">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</article>
				<h3 class="mt-12" v-bind:style="getStyle('font_h')">Here's a form!</h3>
				<form class="flex flex-col">
					<fieldset class="py-2">
						<input class="text-lg block px-3 py-2 my-4 border w-full md:w-1/2" type="text" placeholder="Text Input">
						<input class="text-lg block px-3 py-2 my-4 border md:w-24" type="number" placeholder="123">
						<select class="text-lg block px-3 py-2 my-4 border w-1/2 md:w-1/4">
							<option value="1">Option 1</option>
							<option value="2">Option 2</option>
							<option value="3">Option 3</option>
						</select>
					</fieldset>
					<fieldset class="py-2 w-full">
						<button v-bind:style="[getStyle('bg_button'), getStyle('font_button')]" class="font-bold text-lg display-block px-3 py-2 my-4 border w-full sm:w-1/3 lg:w-32">Button</button> <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_button')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown> <CircleDropdown v-if="showDropdowns" :model="findSettingByName('bg_button')[0]" :options="paletteOptions" :settings="{ axis: 'x' }"></CircleDropdown>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import CircleDropdown from '@/components/CircleDropdown.vue';

export default {
	name : 'Sample',
	components : {
		CircleDropdown
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
		}
	}
}
</script>

<style lang="css">
</style>

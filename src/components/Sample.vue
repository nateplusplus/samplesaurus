<template lang="html">
	<div id="sample_page" class="flex flex-row overflow-x-hidden sm:overflow-x-auto w-full pb-12 pt-8 mx-auto lg:h-full">
		<div class="w-screen sm:w-full flex-initial mb-12">
			<div class="px-6 md:px-12">
				<div v-if="showDropdowns" class="text-center w-full">
					<CircleDropdown :model="findSettingByName('bg_page')[0]" :options="paletteOptions"></CircleDropdown>
				</div>
				<header class="mb-4" v-bind:style="getStyle('font_h')">
					<h1>Welcome to Samplesaurus! <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_h')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown></h1>
					<h2>Quickly sample color palettes on a UI template.</h2>
				</header>

				<article class="my-4" v-bind:style="getStyle('font_p')">
					<p class="my-4">
						<div class="float-right">
							<CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_p')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown>
						</div>
						As a developer who's quickly prototyping designs, sometimes it's hard to imagine how a color scheme might work on an actual page. I might find some colors that look great together, but which one works best as a background? Which one is best as a text color? Will they conflict once they're actually put to use? This site was developed as a fun tool to sample color palettes on a web interface. Choose the colors you're interested in, and then <a v-bind:style="getStyle('font_a')" href="#">assign</a> <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_a')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></CircleDropdown> those colors to various parts of this page.
					</p>
					<p class="my-4">
						<strong>My goal is to make it as easy as possible for you.</strong>
					</p>
					<ol class="my-4" v-bind:style="getStyle('font_li')">
						<li>Click the small color palette in the upper left to choose your color scheme <CircleDropdown v-if="showDropdowns" :model="findSettingByName('font_li')[0]" :options="paletteOptions"></CircleDropdown></li>
						<li>As colors are changed, this template will immediately update</li>
						<li>Click the small circle in the upper right to show dropdowns throughout this page</li>
						<li>Use those dropdowns to re-assign each color to specific UI elements</li>
					</ol>
					<p class="my-4">
						I hope this site is useful to you. I'm developing it completely open source, and you can feel free to check it out on <a href="https://github.com/nateplusplus/samplesaurus" target="_blank" v-bind:style="getStyle('font_a')">Github</a>! This was started as an exercise in Vue.js and I hope to continue building on it further. If you have any feedback, questions, comments, feel free to submit an issue on the repository. You can also send me an email through my personal website: <a href="http://www.natehub.net" target="_blank" v-bind:style="getStyle('font_a')">natehub.net</a>.
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
		},
		showDropdowns : {
			type : Boolean,
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

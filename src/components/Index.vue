<template>
	<div>
		<div id="site-wrapper" class="mx-auto flex flex-col lg:flex-row content-start justify-start h-full bg-grey">
			<div id="sidebar-controls" @mouseover="sidebarFocused=true" @mouseleave="sidebarFocused=false" class="relative flex-none" :class="[ (showPalette) ? 'lg:w-1/4' : w-4 ]" style="min-height: 1rem;">
				<div class="lg:p-6 w-full border border-t-0 border-b-0 border-l-0 border-r-4 h-full lg:absolute bg-grey z-10" v-show="showPalette" >
					<div id="branding" class="mx-auto max-w-200 flex flex-row items-center justify-center pt-4">
						<img src="../assets/images/samplesaurus_logo.png" alt="Samplesaurus-Rex Logo" class="pr-4">
						<h1 class="text-center ccmonstermash">Samplesaurus!</h1>
					</div>
					<p id="site-desc" class="p-8 mx-auto text-center">
						Quickly sample a color palette on a UI template to see how colors interact.<br>
					</p>
					<div id="palette-container">
						<h2 class="mt-4 text-center">Your Color Palette</h2>
						<p class="p-2 mx-auto text-center">
							Define your color palette by entering hex values below.
						</p>
						<div id="palette" class="flex flex-row content-center justify-center pt-4 pb-8">
							<div
								v-for="swatch in palette" 
								:key="swatch.key">
								<swatch :swatch="swatch" :activeModal="activeModal" @openSwatchModal="activeModal = swatch.key" @closeSwatchModal="closeModals(swatch.key)"></swatch>
							</div>
						</div>
					</div>
				</div>
				<transition name='slide-fade-right'>
					<button v-show="showSidebarResize" title="Shrink Sidebar" @click.prevent="showPalette=!showPalette" class="text-center text-grey-darkest absolute inline-block no-underline sidebar-arrow z-0 rounded-b-full lg:rounded-b-none lg:rounded-r-full px-4 lg:px-0 py-4 bg-grey">
						<i class="fa fa-2x fa-fw hidden lg:inline-block" :class="[ showPalette ? 'fa-caret-left' : 'fa-caret-right' ]"></i>
						<i class="fa fa-2x fa-fw lg:hidden" :class="[ showPalette ? 'fa-caret-up' : 'fa-caret-down' ]"></i>
					</button>
				</transition>
			</div>
			<div>
				<div id="sample_page" class="flex flex-row w-full pb-12 mx-auto lg:h-full" v-bind:style="getStyle('bg_page')">
					<div class="w-full flex-initial mb-12">
						<div class="w-full flex flex-row items-center justify-between h-12 bg-transparent mb-12 p-4">
							<div class="w-1/2">
							</div>
							<button title="Toggle controls within layout" class="float-right no-underline text-grey-darker" @click.prevent="showDropdowns=!showDropdowns">
								<i class="far fa-fw" :class="[ (showDropdowns) ? 'fa-eye' : 'fa-eye-slash' ]"></i>
							</button>
						</div>
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
			</div>
		</div>
		<footer class="py-8 w-full text-center text-white text-xs">
			Copyright ©2018 Nathan Blair
		</footer>
	</div>
</template>


<script>
import Data from '@/Data.js'
import Swatch from '@/components/Swatch.vue'
import CircleDropdown from '@/components/CircleDropdown.vue'

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
		}
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
				this.windowWidth = window.innerWidth
			});
		});
	}
}
</script>





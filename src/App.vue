<template>
	<div id="app" class="w-full p-0 min-h-full flex flex-col">
		<div v-show="showModal" class="modal fixed absolute z-50 h-screen w-full flex flex-col items-center justify-center font-sans">
			<div @click.self="showModal=!showModal" class="h-screen w-full absolute flex items-center justify-center bg-modal">
				<div class="bg-white rounded shadow shadow-lg p-2 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
					<div @click="showModal=!showModal" class="text-right">
						<i class="fas fa-times fa-fw"></i>
					</div>
					<div class="modal-body p-8">
						<div class="mb-8">
							<div id="colorpicker"></div>
						</div>
						<div class="flex justify-center">
							<button @click="showModal=!showModal" class="flex-no-shrink text-white py-2 px-4 rounded bg-teal hover:bg-teal-dark">Done</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="site-wrapper" class="mx-auto flex flex-col lg:flex-row content-start justify-start h-full bg-grey">
			<div id="sidebar-controls" @mouseover="sidebarFocused=true" @mouseleave="sidebarFocused=false" class="relative flex-none" :class="[ (showPalette) ? 'lg:w-1/4' : w-4 ]" style="min-height: 1rem;">
				<div class="lg:p-6 w-full border border-t-0 border-b-0 border-l-0 border-r-4 h-full lg:absolute bg-grey z-10" v-show="showPalette" >
					<div id="branding" class="mx-auto max-w-200 flex flex-row items-center justify-center pt-4">
						<img src="images/samplesaurus_logo.png" alt="Samplesaurus-Rex Logo" class="pr-4">
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
								<swatch @open-modal="showModal=true" :swatch="swatch"></swatch>
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
								<!-- <transition name="fade">
									<button id="mini-palette" title="Expand palette" @click.prevent="showPalette = true" v-show="!showPalette" class="flex flex-row content-center justify-center p-4">
										<div
											v-for="swatch in palette" 
											:key="swatch.key">
											<div class="mini-swatch " :style="{ backgroundColor: swatch.hex }"></div>
										</div>
									</button>
								</transition> -->
							</div>
							<button title="Toggle controls within layout" class="float-right no-underline text-grey-darker" @click.prevent="showDropdowns=!showDropdowns">
								<i class="far fa-fw" :class="[ (showDropdowns) ? 'fa-eye' : 'fa-eye-slash' ]"></i>
							</button>
						</div>
						<div class="px-12">
							<div v-if="showDropdowns" class="text-center w-full">
								<circledropdown :model="findSettingByName('bg_page')[0]" :options="paletteOptions"></circledropdown>
							</div>
							<header class="mb-4" v-bind:style="getStyle('font_h')">
								<h1>Sample Heading <circledropdown v-if="showDropdowns" :model="findSettingByName('font_h')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></circledropdown></h1>
								<h2>Sample Subheading</h2>
							</header>

							<article class="my-4" v-bind:style="getStyle('font_p')">
								<p class="my-4">
									<div class="float-right">
										<circledropdown v-if="showDropdowns" :model="findSettingByName('font_p')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></circledropdown>
									</div>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <a v-bind:style="getStyle('font_a')" href="#">incididunt</a> <circledropdown v-if="showDropdowns" :model="findSettingByName('font_a')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></circledropdown> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <a v-bind:style="getStyle('font_a')" href="#"> cillum dolore eu fugiat</a> nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
								<ul class="my-4" v-bind:style="getStyle('font_li')">
									<li>List item 1 <circledropdown v-if="showDropdowns" :model="findSettingByName('font_li')[0]" :options="paletteOptions"></circledropdown></li>
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
									<button v-bind:style="[getStyle('bg_button'), getStyle('font_button')]" class="font-bold text-lg display-block px-3 py-2 my-4 border w-full sm:w-1/3 lg:w-32">Button</button> <circledropdown v-if="showDropdowns" :model="findSettingByName('font_button')[0]" :options="paletteOptions" :settings="{ axis: 'y' }"></circledropdown> <circledropdown v-if="showDropdowns" :model="findSettingByName('bg_button')[0]" :options="paletteOptions" :settings="{ axis: 'x' }"></circledropdown>
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

// Some default data
var palette_data = [
	{
		key : 1,
		classname: 'swatch1',
		label: 'A',
		hex : '#FEFEFE'
	},
	{
		key : 2,
		classname: 'swatch2',
		label: 'B',
		hex : '#FE6A04'
	},
	{
		key : 3,
		classname: 'swatch3',
		label: 'C',
		hex : '#2273CB'
	},
	{
		key : 4,
		classname: 'swatch4',
		label: 'D',
		hex : '#222222'
	},
];



import Swatch from './components/Swatch.vue'
import CircleDropdown from './components/CircleDropdown.vue'

export default {
	name: 'app',
	components: {
		Swatch,
		CircleDropdown
	},
	data: function() {
		return {
			palette : palette_data,
			settings : [
				{
					label : 'Background Color',
					value : 'swatch1',
					name : 'bg_page'
				},
				{
					label : 'Paragraph Font Color',
					value : 'swatch4',
					name : 'font_p'
				},
				{
					label : 'Link Color',
					value : 'swatch3',
					name : 'font_a'
				},
				{
					label : 'Heading Font Color',
					value : 'swatch2',
					name : 'font_h'
				},
				{
					label : 'List Item Font Color',
					value : 'swatch4',
					name : 'font_li'
				},
				{
					label : 'Button Background Color',
					value : 'swatch3',
					name : 'bg_button'
				},
				{
					label : 'Button Font Color',
					value : 'swatch1',
					name : 'font_button'
				}
			],
			showDropdowns : false,
			showPalette : true,
			sidebarFocused : false,
			windowWidth : window.innerWidth,
			showModal : false
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
			return this.palette.filter(function(data){
				return data.classname == classname;
			});
		},
		findSettingByName : function(name) {
			return this.settings.filter(function(data){
				return data.name == name;
			});
		}
	},
	computed: {
		paletteOptions : function() {
			var options = new Array();
			for (i=0; i < this.palette.length; i++) {
				options.push({ label: this.palette[i].label, value: this.palette[i].classname, data : this.palette[i] });
			}
			return options;
		},
		showSidebarResize : function() {
			return ( this.windowWidth < 992 || !this.showPalette || this.sidebarFocused );
		}
	},
	mounted: function() {
		this.$nextTick(() => {
			window.addEventListener('resize', () => {
				this.windowWidth = window.innerWidth
			});
		});

		var self = this; //vue

		// Sortable plugin for re-arranging swatches
		$(function(){
			// $( "#palette" ).sortable();
			// $( "#palette" ).disableSelection();

			var f = $.farbtastic('#colorpicker');
			var selected;
			$('.colorwell')
				.each(function () {
					f.linkTo(this);
				})
				.focus(function() {
					f.linkTo(this);
				});

			$('.colorwell').on('change', function(e) {
				e.target.dispatchEvent(new Event('input'));
				// self.$emit('change', this.value);
			});
			
			self.$on('change', function(data) {
			
			});
		});
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
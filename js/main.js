
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


// Swatch component for palette at top of page
Vue.component('swatch', {
	props: {
		swatch : {
			type: Object,
			required: true
		},
	},
	template: `<div class="ui-state-default">
		<div>
			<div class="swatch" :style="{ backgroundColor: swatch.hex }" :class="[ (invertLabel(swatch.hex)) ? 'text-white' : 'text-black' ]">
				<div class="text-center futura swatch-label">
					{{ swatch.label }}
				</div>
			</div>
			<div class="text-center">
				<input :id="'hex-'+swatch.key" class="border border-t-0 border-l-0 border-r-0 text-center w-full p-2" type="text" v-model="swatch.hex" value="">
			</div>
		</div>
	</div>`,
	methods : {
		invertLabel : function(color) {
			// if only first half of color is defined, repeat it
			if(color.length < 5) {
				color += color.slice(1);
			}
			return ((color.replace('#','0x')) < (0xffffff/2));
		}
	}
});


/**
 * Component for a custom dropdown
**/
var CircleDropdown = Vue.component('circledropdown', {
	props: {
		model : {
			type: Object,
			required: true
		},
		options : {
			type: Array,
			required: true
		},
		settings : {
			type: Object,
			required: false
		}
	},
	template: `
	<div class="align-middle text-black text-base items-center inline-block" @mouseleave="showDropDown=false">
		<div @mouseover="showDropDown=true" @click.prevent="showDropDown=!showDropDown" :style="{ backgroundColor: selectedOption.data.hex }" :class="getLabelClass(selectedOption.data.hex)" class="color-circle color-circle-30 inline-block border">
			<div class="text-lg text-center">{{ selectedOption.label }}</div>
		</div>
		<div class="flex items-center absolute circle-menu w-auto" :class=" (isVertical) ? 'menu-vertical' : 'menu-horizontal ml-6' ">
			<transition name="fade">
				<i v-show="showDropDown" class="fa fa-fw" :class="[ isVertical ? 'fa-caret-down' : 'fa-caret-right' ]"></i>
			</transition>
			<transition :name="(isVertical) ? 'slide-fade-down' : 'slide-fade-right'">
				<div v-show="showDropDown" class="flex items-center dropdown-option">
					<div v-for="option in options">
						<div
							@click.prevent="select(option)"
							:style="{ backgroundColor: option.data.hex }"
							class="color-circle color-circle-15 ml-2 border"
							:class="[ option.value == model.value ? 'circle-selected' : '', getLabelClass(option.data.hex) ]">
							<div class="text-lg text-center">{{ option.label }}</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
	`,
	data() {
		return {
			showDropDown: false
		}
	},
	methods : {
		select : function(selected_option) {
			this.model.value = selected_option.value;
			this.showDropDown = false;
		},
		getOptionByValue : function(value) {
			return this.options.filter(function(data){
				return data.value == value;
			});
		},
		getLabelClass : function(color) {
			// if only first half of color is defined, repeat it
			if(color.length < 5) {
				color += color.slice(1);
			}
			return ((color.replace('#','0x')) < (0xffffff/2)) ? 'text-white' : 'text-black';
		}
	},
	computed : {
		isVertical : function() {
			return (typeof this.settings != 'undefined' && this.settings.hasOwnProperty('axis') && this.settings.axis == 'y');
		},
		selectedOption : function() {
			return this.getOptionByValue(this.model.value)[0];
		}
	}
});




// Initialize the Vue app
var app = new Vue({
	el: '#app',
	data: {
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
		windowWidth : window.innerWidth
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

		// Sortable plugin for re-arranging swatches
		$(function(){
			// $( "#palette" ).sortable();
			// $( "#palette" ).disableSelection();

			$('#colorpicker').farbtastic('#hex-1');
		});
	},
});



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
			<div class="swatch" :style="{ backgroundColor: swatch.hex }">
				<div class="text-center futura swatch-label">
					{{ swatch.label }}
				</div>
			</div>
			<div class="text-center">
				<input class="border border-t-0 border-l-0 border-r-0 text-center w-full p-2" type="text" v-model="swatch.hex" value="">
			</div>
		</div>
	</div>`
});


// Setting component for each of our dropdowns
Vue.component('setting', {
	props: {
		setting : {
			type: Object,
			required: true
		},
		palette : {
			type: Array,
			required: true
		},
	},
	template: `<div class="flex flex-col content-center items-center text-center">
		<div class="flex justify-center items-center">
			<label :for="setting.name" class="text-xl font-bold">{{setting.label}}</label>
			<!-- <div :style="{ backgroundColor: '#cc3300' }" class="color-circle ml-4">
				<div class="text-2xl">A</div>
			</div> -->
		</div>
		<select class="w-1/3 border text-xl p-2" :id="setting.name" v-model="setting.value">
			<option
				v-for="swatch in palette" 
				:key="swatch.key" 
				:value="swatch.classname">
				{{ swatch.classname }}
			</option>
		</select>
	</div>`
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
			// {
			// 	label : 'Sidebar Heading Font Color',
			// 	value : 'swatch4',
			// 	name : 'font_sh'
			// },
			{
				label : 'List Item Font Color',
				value : 'swatch4',
				name : 'font_li'
			},
			// {
			// 	label : 'Input Background Color',
			// 	value : 'swatch1',
			// 	name : 'bg_input'
			// },
			// {
			// 	label : 'Input Font Color',
			// 	value : 'swatch2',
			// 	name : 'font_input'
			// }
		]
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
			var style = (el !== 'bg_page') ? { color : palette.hex } : { backgroundColor : palette.hex };

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
});


// Sortable plugin for re-arranging swatches
$(function(){
	$( "#palette" ).sortable();
	$( "#palette" ).disableSelection();
});

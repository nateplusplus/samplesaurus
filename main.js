

var app_data = {
	palette: [
		{
			key : 1,
			hex : '#000000'
		},
		{
			key : 2,
			hex : '#666666'
		},
		{
			key : 3,
			hex : '#AAAAAA'
		},
		{
			key : 4,
			hex : '#DDDDDD'
		},
	],
	skins : [
		{
			key : 1,
			styles: {
				palette_id : 1
			}
		},
		{
			key : 2,
			styles: {
				palette_id : 2
			}
		},
		{
			key : 3,
			styles: {
				palette_id : 3
			}
		},
		{
			key : 4,
			styles: {
				palette_id : 4
			}
		},
	],
}



Vue.component('swatch', {
	props: {
		skin : {
			type: Object,
			required: true
		},
		palette : {
			type: Array,
			required: true
		}
	},
	template: `<div>
		<div class="app-control-header text-center p-4">
			{{ skin.key }}
		</div>
		<div class="app-control-content">
			<div class="swatch" :style="{ backgroundColor:  getColor(skin.styles.palette_id) }" style="height:100px;"></div>
			<div class="text-box text-center">
				<input class="border w-full" type="text" name="color_input_1" value="">
			</div>
		</div>
	</div>`,
	methods: {
		getColor: function(palette_id) {

			var palette =  this.palette.filter(
				function(data){ return data.key == palette_id }
			);

			return palette[0].hex;
		}
	}
});



var app = new Vue({
	el: '#app',
	data: app_data
});

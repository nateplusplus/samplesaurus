

var app_data = {
	palette: [
		{
			key : 1,
			classname: 'swatch1',
			hex : '#000000'
		},
		{
			key : 2,
			classname: 'swatch2',
			hex : '#666666'
		},
		{
			key : 3,
			classname: 'swatch3',
			hex : '#AAAAAA'
		},
		{
			key : 4,
			classname: 'swatch4',
			hex : '#DDDDDD'
		},
	],
}



Vue.component('swatch', {
	props: {
		swatch : {
			type: Object,
			required: true
		},
	},
	template: `<div class="ui-state-default">
		<div class="text-center">
			{{ swatch.classname }}
		</div>
		<div>
			<div class="swatch" :style="{ backgroundColor:  swatch.hex }" style="height:100px;"></div>
			<div class="text-center">
				<input class="border w-full p-2" type="text" v-model="swatch.hex" value="">
			</div>
		</div>
	</div>`
});



var app = new Vue({
	el: '#app',
	data: app_data
});


$(function(){

	console.log($( "#palette" ));
	$( "#palette" ).sortable();
	$( "#palette" ).disableSelection();
});

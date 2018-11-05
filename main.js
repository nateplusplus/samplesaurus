var app = new Vue({
	el: '#app',
	data: {
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
});
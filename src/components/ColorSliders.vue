<template lang="html">
	<div class="color-sliders">
		<div class="color-sliders__control rounded-full m-2 border border-grey-darker" v-bind:style="gradientH">
			<input type="range" min="0" max="360" v-model="h" />
		</div>
		<div class="color-sliders__control rounded-full m-2 border border-grey-darker" v-bind:style="gradientS">
			<input type="range" min="0" max="100" v-model="s" />
		</div>
		<div class="color-sliders__control rounded-full m-2 border border-grey-darker" v-bind:style="gradientL">
			<input type="range" min="0" max="100" v-model="l" />
		</div>
	</div>
</template>

<script>

function hsb2hsl(h, s, b) {
	var hsl = {
		h : h,
		s : (s * b),
		l : b
	};

	if (hsl.l <= 1 && hsl.l > 0) {
		hsl.s /= hsl.l;
	} else {
		hsl.s /= 2 - hsl.l;
	}

	if (hsl.s > 1) {
		hsl.s = 1;
	}

	if (hsl.s <= 0) hsl.s = 0;


	hsl.h *= 360;
	hsl.s *= 100;
	hsl.l *= 100;

	return hsl;
}


export default {
	name : 'colorsliders',
	props : {
		model : {
			type : Object, // Initial HSL values
			default : function() {
				return {
					h : 265,
					s : 80,
					l : 99
				};
			}
		}
	},
	data : function() {
		return {
			h : this.model.h,
			s : this.model.s,
			l : this.model.l
		};
	},
	computed : {
		hsl : function() {
			var hsl = { h : parseFloat(this.h), s : parseFloat(this.s), l : parseFloat(this.l) };
			return hsl;
		},
		colorString : function() {
			var c = this.hsl.h + ", " + this.hsl.s + "%, " + this.hsl.l + "%";
			return "hsl(" + c + ")";
		},
		gradientH : function() {
			var stops = [];
			for (var i = 0; i < 7; i++) {
				var h = i * 60;

				var hsl = hsb2hsl(parseFloat(h / 360), parseFloat(this.s) / 100, parseFloat(this.l / 100));

				var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
				stops.push("hsl(" + c + ")");
			}

			return {
				backgroundImage : "linear-gradient(to right, " + stops.join(', ') + ")"
			};
		},
		gradientS : function() {
			var stops = [];
			var c;
			var hsl = hsb2hsl(parseFloat(this.h / 360), 0, parseFloat(this.l / 100));
			c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
			stops.push("hsl(" + c + ")");

			hsl = hsb2hsl(parseFloat(this.h / 360), 1, parseFloat(this.l / 100));
			c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
			stops.push("hsl(" + c + ")");

			return {
				backgroundImage : "linear-gradient(to right, " + stops.join(', ') + ")"
			};
		},
		gradientL : function() {
			var stops = [];
			var c;

			var hsl = hsb2hsl(parseFloat(this.h / 360), 0, 0);
			c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
			stops.push("hsl(" + c + ")");

			hsl = hsb2hsl(parseFloat(this.h / 360), 1, 1);

			c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
			stops.push("hsl(" + c + ")");

			return {
				backgroundImage : "linear-gradient(to right, " + stops.join(', ') + ")"
			};
		}
	},
	watch : {
		hsl : function() {
			// Let the app know about the color change
			this.$emit('change', this.hsl);
		}
	}
};
</script>

<style lang="css" scoped>

	/* https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/ */

	input[type=range] {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		width: 100%; /* Specific width is required for Firefox. */
		background: transparent; /* Otherwise white in Chrome */
	}

	input[type=range]:focus {
		outline: none;
	}

	input[type=range]::-ms-track {
		width: 100%;
		cursor: pointer;

		/* Hides the slider so custom styles can be added */
		background: transparent; 
		border-color: transparent;
		color: transparent;
	}


	input[type=range]::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: 1px solid rgba(0,80,20,0.5);
		border-radius: 50%;
		background-color: rgba(255,255,255,0.5);
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
	input[type=range]::-moz-range-thumb {
		width: 20px;
		height: 20px;
	}
	input[type=range]::-ms-thumb {
		width: 20px;
		height: 20px;
	}

	.color-sliders__control {
		line-height: 0;
	}

</style>

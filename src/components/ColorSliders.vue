<template lang="html">
	<div class="">
		<div class="control" v-bind:style="gradientH">
			<input type="range" min="0" max="360" v-model="h" />
		</div>
		<div class="control" v-bind:style="gradientS">
			<input type="range" min="0" max="100" v-model="s" />
		</div>
		<div class="control" v-bind:style="gradientL">
			<input type="range" min="0" max="100" v-model="l" />
		</div>
	</div>
</template>

<script>

function hsb2hsl(h, s, b) {
	var hsl = {
		h : h
	};
	// hsl.l = (2 - s) * b;
	hsl.l = s * b;
	hsl.s = s * b;

	if (hsl.l <= 1 && hsl.l > 0) {
		hsl.s /= hsl.l;
	} else {
		hsl.s /= 2 - hsl.l;
	}

	// hsl.l /= 2;

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
				}
			}
		}
	},
	model : {
		prop : 'model',
		event : 'change'
	},
	data : function() {
		return {
			h : this.model.h,
			s : this.model.s,
			l : this.model.l
		}
	},
	computed : {
		hsl : function() {
			var hsl = { h : parseFloat(this.h), s : parseFloat(this.s), l : parseFloat(this.l) }
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

				var hsl = hsb2hsl(parseFloat(h / 360), parseFloat(this.s) / 100, parseFloat(this.l / 100))

				var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
				stops.push("hsl(" + c + ")")
			}

			return {
				backgroundImage : "linear-gradient(to right, " + stops.join(', ') + ")"
			}
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
			}
		},
		gradientL : function() {
			var stops = [];
			var c;

			var hsl = hsb2hsl(parseFloat(this.h / 360), 0, 0);
			c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
			stops.push("hsl(" + c + ")");

			hsl = hsb2hsl(parseFloat(this.h / 360), parseFloat(this.s / 100), 1);

			c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
			stops.push("hsl(" + c + ")");

			return {
				backgroundImage : "linear-gradient(to right, " + stops.join(', ') + ")"
			}
		}
	},
	watch : {
		hsl : function() {
			// Let the app know about the color change
			this.$emit('change', this.hsl);
		}
	}
}
</script>

<style lang="css">
</style>

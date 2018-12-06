<template>
	<div class="align-middle text-black text-base items-center inline-block relative" @mouseleave="showDropDown=false">
		<div @mouseover="showDropDown=true" @click.prevent="showDropDown=!showDropDown" :style="{ backgroundColor: selectedOption.data.hex }" :class="getLabelClass(selectedOption.data.hex)" class="color-circle color-circle-30 inline-block z-10">
			<div class="flex items-center justify-center">
				<div class="text-center circle-dropdown-label">
					{{ selectedOption.label }}
				</div>
			</div>
		</div>
		<div class="flex items-center absolute circle-menu w-auto" :class=" (isVertical) ? 'menu-vertical' : 'menu-horizontal' ">
			<transition :name="(isVertical) ? 'fade' : 'fade'">
				<div v-show="showDropDown" class="flex items-center dropdown-option bg-grey-light p-1 rounded-full">
					<div class="color-circle color-circle-15 ml-1"></div>
					<div v-for="option in options">
						<div
							v-show="showDropDown"
							@click.prevent="select(option)"
							:style="{ backgroundColor: option.data.hex }"
							class="color-circle color-circle-15"
							:class="[ option.value == model.value ? 'circle-selected' : '', getLabelClass(option.data.hex) ]">

							<div class="flex items-center justify-center">
								<div class="text-center circle-dropdown-label">
									{{ option.label }}
								</div>
							</div>

						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>

export default {
	name : 'CircleDropdown',
	props : {
		model : {
			type : Object,
			required : true
		},
		options : {
			type : Array,
			required : true
		},
		settings : {
			type : Object,
			required : false
		}
	},
	data() {
		return {
			showDropDown : false
		};
	},
	methods : {
		select : function(selected_option) {
			this.model.value = selected_option.value;
			this.showDropDown = false;
		},
		getOptionByValue : function(value) {
			return this.options.filter(function(data) {
				return data.value == value;
			});
		},
		getLabelClass : function(color) {
			// if only first half of color is defined, repeat it
			if (color.length < 5) {
				color += color.slice(1);
			}
			return ((color.replace('#', '0x')) < (0xffffff / 2)) ? 'text-white' : 'text-black';
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
};
</script>

<style scoped>
.circle-menu.menu-vertical {
	flex-direction: column;
	margin-left: -0.2em;
	margin-top: -0.3em;
	z-index: 1;
	top: 0px;
}
	.menu-horizontal {
		margin-top: -1.7em !important;
		margin-left: -0.3em !important;
	}
	.menu-vertical .dropdown-option {
		flex-direction: column;
		justify-items: center;
	}
	.menu-vertical .dropdown-option .color-circle {
		margin-left: 0;
		margin-top: 0.25em;
	}
	.menu-horizontal .dropdown-option .color-circle {
		margin-top: 0;
		margin-left: 0.25em;
	}
	.color-circle {
		position: relative;
		border-radius:50%;
		width: 1.2em;
		box-sizing: border-box;
		cursor: pointer;
	}
		.circle-menu .circle-selected {
			border: 2px solid red;
		}
		.circle-menu .color-circle:hover {
			opacity: .7;
			cursor: pointer;
		}
	.color-circle:before {
		content: '';
		padding-top: 100%;
		display: block;
	}
	.color-circle > * {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.circle-dropdown-label {
		font-size: .9em;
	}
	.dropdown-option {
		transition: all .3s ease;
	}
</style>

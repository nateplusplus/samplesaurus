<template lang="html">
	<div class="h-full flex justify-between items-center px-12">
		<div id="mini-palette" class="flex border border-grey-dark">
			<div class="bg-red swatch flex-1"></div>
			<div class="bg-yellow swatch flex-1"></div>
			<div class="bg-green swatch flex-1"></div>
			<div class="bg-blue swatch flex-1"></div>
		</div>
		<button type="button" name="button" class="px-2">
			<i class="far fa-circle fa-fw text-blue-dark hover:text-blue-light"></i>
		</button>
	</div>
</template>

<script>
export default {
	name : 'Menu'
}
</script>

<style lang="css">
</style>

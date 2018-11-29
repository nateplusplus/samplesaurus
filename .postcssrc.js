module.exports = {
	"plugins": [
		require("postcss-import")(),
    require("tailwindcss")("./build/tailwind.js"),
    require("autoprefixer")(),
	]
}
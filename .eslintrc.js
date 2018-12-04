// https://eslint.org/docs/user-guide/configuring
module.exports = {
		env : {
				"browser": true,
				"es6": true,
				jquery: true
		},
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		extends : "standard",
		// required to lint *.vue files
		plugins : [
			"html"
		],
		parser : "babel-eslint",
		parserOptions : {
				sourceType : "module"
		},
		rules: {
				"indent" : [ process.env.NODE_ENV === "production" ? 1 : 0, "tab" ],
				"no-tabs" : "off",
				"linebreak-style" : [ process.env.NODE_ENV === "production" ? 1 : 0, "unix" ],
				"semi" : [ process.env.NODE_ENV === "production" ? 1 : 0, "always" ],
				"no-unused-vars" : process.env.NODE_ENV === "production" ? 2 : 0,
				"key-spacing" : ["warn", { "beforeColon" : true, "afterColon" : true }],
				"space-before-function-paren" : ["warn", "never"],
				"brace-style" : "off",
				"eqeqeq" : "off",
				"space-infix-ops" : "warn",
				"no-undef" : process.env.NODE_ENV === "production" ? 2 : 1,
				"camelcase" : "off",
				"no-multiple-empty-lines" : "off",
				"no-trailing-spaces" : "warn",
				"quotes" : "off",
				"padded-blocks" : "off"
		}
}
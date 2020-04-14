# eslint-plugin-metafizzy

_ESLint config and custom rules for development on [Metafizzy](https://metafizzy.co) projects_

I'm persnickety about my code style. While ESList captures 95% of what I want, there are some rules that I need to customize. See custom rules below.

Generally, I like spaces in braces and around operators

``` js
getItem( element )
[ x, y ]
1 + 2
```

But I also like no spaces for singular values that are already separated with syntax highlighting

``` js
getItem('hydrogen')
items[i]
TAU/4
```

I concede it's a bit idiosyncratic, but I find it easier to read.

## Usage

Install with npm.

```
npm install eslint-plugin-metafizzy --save-dev
```

Add `metafizzy` to `plugins` in your ESLint config.

``` js
// .eslintrc.js
module.exports = {
  plugins: [
    'metafizzy',
  ],
};
```

Set [`extends`](https://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin) to `plugin:metafizzy/configName` to use a plugin configuration. This plugin provies three configurations: `browser`, `node`, and `base`.

``` js
// .eslintrc.js
module.exports = {
  plugins: [
    'metafizzy',
  ],
  extends: 'plugin:metafizzy/browser',
};
```

See `src/eslintrc.js` for base configuration and `src/index.js` for

## Custom rules

All three rules work in place of official [ESLint rules](https://eslint.org/docs/rules/). The official need to be disabled in order for these custom rules to work, which they are if your config extends `plugin:metafizzy/configName`.

### metafizzy/spaces-in-parens

Enforces consistent spacing inside parentheses.

By default, parentheses have inside spaces.

``` js
getItem( element )
getItem( a, b )
getItem( [ x, y ], [ u, v ] )
getItem( 1 + 2 )
getItem( 'row' + rowNumber )
```

Parentheses with content that is a single _String_, _Array_, or _Object_ have no spaces.

``` js
getItem('hydrogen')
getItem([ x, y ])
getItem({ bloodType: 'AB Positive' })
```

### metafizzy/computed-property-spacing

Enforces spacing inside computed property brackets.

By default, properties have spaces inside brackets.

``` js
items[ index ]
items[ 10 + 4 ]
items[ 'last' + 'Index' ]
```

Properties that are numbers, single-character variables, or single strings have no spaces inside brackets.

``` js
items[1]
items[i]
items['hydrogen-element']
```

### metafizzy/space-infix-ops

Enforces consistent spacing around operators.

Be default, operators have spaces around them.

``` js
1 + 2
var a = b
a ? b : c
```

The division operator `/`, when both preceeding and following value are either a number or singular variable have no spaces, so they appear more like a fraction.

```
1/2
TAU/4
```

---

MIT License. By [Metafizzy 🌈🐻](https://metafizzy.co)

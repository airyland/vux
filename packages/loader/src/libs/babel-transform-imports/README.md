# babel-plugin-transform-imports

This a fork of https://bitbucket.org/amctheatres/babel-transform-imports.git

Transforms member style imports:

```javascript
import { Row, Grid as MyGrid } from 'react-bootstrap';
import { merge } from 'lodash';
```

...into default style imports:

```javascript
import Row from 'react-bootstrap/lib/Row';
import MyGrid from 'react-bootstrap/lib/Grid';
import merge from 'lodash/merge';
```

*Note: this plugin is not restricted to the react-bootstrap and lodash
libraries.  You may use it with any library.*

## Why?

When Babel encounters a member style import such as:

```javascript
import { Grid, Row, Col } from 'react-bootstrap';
```

it will generate something similarish to:

```javascript
var reactBootstrap = require('react-bootstrap');
var Grid = reactBootstrap.Grid;
var Row = reactBootstrap.Row;
var Col = reactBootstrap.Col;
```

Which causes the entire library to be loaded, even though only some components
are needed.  Some libraries are rather large and pulling in the entire module
would cause unnecessary bloat to your client optimized (webpack etc.) bundle.
The only way around this is to use default style imports:

```javascript
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
```

But, the more pieces we need, the more this sucks.  This plugin will allow you
to pull in just the pieces you need, without a separate import for each item.
Additionally, it can be configured to throw when somebody accidentally writes
an import which would cause the entire module to resolve, such as:

```javascript
import Bootstrap, { Grid } from 'react-bootstrap';
// -- or --
import * as Bootstrap from 'react-bootstrap';
```

## Installation

```
npm install --save-dev babel-plugin-transform-imports
```

## Usage

*In .babelrc:*

```json
{
    "plugins": [
        ["transform-imports", {
            "react-bootstrap": {
                "transform": "react-bootstrap/lib/${member}",
                "preventFullImport": true
            },
            "lodash": {
                "transform": "lodash/${member}",
                "preventFullImport": true
            }
        }]
    ]
}
```

## Advanced Transformations

### Using regular expressions

Sometimes, you may wish to use regular expressions in your transformation (for
example, to enforce the same convention in all folder levels on the structure
of your library).

.babelrc:

```json
{
    "plugins": [
        ["transform-imports", {
            "my-library\/?(((\\w*)?\/?)*)": {
                "transform": "my-library/${1}/${member}",
                "preventFullImport": true
            }
        }]
    ]
}
```

Causes this code:

```javascript
import { MyModule } from 'my-library';
import { App } from 'my-library/components';
import { Header, Footer } from 'my-library/components/App';
```

to become:

```javascript
import MyModule from 'my-library/MyModule';
import App from 'my-library/components/App';
import Header from 'my-library/components/App/Header';
import Footer from 'my-library/components/App/Footer';
```

### Using a function as the transformer

If you need more advanced or more specific transformation logic, and are using
Babel 7+ with a `.babelrc.js` file, you may provide a function instead of a
string for the `transform` option:

.babelrc.js:

```javascript
module.exports = {
    presets: ['@babel/env'],
    plugins: [
        ['transform-imports', {
            'my-library': {
                transform: function(importName, matches) {
                    return `my-library/etc/${importName.toUpperCase()}`;
                },
                preventFullImport: true,
            }
        }]
    ]
};
```

### Using a transformation file

If you need the above flexibility of using a function as a transformer, but
are still on Babel 6 or cannot use a `.babelrc.js` file for some reason, you
may provide a path to a .js file which exports a function to run instead.
Keep in mind that the .js file will be `require`d relative from this plugin's
path, likely located in `/node_modules/babel-plugin-transform-imports`.  You
may provide any filename, as long as it ends with `.js`.

.babelrc:

```json
{
    "plugins": [
        ["transform-imports", {
            "my-library": {
                "transform": "../../path/to/transform.js",
                "preventFullImport": true
            }
        }]
    ]
}
```

/path/to/transform.js:

```javascript
module.exports = function(importName, matches) {
    return 'my-library/etc/' + importName.toUpperCase();
};
```

## Webpack

This can be used as a plugin with babel-loader.

webpack.config.js:
```javascript
module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            query: {
                plugins: [
                    [require('babel-plugin-transform-imports'), {
                        'my-library': {
                            transform: function(importName, matches) {
                                return 'my-library/etc/' + importName.toUpperCase();
                            },
                            preventFullImport: true
                        }
                    }]
                ]
            }
        }
    }]
}
```

## Options

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `transform` | `string or function` | yes | `undefined` | The library name to use instead of the one specified in the import statement.  ${member} will be replaced with the import name, aka Grid/Row/Col/etc., and ${1-n} will be replaced by any matched regular expression groups. Alternatively, pass a path to a .js file which exports a function to process the transform, which is invoked with parameters: (importName, matches). If using Babel 7+, a function may be passed directly. (see Advanced Transformations) |
| `preventFullImport` | `boolean` | no | `false` | Whether or not to throw when an import is encountered which would cause the entire module to be imported. |
| `camelCase` | `boolean` | no | `false` | When set to true, runs ${member} through _.camelCase. |
| `kebabCase` | `boolean` | no | `false` | When set to true, runs ${member} through _.kebabCase. |
| `snakeCase` | `boolean` | no | `false` | When set to true, runs ${member} through _.snakeCase. |
| `skipDefaultConversion` | `boolean` | no | `false` | When set to true, will preserve `import { X }` syntax instead of converting to `import X`. |

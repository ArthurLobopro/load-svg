# Load SVG

Simple and light package with custom WebComponents to load SVGs into HTML.

## How to use

* On your js file add: 

```ts
 import { registerLoadSVG, registerInsertSVG } from "../dist/esm/index.js"

registerLoadSVG()
registerInsertSVG()
        
```

> It will enable two new tags on your HTML tag: `load-svg` and `insert-svg`

You can load an SVG file using the load-svg tag like this:

```html
<load-svg src='./mysvg.svg'></load-svg>
```

You can insert an SVG file using the insert-svg tag like this:

```html
<insert-svg src='./mysvg.svg'></-svg>
```

### load-svg tag behavior

`load-svg` will render the svg on a shadow-dom, the svg inside a `load-svg` can't be finded using `document.querySelector()` and styles using the `svg` selector like this:

```css
svg {
    /*Your svg style*/
}
```

But all styles applied in `load-svg` tag will be inherited by svg inside `load-svg`, for example:

```css
load-svg {
    fill: blue;
}
```

### insert-svg tag behavior

`insert-svg` tags replace themselves per the loaded SVG like you manually inserted the SVG element in the HTML file. 

So, all SVG files loaded by `insert-svg` can be styled using CSS and also can be found using `document`.querySelector()`.
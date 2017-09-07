# SVG

>jonge's learning notes about SVG(Scalable Vector Graphics).

## SVG js libs

* [D3.js](https://d3js.org/)
* [SVG.js](http://svgjs.com/)

cordinate origin: (0,0) - left-top, x --> rigth, y V down

## bacis

```js
// (cx, cy): circle center location, r: radius
<circle cx="50" cy="50" r="20" stroke="#000" stroke-width="1" fill="#ccc" />

// (): eclipse center location, (rx,ry): horizontal, vertical radius
<eclipse cx="50" cy="50" rx="20" ry="10" stroke="#000" stroke-width="1" fill="#ccc"/>

// (x, y): left-top point location, (rx,ry): x,y radius of the round corner
<rect x="200" y="50" width="80" height="40" rx="5" ry="5"  stroke="#000" stroke-width="1" fill="#ccc" />

// (x1, y1): line start point, (x2,y2): end point
<line x1="10" y1="10" x2="30" y2="40" stroke="#000" stroke-width="4" />

// points: every point of the line
<polyline points="10 10, 10 20, 20 20, 20 10" fille="none" stroke="#000" />

 // 
 <polygon points="10 10, 10 20, 20 20, 20 10" fille="#f00" stroke="#000" />

 // other attrs
 // stroke-dasharray: (draw space),(draw space), ....
 <line x1 y1 x2 y2 stroke="#000" stroke-dasharray="10 4, 5 10, 1 1, 10 3" />
 // stroke-linecap: butt | round | square
 // stroke-linejoin: miter | round | bevel
 
```

## path
> Capital Form: absolute, Lower Case: relative

**M**ove to
**L**ine to
**H**orizontal line to
**V**ertical line to
clo**Z**e path

**A**rc
> A rx,ry rotation big/small-arcFlag,clock-wise flag
`A30,40 0 0,0 70,70`: this means draw a small couter-clock-wise arc(rx=30,ry=40) to (70,70)

Bezier Curves
**Q**uadratic Bezier Curves
Qcx,cy x,y: cx,cy is control point, x,y is end point
Tx,y: control point is last used control point

**C**ubic Bezier Curves
Ccx1,cy1 cx2,cy2 x,y: 2 control points
Scx,cy x,y: first control point is assumed to be the last used point

## Coordinate
viewBox=minX,minY widht,height
> this can do shift/scale

preserveAspectRatio
```js
preserveAspectRatio="xMinyMin meet"
// xMin - aligned to left, xMid - middle, xMax - aligned to bottom
// yMin - top
// meet: sliced untill the largest side touch the viewport boundary
// slice: scaled and sliced untill the mallest side touch the viewport boundary
```

## Constructure

* `<defs>` & `<symbol>` 
```html
<defs>
    <linearGradient id="gradient">
      <stop offset="20%" stop-color="#3D9" />
      <stop offset="90%" stop-color="#39F" />
    </linearGradient>
</defs>

<symbol>
    <linearGradient id="gradient">
      <stop offset="20%" stop-color="#3D9" />
      <stop offset="90%" stop-color="#39F" />
    </linearGradient>
</symbol>

<!-- reference to the defined element -->
<g>
    <circle r="20" cx="50" cy="50" fill="url(#gradient)"></circle>
</g>
```

* `<use>`


* `<marker>`
>you can use viewBox for scale/transform

refX,refY: the offset of X-axis, Y-axis
```html
<defs>
<!-- basic W|H * markerUnits assignedKey's Value-->
    <marker markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" id="arrow">
        <path d="M0,0 L0,6 L9,3 Z" fill="#3A9"></path>
    </marker>
</defs>


<path d="M100,10 C200,40 300,10 400,50"  stroke="#3DA" marker-end="url(#arrow)" fill="none" stroke-width="2"/>
```
`marker-end`, `marker-start`, `marker-end`(only display when polyline, path, polygon change direction)


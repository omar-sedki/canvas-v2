 <div align="center">
  <img width="256" heigth="256" src="src/images/logo.png" alt="canvas V2 logo"/>
</div>

# Canvas V2
**Canvas V2** is a JavaScript library which Extend HTML Canvas to make the use of it more simple.
## Install
include this script in your HTML file.

```html
<script crossorigin src="https://cdn.jsdelivr.net/gh/omar-sedki/canvas-v2@main/dist/js/canvas-v2.js"></script>
```

## How to use
- You need to add HTML ```<canvas>``` element to your HTML. 
```html
 <canvas id="v2" width="600" height="300" style="border:1px solid #000000"></canvas>
```
```<canvas>``` is an HTML element which can be used to draw graphics via JavaScript.
The ```<canvas>``` element must have an ```id``` attribute so it can be referred to by JavaScript.
The ```width``` and ```height``` attribute is necessary to define the size of the canvas in pixels.

**Tip**: You can add a border to the canvas using a style attribute.


 - The canvas is blank. To draw on it, a script first needs to access the rendering context. 

```html
<script>
var canvas = document.getElementById("v2");
var ctx = canvas.getContext("2d");
</script> 
```

  Get the ```<canvas>``` element by calling the document.getElementById() method, then you can access the drawing context using its getContext() method. now you can draw on the canvas.
  
  
## Draw on the Canvas
draw Simple rectangle.
```javascript
ctx.fillStyle = "#cbf692";
ctx.fillRect(150, 50, 300, 200); 
```
The  ```fillStyle ``` property can be a CSS color, a gradient, or a pattern

The  ```fillRect(x,y,width,height) ```  method draws a rectangle, filled with the  ```fillStyle```

<p align="center">
  <img src="src/images/canvas/fillRect(150,50,300,200).png" />
</p>


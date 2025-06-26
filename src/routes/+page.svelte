<script lang="ts">
  import { onMount } from "svelte";
  import vertexShaderSource from "$lib/projects/pixelRealism/vertexShader.vert"
  import fragmentShaderSource from "$lib/projects/pixelRealism/fragmentShader.frag"
  onMount(()=>{
    
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl") as WebGLRenderingContext;

    gl.clearColor(0.7,0.2,0.2,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      console.error(gl.getShaderInfoLog(vertexShader))
    }
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      console.error(gl.getShaderInfoLog(fragmentShader))
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
      console.error(gl.getProgramInfoLog(program))
    }

    gl.validateProgram(program)

    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
      console.error(gl.getProgramInfoLog(program))
    }

    var triangleVertices = [
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5,
    ]

    var triangleVertextBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertextBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
      positionAttribLocation,
      2,
      gl.FLOAT,
      false,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    )
    
    gl.enableVertexAttribArray(positionAttribLocation);

    function draw(){
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.useProgram(program);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      console.log("a")
      requestAnimationFrame(draw);
    }
    draw()

  })
</script>
<canvas id="canvas" width="640" height="480"></canvas>
<script lang="ts">
  import { onMount } from "svelte";
  import computeShader from "$lib/shaders/compute.wgsl?raw"
  import vertexShader from "$lib/shaders/vertex.wgsl?raw"
  import fragmentShader from "$lib/shaders/fragment.wgsl?raw"
  import { initWebGPU } from "$lib/Methods/initWebGPU";
  import { render } from "$lib/Methods/render";
  import { createTexture } from "$lib/Methods/createTexture";
  import { Sprite } from "$lib/Classes/Sprite";

  const sceneSize = [16, 8]
  const screenSize = sceneSize.map(x => x * 32);

  async function main() {
    const {canvas, ctx, device, computePipeline, renderPipeline} = await init()
    const sprites = [
      new Sprite([0,0], sceneSize, await createTexture('/textures/test.png', device)), //background sprite
    ]
    requestAnimationFrame(()=>{frame(ctx, device, renderPipeline, sprites)})
  }

  async function init(){
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("webgpu") as GPUCanvasContext;
    const { device, computePipeline, renderPipeline } = await initWebGPU(ctx, computeShader, vertexShader, fragmentShader);

    return { canvas, ctx, device, computePipeline, renderPipeline}
  }
  
  function frame(
    ctx: GPUCanvasContext,
    device: GPUDevice,
    renderPipeline: GPURenderPipeline,
    sprites: Array<Sprite>
  ){
    render(ctx, device, renderPipeline, sprites);
    requestAnimationFrame(()=>{frame(ctx, device, renderPipeline, sprites)})
  }

  onMount(()=>{
    main();
  })
</script>
<canvas id="canvas" width="640" height="640"></canvas>
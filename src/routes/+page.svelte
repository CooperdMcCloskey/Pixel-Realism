<script lang="ts">
  import { onMount } from "svelte";
  import computeShader from "$lib/shaders/compute.wgsl?raw"
  import vertexShader from "$lib/shaders/vertex.wgsl?raw"
  import fragmentShader from "$lib/shaders/fragment.wgsl?raw"
  import { initWebGPU } from "$lib/Methods/initWebGPU";
  import { draw } from "$lib/Methods/draw";
  import { createTexture } from "$lib/Methods/createTexture";
  import { bindTexture } from "$lib/Methods/bindTexture";

  async function init(){
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("webgpu") as GPUCanvasContext;

    const { device, computePipeline, renderPipeline } = await initWebGPU(ctx, computeShader, vertexShader, fragmentShader);

    const { texture, sampler } = await createTexture('textures/test.png', device, renderPipeline);
    
    const bindGroups = [
      bindTexture(device, renderPipeline, texture, sampler)
    ]

  draw(ctx, device, renderPipeline, bindGroups, 6);
  }
  onMount(()=>{
    init();
  })
</script>
<canvas id="canvas" width="640" height="640"></canvas>
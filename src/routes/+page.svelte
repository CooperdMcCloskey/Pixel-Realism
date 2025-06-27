<script lang="ts">
  import { onMount } from "svelte";
  import computeShader from "$lib/shaders/compute.wgsl?raw"
  import vertexShader from "$lib/shaders/vertex.wgsl?raw"
  import fragmentShader from "$lib/shaders/fragment.wgsl?raw"
  import { initWebGPU } from "$lib/Methods/initWebGPU";
  import { draw } from "$lib/Methods/draw";

  console.log(computeShader)
  async function init(){
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("webgpu") as GPUCanvasContext;

    const { device, computePipeline, renderPipeline } = await initWebGPU(ctx, computeShader, vertexShader, fragmentShader)

    draw(ctx, device, renderPipeline, 6);
  }
  onMount(()=>{
    init();
  })
</script>
<canvas id="canvas" width="640" height="480"></canvas>
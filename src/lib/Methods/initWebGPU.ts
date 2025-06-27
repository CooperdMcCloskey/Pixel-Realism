export async function initWebGPU(
  ctx: GPUCanvasContext,
  computeShader: string,
  vertexShader: string,
  fragmentShader: string
): Promise<{ device: GPUDevice, computePipeline: GPUComputePipeline; renderPipeline: GPURenderPipeline }>{

  if(!navigator.gpu) throw "WebGPU not supported"
  const adapter = await navigator.gpu.requestAdapter()
  if(! adapter) throw "Failed to get adapter"
  const device = await adapter.requestDevice();

  const format = navigator.gpu.getPreferredCanvasFormat()
  ctx.configure({device, format})

  const computeShaderModule = device.createShaderModule({code: computeShader});
  const vertexShaderModule = device.createShaderModule({code: vertexShader});
  const fragmentShaderModule = device.createShaderModule({code: fragmentShader});

  const computePipeline = device.createComputePipeline({
    layout: "auto", //Revisit later
    compute: { module: computeShaderModule },
  })

  const renderPipeline = device.createRenderPipeline({
    layout: "auto", //Revisit later
    vertex: { module: vertexShaderModule },
    fragment: {
      module: fragmentShaderModule,
      targets: [{ format }]
    }
  })
  return { device, computePipeline, renderPipeline}
}
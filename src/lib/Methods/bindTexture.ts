export function bindTexture(device: GPUDevice, renderPipeline: GPURenderPipeline, texture: GPUTexture, sampler: GPUSampler): GPUBindGroup{
  const bindGroup = device.createBindGroup({
    layout: renderPipeline.getBindGroupLayout(0),
    entries: [
      {binding: 0, resource: texture.createView()},
      {binding: 1, resource: sampler},
    ]
  })
  return bindGroup;
}
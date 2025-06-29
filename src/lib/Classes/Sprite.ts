export class Sprite{
  position: Array<number>;
  size: Array<number>;
  texture: GPUTexture;
  sampler: GPUSampler;
  constructor(position: Array<number>, size: Array<number>, {texture, sampler}: {texture: GPUTexture, sampler: GPUSampler}){
    this.position = position;
    this.size = size;
    this.texture = texture;
    this.sampler = sampler;
  }

  bind(
    device: GPUDevice, 
    renderPipeline: GPURenderPipeline, 
  ): GPUBindGroup{

    const vertices = new Float32Array([
      this.position[0]               , this.position[1]               , 0.0, 0.0,
      this.position[0] + this.size[0], this.position[1]               , 0.0, 0.0,
      this.position[0]               , this.position[1] + this.size[1], 0.0, 0.0,
      this.position[0]               , this.position[1] + this.size[1], 0.0, 0.0,
      this.position[0] + this.size[0], this.position[1]               , 0.0, 0.0,
      this.position[0] + this.size[0], this.position[1] + this.size[1], 0.0, 0.0
    ]);

    const vertexBuffer = device.createBuffer({
      size: vertices.byteLength,
      usage: GPUBufferUsage.UNIFORM,
      mappedAtCreation: true
    })
    new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
    vertexBuffer.unmap();

    const bindGroup = device.createBindGroup({
      layout: renderPipeline.getBindGroupLayout(1),
      entries: [
        {binding: 0, resource: this.texture.createView()},
        {binding: 1, resource: this.sampler},
        {binding: 2, resource: {buffer: vertexBuffer}}
      ]
    })
    return bindGroup;  
  }
}
import { Sprite } from "$lib/Classes/Sprite";

export function render(
  ctx: GPUCanvasContext,
  device: GPUDevice,
  renderPipeline: GPURenderPipeline,
  sprites: Array<Sprite>,
){
  const commandEncoder = device.createCommandEncoder();
  const textureView = ctx.getCurrentTexture().createView();

  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [{
      view: textureView,
      clearValue: [0,0,0,1],
      loadOp: "clear",
      storeOp: "store"
    }],
  });

  renderPass.setPipeline(renderPipeline)
  for (let sprite of sprites){
    console.log(sprite)
    renderPass.setBindGroup(1, sprite.bind(device, renderPipeline))
    renderPass.draw(6);
  }
  renderPass.end();

  device.queue.submit([commandEncoder.finish()]);
}
export function draw(ctx: GPUCanvasContext, device: GPUDevice, renderPipeline: GPURenderPipeline, vertexCount: number){
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
  renderPass.draw(vertexCount);
  renderPass.end();
  device.queue.submit([commandEncoder.finish()]);
  requestAnimationFrame(()=>{draw(ctx,device,renderPipeline,vertexCount)});
}
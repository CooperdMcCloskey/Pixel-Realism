export async function createTexture(
  path: string,
  device: GPUDevice,
){
  const res = await fetch(path);
  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob);

  const texture = device.createTexture({
    size: [bitmap.width, bitmap.height],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
  });

  device.queue.copyExternalImageToTexture(
    {source: bitmap},
    {texture: texture},
    [bitmap.width, bitmap.height]
  );

  const sampler = device.createSampler({
    magFilter: 'nearest',
    minFilter: 'nearest'
  });




  return {texture, sampler}
}
@group(0) @binding(0) var texture: texture_2d<f32>;
@group(0) @binding(1) var textureSampler: sampler;

@fragment
fn main(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
  // return vec4<f32>(1.0, 0, 0, 1.0);
  return textureSample(texture, textureSampler, uv);
}
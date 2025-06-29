// @group(0) @binding(0) var<uniform> screenSize: vec2<u32>;
@group(1) @binding(2) var<uniform> vertices: array<vec4<f32>,6>;

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

@vertex
fn main(@builtin(vertex_index) index: u32) -> VertexOut {

  let pos = vertices[index].xy;
  var clipPos = vec2<f32>(
    pos.x / 16.0 * 2.0 - 1.0,
    pos.y / 8.0  * 2.0 - 1.0
  );

  var uvs = array<vec2<f32>, 6>(
    vec2(0.0, 1.0),
    vec2(1.0, 1.0),
    vec2(0.0, 0.0),
    vec2(0.0, 0.0), 
    vec2(1.0, 1.0), 
    vec2(1.0, 0.0)
  );
  var out: VertexOut;
  out.position = vec4(clipPos, 0.0, 1.0);
  out.uv = uvs[index];
  return out;
}
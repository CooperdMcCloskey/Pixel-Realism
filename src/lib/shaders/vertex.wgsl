struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

@vertex
fn main(@builtin(vertex_index) index: u32) -> VertexOut {
  var pos = array<vec2<f32>, 6>(
    vec2(-1.0, -1.0),
    vec2( 1.0, -1.0),
    vec2(-1.0,  1.0),
    vec2(-1.0,  1.0),
    vec2( 1.0, -1.0),
    vec2( 1.0,  1.0)
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
  out.position = vec4(pos[index], 0.0, 1.0);
  out.uv = uvs[index];
  return out;
}
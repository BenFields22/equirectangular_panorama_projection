#version 430

in layout (location=0) vec3 vertexPosition;

out vec4 worldSpaceLoc;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;


void main()
{
    worldSpaceLoc = model*vec4(vertexPosition,1.0);
    gl_Position = projection * view * model *vec4(vertexPosition,1.0);
}

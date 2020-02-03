#version 430

out vec4 FragColor;
in vec4 worldSpaceLoc;

uniform vec4 ourColor; // we set this variable in the OpenGL code.
uniform vec3 centerOfProjection;
uniform vec3 front;
uniform sampler2D ourTexture;

void main()
{
    vec3 up = vec3(0.0f,1.0f,0.0f);
    vec3 world = vec3(worldSpaceLoc.x,worldSpaceLoc.y,worldSpaceLoc.z);
    vec3 ray = normalize(world-centerOfProjection);
    float val = dot(ray,up);//pitch value between 1 and -1
    float t = (val+1.0f)/2.0f;
    
    vec3 rxz = normalize(vec3(ray.x,0.0f,ray.z));
    float val2 = dot(rxz,front);//value between 1 and -1


    //uded to determine which side of the image to sample
    vec3 norm = cross(front,rxz);
    float val3 = (val2+1.0f)/2.0f;
    float s = 0.0f;
    if(norm.y >0){
        s =val3/2.0f;
    }
    else if(norm.y == 0.0f){
        s=0.5f;
    }
    else{
        s = 0.5+((1.0f-val3)/2.0f);
    }
    FragColor = texture(ourTexture,vec2(s,1.0f-t));
    
}   
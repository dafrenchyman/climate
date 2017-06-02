precision mediump float;

uniform bool uUseLighting;
uniform sampler2D uSampler;

varying vec3 vAmbientColor;
varying vec3 vDirectionalColor;
varying vec3 vLightingDirection;

varying mat3 vNMatrix;
varying vec3 vLightWeighting;
varying vec4 vColor;
varying vec2 vTextureCoord;
varying vec3 vTransformedNormal;

varying vec3 vLightVector;
varying mat3 vTbn;
varying vec4 vPosition;

void main(void) {

    //gl_FragColor = vColor;
    //gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

    if (!uUseLighting)
    {
        gl_FragColor = vColor;
    } else {
        vec3 lightDirection = vLightVector; //normalize(uPointLightingLocation - vPosition.xyz);
        vec3 lightDirection_tangentSpace = vTbn * lightDirection;

        vec3 normalCoordinate = normalize(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb *2.0 - 1.0);

        vec3 normal = normalize(vTbn * normalCoordinate);

        float intensity = max(0.0, dot(normal, lightDirection));

        vec3 lighting = vAmbientColor + vDirectionalColor * intensity;

        gl_FragColor = vec4(vColor.rgb * lighting, vColor.a);


        //vec3 i = vTbn[0];

        //gl_FragColor = vec4(lightDirection_tangentSpace.xyz, vColor.a);

        //float directionalLightWeighting = max(dot(normalize(vTransformedNormal), lightDirection), 0.0);
        //vec3 lightWeighting = vAmbientColor + vDirectionalColor * directionalLightWeighting;
        //gl_FragColor = vec4(vColor.rgb * lightWeighting, vColor.a);



    }


}
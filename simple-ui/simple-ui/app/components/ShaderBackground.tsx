'use client';

import { useEffect, useState } from 'react';
import {
  Shader,
  SolidColor,
  Surface3D,
  DotGrid,
  Prism,
  LinearGradient,
  LiquidMetal,
} from 'shaders/react';

export default function ShaderBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-[#080808]" />;
  }

  return (
    <Shader toneMapping="aces" style={{ width: '100%', height: '100%', display: 'block' }}>
      <SolidColor color="#080808" />
      <Surface3D
        amplitude={0.31}
        cursorIntensity={0.83}
        edgePinning={0.4}
        farCutoff={0.12}
        frequency={1.8}
        height={0.31}
        highlights={6}
        lighting={29}
        lightX={-0.8}
        lightY={-0.95}
        octaves={1}
        tilt={73}
        zoom={1.1}
      >
        <DotGrid
          density={57}
          dotSize={{
            type: 'map',
            source: 'idmrf0jzpi1json7rda',
            channel: 'luminance',
            inputMin: 0,
            inputMax: 1,
            outputMin: 0,
            outputMax: 0.21,
            curve: 0.2,
          }}
          speed={0.91}
          visible={true}
        />
      </Surface3D>
      <Prism
        endFalloff={0.44}
        intensity={0.24}
        position={{ x: 1.01, y: 1.23 }}
        saturation={0.79}
        softness={0.001}
        speed={0.16}
        splitPosition={{ x: 0.99, y: 1.11 }}
        spread={3}
        startFalloff={0.64}
      />
      <LinearGradient
        id="idmrf0jzpi1json7rda"
        colorSpace="oklab"
        start={{ x: 0.5, y: 1.01 }}
        end={{ x: 0.5, y: 0.15 }}
        stops={[
          { color: '#ffffff', position: 0 },
          { color: '#000000', position: 1 },
        ]}
        visible={false}
      />
      <LiquidMetal
        center={{ x: 0.5, y: 0.45 }}
        lightColor="#1f1f1f"
        ripple={5.31}
        scale={1.17}
        shape='{"type":"metaballs3D","ballRadius":0.1,"spread":0.29,"blend":0.325,"speed":1,"rotX":0,"rotY":0,"rotZ":0}'
        shapeType="metaballs3D"
        turbulence={0.37}
      />
    </Shader>
  );
}

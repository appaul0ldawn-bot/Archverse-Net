
How to Mount It Over Your Assets Layout

Wrap your 3D models using React's <Suspense> node inside your main scene file viewports:
jsx
<Canvas>
  <ambientLight />
  <React.Suspense fallback={<ArchverseCanvasLoader />}>
    <MapStructureGLTF url="/assets/models/temple_core.glb" />
    <primitive object={google3DTilesMesh} />
  </React.Suspense>
</Canvas>

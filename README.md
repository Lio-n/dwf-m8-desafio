## Esquema de Router a seguir:

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="login">
          <Route index element={<Login />} />
          <Route path="password" element={<Password />} />
        </Route>

        <Route path="mis-datos" element={<MisDatos />} />

        <Route path="mis-mascotas">
          <Route index element={<MisMascotas />} />
          <Route path="editar" element={<EditarReporte />} />
        </Route>

        <Route path="reportar" element={<ReportarMascota />} />
      </Route>
    </Routes>

# Useful resources

https://mariestarck.com/how-to-display-popups-on-a-mapbox-map-mapbox-react-tutorial-part-3/
https://morioh.com/p/b23b78c2e88e
https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
https://visgl.github.io/react-map-gl/docs/api-reference/popup

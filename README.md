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

## Falta

### Añadir

#### El Mapa a la page 'Home'

- Guardar info en el localstorage, Que info voy a guardar?

- Darle funcionalidad al botton 'Cerrar Sesion'

### A la Carpeta ui or component

- CustomMarker y CustomPopup (?)

## Move

- ui/map to component/map
- component/showPets/CustomPopup to ui/CustomPopup

# Useful resources

https://mariestarck.com/how-to-display-popups-on-a-mapbox-map-mapbox-react-tutorial-part-3/
https://morioh.com/p/b23b78c2e88e
https://stackoverflow.com/questions/68783312/show-popup-for-only-one-marker-react-map-gl
https://visgl.github.io/react-map-gl/docs/api-reference/popup

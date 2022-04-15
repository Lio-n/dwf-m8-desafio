## Esquema de Router a seguir:

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />}>
          <Route path="/password" element={<Password />} />
        </Route>
        <Route path="mis-datos" element={<MisDatos />} />
        <Route path="mis-mascotas" element={<MisMascotas />}>
          <Route path="/editar" element={<EditarReporte />} />
        </Route>
        <Route path="reportar" element={<ReportarMascota />} />
      </Route>
    </Routes>

## Crear en ui

yarn add @types/node

- /logo
  Solo se lo utilizara para el logo de la page(favicon).
  <Logo />

- /icon
  Recibira el nombre del icon(usar type = {nombres..})
  <Icon nombre="add">

  actions = {
  add
  medify
  update
  }

### Input

- Type
  - "text"
  - "password"
  - "password"
    - Icon eye
      - eye_closed
      - eye_open

import React from 'react'
import Input from '../../UI/Input'
function DatosPersonales(props) {
  const {
    Nombres,
    Apellidos,
    Cedula,
    Provincia,
    FechaNacimiento,
    Email,
    controlInput,
    controlTab,
    ObservacionesPersonales
  } = props
  return (
    <div className="tab-content" id="myTabContent">
      <div className="row item">
        <div className="col-sm-6">
          <label><b>Nombres</b></label>
          <Input name="Nombres" value={Nombres} change={controlInput} />
        </div>
        <div className="col-sm-6">
          <label><b>Apellidos</b></label>
          <Input name="Apellidos" value={Apellidos} change={controlInput} />
        </div>
      </div>
      <div className="row item">
        <div className="col-sm-6">
          <label><b>Cédula (Valida)</b></label>
          <Input name="Cedula" value={Cedula} change={controlInput}/>
        </div>
        <div className="col-sm-6">
          <label><b>Provincia</b></label>
          <select id="inputState" className="form-control" name="Provincia" value={Provincia} onChange={controlInput} >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      <div className="row item">
        <div className="col-sm-6">
          <label><b>Fecha de Nacimiento</b></label>
          <input
            name="FechaNacimiento"
            className="form-control"
            type="date"
            id="example-date-input"
            value={FechaNacimiento}
            onChange={controlInput}
          />
        </div>
        <div className="col-sm-6">
          <label><b>Email (Valido)</b></label>
          <Input name="Email" value={Email} change={controlInput} />
        </div>
      </div>
      <div className="row item">
        <div className="col-sm-12">
          <label><b>Observaciones</b></label>
          <textarea 
            className="form-control" 
            aria-label="With textarea"
            value={ObservacionesPersonales}
            onChange={controlInput}
            ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 text-center">
          <button
            name='DatosLaborales' 
            className="btn btn-success"
            type="button"
            onClick={controlTab}
          >Continuar</button>
        </div>
        {/* <div className="col-sm-4 text-center">
          <button
            className="btn btn-warning"
            type="button"
            onClick={llamadaReporte}
            >Reporte</button>
        </div>
        <div className="col-sm-4 text-center">
          <button
            className="btn btn-danger"
            type="button">Salir</button>
        </div> */}
      </div>
    </div>
  )
}
export default DatosPersonales
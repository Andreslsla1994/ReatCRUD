import React from 'react'
import Input from '../../UI/Input'


function DatosLaborales(props) {
  const {
    FechaIngreso,
    Cargo,
    Departamento,
    ProvinciaLaboral,
    Sueldo,
    JornadaParcial,
    controlInput,
    controlGuardar,
    controlInputNumeros,
    controlFocus,
    ObservacionesLaborales,
    provinciasData,
    action
    } = props
    return (
    <div className="tab-content" id="myTabContent">
      <div className="row item">
        <div className="col-sm-6">
          <label><b>Fecha Ingreso</b></label>
          <input
            name="FechaIngreso"
            className="form-control"
            type="date"
            id="example-date-input"
            value={FechaIngreso}
            onChange={controlInput}
          />
        </div>
        <div className="col-sm-6">
          <label><b>Cargo</b></label>
          <Input name="Cargo" value={Cargo} change={controlInput} />
        </div>
      </div>
      <div className="row item">
        <div className="col-sm-6">
          <label><b>Departamento</b></label>
          <Input name="Departamento" value={Departamento} change={controlInput} />
        </div>
        <div className="col-sm-6">
          <label><b>Provincia</b></label>
          <select id="inputState" className="form-control" name="ProvinciaLaboral" value={ProvinciaLaboral} onChange={controlInput} >
            <option value="">SELECCIONAR...</option>
            {
              provinciasData.map((item, index) => {
                return <option key={item.id_provincia} value={item.id_provincia}>{item.nombre_provincia}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className="row item">
        
        <div className="col-sm-4">
          <b>Sueldo</b>
          <input type="text" onFocus={controlFocus} className="form-control" name="Sueldo" value={Sueldo}  onChange={controlInputNumeros} placeholder="0.00"/>
        </div>
        <div className="col-sm-2">
        <b></b>
          <label><b><h2>USD</h2></b></label>
        </div>
        <div className="col-sm-6">
          <b>Jornanda Parcial</b>
          <div className="info checkModal">
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="radio" 
                name="JornadaParcial" 
                value="true" 
                checked={JornadaParcial === 'true' || JornadaParcial===1}
                onChange={controlInput} />
              <label className="labelModal" htmlFor="inlineRadio1">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="radio" 
                name="JornadaParcial" 
                value="false"
                checked={JornadaParcial === 'false'|| JornadaParcial===0}
                onChange={controlInput}/>
              <label className="labelModal" htmlFor="inlineRadio2">No</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row item">
        <div className="col-sm-12">
          <label><b>Observaciones</b></label>
          <textarea 
            className="form-control" 
            aria-label="With textarea"
            name="ObservacionesLaborales"
            value={ObservacionesLaborales}
            onChange={controlInput}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 text-center">
          <button
            className="btn btn-success"
            type="button"
            onClick={(e)=>controlGuardar(e, action)}
          >{(action === 'Crear')?'Crear':'Actualizar'}</button>
        </div>
      </div>
    </div>
  )
}


export default DatosLaborales
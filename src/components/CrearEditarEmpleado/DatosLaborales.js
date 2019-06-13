import React from 'react'
import Input from '../../UI/Input'
import PropTypes from 'prop-types';


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
    ObservacionesLaborales
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
            defaultValue={FechaIngreso}
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
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
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
                checked={JornadaParcial === 'true'}
                onChange={controlInput} />
              <label className="labelModal" htmlFor="inlineRadio1">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="radio" 
                name="JornadaParcial" 
                value="false" 
                checked={JornadaParcial === 'false'}
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
            value={ObservacionesLaborales}
            onChange={controlInput}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 text-center">
          <button
            className="btn btn-success"
            type="button"
            onClick={controlGuardar}
          >Guardar</button>
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

DatosLaborales.propTypes = {
  FechaIngreso:PropTypes.string,
  Cargo:PropTypes.string,
  Departamento:PropTypes.string,
  ProvinciaLaboral:PropTypes.string,
  Sueldo:PropTypes.number,
  JornadaParcial:PropTypes.string,
  controlInput:PropTypes.string,
  controlGuardar:PropTypes.string,
  controlInputNumeros:PropTypes.string,
  controlFocus:PropTypes.string,
  ObservacionesLaborales:PropTypes.string,
  };
export default DatosLaborales
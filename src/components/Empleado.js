import React from 'react'
import Modal from '../UI/Modal'
import CrearEditarEmpleado from './CrearEditarEmpleado/CrearEditarEmpleado'
import Datatable from '../UI/Datatable'
import Input from '../UI/Input'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

function Empleado(props) {
  const {
    Nombre,
    Codigo,
    headers,
    fullData,
    controlInput,
    controlBuscar,
    modalShow,
    controlModal,
    provinciasData,
    peticionServicios
  } = props
  return (
    <div>
      {/* Buscador */}
      <div className="row">
        <div className="col-sm-4">
          <label><b>Nombre</b></label>
          <Input name="Nombre" value={Nombre} change={controlInput} />
        </div>
        <div className="col-sm-4">
          <label><b>Código Empleado</b></label>
          <Input name="Codigo" value={Codigo} change={controlInput} />
        </div>
        <div className="col-sm-4 text-center align-self-center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={controlBuscar}>BUSCAR</button>
        </div>
      </div>

      {/* Tabla de datos  */}
      <div className="row dataset">
        <div className="col-sm-12">
          <Datatable headers={headers} fullData={fullData} provinciasData={provinciasData} peticionServicios={peticionServicios}/>
        </div>
      </div>

      {/* Botones */}
      <div className="row">
        <div className="col-sm-4 text-center">
          <button
            className="btn btn-success"
            type="button"
            // onClick={() => (props.history.push('/CrearEmpleado'))}
            onClick={controlModal}
          >Crear</button>
        </div>
        <div className="col-sm-4 text-center">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => props.history.push('/Reporte')}
          >Reporte</button>
        </div>
        <div className="col-sm-4 text-center">
          <button
            className="btn btn-danger"
            type="button">Salir</button>
        </div>
      </div>

      <Modal title="Crear Empleado" show={modalShow} controlModal={controlModal}>
        <CrearEditarEmpleado
          provinciasData={provinciasData}
          action="Crear"
          controlModal={controlModal}
          peticionServicios={peticionServicios}/>
      </Modal>
    </div>
  )
}
Empleado.propTypes = {
  Nombre: PropTypes.string,
  Codigo: PropTypes.string,
  headers: PropTypes.array,
  fullData: PropTypes.array,
  controlInput: PropTypes.func,
  controlBuscar: PropTypes.func,
  modalShow: PropTypes.bool,
  controlModal:PropTypes.func
};
Empleado.preventDefault = {
  Nombre: "",
  Codigo: "",
  headers: [],
  fullData: []
}

export default withRouter(Empleado)

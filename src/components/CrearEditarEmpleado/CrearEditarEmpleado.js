import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../../styles/Formulario.css'
import DatosPersonales from './DatosPersonales'
import DatosLaborales from './DatosLaborales'
import axios from 'axios';
export class CrearEditarEmpleado extends Component {
  state = {
    Codigo:0,
    Nombres: '',
    Apellidos: '',
    Cedula: '',
    Provincia: '',
    FechaNacimiento: '',
    Email: '',
    FechaIngreso: '',
    Cargo: '',
    Departamento: '',
    ProvinciaLaboral: '',
    Sueldo: 0,
    SueldoOriginal: 0,
    JornadaParcial: 'true',
    ObservacionesPersonales: '',
    ObservacionesLaborales: '',
    tabEmpleado: 'DatosPersonales'
  }
  controlFocus = (event) => event.target.select();
  controlInput = (event) => {
    const { target } = event;
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  //Controla cuando el componente reciba datos que se presentarán en pantalla
  componentWillReceiveProps(newProps) {
    const oldProps = this.props
    if (oldProps !== newProps && newProps.action === 'Editar') {
      let data = newProps.dataSelected

      this.setState({
        Codigo: data.id_empleado,
        Nombres: data.Nombres,
        Apellidos: data.Apellidos,
        Cedula: data.Cedula,
        Provincia: data.Provincia,
        FechaNacimiento: data.FechaNacimiento,
        Email: data.Email,
        FechaIngreso: data.FechaIngreso,
        Cargo: data.Cargo,
        Departamento: data.Departamento,
        ProvinciaLaboral: data.ProvinciaLaboral,
        Sueldo: data.Sueldo,
        SueldoOriginal: data.SueldoOriginal,
        JornadaParcial: data.JornadaParcial,
        ObservacionesPersonales: (data.ObservacionesPersonales===null)?'':data.ObservacionesPersonales,
        ObservacionesLaborales: (data.ObservacionesLaborales===null)?'':data.ObservacionesLaborales
      })
    }
  }

  controlInputNumeros = (event) => {
    const target = event.target;
    const name = target.name;
    const re = /^[0-9]*\.?[0-9]*$/;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (value === '' || re.test(value)) {
      let valor = parseFloat(value).toFixed(2)
      this.setState({
        [name]: value,
        SueldoOriginal: valor
      })
    }
  }
  controlTab = (event) => {
    event.preventDefault()
    const { target } = event;
    const { name } = target
    this.setState({
      tabEmpleado: name
    })

  }
  controlGuardar = (event, action) => {
    let url = `${process.env.REACT_APP_API_URL}/proveedatos/public/api/${(action==="Crear")?'insertarEmpleado':`editarEmpleado/${this.state.Codigo}`}`
    if (this.controlFormulario()) {
      if (this.validaCedula() ) {
        if(this.validaEmail()){
          axios.post(url, null, {
            params: {
              Nombres: this.state.Nombres,
              Apellidos: this.state.Apellidos,
              Cedula: this.state.Cedula,
              Provincia: this.state.Provincia,
              FechaNacimiento: this.state.FechaNacimiento,
              Email: this.state.Email,
              FechaIngreso: this.state.FechaIngreso,
              Cargo: this.state.Cargo,
              Departamento: this.state.Departamento,
              ProvinciaLaboral: this.state.ProvinciaLaboral,
              Sueldo: this.state.Sueldo,
              JornadaParcial: (this.state.JornadaParcial==='true')?1:0,
              ObservacionesPersonales: (this.state.ObservacionesPersonales === null)?"":this.state.ObservacionesPersonales,
              ObservacionesLaborales: (this.state.ObservacionesLaborales === null) ? "":this.state.ObservacionesLaborales
            }
          }).then(res => {
            let mensage = res.data
            if(mensage === 'OK'){
              this.props.peticionServicios()
              this.props.controlModal()
            }else{
              if(action === 'Crear'){
                alert(mensage)
              }else{
                this.props.peticionServicios()
                this.props.controlModal()
              }
              
            }
          }).catch(err => {
              console.log(err)
              this.props.controlModal()
          });
        }else{
          alert('Email no valido')
        }
      }else{
        alert('Cedula no valida')
      }
    } else {
      alert('Debe llenar todos los campos')
    }
  }
  controlFormulario = () => {
    const {
      Nombres,
      Apellidos,
      Cedula,
      Provincia,
      FechaNacimiento,
      Email,
      FechaIngreso,
      Cargo,
      Departamento,
      ProvinciaLaboral,
      SueldoOriginal,
      JornadaParcial
    } = this.state
    if (
      Nombres === '' || Apellidos === '' || Cedula === '' || Provincia === '' ||
      FechaNacimiento === '' || Email === '' || FechaIngreso === '' || Cargo === '' ||
      Departamento === '' || ProvinciaLaboral === '' || SueldoOriginal === 0 || JornadaParcial === ''
    ) {
      return false
    }

    return true
  }

  llamadaReporte = () => {
    this.props.history.push('/Reporte')
  }

  //Validaciones
  validaCedula = () => {
    let cedula = this.state.Cedula
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length === 10) {

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      let digito_region = cedula.substring(0, 2);

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {

        // Extraigo el ultimo digito
        let ultimo_digito = cedula.substring(9, 10);

        //Agrupo todos los pares y los sumo
        let pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let ced = cedula.substring(0, 1);
        let numero1 = (ced * 2);
        if (numero1 > 9) {  numero1 = (numero1 - 9); }

        ced = cedula.substring(2, 3);
        let numero3 = (ced * 2);
        if (numero3 > 9) {  numero3 = (numero3 - 9); }

        ced  = cedula.substring(4, 5);
        let numero5 = (ced * 2);
        if (numero5 > 9) {  numero5 = (numero5 - 9); }

        ced = cedula.substring(6, 7);
        let numero7 = (ced * 2);
        if (numero7 > 9) {  numero7 = (numero7 - 9); }

        ced= cedula.substring(8, 9);
        let numero9 = (ced * 2);
        if (numero9 > 9) {  numero9 = (numero9 - 9); }

        let impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        let suma_total = (pares + impares);

        //extraemos el primero digito
        let primer_digito_suma = String(suma_total).substring(0, 1);

        //Obtenemos la decena inmediata
        let decena = (parseInt(primer_digito_suma) + 1) * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digito_validador = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador == 10)
          digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if (digito_validador == ultimo_digito) {
          
          return true
        } else {
          return false
        }

      } else {
        // imprimimos en consola si la region no pertenece
        console.log('Esta cedula no pertenece a ninguna region')
        return false
      }
    } else {
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      console.log('Esta cedula tiene menos de 10 Digitos');
      return false
    }
  }
  validaEmail = () => {
    let valor = this.state.Email
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if (emailRegex.test(valor)) {
      return true
    } else {
      return false
    }
  }


  render() {
    const {
			Nombres,
      Apellidos,
      Cedula,
      Provincia,
      FechaNacimiento,
      Email,
      FechaIngreso,
      Cargo,
      Departamento,
      ProvinciaLaboral,
      Sueldo,
      JornadaParcial,
      tabEmpleado,
      ObservacionesPersonales,
      ObservacionesLaborales
    } = this.state
    const {provinciasData} = this.props

    return (
      <div className="wrapper">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              name='DatosPersonales'
              className={`nav-link ${(tabEmpleado === 'DatosPersonales') ? 'active' : ''}`}
              href="#"
              onClick={this.controlTab}
            >Datos Personales</a>
          </li>
          <li className="nav-item">
            <a
              name='DatosLaborales'
              className={`nav-link ${(tabEmpleado !== 'DatosPersonales') ? 'active' : ''}`}
              href="#"
              onClick={this.controlTab}
            >Datos Laborales</a>
          </li>
        </ul>
        {
          (tabEmpleado === 'DatosPersonales')
            ? <DatosPersonales
              Nombres={Nombres}
              Apellidos={Apellidos}
              Cedula={Cedula}
              Provincia={Provincia}
              FechaNacimiento={FechaNacimiento}
              Email={Email}
              controlInput={this.controlInput}
              controlTab={this.controlTab}
              ObservacionesPersonales={ObservacionesPersonales}
              history={this.props.history}
              llamadaReporte={this.llamadaReporte}
              provinciasData={provinciasData}
            />
            : <DatosLaborales
              FechaIngreso={FechaIngreso}
              Cargo={Cargo}
              Departamento={Departamento}
              ProvinciaLaboral={ProvinciaLaboral}
              Sueldo={Sueldo}
              JornadaParcial={JornadaParcial}
              controlInput={this.controlInput}
              controlGuardar={this.controlGuardar}
              controlInputNumeros={this.controlInputNumeros}
              controlFocus={this.controlFocus}
              ObservacionesLaborales={ObservacionesLaborales}
              llamadaReporte={this.llamadaReporte}
              provinciasData={provinciasData}
              action={this.props.action}
            />
        }

      </div>
    )
  }
}

export default withRouter(CrearEditarEmpleado)


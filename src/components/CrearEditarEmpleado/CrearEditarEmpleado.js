import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../../styles/Formulario.css'
import DatosPersonales from './DatosPersonales'
import DatosLaborales from './DatosLaborales'
import PropTypes from 'prop-types';
export class CrearEditarEmpleado extends Component {
  state = {
    Nombres: '',
    Apellidos: '',
    Cedula: '',
    Provincia: '',
    FechaNacimiento: '01/01/1990',
    Email: '',
    FechaIngreso: '01/01/1990',
    Cargo: '',
    Departamento: '',
    ProvinciaLaboral: '',
    Sueldo: 0,
    SueldoOriginal: 0,
    JornadaParcial: '',
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
  GetFormattedDate = (date) => {
    let time = new Date(date)
    let dd = time.getDay();
    let mm = time.getMonth() + 1; //January is 0!

    let yyyy = time.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let today = yyyy + '-' + mm + '-' + dd;
    
    return today
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props
    if (oldProps !== newProps && newProps.action === 'Editar') {
      let data = newProps.dataSelected
      let fechaNacimiento = this.GetFormattedDate(data.FechaNacimiento)
      let fechaIngreso = this.GetFormattedDate(data.FechaIngreso)
      
      this.setState({
        Nombres: data.Nombres,
        Apellidos: data.Apellidos,
        Cedula: data.Cedula,
        Provincia: data.Provincia,
        FechaNacimiento: fechaNacimiento,
        Email: data.Email,
        FechaIngreso: fechaIngreso,
        Cargo: data.Cargo,
        Departamento: data.Departamento,
        ProvinciaLaboral: data.ProvinciaLaboral,
        Sueldo: data.Sueldo,
        SueldoOriginal: data.SueldoOriginal,
        JornadaParcial: data.JornadaParcial,
        ObservacionesPersonales: data.ObservacionesPersonales,
        ObservacionesLaborales: data.ObservacionesLaborales
      })
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.action === 'Editar') {
  //     let data = nextProps.dataSelected
  //     let fechaNacimiento = CrearEditarEmpleado.GetFormattedDate(data.FechaNacimiento)
  //     let fechaIngreso = CrearEditarEmpleado.GetFormattedDate(data.FechaIngreso)
  //     return {
  //       Nombres: data.Nombres,
  //       Apellidos: data.Apellidos,
  //       Cedula: data.Cedula,
  //       Provincia: data.Provincia,
  //       FechaNacimiento: fechaNacimiento,
  //       Email: data.Email,
  //       FechaIngreso: fechaIngreso,
  //       Cargo: data.Cargo,
  //       Departamento: data.Departamento,
  //       ProvinciaLaboral: data.ProvinciaLaboral,
  //       Sueldo: data.Sueldo,
  //       SueldoOriginal: data.SueldoOriginal,
  //       JornadaParcial: data.JornadaParcial,
  //       ObservacionesPersonales: data.ObservacionesPersonales,
  //       ObservacionesLaborales: data.ObservacionesLaborales
  //     }
  //     return null
  //   }
  // }
  controlInputNumeros = (event) => {
    const target = event.target;
    const name = target.name;
    const re = /^[0-9]*\.?[0-9]*$/;

    let value = target.type === 'checkbox' ? target.checked : target.value;
    let valueOriginal = value


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
  controlGuardar = (event) => {
    const { target } = event;
    if (this.controlFormulario()) {
      if (this.validaCedula() && this.validaEmail()) {
        console.log('valido')
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
    if (cedula.length == 10) {

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      var digito_region = cedula.substring(0, 2);

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {

        // Extraigo el ultimo digito
        var ultimo_digito = cedula.substring(9, 10);

        //Agrupo todos los pares y los sumo
        var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1 = cedula.substring(0, 1);
        var numero1 = (numero1 * 2);
        if (numero1 > 9) { var numero1 = (numero1 - 9); }

        var numero3 = cedula.substring(2, 3);
        var numero3 = (numero3 * 2);
        if (numero3 > 9) { var numero3 = (numero3 - 9); }

        var numero5 = cedula.substring(4, 5);
        var numero5 = (numero5 * 2);
        if (numero5 > 9) { var numero5 = (numero5 - 9); }

        var numero7 = cedula.substring(6, 7);
        var numero7 = (numero7 * 2);
        if (numero7 > 9) { var numero7 = (numero7 - 9); }

        var numero9 = cedula.substring(8, 9);
        var numero9 = (numero9 * 2);
        if (numero9 > 9) { var numero9 = (numero9 - 9); }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = (pares + impares);

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0, 1);

        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador == 10)
          var digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if (digito_validador == ultimo_digito) {
          console.log('la cedula:' + cedula + ' es correcta');
          return true
        } else {
          console.log('la cedula:' + cedula + ' es incorrecta');
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
            />
        }

      </div>
    )
  }
}
CrearEditarEmpleado.propTypes = {
  action: PropTypes.string
};
export default withRouter(CrearEditarEmpleado)


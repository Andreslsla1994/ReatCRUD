import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Empleado from './components/Empleado'
import Reporte from './components/Reporte'
import axios from 'axios';
import {URL} from './Config'



class App extends Component {
  state = {
    Nombre: "",
    Codigo: "",
    headers: [],
    fullData: [],
    provincias:[],
    modalShow: false
  }
  controlInput = (event) => {
    const { target } = event;
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }
  controlBuscar = (event) => {
    //Verifica si loca campos de busqueda fueron llenados
    
    if(this.state.Codigo === '' && this.state.Nombre ===''){
      this.peticionServicios()
    }else{
      axios.post(`${URL}/api/obtenerEmpleado`, null, {
        params: {
          id_empleado: this.state.Codigo,
          Nombres: this.state.Nombre
        }
      })
        .then(res => {
          let fullData = res.data;
          this.setState(() => ({
            fullData,
            Codigo:'',
            Nombre:''
          }))
        }).catch(err => {
          console.log(err)
      });
    }
    
  }

  peticionServicios=()=>{
    axios.all([
      axios.get(`${URL}/api/obtenerEmpleados`, {
      }),
      axios.get(`${URL}/api/obtenerProvincias`, {
      })
    ]).then(axios.spread((empleadosData, provinciasData) => {
      let fullData = empleadosData.data;
      let provincias = provinciasData.data;
      
      if (fullData.length > 0 && provincias.length > 0) {
        let headers = []
        let _header = fullData[0]
        Object.keys(_header).forEach(function (key) {
          headers.push(key)
        })
        this.setState(() => ({
          fullData,
          headers,
          provincias
        }))
      }else{
        this.setState(() => ({
          provincias
        }))
      }
    })).catch(err => { console.log(err) });
  }
  componentDidMount() {
      this.peticionServicios()
  }
  controlModal = () => {
    //Actualiza los datos cada vez que se cierre el modal
    if(this.state.modalShow){
      //Realiza una actualizacion de datos cada vez que se cierre el modal
      this.peticionServicios()
    }
    this.setState((prevState) => ({
      modalShow: !prevState.modalShow
    }))
  }

  render() {
    const { Nombre, Codigo, headers, fullData, modalShow, provincias } = this.state
    return (
      <div className="container">
        <div className="row text-center mainTitle">
          <div className="col-sm-12">
            <h2 className="title">Módulo de Empleados</h2>
          </div>
        </div>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/Empleado" />
            <Route
              path="/Empleado"
              exact
              render={(history) => 
              <Empleado
                history={history}
                Nombre={Nombre}
                Codigo={Codigo}
                headers={headers}
                fullData={fullData}
                controlInput={this.controlInput}
                controlBuscar={this.controlBuscar}
                modalShow={modalShow}
                controlModal={this.controlModal}
                provinciasData={provincias}
                peticionServicios={this.peticionServicios}
                />} />
            <Route
              path="/Reporte"
              render={(history) => <Reporte history={history} />} />
          </Switch>
        </Router>

      </div>
    )
  }
}

export default App;

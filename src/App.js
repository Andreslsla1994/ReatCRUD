import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Empleado from './components/Empleado'
import CrearEditarEmpleado from './components/CrearEditarEmpleado/CrearEditarEmpleado'
import Reporte from './components/Reporte'
import axios from 'axios';


class App extends Component {
  state={
    Nombre:"",
    Codigo:"",
    headers:[],
    fullData:[],
    modalShow:false
  }
  controlInput = (event) => {
    const { target } = event;
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }
  controlBuscar = (event) => {
    console.log(this.state)
    axios.post(`http://127.0.0.1:5000/voucherBuscar`,null, {
      params:{
        codigo:this.state.Codigo,
        usuario:this.state.Nombre
      }  
    })
      .then(res => {
      let fullData = res.data;
      console.log(fullData)
      this.setState(() => ({
        fullData
      }))
    }).catch(err=>{
      console.log(err)
    });
  }

  componentDidMount(){
    axios.post(`http://127.0.0.1:5000/voucherTest`, {
    })
      .then(res => {
      let fullData = res.data;
      let headers = []
      let _header = fullData[0]
      Object.keys(_header).forEach(function (key) {
        headers.push(key)
      })
      this.setState(() => ({
        fullData,
        headers
      }))
    }).catch(err=>{
      console.log(err)
    });
  }
  controlModal=()=>{
    this.setState((prevState) => ({
      modalShow:!prevState.modalShow
    }))
  }

  render(){
    const {Nombre, Codigo, headers, fullData, modalShow} = this.state
    return (
      <div className="container">
        <div className="row text-center mainTitle">
          <div className="col-sm-12">
            <h2 className="title">Módulo de Empleados</h2>
          </div>
        </div>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/Empleado"/>
            <Route
              path="/Empleado" 
              exact 
              render={(history)=><Empleado 
                            history={history}
                            Nombre={Nombre}
                            Codigo={Codigo}
                            headers={headers}
                            fullData={fullData}
                            controlInput={this.controlInput}
                            controlBuscar={this.controlBuscar}
                            modalShow={modalShow}
                            controlModal={this.controlModal}/>}/>
            <Route
              path="/Reporte"
              render={(history)=><Reporte history={history}/>}/>
          </Switch>
        </Router>
        
      </div>
    )
  }
}

export default App;

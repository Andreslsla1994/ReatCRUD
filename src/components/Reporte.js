import React, { Component } from 'react'
import { URLService } from '../Constantes'
import axios from 'axios';
import Modal from '../UI/Modal'
import CrearEditarEmpleado from '../components/CrearEditarEmpleado/CrearEditarEmpleado'




class Reporte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      headers: [],
      dataSelected: [],
      modalShow: false
    };
  }

  controlModal=()=>{
    this.setState((prevState) => ({
      modalShow:!prevState.modalShow
    }))
  }
  componentDidMount() {
    axios.all([
      axios.get(`${URLService}/proveedatos/public/api/obtenerEmpleados`, {
      })
    ]).then(axios.spread((empleadosData) => {
      let fullData = empleadosData.data;
      
      if (fullData.length > 0 ) {
        let headers = []
        let _header = fullData[0]
        Object.keys(_header).forEach(function (key) {
          headers.push(key)
        })

        this.setState(() => ({
          fullData,
          headers
        }))
      }
    })).catch(err => { console.log(err) });
  }
  ordenarLista = (event) => {
    const { target } = event
    const { dataset } = target
    const { value } = dataset
    let fullData = this.state.fullData
    let sortedArray = [...fullData]
    sortedArray.sort((a, b) => (a[value] < b[value])? 1: ((b[value] < a[value])? -1: 0))
    if(JSON.stringify(fullData) === JSON.stringify(sortedArray)){
      fullData.reverse()
    }else{
      fullData = sortedArray
    }

    this.setState(() => ({
      fullData
    }))
  }
  constrolaSalida=()=>{
    this.props.history.history.push('/Empleado')
  }
  controlaItem = (event, index) => {
    let fullData = this.state.fullData
    let dataSelected = fullData[index]
    this.setState(() => ({
      modalShow:true,
      dataSelected
    }))
  }

  render() {
    let { fullData, headers, dataSelected, modalShow } = this.state
    return (
      <div >
        <div className="dataset">
          <table className="table table-striped dataset">
            <thead>
              <tr>
                {
                  headers.map((item, index) => {
                    return <th
                      key={index}
                      scope="col"
                      data-value={item}
                      data-sort=""
                      onClick={this.ordenarLista}
                      className="cursor">
                      {item}
                    </th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                fullData.map((item, index) => {
                  return (
                    <tr key={index} onClick={(e) => this.controlaItem(e, index)}>
                      {
                        headers.map((key, index) => {
                          return <td key={key}>{item[key]}</td>
                        })
                      }
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
          
          <Modal title="Editar Empleado" show={modalShow} controlModal={this.controlModal}>
            <CrearEditarEmpleado
              action="Editar"
              dataSelected={dataSelected} />
          </Modal>
        </div>
        <div className="row">
            <div className="col-sm-12 text-center">
              <button
                className="btn btn-danger"
                type="button"
                onClick={this.constrolaSalida}
                >Salir</button>
            </div>
          </div>
      </div>
    )
  }
}



export default Reporte

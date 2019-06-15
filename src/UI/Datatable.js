import React, { Component } from 'react'
import '../styles/Datatable.css'
import Modal from './Modal'
import CrearEditarEmpleado from '../components/CrearEditarEmpleado/CrearEditarEmpleado'
class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      headers: [],
      table: [],
      dataSelected: [],
      paginacion: 0,
      modalEdit:false
    };
  }

  //Separa el arreglo de datos para paginarlos 
  static chunkArray = (myArray, chunk_size) => {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    let myChunk;
    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  }
  static getDerivedStateFromProps(nextProps, prevState){ 
    if (nextProps.fullData.length > 0) {
      let data = nextProps.fullData
      let fullData = Datatable.chunkArray(data, 10)
      let table = fullData[prevState.paginacion]
      return {
        table: table,
        fullData:fullData
      }
      
    }
    return null
  }
  controlModal=()=>{
    this.setState((prevState) => ({
      modalEdit:!prevState.modalEdit
    }))
  }
  controlaPaginacion = (e) => {
    e.preventDefault()
    let paginacion = e.target.name - 1
    let table = this.state.fullData[paginacion]
    this.setState({
      table,
      paginacion
    })
  }
  controlaBotonesPaginacion = (e) => {
    e.preventDefault()
    let sizeData = this.state.fullData.length
    let paginacion = (e.target.name === 'Next') ? this.state.paginacion + 1 : this.state.paginacion - 1
    if (paginacion > -1 && paginacion < sizeData) {
      let table = this.state.fullData[paginacion]
      this.setState({
        table,
        paginacion
      })
    }
  }

  //Abre modal para editar los datoss
  controlaItem = (event, index) => {
    let table = this.state.table
    let dataSelected = table[index]
    this.setState(() => ({
      modalEdit:true,
      dataSelected
    }))
  }
  render() {
    let { fullData, table, modalEdit, dataSelected } = this.state
    const { headers, provinciasData, peticionServicios } = this.props
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              {
                headers.map((index) => {
                  return <th key={index} scope="col">{index}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              table.map((item, index) => {
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
        <div className="pagination">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item ">
                <a
                  className="page-link"
                  href="#"
                  name="Prev"
                  onClick={this.controlaBotonesPaginacion}>Previous</a>
              </li>

              {
                fullData.map((item, index) => {
                  return (
                    <li className="page-item" key={index}>
                      <a
                        className="page-link"
                        href="#"
                        name={index + 1}
                        onClick={this.controlaPaginacion}>

                        {index + 1}</a>
                    </li>
                  )
                })
              }

              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  name="Next"
                  onClick={this.controlaBotonesPaginacion}>Next</a>
              </li>
            </ul>
          </nav>
        </div>
        <Modal title="Editar Empleado" show={modalEdit} controlModal={this.controlModal}>
          <CrearEditarEmpleado
            provinciasData={provinciasData}
            action="Editar"
            dataSelected={dataSelected} 
            controlModal={this.controlModal}
            peticionServicios={peticionServicios}/>
        </Modal>
      </div>
    )
  }
}
Datatable.preventDefault = {
  headers:[],
  fullData:[]
}

export default Datatable



import React, { Component } from 'react';


class App extends Component{
  
  constructor(){
    super();
    this.state={
       tipo: '',
       texto:'',
       saludos:[],
       _id:''
    };

    this.addSaludo= this.addSaludo.bind(this);
    this.manejarCambio= this.manejarCambio.bind(this);
  
  
  }



  addSaludo(e){
   
    if(this.state._id){
      fetch(`http://localhost:8080/api/saludos/${this.state._id}`, {
        method:'PUT',
        body:JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
       
      this.setState({tipo:'', texto:'', _id:''});
      this.obtenerSaludos();
      
    
    } else{
        fetch('http://localhost:8080/api/saludos',{
          method:'POST',
          body:JSON.stringify(this.state),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
       })
     
         this.setState({tipo:'', texto:''});
         this.obtenerSaludos();
         
      }
    }
   
   
  componentDidMount(){
    this.obtenerSaludos();
  }

  obtenerSaludos(){
    fetch('http://localhost:8080/api/saludos')
        .then(res=>res.json())
        .then(data=> this.setState({saludos: data}));
  }

  editarSaludo(id){
    fetch(`http://localhost:8080/api/saludos/${id}`)
        .then(res => res.json())
        .then(data =>this.setState({
              tipo:data.tipo,
              texto:data.texto,
              _id: data.id

             })
          )
   this.obtenerSaludos();
  }

  eliminarSaludo(id){
    fetch(`http://localhost:8080/api/saludos/${id}`,{
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json'
      }
    })
   this.obtenerSaludos();
  }

  manejarCambio(e){
    const {name,value} = e.target;
    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <div>
        {/* Navegación */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo center" href="/">CRUD Spring and React</a>
          </div>
        </nav>
      
      
        <div className="container">
           <div className="row">
             <div className="col s5">
               <div className="card">
                 <div className="card-content">
                   
                   <form onSubmit={this.addSaludo}>
                     <div className="row">
                       <div className="input-field col s12">
                         <input name="tipo" onChange={this.manejarCambio}  type="text" placeholder="Tipo de Saludo" value={this.state.tipo} />
                       </div>
                     </div>
                     <div className="row">
                       <div className="input-field col s12">
                       <input name="texto" onChange={this.manejarCambio} type="text" placeholder="Saludo" value={this.state.texto} />
                       </div>
                     </div>
                     <button type="submit" className="btn light-blue darken-4">
                        Enviar
                     </button>
                   </form>
                 
                 </div> 
               </div> 

             </div>
             
             <div className="col s7"> 
                <table>
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Saludo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.saludos.map(saludo => {
                        return(
                          <tr key={saludo.id}>
                            <td>{saludo.tipo}</td>
                            <td>{saludo.texto}</td>
                            <td>
                              <button className="btn light-blue darken-4" onClick={() => this.editarSaludo(saludo.id)}>
                                <i className="material-icons">edit</i></button>
                              <button className="btn light-blue darken-4"  onClick={() => this.eliminarSaludo(saludo.id)} style={{margin: '4px'}}>
                                <i className="material-icons">delete</i></button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

             </div>
           </div> 

        </div>
    </div>
   
    )
  }
}
export default App;

import React, { useState } from 'react'
import uniqid from 'uniqid'

const Listadonombres = () => {

    const [nombre, setNombre] = useState('');
    const [listanombres, setlistaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState();
    const [error, setError] = useState(null)

    const addNombre = (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setError('el campo nombre esta vacio')
            return
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setlistaNombres([...listanombres, nuevoNombre]);
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) => {
        const nuevoArray = listanombres.filter(item => item.id !== id)
        setlistaNombres(nuevoArray)
    }

    const editar = (item) => {
        setModoEdicion(true);
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = (e) => {
        e.preventDefault();
        const nuevoArray = listanombres.map(item => item.id === id ? { id: id, tituloNombre: nombre } : item)
        setlistaNombres(nuevoArray)
        setModoEdicion(false)
        setNombre('')
    }

    return (
        <div>
            <h1>Aplicacion de CRUD basica</h1>
            <div className='row'>
                <div className='col'>
                    <h2>Listado de nombres</h2>
                    <ul className='list-group'>
                        {
                            listanombres.map((item) =>
                                <li key={item.id} className='list-group-item'>
                                    {item.tituloNombre}
                                    <button className="btn btn-danger float-end" value="eliminar" onClick={() => { deleteNombre(item.id) }}>eliminar</button>

                                    <button className="btn btn-info float-end" value="eliminar" onClick={() => { editar(item) }}>editar</button>
                                </li>)
                        }
                    </ul>
                </div>
                <div className='col'>
                    <h2>Formulario para añadir nombres</h2>
                    <form className='form-group' onSubmit={modoEdicion ? editarNombre : addNombre}>
                        <input className='form-control' type="text" value={nombre} id="" placeholder='introduce el nombre' onChange={(e) => setNombre(e.target.value)} />

                        <input className='btn btn-info btn-block' type="submit" value={modoEdicion ? "Editar Nombre" : "Registrar Nombre"} />
                    </form>
                    {
                        error != null ? (
                            <div className='alert alert-danger'>
                                {error}
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Listadonombres
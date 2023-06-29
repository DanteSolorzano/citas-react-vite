import {useState, useEffect} from 'react';
import Error from './Error';
import React from 'react'

const Formulario = ( {pacientes, setPacientes, paciente, setPaciente} ) => {
  const [nombre, setNombre] = useState('');
  const [dueño, setDueño] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setDueño(paciente.dueño)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    } 
  }, [paciente])


  

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion de formulario
    if ([ nombre, dueño, email, fecha, sintomas ].includes('') ) {
        console.log('Hay al menos un campo vacio')

        setError(true)
        return;
    }

    setError(false)


    //obejto de paciente

    const objetoPaciente = {
        nombre, 
        dueño, 
        email,
        fecha,
        sintomas,       
    }

    if(paciente.id) {
        //editando el registro
        objetoPaciente.id = paciente.id
        console.log(objetoPaciente)
        console.log(paciente)


        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

        setPacientes(pacientesActualizados)
        setPaciente({})

    } else {
        //nuevo registro
        objetoPaciente.id = generarId()
        setPacientes([...pacientes, objetoPaciente])
    }

    // console.log(objetoPaciente)



    ///reiniciar form
    setNombre('')
    setDueño('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  

   



  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
     <h2 className='font-black text-3xl text-center'>Seguimiento de pacientes</h2>

        <p className='text-lg mt-5 text-center mb-10'>
           añade pacientes y {''}
         <span className='text-indigo-600 font-bold'>administralos</span>
       </p>


    <form 
    onSubmit={handleSubmit}
    className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className='mb-5'>
            <label htmlFor='mascota' className='block text-grey-700 uppercase font-bold'> nombre Mascota *</label>

            <input
            id='mascota'  
            type="text"
            placeholder="Nombre de la mascota"
            className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor='dueño' className='block text-grey-700 uppercase font-bold'>nombre dueño *</label>

            <input
            id='dueño'
            type="text"
            placeholder="Nombre del dueño"
            className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
            value={dueño}
            onChange={ (e) => setDueño(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor='email' className='block text-grey-700 uppercase font-bold'> Email *</label>

            <input
            id='email'
            type="email"
            placeholder="Email contacto"
            className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor='alta' className='block text-grey-700 uppercase font-bold'> Alta *</label>

            <input
            id='alta'
            type="date"
            className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
            value={fecha}
            onChange={ (e) => setFecha(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor='sintomas' className='block text-grey-700 uppercase font-bold'> Sintomas *</label>
            <textarea
            id="sintomas"
            className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
            placeholder='Describe los sintomas'
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value)}
            />
        </div>

        <input
        type="submit"
        className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
        value={paciente.id ? 'editar paciente' : 'agregar paciente'}
        />
    </form>
    </div>
  )
}

export default Formulario
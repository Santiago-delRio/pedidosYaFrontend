import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router'
import Sidebar from "../../components/DatosCuentaSidebar"
import miCuentaStyles from "./miCuenta.module.scss"

const MiCuenta = () => {

    const router = useRouter()

    const imagenLogo = useRef()
    const horarios = useRef()
    const [nombreImagenSubida, setNombreImagenSubida] = useState("Ningún archivo seleccionado")
    const [datosRestaurante, setDatosRestaurante] = useState()
    const [horariosRestaurante, setHorariosRestaurante] = useState()

    //Buscar datos del restaurante
    useEffect(()=>{

        if(!window.localStorage.idRestaurante){
            router.push("/")
        }

        //Datos del restaurante
        const buscarDatos = async (id) =>{
            const respuesta = await axios.get(`http://137.184.217.46:1337/restaurante/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            setDatosRestaurante(respuesta.data[0][0])
            setHorariosRestaurante(respuesta.data[1])

        }
        if(window.localStorage.idRestaurante){
            buscarDatos(window.localStorage.idRestaurante)
        }
    },[])


    //Guardar logo
    const guardarCambios = () =>{

        //======= Guardar horarios
        const horariosData = Array.from(document.querySelectorAll(".inputHorario"))
        const horarios = []

        horariosData.map((horario)=>{
            //No cargar los que esten vacios
            if(horario.children[1].value == ""){ return }

            horarios.push({
                id: window.localStorage.idRestaurante,
                dia: horario.children[0].value,
                horario: horario.children[1].value,
            })
        })
        
        if(horarios.length > 0){
            
            axios.post('http://137.184.217.46:1337/restaurante/cargar-horarios', horarios, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            if(imagenLogo.current.value == ""){
                alert("Cambios guardados")
                router.reload(window.location.pathname)
                return
            }  
        } 

        //======== Datos del logo
        let formData = new FormData()

        formData.append("logo" , imagenLogo.current.files[0])

        //Actualizar el logo del restaurante
        const actualizarLogo = (rutaImagen) =>{
            const datosImagen = {
                id: window.localStorage.idRestaurante,
                imagen: rutaImagen
            }

            axios.put('http://137.184.217.46:1337/restaurante-logo', datosImagen, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Cambios guardados")
            router.reload(window.location.pathname)

        }

        //Subir imagen al servidor
        const subirImagen = async () =>{
            const respuesta = await axios.put('http://137.184.217.46:1337/subir-logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).catch(function (error) {
                console.log(error);
            });

            //Arreglar ruta de la imagen y subir al localstorage
            const rutaRegex = /public/g
            const rutaImagen = respuesta.data.replace(rutaRegex, "http://137.184.217.46:1337")
            window.localStorage.setItem("logo", rutaImagen)

            actualizarLogo(rutaImagen)
        }

        subirImagen()
    }

    //Agregar más horarios
    const agregarHorarios = () =>{
        const inputHorario = document.createElement("div")
        const input = document.createElement("input")
        input.type = "text"
        input.maxLength = "17"

        const select = document.createElement("select")
        
        //Opciones del select
        select.options.add(new Option("Lunes", "Lunes"))
        select.options.add(new Option("Martes", "Martes"))
        select.options.add(new Option("Miércoles", "Miércoles"))
        select.options.add(new Option("Jueves", "Jueves"))
        select.options.add(new Option("Viernes", "Viernes"))
        select.options.add(new Option("Sábado", "Sábado"))
        select.options.add(new Option("Domingo", "Domingo"))

        inputHorario.className = "inputHorario"
        inputHorario.append(select, input)
        horarios.current.append(inputHorario)
    }

    return (
        <div className={miCuentaStyles.miCuentaContainer}>
            <Head>
                <title>Mi cuenta | PedidosYa</title>
            </Head>
            <Sidebar />
            {/* Mis datos */}
            <div className={miCuentaStyles.misDatos}>
                <h1>Mis datos</h1>
                <div className={miCuentaStyles.datos}>
                    {/* Nombre */}
                    <label>Nombre</label>
                    <p>{(datosRestaurante) ? datosRestaurante.nombre : ""}</p>
                    {/* Direccion */}
                    <label>Dirección</label>
                    <p>{(datosRestaurante) ? datosRestaurante.direccion : ""}</p>
                    {/* horarios */}
                    <label>Horarios</label>
                    {horariosRestaurante ?  
                        horariosRestaurante.map((horario)=>(
                            <div key={horario.id_horario} className={miCuentaStyles.horario}>
                                <span>{horario.dia}</span>
                                <span>{horario.horario}</span>
                            </div>
                        ))
                    : ""}
                    <label>Agregar horarios</label>
                    <div className={miCuentaStyles.horarios} ref={horarios}>
                        <div className="inputHorario">
                            {/* Select dia */}
                            <select name="dia">
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                            {/* input horario */}
                            <input type="text" name="horario" maxLength="17"/>
                            {/* boton agregar mas */}
                            <button onClick={()=>{agregarHorarios()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                            </button>
                        </div>
                    </div>
                    {/* Logo */}
                    <label>Logo del local</label>
                    {/* Input real */}
                    <input type="file" accept="image/*" ref={imagenLogo} onChange={()=>{
                            if(imagenLogo.current.files.length > 0){
                                setNombreImagenSubida(imagenLogo.current.files[0].name)
                            }
                            else{
                                setNombreImagenSubida("Ningún archivo seleccionado")
                            }
                        }}/>
                    {/* Input de mentira */}
                    <div className={miCuentaStyles.inputImagen}>
                        <button onClick={()=>{imagenLogo.current.click()}}>Seleccionar archivo</button>
                        <p>{nombreImagenSubida}</p>
                    </div>
                    {/* Boton guardar cambios */}
                    <button onClick={()=>{guardarCambios()}}>Guardar cambios</button>
                </div>
            </div>
        </div>
    );
}
 
export default MiCuenta;
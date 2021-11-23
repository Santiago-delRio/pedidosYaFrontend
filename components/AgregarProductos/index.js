import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import agregarProductosStyles from "./agregarProductos.module.scss"

const AgregarProductos = ({menuAbierto, editando, producto}) => {

    useEffect(()=>{
        //editar producto -- ver si los campos ya tienen informacion para arreglar la animacion del label
        (producto.nombre ? setNombreFocus(true) : "");
        (producto.descripcion ? setDescripcionFocus(true) : "");
        (producto.descuento ? setDescuentoFocus(true) : "");
        (producto.precio ? setPrecioFocus(true) : "");
    },[])

    const router = useRouter()

    //============ States

    //Imagen subida del producto
    const [nombreImagenSubida, setNombreImagenSubida] = useState("Ningún archivo seleccionado")

    //Controlar que no se dejen campos sin completar
    const [inputNombreVacio, setInputNombreVacio] = useState()
    const [inputDescripcionVacio, setInputDescripcionVacio] = useState()
    const [inputPrecioVacio, setInputPrecioVacio] = useState()
    const [inputImagenVacio, setInputImagenVacio] = useState()

    //Animar label durante el login
    const [nombreFocus, setNombreFocus] = useState()
    const [descripcionFocus, setDescripcionFocus] = useState()
    const [precioFocus, setPrecioFocus] = useState()
    const [descuentoFocus, setDescuentoFocus] = useState()

    //============ Refs
    const inputNombre = useRef()
    const inputDescripcion = useRef()
    const inputPrecio = useRef()
    const inputDescuento = useRef()
    const inputImagen = useRef()
    
    const guardarProducto = () =>{
        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputNombre.current.value == ""){
            setInputNombreVacio(true)
            camposVacios = true
        }
        if( inputDescripcion.current.value == ""){
            setInputDescripcionVacio(true)
            camposVacios = true
        }
        if( inputPrecio.current.value == ""){
            setInputPrecioVacio(true)
            camposVacios = true
        }
        if( inputImagen.current.value == "" && !editando){
            setInputImagenVacio(true)
            camposVacios = true
        }

        //Alertar de los campos vacios
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }

         //Subir imagen al servidor
         const subirImagen = async () =>{

            //======== Datos de la imagen
            let formData = new FormData()

            formData.append("producto" , inputImagen.current.files[0])

            const respuesta = await axios.put('http://137.184.217.46:1337/restaurante/producto/imagen', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).catch(function (error) {
                console.log(error);
            });

            //Arreglar ruta de la imagen y subir al localstorage
            const rutaRegex = /public/g
            const rutaImagen = respuesta.data.replace(rutaRegex, "http://137.184.217.46:1337")

            if(editando){
                actualizarProducto(rutaImagen)
            }else{
                subirProducto(rutaImagen)
            }
        }

        //Cargar un nuevo producto
        const subirProducto = (imagen) =>{

            const datosProducto = {
                nombre: inputNombre.current.value,
                descripcion: inputDescripcion.current.value,
                precio: inputPrecio.current.value,
                descuento: (inputDescuento.current.value == "" ? null : inputDescuento.current.value),
                imagen: imagen,
                restaurante: window.localStorage.idRestaurante
            }

            axios.post('http://137.184.217.46:1337/restaurante/productos', datosProducto, {
            headers: {
                'Content-Type': 'application/json',
            }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Producto cargado")
            router.reload(window.location.pathname)
        }

        //Actualizar un producto
        const actualizarProducto = (imagen) =>{

            const datosProducto = {
                nombre: inputNombre.current.value,
                descripcion: inputDescripcion.current.value,
                precio: inputPrecio.current.value,
                descuento: (inputDescuento.current.value == "" ? null : inputDescuento.current.value),
                imagen: imagen,
                id: producto.id
            }

            axios.put('http://137.184.217.46:1337/restaurante/productos', datosProducto, {
            headers: {
                'Content-Type': 'application/json',
            }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Producto actualizado")
            router.reload(window.location.pathname)

        }
        //Ver si hay que subir una nueva imagen o no
        if(inputImagen.current.value == ""){
            //Le paso la imagen que ya existe
            actualizarProducto(producto.imagen)
        }else{
            subirImagen()
        }

    }

    return (
        <div className={agregarProductosStyles.agregarProductosContainer}>
            {/* Titulo agregar productos */}
            <h2>
                <svg onClick={()=>{menuAbierto(false)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M28.927-238.385c0 50.863-42.919 92.243-95.679 92.243H-330.75l-119.21 385.144h-29.11l-.934-.292 128.044-413.648h285.208c36.891 0 66.905-28.465 66.905-63.447zm133.068 0c0 59.718-23.822 115.852-67.086 158.042C51.739-38.236-5.631-15.047-66.634-15.047H-236.85L-316.067 239h-30.193l88.197-282.844h191.429c53.435 0 103.648-20.282 141.403-57.103 37.657-36.732 58.4-85.543 58.4-137.44zM95.99-238c.01.247.01.499.01.756 0 42.601-16.96 82.644-47.768 112.731-30.705 30.008-71.51 46.53-114.894 46.53H-284.76L-382.893 239H-413l107.044-345.757h239.294c73.836 0 133.908-58.54 133.908-130.487 0-.257-.005-.509-.01-.756zM6.084 8l4.458 4.458a.625.625 0 01-.884.884l-4.9-4.9a.625.625 0 010-.884l4.9-4.9a.625.625 0 01.884.884L6.084 8z"></path></svg>
                {editando ? "Editar producto": "Agregar producto"}
            </h2>
            {/* Formulario */}
            <form action="">
                {/* Titulo formulario */}
                <h3>Ingresá los datos</h3>
                {/* Nombre */}
                <label className={(nombreFocus) ? agregarProductosStyles.inputActivo : ""}>Nombre</label>
                <input defaultValue={producto.nombre} type="text" maxLength="120" ref={inputNombre} className={(inputNombreVacio) ? agregarProductosStyles.inputVacio : ""} onFocus={()=>{setNombreFocus(true)}} onBlur={()=>{
                    if(event.target.value == ""){
                        setNombreFocus(false)
                    }else{ return }
                }} onChange={()=>{
                    (inputNombreVacio ?  setInputNombreVacio(false) : "" )
                }}/>
                {/* Descripcion */}
                <label className={(descripcionFocus) ? agregarProductosStyles.inputActivo : ""}>Descripción</label>
                <input defaultValue={producto.descripcion} type="text" maxLength="255" ref={inputDescripcion} className={(inputDescripcionVacio) ? agregarProductosStyles.inputVacio : ""} onFocus={()=>{setDescripcionFocus(true)}} onBlur={()=>{
                    if(event.target.value == ""){
                        setDescripcionFocus(false)
                    }else{ return }
                }} onChange={()=>{
                    (inputDescripcionVacio ?  setInputDescripcionVacio(false) : "" )
                }}/>
                {/* Precio */}
                <label className={(precioFocus) ? agregarProductosStyles.inputActivo : ""}>Precio</label>
                <input defaultValue={producto.precio} type="number" ref={inputPrecio} className={(inputPrecioVacio) ? agregarProductosStyles.inputVacio : ""} onFocus={()=>{setPrecioFocus(true)}} onBlur={()=>{
                    if(event.target.value == ""){
                        setPrecioFocus(false)
                    }else{ return }
                }} onChange={()=>{
                    (inputPrecioVacio ?  setInputPrecioVacio(false) : "" )
                }}/>
                {/* Descuento */}
                <label className={(descuentoFocus) ? agregarProductosStyles.inputActivo : ""}>Descuento</label>
                <input defaultValue={producto.descuento} type="number" ref={inputDescuento} onFocus={()=>{setDescuentoFocus(true)}} onBlur={()=>{
                    if(event.target.value == ""){
                        setDescuentoFocus(false)
                    }else{ return }
                }}/>
                {/* Imagen */}
                <label>Imagen</label>
                <input type="file" accept="image/*" ref={inputImagen} onChange={()=>{
                    if(inputImagen.current.files.length > 0){
                        setNombreImagenSubida(inputImagen.current.files[0].name);
                        (inputImagenVacio ?  setInputImagenVacio(false) : "" )
                    }
                    else{
                        setNombreImagenSubida("Ningún archivo seleccionado")
                    }
                }}/>
                {/* Input imagen de mentira */}
                <div className={agregarProductosStyles.inputImagen}>
                    <button onClick={()=>{event.preventDefault(); inputImagen.current.click()}}>Seleccionar archivo</button>
                    <p className={(inputImagenVacio) ? agregarProductosStyles.inputVacio : ""}>{nombreImagenSubida}</p>
                </div>
            </form>
            {/* Boton guardar producto */}
            <div className={agregarProductosStyles.btnGuardarContainer}>
                <button onClick={()=>{guardarProducto()}}>Guardar producto</button>
            </div>
        </div> 
    );
}
 
export default AgregarProductos;
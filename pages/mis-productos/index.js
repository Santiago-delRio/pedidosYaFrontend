import Image from 'next/image'
import Head from 'next/head'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from "../../components/DatosCuentaSidebar"
import AgregarProductos from "../../components/AgregarProductos"
import misProductosStyles from "./misProductos.module.scss"

const MisProductos = () => {

    const router = useRouter()

    const [productos, setProductos] = useState()
    const [agregarProductos, setAgregarProductos] = useState()
    const [editarProductos, setEditarProductos] = useState()
    const [datosProductoEditar, setDatosProductoEditar] = useState([{
        nombre: "",
        descripcion: "",
        precio: "",
        descuento: "",
        imagen: "",
        id: ""
    }])

    useEffect(()=>{

        if(!window.localStorage.idRestaurante){
            router.push("/")
        }

        //Productos del restaurante
        const buscarProductos = async (id) =>{
            const respuesta = await axios.get(`http://137.184.217.46:1337/restaurante/${id}/productos`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            setProductos(respuesta.data)
        }

        if(window.localStorage.idRestaurante){
            buscarProductos(window.localStorage.idRestaurante)
        }

    },[])

    //Borrar producto
    const borrarProducto = (id) =>{
        axios.delete('http://137.184.217.46:1337/restaurante/producto', {
            data: {
                id: id
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Producto eliminado con éxito")
        router.reload(window.location.pathname)
    }

    return (
        <div className={misProductosStyles.misProductosContainer}>
            <Head>
                <title>Mis productos | PedidosYa</title>
            </Head>
            {/* Div para esconder el fondo */}
            <div className={(agregarProductos || editarProductos) ? misProductosStyles.esconderFondo : ""}></div>
            <Sidebar/>
            {/* Mis productos */}
            <div className={misProductosStyles.misProductos}>
                <h1>Mis productos</h1>
                <button className={misProductosStyles.btnAgregarProductos} onClick={()=>{
                    setDatosProductoEditar({
                        nombre: "",
                        descripcion: "",
                        precio: "",
                        descuento: "",
                        imagen: "",
                        id: ""
                    })
                    setAgregarProductos(true)
                }}>Agregar productos</button>
                {(agregarProductos) ? 
                    <AgregarProductos menuAbierto={setAgregarProductos} editando={false} producto={datosProductoEditar}/>
                : ""}
                {/* Productos */}
                {(productos) ? 
                    <table className={misProductosStyles.productos}>
                        {/* Head tabla */}
                        <thead className={misProductosStyles.headListaMuebles}>
                            <tr>
                                <th>
                                    <span>Id</span>
                                </th>
                                <th>
                                    <span>Imagen</span>
                                </th>
                                <th>
                                    <span>Nombre</span>
                                </th>
                                <th>
                                    <span>Precio</span>
                                </th>
                            </tr>
                        </thead>
                        {/* Body tabla */}
                        <tbody className={misProductosStyles.productosBody}>
                            {productos.map((producto)=>(
                                <tr key={producto.id_producto}>
                                    {/* id */}
                                    <td>{producto.id_producto}</td>
                                    {/* Imagen del producto */}
                                    <td className={misProductosStyles.imagenContainer}>
                                        <div className={misProductosStyles.imagen}>
                                            <Image src={producto.imagen} alt="Imagen de un producto del restaurante" layout={'responsive'} width="500" height="500" quality="90"/>
                                        </div>
                                    </td>
                                    {/* Nombre */}
                                    <td className={misProductosStyles.nombreProducto}>{producto.nombre}</td>
                                    {/* Precio */}
                                    <td>${producto.precio}</td>
                                    {/* Boton editar */}
                                    <td className={misProductosStyles.btnEditar}>
                                        <button data-nombre={producto.nombre} data-descripcion={producto.descripcion} data-precio={producto.precio} data-descuento={producto.descuento} data-imagen={producto.imagen} data-id={producto.id_producto} onClick={()=>{
                                            setDatosProductoEditar({
                                                nombre: event.target.dataset.nombre,
                                                descripcion: event.target.dataset.descripcion,
                                                precio: event.target.dataset.precio,
                                                descuento: event.target.dataset.descuento,
                                                imagen: event.target.dataset.imagen,
                                                id: event.target.dataset.id
                                            })
                                            setEditarProductos(true)
                                            
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>
                                            Editar
                                        </button>
                                    </td>
                                    {/* Boton borrar producto */}
                                    <td>
                                        <svg onClick={()=>{borrarProducto(producto.id_producto)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                : "" }
                {(editarProductos) ? 
                    <AgregarProductos menuAbierto={setEditarProductos} editando={true} producto={datosProductoEditar}/>
                : ""}
            </div>
        </div>
    );
}
 
export default MisProductos;
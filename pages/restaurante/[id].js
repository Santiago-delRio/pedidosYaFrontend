import axios from 'axios';
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import restauranteStyles from "./restaurante.module.scss"
import banner from "../../assets/imagenes/bannerRestaurante.webp"
import ComprarProducto from "../../components/ComprarProducto"
import Carrito from "../../components/Carrito"

const Restaurante = ({ restaurante, productos }) => {

    const router = useRouter()

    //Producto elegido para agregar al carrito
    const [productoElegido, setProductoElegido] = useState({})
    //Modal elegir producto
    const [modalElegirProducto, setModalElegirProducto] = useState(false)
    // Carrito
    const [carrito, setCarrito] = useState([])
    const [carritoModal, setCarritoModal] = useState(false)
    const [subtotal, setSubtotal] = useState(0)

    //Mostrar boton ver pedido
    const [verPedido, setVerPedido] = useState(true)    

    //Actualizar el total del pedido
    useEffect(()=>{
        let total = 0
        carrito.map((producto)=>{
            total += (producto.precio * producto.cantidad)
        })
        setSubtotal(total)

    },[carrito])

    //Enviar el pedido
    const guardarPedido = () =>{

        //Ver que esté loggeado como cliente

        if(!window.localStorage.idCliente && !window.localStorage.idRestaurante){
            alert("Tiene que iniciar sesión para hacer un pedido")
            return
        }
        if(window.localStorage.idRestaurante){
            alert("No puede hacer un pedido siendo un negocio. Inicie sesión como cliente")
            return
        }

        let fecha;
        fecha = new Date();
        fecha = fecha.getUTCFullYear() + '-' +
            ('00' + (fecha.getMonth()+1)).slice(-2) + '-' +
            ('00' + fecha.getDate()).slice(-2) + ' ' + 
            ('00' + fecha.getHours()).slice(-2) + ':' + 
            ('00' + fecha.getMinutes()).slice(-2) + ':' + 
            ('00' + fecha.getSeconds()).slice(-2);

        const datosPedido = {
            importe: subtotal,
            fecha: fecha,
            cliente: window.localStorage.idCliente,
            restaurante: restaurante[0].id_restaurante,
            productos: carrito
        }

        axios.post('http://localhost:1337/pedidos', datosPedido, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Pedido enviado")
        router.reload(window.location.pathname)
    }

    return (
        <div className={restauranteStyles.restauranteContainer}>
            <Head>
                <title>{restaurante[0].nombre} | PedidosYa</title>
            </Head>
            {/* Div para esconder el fondo */}
            <div className={(modalElegirProducto || carritoModal) ? restauranteStyles.esconderFondo : ""}></div>
            {/* Banner */}
            <div className={restauranteStyles.banner}>
                <div className={restauranteStyles.imagen}>
                    <Image src={banner} alt="banner del restaurante" layout={'fill'} objectFit={'cover'} quality="80" priority="true"/>
                    <div className={restauranteStyles.filtro}></div>
                </div>
                {/* info */}
                <div className={restauranteStyles.info}>
                    {/* Envio */}
                    <span className={restauranteStyles.envio}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2b1a46" viewBox="0 0 16 16"><path d="M8 .5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm.064 5.257a.5.5 0 01.492.41l.008.09v3.5H9.62a.5.5 0 01.492.41l.008.09a.5.5 0 01-.41.492l-.09.008H8.064a.499.499 0 01-.491-.41l-.009-.09v-3.5H6.82a.5.5 0 01-.492-.41l-.008-.09a.5.5 0 01.41-.492l.09-.008h1.244zM7.711 4a.858.858 0 110 1.715.858.858 0 010-1.715z"></path></svg>
                        ENVÍO DEL LOCAL
                    </span>
                    {/* Nombre negocio */}
                    <span className={restauranteStyles.nombre}>{restaurante[0].nombre}</span>
                    {/* Barra buscar */}
                    <span className={restauranteStyles.buscar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2b1a46" viewBox="0 0 16 16" ><path d="M10.203 10.91A5.607 5.607 0 116.607 1a5.607 5.607 0 014.303 9.203l3.944 3.943a.502.502 0 01-.708.708l-3.943-3.944zm-3.596.304a4.606 4.606 0 100-9.214 4.607 4.607 0 000 9.214z"></path></svg>
                        Buscar productos...
                    </span>
                </div>
            </div>
            {/* Barra calificacion y opiniones */}
            <div className={restauranteStyles.calificacionOpiniones}>
                <div>
                    <span className={restauranteStyles.calificacion}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="#7f7304" fillRule="evenodd" stroke="#7f7304" strokeLinecap="round" strokeLinejoin="round" d="M4 5.626L6.472 7l-.656-2.59L8 2.667l-2.876-.224L4 0 2.876 2.443 0 2.667 2.184 4.41 1.528 7z"></path></svg>
                        4.3
                    </span>
                    <span className={restauranteStyles.opiniones}>
                        230 opiniones
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#2b1a46" viewBox="0 0 16 16"><path d="M106.927-238.385c0 50.863-42.919 92.243-95.679 92.243H-252.75l-119.21 385.144h-29.11l-.934-.292 128.044-413.648H11.248c36.891 0 66.905-28.465 66.905-63.447zm133.068 0c0 59.718-23.822 115.852-67.086 158.042-43.17 42.107-100.54 65.296-161.543 65.296H-158.85L-238.067 239h-30.193l88.197-282.844H11.366c53.435 0 103.648-20.282 141.403-57.103 37.657-36.732 58.4-85.543 58.4-137.44zM173.99-238c.01.247.01.499.01.756 0 42.601-16.96 82.644-47.768 112.731-30.705 30.008-71.51 46.53-114.894 46.53H-206.76L-304.893 239H-335l107.044-345.757H11.338c73.836 0 133.908-58.54 133.908-130.487 0-.257-.005-.509-.01-.756z"></path><path d="M9.916 8l-4.458 4.458a.625.625 0 00.884.884l4.9-4.9a.625.625 0 000-.884l-4.9-4.9a.625.625 0 00-.884.884L9.916 8z"></path></svg>
                    </span>
                </div>
            </div>
            {/* Contenedor de productos */}
            <div className={restauranteStyles.productosContainer}>
                {/* Titulo */}
                <h2>Nuestros productos</h2>
                {/* grid productos */}
                <div className={restauranteStyles.productos}>
                    {/* El producto */}
                    {productos.map((producto)=>(
                        <div key={producto.id_producto} className={restauranteStyles.producto} onClick={()=>{
                            //Abrir modal para agregar producto al pedido
                            setProductoElegido({
                                id: producto.id_producto,
                                nombre: producto.nombre,
                                descripcion: producto.descripcion,
                                descuento: producto.descuento,
                                precio: producto.precio,
                                imagen: producto.imagen,
                                restaurante: producto.restaurante
                            })
                            setModalElegirProducto(true)
                            
                        }}>
                            {/* Info producto */}
                            <div className={restauranteStyles.info}>
                                <h3>{producto.nombre}</h3>
                                <p>{producto.descripcion}</p>
                                {/* Calcular descuento */}
                                {(producto.descuento ? <span className={restauranteStyles.descuento}>${Math.floor(((producto.precio) - (producto.precio * (producto.descuento / 100))))} <s>${producto.precio}</s></span> : <span>${producto.precio}</span>)}
                            </div>
                            {/* Imagen */}
                            <div className={restauranteStyles.imagen}>
                                <Image src={producto.imagen} alt="Imagen de un producto del restaurante" layout={'responsive'} width="500" height="500" quality="90"/>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Modal para agregar producto al pedido */}
                {(modalElegirProducto) ? 
                    <ComprarProducto producto={productoElegido} cerrarMenu={setModalElegirProducto} setCarrito={setCarrito} carrito={carrito} setSubtotal={setSubtotal}/>
                : ""}
                {/* Modal del carrito de compra */}
                {(carritoModal) ? 
                    <Carrito carrito={carrito} cerrarMenu={setCarritoModal} restauranteNombre={restaurante[0].nombre} restauranteLogo={restaurante[0].logo} subtotal={subtotal} guardarPedido={guardarPedido} setVerPedido={setVerPedido}/>
                : ""}
            </div>
            {/* Boton de ver pedido */}
            {(carrito.length > 0 && verPedido) ? 
                <div className={restauranteStyles.verPedido}>
                    <button onClick={()=>{
                        setCarritoModal(true)
                        setVerPedido(false)
                    }}>
                        Ver mi pedido&nbsp; ${subtotal}
                    </button>
                </div>
            : ""}
        </div>
    );
}
 
export default Restaurante;

export async function getStaticPaths(){

    const restaurantesResponse  = await axios.get(`http://${process.env.SERVER_IP}/restaurantes`);

    const restaurantes = restaurantesResponse.data

    const paths = restaurantes.map((restaurante)=>({
        params: {id: restaurante.id_restaurante.toString()}
    }))

    return{
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({params}){

    const { id } = params;

    try{
        const restauranteResponse  = await axios.get(`http://${process.env.SERVER_IP}/restaurante/${id}`);
        const productosResponse  = await axios.get(`http://${process.env.SERVER_IP}/restaurante/${id}/productos`);

        const data = restauranteResponse.data
        const restaurante = data[0];
        const productos = productosResponse.data

       
        return{
            props: { restaurante, productos },
            revalidate: 10,
        }

    }catch(error){
        return{
            notFound: true
        }
    }

}
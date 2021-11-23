import Image from 'next/image'
import carritoStyles from "./carrito.module.scss"

const Carrito = ({carrito , cerrarMenu, restauranteLogo, restauranteNombre, subtotal, guardarPedido, setVerPedido}) => {

    return (
        <div className={carritoStyles.carritoContainer}>
            <header>
                {/* Titulo carrito */}
                <h2>
                    <svg onClick={()=>{cerrarMenu(false), setVerPedido(true)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M28.927-238.385c0 50.863-42.919 92.243-95.679 92.243H-330.75l-119.21 385.144h-29.11l-.934-.292 128.044-413.648h285.208c36.891 0 66.905-28.465 66.905-63.447zm133.068 0c0 59.718-23.822 115.852-67.086 158.042C51.739-38.236-5.631-15.047-66.634-15.047H-236.85L-316.067 239h-30.193l88.197-282.844h191.429c53.435 0 103.648-20.282 141.403-57.103 37.657-36.732 58.4-85.543 58.4-137.44zM95.99-238c.01.247.01.499.01.756 0 42.601-16.96 82.644-47.768 112.731-30.705 30.008-71.51 46.53-114.894 46.53H-284.76L-382.893 239H-413l107.044-345.757h239.294c73.836 0 133.908-58.54 133.908-130.487 0-.257-.005-.509-.01-.756zM6.084 8l4.458 4.458a.625.625 0 01-.884.884l-4.9-4.9a.625.625 0 010-.884l4.9-4.9a.625.625 0 01.884.884L6.084 8z"></path></svg>
                    Mi pedido
                </h2>
                {/* Datos restaurante */}
                <div className={carritoStyles.datosRestaurante}>
                    {/* portada */}
                    <div className={carritoStyles.portadaContainer}>
                        <Image src={restauranteLogo} alt="logo del restaurante" layout={'responsive'} width="500" height="500" quality="90"/>
                    </div>
                    {/* Nombre */}
                    <h2>{restauranteNombre}</h2>
                </div>
            </header>
            <h2 className={carritoStyles.tituloProductos}>Estás llevando: </h2>
            <div className={carritoStyles.infoPedido}>
                {/* Productos del pedido */}
                {carrito.map((producto)=>(
                    <div key={Math.floor(Math.random() * 5000)} className={carritoStyles.producto}>
                        <span className={carritoStyles.cantidad}>{producto.cantidad}x</span>
                        <span className={carritoStyles.nombre}>{producto.nombre}</span>
                        <span className={carritoStyles.precio}>${producto.precio * producto.cantidad}</span>
                    </div>
                ))}
            </div>
            {/* Subtotal */}
            <div className={carritoStyles.subtotal}>
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
            {/* Boton seguir comprando */}
            <button className={carritoStyles.btnSeguirComprando} onClick={()=>{cerrarMenu(false), setVerPedido(true)}} >Seguir comprando</button>
            {/* Boton comprar  */}
            <div className={carritoStyles.btnComprar}>
                <button onClick={()=>{guardarPedido()}}>Enviar pedido</button>
            </div>
        </div>
    );
}
 
export default Carrito;


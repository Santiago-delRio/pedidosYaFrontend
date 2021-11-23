import { useRef, useState } from "react";
import Image from 'next/image'
import comprarProductoStyles from "./comprarProducto.module.scss"

const ComprarProducto = ({ producto, cerrarMenu, setCarrito, carrito }) => {
    
    //Animar label de la aclaracion
    const [aclaracionFocus, setAclaracionFocus] = useState()
    //Unidades del producto
    const [unidades, setUnidades] = useState(1)
    
    //Aclaraciones del producto
    const aclaraciones = useRef()

    const agregarCarrito = () =>{
        const datosProducto = {
            idProducto: producto.id,
            nombre: producto.nombre,
            precio: Math.floor(((producto.precio) - (producto.precio * (producto.descuento / 100)))),
            cantidad: unidades,
            aclaraciones: aclaraciones.current.value
        }
        
        setCarrito( [...carrito, datosProducto])
        alert("Producto agregado al pedido")
        cerrarMenu(false)
    }

    return (
        <div className={comprarProductoStyles.comprarProductoContainer}>
            {/* Cruz para cerrar */}
            <svg onClick={()=>{cerrarMenu(false)}} className={comprarProductoStyles.cruzCerrar} width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="#2b1a46" viewBox="0 0 16 16"><g fillRule="evenodd"><circle fill="#EAE3E3" cx="8" cy="8" r="8"></circle><path d="M5.849 5.096l.075.062L8 7.235l2.076-2.077a.541.541 0 01.828.69l-.062.076L8.765 8l2.077 2.076a.541.541 0 01-.69.828l-.076-.062L8 8.765l-2.076 2.077a.541.541 0 01-.828-.69l.062-.076L7.235 8 5.158 5.924a.541.541 0 01.69-.828z"></path></g></svg>
            {/* Imagen producto */}
            <div className={comprarProductoStyles.imagen}>
                <Image src={producto.imagen} alt="imagen del producto" layout={'fill'} objectFit={'cover'} quality="90"/>
            </div>
            {/* Info producto */}
            <div className={comprarProductoStyles.info}>
                {/* Nombre */}
                <h3>{producto.nombre}</h3>
                {/* Descripcion */}
                <p>{producto.descripcion}</p>
                {/* precio */}
                {(producto.descuento ? <span>${Math.floor(((producto.precio) - (producto.precio * (producto.descuento / 100))))}</span> : <span>${producto.precio}</span>)}
            </div>
            {/* Elegir unidades */}
            <div className={comprarProductoStyles.cantidadContainer}>
                <span>Unidades</span>
                {/* Cantidad input */}
                <div className={comprarProductoStyles.cantidad}>
                    {/* menos unidades */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#2b1a46" viewBox="0 0 16 16" onClick={()=>{
                         if(unidades == 1){ return }
                         else{ setUnidades(prevUnidades => prevUnidades -= 1)}
                    }}><path d="M3 9h10a1 1 0 000-2H3a1 1 0 000 2z" ></path></svg>

                    <span>{unidades}</span>

                    {/* mas unidades */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#2b1a46" viewBox="0 0 16 16" onClick={()=>{
                         setUnidades(prevUnidades => prevUnidades += 1)
                    }} ><path d="M7 7V3c0-1.333 2-1.333 2 0v4h4a1 1 0 010 2H9v4c0 1.333-2 1.333-2 0V9H3a1 1 0 010-2h4z"></path></svg>
                </div>
            </div>
            {/* Aclaraciones */}
            <span className={comprarProductoStyles.aclaracionesTitulo}>¿Querés aclarar algo?</span>
            <div className={comprarProductoStyles.aclaraciones}>
                <label className={(aclaracionFocus) ? comprarProductoStyles.inputActivo : ""} >Notas al producto</label>
                <textarea autoComplete="off" rows="1" maxLength="250" ref={aclaraciones} onFocus={()=>{setAclaracionFocus(true)}} onBlur={()=>{if(event.target.value.length == 0){setAclaracionFocus(false)}}} onInput={()=>{
                    event.target.style.height="auto"
                    event.target.style.height=(event.target.scrollHeight) + "px";
                }}></textarea>
            </div>
            {/* Boton agregar al pedido */}
            <div className={comprarProductoStyles.btnAgregarPedido}>
                <button onClick={()=>{agregarCarrito()}}>Agregar a mi pedido</button>
            </div>
        </div>
    );
}
 
export default ComprarProducto;

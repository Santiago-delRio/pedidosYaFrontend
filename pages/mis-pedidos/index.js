import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios';
import Sidebar from "../../components/DatosCuentaSidebar"
import misPedidosStyles from "./misPedidos.module.scss"
import { useEffect, useState } from 'react';

const MisPedidos = ({ pedidos, clientes, restaurantes }) => {

    const router = useRouter()
    
    const [logeadoCliente, setLogeadoCliente] = useState()
    const [logeadoRestaurante, setLogeadoRestaurante] = useState()

    useEffect(()=>{

        if(!window.localStorage.idRestaurante && !window.localStorage.idCliente){
            router.push("/")
        }

        //Logeado como cliente
        if(window.localStorage.idCliente){
            setLogeadoCliente(true)
        }
        //Logeado como restaurante
        if(window.localStorage.idRestaurante){
            setLogeadoRestaurante(true)
        }
    },[])

    return (
        <div className={misPedidosStyles.misPedidosContainer}>
            <Head>
                <title>Mis pedidos | PedidosYa</title>
            </Head>
            <Sidebar />
            <div className={misPedidosStyles.misPedidos}>
                {/* Titulo mis pedidos */}
                <h1>Mis pedidos</h1>
                {/* Tabla pedidos */}
                <table className={misPedidosStyles.tablaPedidos}>
                    {/* Head tabla */}
                    <thead>
                        <tr>
                            <th>
                                <span>Id</span>
                            </th>
                            <th>
                                <span>Fecha</span>
                            </th>
                            <th>
                                <span>Importe</span>
                            </th>
                            <th>
                                <span>{(logeadoRestaurante) ? "Cliente" : "Restaurante"}</span>
                            </th>
                        </tr>
                    </thead>
                    {/* body tabla */}
                    <tbody>
                        {logeadoCliente ? 
                            pedidos.filter(pedido =>  pedido.cliente ==  window.localStorage.idCliente ).map((pedido)=>(
                                <tr key={pedido.id_pedido}>
                                    {/* id */}
                                    <td>{pedido.id_pedido}</td>
                                    {/* fecha */}
                                    <td>{pedido.fecha}</td>
                                    {/* importe */}
                                    <td>${pedido.importe}</td>
                                    {/* restaurante */}
                                    <td>{restaurantes.filter(restaurante => restaurante.id_restaurante == pedido.restaurante)[0].nombre}</td>
                                </tr>
                            ))
                        : "" }
                        {logeadoRestaurante ? 
                            pedidos.filter(pedido => pedido.restaurante == window.localStorage.idRestaurante ).map((pedido)=>(
                                <tr key={pedido.id_pedido}>
                                    {/* id */}
                                    <td>{pedido.id_pedido}</td>
                                    {/* fecha */}
                                    <td>{pedido.fecha}</td>
                                    {/* importe */}
                                    <td>${pedido.importe}</td>
                                    {/* cliente */}
                                    <td>{clientes.filter(cliente => cliente.id_usuario == pedido.cliente)[0].nombre}</td>
                                </tr>
                            ))
                        : ""}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default MisPedidos;

// Fetch clientes y productos
export async function getStaticProps(){

    const pedidosResponse  = await axios.get(`http://${process.env.SERVER_IP}/pedidos`);
    const clientesResponse  = await axios.get(`http://${process.env.SERVER_IP}/clientes`);
    const restaurantesResponse  = await axios.get(`http://${process.env.SERVER_IP}/restaurantes`);
   
    const pedidos = pedidosResponse.data
    const clientes = clientesResponse.data
    const restaurantes = restaurantesResponse.data

    //Cambiar formato de las fechas
    const regexFormato = /(202\d)-(\d\d)-(\d\d)(T)(\d\d:\d\d:\d\d)/
    const regexFechaHora = /.000Z/

    pedidos.map((pedido)=>{
        pedido.fecha = pedido.fecha.replace(regexFechaHora, '')
        pedido.fecha = pedido.fecha.replace(regexFormato, '$3/$2/$1 $5')
    })

     
    return{
      props: { pedidos, clientes, restaurantes },
      revalidate: 10,
    }
  }
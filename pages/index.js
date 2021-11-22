import axios from 'axios';
import Head from 'next/head'
import Restaurantes from '../components/Restaurantes';

const Inicio = ({ restaurantes }) => {
  return (
    <>
      <Head>
          <title>Delivery de Comida Online - ¡Elegí, Pedí y Ya! | PedidosYa</title>
      </Head>
      <Restaurantes restaurantes={restaurantes}/>
    </>
  );
}
 
export default Inicio;

// Fetch restaurantes
export async function getStaticProps(){

  const restaurantesResponse  = await axios.get(`http://${process.env.SERVER_IP}/restaurantes`);
 
  const restaurantes = restaurantesResponse.data

  return{
    props: { restaurantes },
    revalidate: 10,
  }
}
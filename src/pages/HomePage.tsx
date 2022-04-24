import { useEffect, useState } from "react"
import ProductComponent from "../components/ProductComponent";
import { MercadoPagoAPI } from "../services/MercadoPagoAPI";

interface Props {}

export default function HomePage(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Array<any>>([]);

  useEffect(() => {
    if (isLoading) {
      MercadoPagoAPI
        .getProductsByName({ text: "iphone", limit: 10 })
        .then(response => {
          setProductList(response.data.results);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Home</h1>
      {productList.map(listadoProducto => 
        <ProductComponent
          key={listadoProducto.id}
          name={listadoProducto.title}
          price={listadoProducto.price}
          id={listadoProducto.id}
          thumbnail={listadoProducto.thumbnail}
        />
      )}
    </>
  )
}

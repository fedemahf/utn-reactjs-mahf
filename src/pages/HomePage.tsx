import { useEffect, useState } from "react"
import ProductComponent from "../components/ProductComponent";
import { MercadoPagoAPI } from "../services/MercadoPagoAPI";

interface Props {}

export default function HomePage(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Array<any>>([]);
  const [productLastItem, setProductLastItem] = useState<any>(undefined);

  useEffect(() => {
    if (isLoading) {
      MercadoPagoAPI
        .getProductsByName({ text: "iphone", limit: 5 })
        .then(response => {
          setProductList(response.data.results);
          setProductLastItem(response.data.results[response.data.results.length - 1]);
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
      {productList.map(product =>
        <>
          <ProductComponent
            key={product.id}
            name={product.title}
            price={product.price}
            id={product.id}
            thumbnail={product.thumbnail}
            permalink={product.permalink}
          />
          {productLastItem !== product && (
            <>
              <hr />
            </>
          )}
        </>
      )}
    </>
  )
}

import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ProductComponent from "../components/ProductComponent";
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI from "../services/FirebaseAPI";

interface Props {}

export default function HomePage(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Array<any>>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isLoading) {
      FirebaseAPI
        .getAllProducts()
        .then(response => setProductList(response))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error !== '') {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Home</h1>
      {
        productList.length === 0 ? (
          <p>There are no products to list! Why don't you <Link to={RoutePath.PRODUCT_ADD}>add one</Link>?</p>
        ) : (
          productList.map(product =>
            <ProductComponent
              key={product.uid}
              name={product.name}
              description={product.description}
              price={product.price}
              id={product.uid}
            />
          )
        )
      }
    </>
  )
}

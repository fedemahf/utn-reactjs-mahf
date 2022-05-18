import { useEffect, useState } from "react"
import ProductComponent from "../components/ProductComponent";
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
      {productList.map(product =>
        <ProductComponent
          key={product.uid}
          name={product.name}
          description={product.description}
          price={product.price}
          id={product.uid}
        />
      )}
    </>
  )
}

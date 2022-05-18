import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FirebaseAPI, { FirebaseProductData } from "../services/FirebaseAPI";

interface Props {}

export default function ProductPage(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductInfo] = useState<FirebaseProductData>();
  const [error, setError] = useState<string>('');
  const { paramProductId } = useParams();

  useEffect(() => {
    if (isLoading && paramProductId) {
      FirebaseAPI.getProductById(paramProductId)
        .then(response => setProductInfo(response))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, paramProductId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error !== '') {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Product</h1>
      <div>
        <p>{productInfo?.name}</p>
        <p>{productInfo?.description}</p>
        <p>Price: {productInfo?.price}</p>
        <button className="formButton">Buy</button>
      </div>
    </>
  )
}

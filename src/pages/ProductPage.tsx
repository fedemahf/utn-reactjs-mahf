import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { MercadoPagoAPI } from "../services/MercadoPagoAPI";

interface Props {}

export default function ProductPage(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductInfo] = useState<any>(undefined);
  const [error, setError] = useState<string>('');
  const { paramProductId } = useParams();

  useEffect(() => {
    if (isLoading && paramProductId) {
      MercadoPagoAPI
        .getProductById(paramProductId)
        .then(response => {
          setProductInfo(response.data);
          // console.log('response.data', response.data);
        })
        .catch(error => setError(error.response.data.message))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, paramProductId]);

  const showPictures = () => {
    return productInfo.pictures.map((picture: any) => (
      <img
        key={picture.id}
        alt={productInfo.title}
        src={picture.secure_url}
        style={{maxWidth: 100, maxHeight: 100}}
      />
    ));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error !== '') {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Product</h1>
      <div>
        <p>{productInfo.title}</p>
        <p>{productInfo.price}</p>
        <div>{showPictures()}</div>
        <button onClick={() => window.open(productInfo.permalink, '_blank')}>Buy</button>
      </div>
    </>
  )
}

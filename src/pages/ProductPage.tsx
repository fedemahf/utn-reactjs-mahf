import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI, { FirebaseProductData } from "../services/FirebaseAPI";

interface Props {}

export default function ProductPage(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductInfo] = useState<FirebaseProductData>();
  const [error, setError] = useState<string>('');
  const { paramProductId } = useParams();
  const [didDelete, setDidDelete] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading && paramProductId) {
      FirebaseAPI.getProductById(paramProductId)
        .then(response => setProductInfo(response))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, paramProductId]);

  const onClickDeleteButton = async () => {
    setDidDelete(true);
    if (productInfo?.uid) {
      await FirebaseAPI.deleteProductById(productInfo.uid);
      navigate(RoutePath.HOME);
    }
    setDidDelete(false);
  }

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
        &nbsp;
        <button className="formButton" onClick={onClickDeleteButton} disabled={didDelete}>Delete</button>
      </div>
    </>
  )
}

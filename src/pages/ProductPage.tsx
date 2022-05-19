import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../components/RoutesComponent';
import AuthContext from '../context/AuthContext';
import FirebaseAPI, { FirebaseProductData } from '../services/FirebaseAPI';

export default function ProductPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductInfo] = useState<FirebaseProductData>();
  const [error, setError] = useState<string>('');
  const { paramProductId } = useParams();
  const [didDelete, setDidDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (isLoading && paramProductId) {
      FirebaseAPI.getProductById(paramProductId)
        .then(response => setProductInfo(response))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, paramProductId]);

  const onClickDeleteButton = async () => {
    if (!context.isUserLoggedIn) {
      throw new Error('User is not logged');
    }

    setDidDelete(true);

    if (window.confirm('Are you sure?') && productInfo?.uid) {
      await FirebaseAPI.deleteProductById(productInfo.uid);
      navigate(RoutePath.HOME);
    }

    setDidDelete(false);
  };

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
        <h3>{productInfo?.name}</h3>
        <p>{productInfo?.description}</p>
        <p>Price: {productInfo?.price}</p>
        <button className="formButton" disabled>Buy</button>
        {
          context.isUserLoggedIn && (
            <>
              {' '}<button className="formButton" onClick={() => navigate(`${RoutePath.PRODUCT_EDIT}/${productInfo?.uid}`)}>Edit</button>
              {' '}<button className="formButton" onClick={onClickDeleteButton} disabled={didDelete}>Delete</button>
            </>
          )
        }
      </div>
    </>
  );
}

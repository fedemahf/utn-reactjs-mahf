import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from './RoutesComponent';

interface Props {
  id: string;
  name: string;
  description: string;
  price: string;
}

export default function ProductComponent(props: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <p>Price: {props.price}</p>
        <p>
          <button className="formButton" disabled>Buy</button>
          {' '}<button className="formButton" onClick={() => navigate(`${RoutePath.PRODUCT}/${props.id}`)}>Details</button>
        </p>
      </div>
    </>
  );
}

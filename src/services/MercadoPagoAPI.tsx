import axios from "axios";

const API = axios.create({
  baseURL: "https://api.mercadolibre.com/"
});

interface ProductSearchParameters {
  text: string,
  limit?: number
}

export const MercadoPagoAPI = {
  getProductsByName: (params: ProductSearchParameters) => {
    let endpoint: string = `/sites/MLA/search?q=${params.text}`;
    if (params.limit) endpoint += `&limit=${params.limit}`;
    return API.get(endpoint);
  },
  getProductById: (productId: string) => API.get(`/items/${productId}`)
};

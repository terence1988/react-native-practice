import { baseProjectInfo, BaseUrl, realTimeDB } from "../../constants";
import Product from "../../models/product";
import { IFormProps } from "../../screens/user/EditProductScreen";
import { generateUUID } from "../../utils";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const createProduct = (productData: IFormProps) => {
  return async (reduxDispatch: Function, getState: Function) => {
    const authToken = getState().auth.token;
    const userId = getState().auth.userId;
    if (!userId) return
    // await fetch(`${BaseUrl}${baseProjectInfo}/users`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   }); This is the original REST API call
    //https://firestore.googleapis.com/v1/projects/rn-store-app-346200/databases/(default)/documents/products?documentId=jshyrn235P

    //need different payload for firebase

    // const response = await fetch(
    //   `${BaseUrl}${baseProjectInfo}/products?documentId=${generateUUID().slice(
    //     0,
    //     12
    //   )}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       fields: {
    //         title: { stringValue: productData.title },
    //         price: { doubleValue: productData.price },
    //         imageUrl: { stringValue: productData.imageUrl },
    //         description: { stringValue: productData.description },
    //       },
    //       createTime: new Date().toISOString(),
    //       updateTime: new Date().toISOString(),
    //     }),
    //   }
    // ); // wrong DB service

    const response = await fetch(
      `${realTimeDB}/products.json?auth=${authToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productData.title,
          price: Number(productData.price),
          imageUrl: productData.imageUrl,
          description: productData.description,
          ownerId: userId,
        }),
      }
    );

    // {
    //   "fields":{
    //       "title":{"stringValue":"a shirt"},
    //       "description":{"stringValue":"a shirt is all"}
    //   },
    //   "createTime":"2022-04-04T03:11:14.898Z",
    //   "updateTime":"2022-04-04T03:11:14.898Z"
    // }
    const resData = await response.json();
    console.log(resData);

    return reduxDispatch({
      type: CREATE_PRODUCT,
      productData: { ...productData, ownerId: userId },
    });
  };
};

export const fetchProducts =
  () => async (reduxDispatch: Function, getState: Function) => {
    const userId = getState().auth.userId;
    let response = await (await fetch(`${realTimeDB}/products.json`)).json();
    // Object {
    //   "createTime": "2022-04-04T04:15:38.733309Z",
    //   "fields": Object {
    //     "description": Object {
    //       "stringValue": "This is a shirt",
    //     },
    //     "imageUrl": Object {
    //       "stringValue": "a shirt",
    //     },
    //     "price": Object {
    //       "doubleValue": 20.96,
    //     },
    //     "title": Object {
    //       "stringValue": "A shirt",
    //     },
    //   },
    //   "name": "projects/rn-store-app-346200/databases/(default)/documents/products/7bf99dde-6a4d-4ab0-b546-61c5f62717fe",
    //   "updateTime": "2022-04-04T04:15:38.733309Z",
    // }
    let loadedProducts = [];
    for (const key in response) {
      loadedProducts.push(
        new Product(
          key,
          response[key].ownerId,
          response[key].title,
          response[key].imageUrl,
          response[key].description,
          Number(response[key].price)
        )
      );
    }
    // Object {
    //   "-MzwnguPw_AUsqq-UjO1": Object {
    //     "description": "Represent the athletic spirit of adidas in this versatile t-shirt. Design details like the 3-Stripes sleeves and an embroidered adidas Badge of Sport give this tee a heritage sportswear vibe. The soft jersey fabric feels great for everyday wear, whether it's dinner with friends or a jog through the park.  This product is made with recycled content as part of our ambition to end plastic waste. Our cotton products support sustainable cotton farming. This is part of our ambition to end plastic waste. Product code 878202730",
    //     "imageUrl": "https://cdn.pixabay.com/photo/2017/06/20/17/11/t-shirt-2423804_960_720.png",
    //     "price": 22.99,
    //     "title": "Blue Shirt",
    //   },
    // }
    return reduxDispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
    });
  };

export const updateProduct = (id: string, productData: IFormProps) => {
  return async (reduxDispatch: Function, getState: Function) => {
    const authToken = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${realTimeDB}/products/${id}.json?auth=${authToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productData.title,
          price: Number(productData.price),
          imageUrl: productData.imageUrl,
          description: productData.description,
          ownerId: userId,
        }),
      }
    );
    reduxDispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData,
    });
  };
};

export const deleteProduct = (productId: string) => {
  return async (reduxDispatch: Function, getState: Function) => {
    const authToken = getState().auth.token;
    const response = await fetch(
      `${realTimeDB}/products/${productId}.json?auth=${authToken}♂`,
      {
        method: "DELETE",
      }
    );
    reduxDispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

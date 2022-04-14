
export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface UserInfo {
  email: string;
  name: string;
}

export interface StateType {
  page: number;
  productList: Product[];
  selectedList: Product[];
  userInfo: UserInfo;
  loading: boolean;
}

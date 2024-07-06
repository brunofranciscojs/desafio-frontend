export interface Categorias { 
  name: string; 
  photo: string; 
  sections: string; 
  id: number;
  description: string;
  preco: number; 
  modifiers: Modifier[];
  itens:string;
}
export interface ProductImage {
  image: string;
}

export interface Modifier {
  id: number;
  name: string;
  price: number;
  minChoices: number;
  maxChoices: number;
  items: {
    id: number;
    name: string;
    price: number;
    visible: number;
    availabilityType: string;
    available: boolean;
  }[];
}

export interface Product {
  id: number;
  description: string;
  name: string;
  images: ProductImage[];
  price: number;
  modifiers?: Modifier[];
}
export interface Menu { 
  name: string; 
  photo: string; 
  sections: string; 
  id: number;
  description: string;
  preco: number; 
  modifiers: Modifier[];
}


export interface Section {
  id: number;
  name: string;
  items: Product[];
  images: ProductImage[];
}

export interface Settings {
  webSettings:{
    bannerImage: string;
    bannerBgColor: string;
    navBackgroundColour: string;
    primaryColour: string;
    backgroundColour: string;
    primaryColourHover: string;
  }
}

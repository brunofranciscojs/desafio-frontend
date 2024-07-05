import { useState, useEffect } from "react";
import Produto from "../../Product.tsx";
import Carrinho from "../../Cart.tsx";
import CarrinhoMobile from "../../CartMobile.tsx";
import Button from "../../button.tsx";

interface ProductImage {
  image: string;
}

interface Modifier {
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

interface Product {
  id: number;
  description: string;
  name: string;
  images: ProductImage[];
  price: number;
  modifiers?: Modifier[];
}
interface Menu { 
  name:string; 
  photo: string; 
  sections:string; 
  id:number ;
  description:string ;
  preco:number; 
  modifiers:[];
}
interface Categorias { 
  id: number; 
  name: string; 
  itens: Menu[]; 
  photo:string;
}

interface Section {
  id: number;
  name: string;
  items: Product[];
  images: ProductImage[];
}

interface Settings {
  bannerImage: string;
  bannerBgColor: string;
  navigationColor: string;
  primaryColor: string;
  backgroundColor: string;
  hover: string;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default function Menu() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [category, setCategory] = useState<Categorias[]>([]);
  const [ativa, setAtiva] = useState<string>("Burgers");
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://cdn-dev.preoday.com/challenge/menu')}`);
      const data = await response.json();
      const json = JSON.parse(data.contents);

      const categoria: Categorias[] = json.sections.map((section: Section) => ({
        id: section.id,
        name: section.name,
        photo: section.images[0].image,
        itens: section.items.map((product: Product) => ({
          id: product.id,
          description: product.description,
          name: product.name,
          photo: product.images && product.images[0] ? product.images[0].image : "",
          preco: product.price,
          modifiers: product.modifiers || []
        })),
      }));

      setCategory(categoria);
    };

    const fetchConfigFile = async () => {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://cdn-dev.preoday.com/challenge/venue/9')}`);
      const data = await response.json();
      const configuration = JSON.parse(data.contents);

      setSettings({
        bannerImage: configuration.webSettings.bannerImage,
        bannerBgColor: "#36231C",
        navigationColor: configuration.webSettings.navBackgroundColour,
        primaryColor: configuration.webSettings.primaryColour,
        backgroundColor: configuration.webSettings.backgroundColour,
        hover: configuration.webSettings.primaryColourHover,
      });

      setLoading(false);
    };

    fetchMenu();
    fetchConfigFile();
  }, []);

  if (loading) {
    return <div className="bg-[#F8F9FA] max-w-[1280px] mx-auto my-2 rounded-md flex gap-5 p-12">Loading...</div>;
  }

  return (
    <>
      <section className="py-12 w-full mx-auto lg:px-10 px-0 bg-[#F8F9FA] lg:bg-[#eeeeee] relative">
        <div className="lg:bg-[#F8F9FA] bg-[#fff] max-w-[1280px] mx-auto my-2 rounded-md gap-5 py-12 lg:px-12 px-1 flex lg:flex-row flex-col">
          <div className="flex flex-col bg-white lg:shadow-md shadow-none lg:p-8 p-1 w-full lg:min-w-[500px] min-w-full
                              [&:has(li>div.is-active)_li>div.is-active_img]:outline-4
                              [&:has(li>div.is-active)_li>div.is-active_img]:[outline:solid]
                              [&:has(li>div.is-active)_li>div.is-active_img]:p-0.5">

            <ul className="categorias flex gap-10 text-center px-5 [&:has(.active)_.active_img]:[outline:2px_solid_#333] [&:has(.active)_.active_img]:p-0.5">
              {category.map(section => (
                <li key={section.id}>
                  <div className={`text-center py-1 ${ativa === section.name ? "is-active" : ""}`} onClick={() => { setAtiva(section.name) }}>
                    <img src={section.photo} style={{ outlineColor: settings?.primaryColor }}
                      className="w-24 h-24 object-cover object-center rounded-full duration-75 transition-color p-0.5 mx-auto" />
                    <span className="block py-2">
                      {section.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="produtos lg:px-2 px-0 py-12">
              <div className="flex w-full mb-12 justify-between pr-3 px-4">
                <strong className="text-2xl">{ativa}</strong>
                <Button title={"⌵"} className="-rotate-[180deg] text-2xl font-bold" />
              </div>

              <ul className="flex flex-col gap-8 h-auto overflow-hidden">
                {category.filter(categoria => categoria.name === ativa)[0]?.itens.map(item => (
                  <Produto key={item.id} category={item} count={0} quantidade={() => { }} />
                ))}
              </ul>
            </div>
          </div>
          {width > 1023 && <Carrinho />}
          {width < 1024 && <CarrinhoMobile />}
        </div>
      </section>
    </>
  );
}

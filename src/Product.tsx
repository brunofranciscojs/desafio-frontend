import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { diminuir, aumentar  } from "./redux/ItemCounter.tsx";
import { RootState, AppDispatch } from "./redux/storeCounter.tsx";
import { adicionarcarrinho } from "./redux/CartItems.tsx";
import Button from "./button.tsx";

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

interface Categoria {
  category: {
    id: number; 
    description: string; 
    photo: string; 
    name: string; 
    preco: number; 
    modifiers: Modifier[],
  };
  count: number;
  quantidade: (count: number) => void;
}

interface Settings {
  bannerImage: string;
  bannerBgColor: string;
  navigationColor: string;
  primaryColor: string;
  backgroundColor: string;
  hover: string;
}
const Produto: React.FC<Categoria> = ({ category }) => {
    const { preco, description, name, photo, id, modifiers } = category;
    const precoBRL = (preco:number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"}).format(preco);
    const [modal, setModal] = useState<boolean>(false);
    const quantidade = useSelector((state: RootState) => state.contador[id] || 0) + 1;
    const dispatch = useDispatch<AppDispatch>();
    const [price, setPrice] = useState<number>(modifiers.length > 0 ? modifiers[0].items[0].price : preco );
    const [modificadores, setModificadores] = useState<Modifier[]>([]);
    const increasePrice = (preco:number) => preco * quantidade;
    const mudar = (preco: number, modifiers: Modifier) => {
      setPrice(preco);
      setModificadores([modifiers]);
    }
    const [settings, setSettings] = useState<Settings | null>(null);
    const fetchConfigFile = () =>{
      fetch("https://cdn-dev.preoday.com/challenge/venue/9").then(response => response.json())
      .then(configuration =>{
        setSettings({
            bannerImage: configuration.webSettings.bannerImage,
            bannerBgColor:"#36231C",
            navigationColor: configuration.webSettings.navBackgroundColour,
            primaryColor: configuration.webSettings.primaryColour,
            backgroundColor: configuration.webSettings.backgroundColour,
            hover: configuration.webSettings.primaryColourHover
        });
      });
    };
    fetchConfigFile()
    const colocarCarrinho = () => {
      dispatch(adicionarcarrinho({
          id, 
          name, 
          preco:price, 
          quantidade:quantidade, 
          modifiers:modificadores
        })
      );
      setModal(false);
    };
    if (!settings) {
      return null;
    }
        if(modal){
          return(
              <>
                <div className="overlay fixed top-0 left-0 bg-[#00000088] w-full h-full z-0 backdrop-blur-sm hidden lg:block"></div>
                <li key={id} className="flex gap-12 fixed top-1/2 -translate-y-1/2 -translate-x-2/4 left-1/2 lg:h-auto lg:w-[480px] w-full h-full z-[99]">
                  <div className="flex flex-col gap-2 z-10 bg-white lg:w-[480px] w-full">

                  <Button 
                    title={"X"} 
                    onClick={() => setModal(false)} 
                    className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 absolute top-4 right-4"
                  />

                  {photo && <img src={photo} className="w-full lg:h-[320px] h-[200px] object-cover object-center"/> }
                    
                   <div className="flex flex-col h-auto lg:w-[480px] w-full lg:h-full justify-center gap-2 lg:py-5 py-2">
                      <div className="py-3 px-7 flex flex-col gap-2 ">
                        <strong className="text-2xl">{name}</strong>
                        <span className="text-base leading-none">{description}</span>
                        <strong>{precoBRL(price)}</strong>
                      </div>

                        {modifiers.map(modifier => (
                          <div key={modifier.id} className="flex flex-col gap-4">
                              <div className="px-7 flex flex-col bg-[#F8F9FA] py-5">
                                <strong className="font-bold leading-none">{modifier.name}</strong>
                                <sub className="leading-none">Selecione 1 opção</sub> 
                              </div>

                            <div className="flex flex-col px-7 overflow-y-scroll h-36 justify-between">
                              {modifier.items.map(item => (
                                <div key={item.id} className="flex justify-between w-full">
                                  <div className="flex flex-col w-full">
                                    <label htmlFor={`modifier-${item.id}`} className="w-full -mb-2 h-8 z-10">
                                      <strong>{item.name}</strong>
                                    </label>
                                    <small className="leading-none">
                                      {precoBRL(item.price)}
                                    </small>
                                  </div>
                                  <input type="radio"  
                                         id={`modifier-${item.id}`} 
                                         name={`modifier-${modifier.id}`} 
                                         onChange={() => mudar(item.price, { ...modifier, price: item.price, name:item.name })}
                                         checked={price === item.price}
                                         className="py-3 px-5"
                                    />
                                </div>
                              ))}
                          </div>
                        </div>
                        ))}
                      <div className="flex gap-5 flex-col px-7 pb-5 lg:relative absolute bottom-3 w-full mx-auto">
                        
                        <div className="flex items-center justify-center">

                          <Button 
                              title={"-"} 
                              onClick={() => dispatch(diminuir(id))} 
                              style={{"backgroundColor":quantidade < 2 ? "#DADADA" : settings.primaryColor}}
                              disabled={quantidade < 2 ? true : false} 
                              className="leading-none rounded-full w-8 h-8 text-[2rem] flex justify-center text-white text-md font-bold text-center [&:has(span)_span]:block lg:[&:has(span)_span]:-translate-y-1"
                              />

                          <b className="text-2xl w-12 text-center">{quantidade}</b>
                          <Button className="leading-none rounded-full w-8 h-8 text-[2rem] flex justify-center text-white text-md font-bold text-center [&:has(span)_span]:block lg:[&:has(span)_span]:-translate-y-1"
                                  title={"+"} 
                                  onClick={() => dispatch(aumentar(id))} 
                                  style={{"backgroundColor":settings.primaryColor}}/>
                        </div>
                      
                        <button className="rounded-full px-12 py-5 text-center text-white w-full mx-auto" 
                                style={{"backgroundColor":settings.primaryColor}} onClick={colocarCarrinho}>
                            Add to Order • {precoBRL(increasePrice(price))}
                        </button>

                      </div>
                      
                   </div>

                  </div>
                </li>
              </>
            )
          }

        return(
          <li key={id} className="flex lg:gap-6 gap-0 cursor-pointer hover:bg-gray-100 duration-200 transition-colors py-5 px-4 justify-between " onClick={() => {setModal(true)}}>

            <div className="flex flex-col lg:w-3/4 w-1/2 justify-center gap-2">
              <strong>{name}</strong>
              <span className="truncate text-xl">{description}</span>
              <strong>{precoBRL(preco)}</strong>
            </div>

            {photo && <img src={photo} className="lg:w-3/12 w-[45%] lg:h-[85px] h-[130px] object-cover object-center rounded-md"/> }
          </li>
        );
      };
export default Produto;
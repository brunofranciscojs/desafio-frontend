import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/storeCounter.tsx";
import { diminuir, aumentar, ItemCarrinho } from "./redux/CartItems.tsx";
import Button from "./button.tsx";

interface Settings {
  webSettings:{
    bannerImage: string;
    bannerBgColor: string;
    navBackgroundColour: string;
    primaryColour: string;
    backgroundColour: string;
    primaryColourHover: string;
  }
}
const Carrinho: React.FC = () => {
    const itensCarrinho = useSelector((state: RootState) => state.carrinho.items);
    const total = useSelector((state: RootState) => state.carrinho.total);
    const dispatch = useDispatch<AppDispatch>();
    const somaItens = (item:ItemCarrinho) => item.preco * item.quantidade;
    const precoBRL = (preco:number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(preco);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchConfigFile = async () => {
        try {
          const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
              'https://cdn-dev.preoday.com/challenge/venue/9'
            )}`
          );
          const data = await response.json();
          const configuration: Settings = JSON.parse(data.contents);
  
          setSettings({
            webSettings:{
              bannerImage: configuration.webSettings.bannerImage,
              bannerBgColor: "#36231C",
              navBackgroundColour: configuration.webSettings.navBackgroundColour,
              primaryColour: configuration.webSettings.primaryColour,
              backgroundColour: configuration.webSettings.backgroundColour,
              primaryColourHover: configuration.webSettings.primaryColourHover,
            }
          });
        } catch (error) {
          console.error("Falha ao carregar configuração", error);
        } finally{
          setLoading(false);
        }
      };
  
      fetchConfigFile();
    }, []);
  
    if (loading) {
      return <div className="bg-[#F8F9FA] max-w-[1280px] mx-auto my-2 rounded-md flex gap-5 p-12">carregando...</div>
    }
    
    return (<>
    {settings && (
      <div className="carrinho bg-white shadow-md lg:w-[600px] w-full h-[calc(150px_+_20%)] hidden lg:block">
        <h3 className="font-semibold text-gray-700 text-3xl bg-[#F8F9FA] py-5 px-5">Carrinho</h3>
        <div className="block h-auto">

          {itensCarrinho.length === 0 ? 
            "Seu carrinho está vazio." : (
              
              itensCarrinho.map(item => (

                <div key={item.id} className="mb-5 border border-gray-200 border-l-0 border-b-0 border-r-0 py-4 px-5">
                  <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      <b>{precoBRL(somaItens(item))}</b>
                  </div>

                  {item.modifiers.length > 0 && (

                    <small className="leading-none mb-3 block"> 
                        {item.modifiers.map(modifier => ( modifier.name ))} 
                    </small>
                  )}
                  <div className="flex">

                    <Button className="leading-none rounded-full w-5 h-5 flex justify-center text-white text-md font-bold text-center"
                            title={"-"} 
                            onClick={() => dispatch(diminuir(item.id))} 
                            style={{"backgroundColor": settings.webSettings.primaryColour}}/>

                    <b className="text-sm px-[3px] w-8 text-center">{item.quantidade}</b>

                    <Button className="leading-none rounded-full w-5 h-5 flex justify-center text-white text-md font-bold text-center"
                            title={"+"} 
                            onClick={() => dispatch(aumentar(item.id))} 
                            style={{"backgroundColor":settings.webSettings.primaryColour}}/>
                  </div>
                </div>
              ))
          )}
        </div>

        {itensCarrinho.length > 0 ? ( <>
            <div className="text-gray-700 text-xl bg-[#F8F9FA] py-2 px-5 flex justify-between items-center shadow-md">
              <small className="text-sm">Subtotal</small>
              <span className="font-semibold">{precoBRL(total)}</span>
            </div>
              <hr />
            <div className=" text-gray-700 text-2xl bg-[#F8F9FA] py-2 px-5 flex justify-between items-center shadow-md">
              <small>Total:</small>
              <span className="font-bold">{precoBRL(total)}</span>
            </div>
          </>)
        : null }
      </div>
    )}</>
  );
};
export default Carrinho;
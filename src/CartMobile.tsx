import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/storeCounter.tsx";
import { diminuir, aumentar,ItemCarrinho } from "./redux/CartItems";
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
const CarrinhoMobile: React.FC = () => {
    const itensCarrinho = useSelector((state: RootState) => state.carrinho.items);
    const total = useSelector((state: RootState) => state.carrinho.total);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [cartButton, setCartButton] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const somaItens = (item:ItemCarrinho) => item.preco * item.quantidade;
    const precoBRL = (preco:number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(preco);

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
          console.error("Failed to fetch configuration", error);
        } finally{
          setLoading(false);
        }
      };
  
      fetchConfigFile();
    }, []);
  
    if (loading) {
      return <div className="bg-[#F8F9FA] max-w-[1280px] mx-auto my-2 rounded-md flex gap-5 p-12">Loading...</div>
    }
    if (!settings) {
      return null;
    }
    return (<>

      {itensCarrinho.length > 0 && (
          <Button title={`Ver carrinho • ${precoBRL(total)}`} style={{"backgroundColor":settings.webSettings.primaryColour}}
                  className="rounded-full px-5 py-5 text-center text-white mx-auto fixed bottom-3 w-[90%] shadow-xl z-0 left-1/2 -translate-x-1/2" 
                  onClick={() => setCartButton(true)}
            />
      )}
            
      {settings && cartButton && (
        <div className="carrinho bg-white shadow-md h-[100dvh] fixed w-full top-0 left-0 z-50">

          <Button title={"X"} onClick={() => setCartButton(false)} className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 absolute top-4 right-4" />

          <h3 className="font-semibold text-gray-700 text-3xl bg-[#F8F9FA] py-5 px-5">Carrinho</h3>
          <div className="block h-auto">

            {itensCarrinho.length === 0 ? 
              <span className="px-5">
                Seu carrinho está vazio.
              </span> 
              : (
                itensCarrinho.map(item => (

                  <div key={item.id} className="px-5 border border-gray-200 border-l-0 border-b-0 border-r-0 py-5 -mb-[1px]">
                    <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <b>{precoBRL(somaItens(item))}</b>
                    </div>

                    {item.modifiers.length > 0 && (

                      <small className="leading-none mb-3 block"> 
                          {item.modifiers.map(modifier => ( 
                            <span>
                              {modifier.name}
                              <span> +({precoBRL(item.preco)})</span>
                            </span>
                             
                            ))} 
                      </small>
                    )}
                    <div className="flex">

                      <Button className="leading-none rounded-full w-5 h-5 flex justify-center text-white text-md font-bold text-center [&:has(span)_span]:block [&:has(span)_span]:translate-y-[2px] lg:[&:has(span)_span]:translate-y-0"
                              title={"-"} 
                              onClick={() => dispatch(diminuir(item.id))} 
                              style={{"backgroundColor": settings.webSettings.primaryColour}}/>

                      <b className="text-sm px-[3px] w-8 text-center">{item.quantidade}</b>

                      <Button className="leading-none rounded-full w-5 h-5 flex justify-center text-white text-md font-bold text-center z-10 [&:has(span)_span]:translate-y-[2px] lg:[&:has(span)_span]:translate-y-0"
                              title={"+"} 
                              onClick={() => dispatch(aumentar(item.id))} 
                              style={{"backgroundColor":settings.webSettings.primaryColour}}/>
                    </div>
                  </div>
                ))
            )}
          </div>

          {itensCarrinho.length > 0 ? ( <>
              <div className=" mx-auto">
                <div className="text-gray-700 text-xl bg-[#F8F9FA] py-4 px-5 flex justify-between items-center shadow-md">
                  <small className="text-sm">Subtotal</small>
                  <span className="font-semibold">{precoBRL(total)}</span>
                </div>
                  <hr />
                <div className=" text-gray-700 text-2xl bg-[#F8F9FA] py-4 px-5 flex justify-between items-center shadow-md">
                  <small>Total:</small>
                  <span className="font-bold">{precoBRL(total)}</span>
                </div>
  
                  <Button title={`CheckOut Now`} 
                          className="rounded-full px-12 py-5 text-center text-white mx-auto fixed bottom-3 w-[90%] shadow-xl left-1/2 -translate-x-1/2" 
                          style={{"backgroundColor":settings.webSettings.primaryColour}} 
                          onClick={() => setCartButton(false)}
                    />
              </div>
            </>)
          : null }
        </div>
    )}</>
  );
};
  
export default CarrinhoMobile;
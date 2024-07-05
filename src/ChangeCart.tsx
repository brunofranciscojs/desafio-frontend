import React, {useState, useEffect} from "react";
import Button from "./button.tsx";
import { diminuir, aumentar  } from "./redux/ItemCounter.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/storeCounter.tsx";

interface Categoria {
    id:number;
}
interface Settings {
    bannerImage: string;
    bannerBgColor: string;
    navigationColor: string;
    primaryColor: string;
    backgroundColor: string;
    hover: string;
  }
const ModifyCart: React.FC<Categoria> = ({id}) => {
    const dispatch = useDispatch<AppDispatch>();
    const quantidade = useSelector((state: RootState) => state.contador[id] || 0) + 1;
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        const fetchConfigFile = async () => {
          const response = await fetch("./src/configuration.json");
          const configuration = await response.json();
    
          setSettings({
            bannerImage: configuration.webSettings.bannerImage,
            bannerBgColor: "#36231C",
            navigationColor: configuration.webSettings.navBackgroundColour,
            primaryColor: configuration.webSettings.primaryColour,
            backgroundColor: configuration.webSettings.backgroundColour,
            hover: configuration.webSettings.primaryColourHover,
          })
      }
        fetchConfigFile();
      }, []);

    if (!settings) { return null; }

    return(
        <div className="flex items-center justify-center">
            <Button className="leading-none rounded-full w-10 h-10 text-[2rem] flex justify-center text-white font-bold text-center [&:has(span)_span]:block lg:[&:has(span)_span]:-translate-y-1"
                    title={"-"}
                    onClick={() => dispatch(diminuir(id))}
                    style={{"backgroundColor":quantidade < 2 ? "#DADADA" : settings.primaryColor}}
                    disabled={quantidade < 2 ? true : false}></Button>

            <b className="text-2xl w-16 px-5 text-center">{quantidade}</b>
            <Button className="leading-none rounded-full w-10 h-10 text-[2rem] flex justify-center text-white font-bold text-center [&:has(span)_span]:block lg:[&:has(span)_span]:-translate-y-1"
                    title={"+"}
                    onClick={() => dispatch(aumentar(id))}
                    style={{backgroundColor:settings.primaryColor}}></Button>
        </div>
    );
};

export default ModifyCart;
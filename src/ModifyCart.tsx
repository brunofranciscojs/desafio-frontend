import React, { useState, useEffect } from "react";
import Button from "./button";
import { diminuir, aumentar } from "./redux/ItemCounter";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/storeCounter";

interface Categoria {
  id: number;
}

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

const ModifyCart: React.FC<Categoria> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const quantidade = useSelector((state: RootState) => state.contador[id] || 0) + 1;
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
        console.error("Failed to fetch configuration", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigFile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!settings) {
    return <div>Error loading settings</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        className="leading-none rounded-full w-10 h-10 text-[2rem] flex justify-center text-white font-bold text-center [&:has(span)_span]:block lg:[&:has(span)_span]:-translate-y-1"
        title={"-"}
        onClick={() => dispatch(diminuir(id))}
        style={{ backgroundColor: quantidade < 2 ? "#DADADA" : settings?.webSettings.primaryColour }}
        disabled={quantidade < 2}
      ></Button>

      <b className="text-2xl w-16 px-5 text-center">{quantidade}</b>
      <Button
        className="leading-none rounded-full w-10 h-10 text-[2rem] flex justify-center text-white font-bold text-center [&:has(span)_span]:block lg:[&:has(span)_span]:-translate-y-1"
        title={"+"}
        onClick={() => dispatch(aumentar(id))}
        style={{ backgroundColor: settings?.webSettings.primaryColour }}
      ></Button>
    </div>
  );
};

export default ModifyCart;

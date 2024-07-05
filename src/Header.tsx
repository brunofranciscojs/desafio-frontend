import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Button from "./button";

interface Settings {
  bannerImage: string;
  bannerBgColor: string;
  navigationColor: string;
  primaryColor: string;
  backgroundColor: string;
  hover: string;
}
export default function Header(){
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchConfigFile = async () => {
        const response = await fetch("../../configuration.json");
        const configuration = await response.json();
  
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
      fetchConfigFile();
    }, []);

    if (loading) {
      return <div className="bg-[#F8F9FA] max-w-[1280px] mx-auto my-2 rounded-md flex gap-5 p-12">Loading...</div>;
    }
return ( 

    settings && (
      <>
            <header className="w-full relative top-0 max-w-full px-10 py-5 mx-auto flex justify-end lg:justify-between" style={{"backgroundColor":settings.primaryColor}}>
              <nav className="hidden lg:block w-full">
                <ul className="flex justify-evenly gap-0 items-center max-w-[960px] mx-auto">
                  <li><a href="./Menu" className="text-white hover:text-gray-400 duration-150 text-[20px]" onClick={() => navigate("/Menu")}>MENU</a></li>
                  <li><a href="#" className="text-white hover:text-gray-400 duration-150 text-[20px]">ENTRAR</a></li>
                  <li><a href="./Contact" className="text-white hover:text-gray-400 duration-150 text-[20px]" onClick={() => navigate("/Contact")}>CONTATO</a></li>
                </ul>
              </nav>

              {open && <nav className="block lg:hidden fixed h-screen duration-75 z-50 top-0 left-0 shadow-xl w-[270px] overflow-hidden animate-[show_.1s_ease]" style={{"backgroundColor":settings.primaryColor}}>
                <ul className="flex flex-col justify-evenly gap-5 mx-auto p-12">
                  <li><a href="./Menu" className="text-white hover:text-gray-400 duration-150 text-[20px]" onClick={() => navigate("/Menu")}>MENU</a></li>
                  <li><a href="#" className="text-white hover:text-gray-400 duration-150 text-[20px]">ENTRAR</a></li>
                  <li><a href="./Contact" className="text-white hover:text-gray-400 duration-150 text-[20px]" onClick={() => navigate("/Contact")}>CONTATO</a></li>
                </ul>
              </nav>}

              <Button title={open ? "⛌" : "|||"} 
                      onClick={() => setOpen(open ? false : true)} 
                      className="rotate-90 font-bold text-white lg:hidden block"
                        />
              </header>

      <section className="h-[150px]"
                style={{
                  background: `url(${settings.bannerImage}), ${settings.bannerBgColor}`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "auto",
                }}>

      </section>
    </>
    )
  );
}
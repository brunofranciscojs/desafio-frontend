import { useState } from "react";

interface Settings {
    name: string;
    description: string;
    city: string;
    adress: string;
    postcode: string;
 }

export default function Contact() {
    const [settings, setSettings] = useState<Settings | null>(null);

    const fetchConfigFile = () =>{
      fetch("./../../src/configuration.json").then(response => response.json())
      .then(configuration =>{
        setSettings({
            name:configuration.name,
            description:configuration.description,
            city:`${configuration.city}/${configuration.country}`,
            adress:`${configuration.address1}, ${configuration.address2}, ${configuration.address3 ? configuration.address3 : ""}`,
            postcode:configuration.postcode,
        })
      });
    };
    fetchConfigFile();
    return ( 
        settings && (
        <>
            <section className="bg-[#F8F9FA] max-w-[1280px] mx-auto my-2 rounded-md flex gap-5 p-12">
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl mb-3">{settings.name}</h2>
                    <span><b>Sobre</b>: <br/>{settings.description != null ? settings.description : "sem descrição"}</span>
                    <span><b>Cidade</b>: {settings.city}</span>
                    <span><b>Endereço</b>: {settings.adress} - {settings.postcode}</span>
                </div>
            </section>
        </>
        )
      );
  }
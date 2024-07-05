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
                name: configuration.name,
                description: configuration.description ? configuration.description :'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quae consectetur, voluptatem culpa maiores tempora, dolorum ullam fugit hic quaerat dolor optio quasi officiis accusamus ipsam veniam similique iusto debitis. Nam omnis consectetur eos veritatis.',
                city: configuration.city,
                adress: configuration.adress,
                postcode: configuration.postcode,
            });
          } catch (error) {
            console.error("Failed to fetch configuration", error);
          } 
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
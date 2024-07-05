export default function Search() {

  return (
    <div className="search max-w-[1280px] w-full mx-auto relative lg:px-0 px-4
                      [&:has(input:blur)_.resultado]:hidden
                      before:content-[url('./src/assets/lupa.svg')] 
                      before:absolute 
                      before:h-5 
                      before:w-6 
                      before:grayscale 
                      before:top-1/2 
                      before:-translate-y-2/4 
                      lg:before:left-3
                      before:left-6"
    >
      <input type="text"
             className="w-full rounded-md border border-gray-500 py-2 px-8 text-gray-700 lg:shadow-md shadow-none"
             placeholder="Search menu items..."
      />
      <div className="absolute top-10 backdrop-blur-sm bg-[#00000011] w-full left-0 z-20 rounded-b-md resultado"></div>
    </div>
  );
}

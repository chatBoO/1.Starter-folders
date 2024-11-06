import { useEffect, useState } from "react";
import ListCard from "./components/ListCard";

function App() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/region/europe")
            .then((response) => response.json())
            .then((data) => {
                // Trier les pays par ordre alphabétique en fonction du nom commun
                const sortedCountries = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedCountries);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-800">
            <div className="max-w-7xl mx-auto py-20 px-4">
                <h1 className="text-gray-50 text-4xl">Europ Countries Data.</h1>
                <p className="text-gray-100 text-xl mb-8">
                    Click on a Card to reveal a country's information.
                </p>
                {countries && (
                    <ul className="grid min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 auto-rows-[200px]">
                        {countries.map((country, index) => (
                            <ListCard key={index} country={country} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;

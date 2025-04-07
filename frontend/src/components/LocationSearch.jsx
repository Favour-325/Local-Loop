import { useState } from "react";
import axios from "axios";

function LocationSearch({ onSelectLocation }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (searchText) => {
        if (!searchText) return;
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: searchText,
                    format: "json",
                    addressdetails: 1,
                    limit: 5
                }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Failed to fetch suggestions", error.response?.data || error.message);
            setSuggestions([
                "Douala",
                "Yaounde",
                "Bonapriso"
            ])
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value);
        fetchSuggestions(value);
    };

    const handleSelect = (place) => {
        setQuery(place.display_name);
        setSuggestions([]);
        onSelectLocation({
            name: place.display_name,
        });
    }

    return (
        <div>
            <input type="text" className="form-control" value={query} placeholder="Search Location..." onChange={handleChange} />
            {suggestions.length > 0 && (
                <div className="list-group">
                    {
                        suggestions.map((place) => (
                            <button key={place.place_id} type="button" className="list-group-item list-group-item-action" onClick={() => handleSelect(place)}>
                                {place.display_name}
                            </button>
                        ))
                    }
                </div>
            )}
        </div>
    );
}

export default LocationSearch;
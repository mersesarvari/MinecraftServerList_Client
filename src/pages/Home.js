import axios from "axios";


async function fetchData() {
    try {
        const response = await axios.get("https://eu.mc-api.net/v3/server/ping/mc.hypixel.net")
        setUser(response.data)
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    fetchData();
}, [])

export default function Home() {
    return (
        <div className="home">
            <h2>Welcome to server information:</h2>
            
        </div>
    )
}
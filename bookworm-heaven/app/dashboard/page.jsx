import Header from "../components/header";
import BestSellersComponent from "../components/best-sellers";

export default async function Dashboard() {
    return(
        <main>
            <Header/>
            <BestSellersComponent/>
        </main>
    )
}
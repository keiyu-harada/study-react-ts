import BookTable from "./BookTable";
import Footer from "./Footer";
import Header from "./Header";

export default function Home() {

  return (
    <div className="App">
      <Header />
      <BookTable />
      <Footer />
    </div>

  )
}
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-Roboto">
      <div>
        <h1 className="mb-10 text-2xl text-center font-semibold py-4 bg-white shadow-sm">
          All Pages
        </h1>

        <div className="pl-4 flex gap-4">
          <Link to="/report/airport-pickup-dropoff">
            <button className="cursor-pointer px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-150">
              Airport Report Pickup and Drop Page
            </button>
          </Link>
          <Link to="/report/bill-adjustment-report">
            <button className="cursor-pointer px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-150">
              Bill Adjustment Report Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

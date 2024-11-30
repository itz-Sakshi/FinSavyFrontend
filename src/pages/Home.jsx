import bgHome from '../assets/images/bg-home.jpg';

const Home = () => {

  return (
    <div>
      <section className="intro relative">
        {/* Background image */}
        <div
          className="h-[100vh] bg-cover bg-center opacity-[0.19]"
          style={{ backgroundImage: `url(${bgHome})` }}
        ></div>

        {/* Tagline section */}
        <div className="absolute inset-0 flex items-center justify-center text-emerald-800">
          <div className="bg-gray-300 bg-opacity-40 p-6 py-12 rounded-full text-center w-4/5">
            <h1 className="text-3xl md:text-5xl font-bold text-black">
              One App, Endless Financial Insights.
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
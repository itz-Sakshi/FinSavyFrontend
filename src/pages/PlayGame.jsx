import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Select, Button, TrendCard } from "../components";
import John from "../assets/images/SadJohn.jpeg";
import Houses from "../assets/images/Houses.jpeg";
import Expenses from "../assets/images/expenses.jpeg";
import Savings from "../assets/images/Savings.jpeg";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Validation rules
const validationRules = {
  income: { required: "Income is required", min: 20000, max: 1000000 },
  mortgage: { required: "Mortgage is required", min: 500, max: 10000 },
  expenses: { required: "Expenses are required", min: 100, max: 50000 },
  nonEssentialExpenses: { required: "Non-essential expenses are required", min: 100, max: 20000 },
  savings: { required: "Savings are required", min: 0 },
  rentAmount: { required: "Rent amount is required", min: 0 },
  sellHouse: { required: "Please choose whether to sell the house" },
  decExpenses: { required: "Please choose whether to decrease non-essential expenses" },
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PlayGame = () => {
  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
  const [hasHouse, setHasHouse] = useState(true);
  const [houseWorth, setHouseWorth] = useState(650000);
  const [displaySecondForm, setDisplaySecondForm] = useState(false);
  const [displayNetWorth, setDisplayNetWorth] = useState(false);
  const [askRentQues, setAskRentQues] = useState(true);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear() + 1);
  const [yearData, setYearData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [netWorthData, setNetWorthData] = useState([]);
  
  const sellHouseOption = watch("sellHouse");

  const handleSubmitForm1 = (data) => {
    setDisplaySecondForm(true);
    setUserData(data);
    reset();
  };

  const handleYearlySubmit = async (data) => {
    if (data.rentAmount) setAskRentQues(false);

    const previousSavings = yearData.length > 0 ? yearData[yearData.length - 1].cumulativeSavings : 0;
    const currentSavings = parseFloat(data.savings || 0);
    const cumulativeSavings = previousSavings + currentSavings;

    const updatedYearData = [
      ...yearData,
      {
        year: currentYear,
        sellHouse: data.sellHouse || "no",
        savings: currentSavings,
        cumulativeSavings,
        decExpenses: data.decExpenses || "no",
        hasHouse: hasHouse
      },
    ];
    setYearData(updatedYearData);

    if (sellHouseOption === "yes") {
      setHasHouse(false);
    }

    if (currentYear < new Date().getFullYear() + 10) {
      setCurrentYear((prev) => prev + 1);
      reset();
    } else {     
      alert("You have completed all 10 years!");
      const updatedData = {
        yearData: updatedYearData,
        InitialData: { ...userData, houseWorth: houseWorth },
      };
      console.log(updatedData);
      await sendDataToBackend(updatedData);
      
      reset();
    }
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await axios.post("/api/sendUserFinancialData", data);
      console.log("Data sent successfully!", response.data);
      
      // Assuming the backend sends a response with the predictions object
      const { netWorths } = response.data;
      const netWorthYears = netWorths.map(item => item.Year);
      const netWorthValues = netWorths.map(item => item.NetWorth);
      setNetWorthData({ years: netWorthYears, netWorth: netWorthValues });
      setDisplayNetWorth(true);
    } catch (error) {
      if (error.response) {
        console.error("Failed to send data:", error.response.statusText);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error sending data:", error.message);
      }
    }
  };

  const renderError = (field) => {
    if (!errors[field]) return null;
    const error = errors[field];
    if (error.type === "required")
      return <p className="text-white">{error.message}</p>;
    if (error.type === "min")
      return (
        <p className="text-white">
          Minimum value is {validationRules[field].min}.
        </p>
      );
    if (error.type === "max")
      return (
        <p className="text-white">
          Maximum value is {validationRules[field].max}.
        </p>
      );
    return <p className="text-red-500">{error.message}</p>;
  };

  const netWorthChartData = {
    labels: netWorthData.years,
    datasets: [
      {
        label: 'Net Worth Over Time',
        data: netWorthData.netWorth,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <>
      {/* Intro Section */}
      <section className="first p-10">
        <h1 className="text-white font-bold text-xl text-center">
          Think you have what it takes to make the best financial decisions and
          build your wealth?
        </h1>
        <div className="w-[60vw] flex mx-auto rounded-xl h-[60vh] bg-gray-300 m-10">
          <img className="rounded-l-xl w-[50%]" src={John} alt="Sad John" />
          <div className="p-4">
            <p className="text-base md:text-lg lg:text-2xl xl:text-3xl">
              <strong>Meet John,</strong> a 30-year-old with big dreams and
              financial ambitions. He lives in a house worth{" "}
              {houseWorth} CAD. Are you ready to make the right calls
              over the next 10 years and maximize his financial growth?
            </p>
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section className="third flex flex-col items-center">
        <h1 className="text-2xl font-bold p-8 text-white text-center">
          Look at these past trends to help you decide what&apos;s best for John
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 p-3">
          <TrendCard title="House Worth And Mortgage" img={Houses} />
          <TrendCard title="Income and Expenses" img={Expenses} />
          <TrendCard title="Interest on Savings" img={Savings} />
        </div>
      </section>

      {/* Form Section */}
      <section className="fourth p-4">
        <div className="w-[70%] p-10 flex flex-col gap-8 m-auto bg-slate-400 rounded-lg">
          <h1 className="text-center text-2xl font-bold">
            🚨 Challenge Alert! Help John distribute his yearly budget wisely to
            achieve the best results.
          </h1>

          {!displaySecondForm ? (
            <form onSubmit={handleSubmit(handleSubmitForm1)}>
              <Input
                label="Enter John's annual income:"
                type="number"
                {...register("income", validationRules.income)}
              />
              {renderError("income")}

              <Input
                label="Enter John's monthly mortgage payment:"
                type="number"
                {...register("mortgage", validationRules.mortgage)}
              />
              {renderError("mortgage")}

              <Input
                label="Enter John's average fixed monthly expenses:"
                type="number"
                {...register("expenses", validationRules.expenses)}
              />
              {renderError("expenses")}

              <Input
                label="Enter John's average non-essential monthly expenses:"
                type="number"
                {...register(
                  "nonEssentialExpenses",
                  validationRules.nonEssentialExpenses
                )}
              />
              {renderError("nonEssentialExpenses")}
              <div className="m-4 text-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleYearlySubmit)}
              className="form-container"
            >
              <h1 className="text-2xl font-bold text-center my-4">
                Year {currentYear}: Make Your Financial Decisions
              </h1>
              {hasHouse && (
                <Select
                  options={["", "no", "yes"]}
                  label="Would you like John to sell his house this year and switch to renting from now on?"
                  {...register("sellHouse", validationRules.sellHouse)}
                />
              )}

              {askRentQues && sellHouseOption === "yes" && (
                <Input
                  label="Enter expected monthly rent amount:"
                  type="number"
                  {...register("rentAmount", validationRules.rentAmount)}
                />
              )}

              <Select
                options={["", "no", "yes"]}
                label="Would you like John to decrease non-essential expenses for this year?"
                {...register("decExpenses", validationRules.decExpenses)}
              />

              <Input
                label="Enter savings amount for this year:"
                type="number"
                {...register("savings", validationRules.savings)}
              />
              {renderError("savings")}

              <div className="m-4 text-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Net Worth Chart Section */}
      {displayNetWorth && <section className="fifth p-8">
        <h1 className="text-2xl text-center font-bold text-white">Net Worth Over Time</h1>
        <div className="chart-container bg-black rounded-md p-2 m-2">
          <Line data={netWorthChartData} />
        </div>
      </section>}
    </>
  );
};

export default PlayGame;

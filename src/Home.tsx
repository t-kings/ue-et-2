import React, { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "./Button";
import "react-toastify/dist/ReactToastify.css";
import styles from "./home.module.css";

export const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      if (!email) {
        toast("Please provide an email address", {
          type: "error",
        });
        return;
      }
      await axios.post(
        "https://surge-api.ngrok.io/v1/shipping-cost-calculator/email",
        {
          email,
        }
      );
      toast("A confirmation email has been sent to your email address", {
        type: "success",
      });
      setEmail("");
    } catch (e: any) {
      const error = e as AxiosError;
      const message: string =
        (error.response?.data as any)?.message || error.message;
      toast(message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <main>
      <header className={styles.hero}>
        <div className={styles.backgroundImageDiv}>
          <img
            src="/images/coin.png"
            className={styles.rotating}
            alt="CoinForBarter Logo"
          />
        </div>
        <div className={styles.banner}>
          <div className="flex items-center center flex-col  w-full  ">
            <div className=" w-full flex items-center justify-center md:w-2/5 md:py-0">
              <img
                className="w-full block"
                src="/images/logo.png"
                alt="CoinForBarter Checkout"
                style={{
                  maxWidth: 300,
                }}
              />
            </div>
            <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-2/4 py-8 md:py-0 flex justify-center items-center flex-col">
              <p className={`${styles.title} mb-8 text-center`}>
                Your Route to Cost-Efficient Deliveries
              </p>
              <p className={`${styles.subtitle} text-center`}>
                Start automatically calculating shipping cost for your e
                commerce website.
              </p>
              <div
                className={`mt-10 w-full md:w-5/6 ${styles.searchDiv} flex flex-col lg:flex-row nowrap justify-between items-center lg:items-stretch gap-2 lg:bg-white p-0 lg:p-1`}
              >
                <input
                  type="email"
                  className="block py-4 px-6 lg:pl-2 lg:p-0 text-black flex-1 w-full"
                  placeholder="Your Email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  text="Get Started"
                  onClick={() => {
                    if (loading) {
                      return;
                    }
                    handleSubmit();
                  }}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <ToastContainer />
    </main>
  );
};

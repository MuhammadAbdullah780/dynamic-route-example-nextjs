import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Components
import DisplayResult from "@/containers/DisplayResult";
import FromHeading from "@/common/components/FormHeading";
// Data imports
import Data from "@/Data";

// ENUMS
export enum ValueEnum {
  ON_SALE = "onSale",
  PRICE = "price",
  COUNTRY = "country",
  STATUS = "status",
  ID = "id",
}

// TYPES
type Values = {
  [ValueEnum.ON_SALE]: boolean;
  [ValueEnum.PRICE]: number | undefined;
  [ValueEnum.COUNTRY]: string | undefined;
  [ValueEnum.STATUS]: string | undefined;
};

type ResultData = {
  [ValueEnum.ID]: string;
  [ValueEnum.ON_SALE]: boolean;
  [ValueEnum.PRICE]: number;
  [ValueEnum.COUNTRY]: string;
  [ValueEnum.STATUS]: string;
}[];

const index = () => {
  // HOOK INSTANCES
  const router = useRouter();

  // DUMMY DATA
  const countryList = [
    "Select Country",
    "US",
    "UK",
    "IND",
    "GR",
    "RUS",
    "UAE",
    "MEX",
    "RUS",
    "PK",
  ];
  const statusList = ["Select Status", "for-sale", "for-rent"];

  // USESTATE HOOKS
  // STATE VARIABLES
  const [result, setResult] = useState<ResultData>();
  const [values, setValues] = useState<Values>({
    [ValueEnum.ON_SALE]: router.query.onSale === "true" ? true : false,
    [ValueEnum.PRICE]: Number(router.query.price) || 0,
    [ValueEnum.COUNTRY]: router?.query?.country as string,
    [ValueEnum.STATUS]: router?.query?.status as string,
  });

  // USE EFFECT HOOKS
  // THIS USE-EFFECT WILL UPDATE THE STATE INITIALLY WHEN THE PAGE LOAD OR THE QUERY-PARAMS LOADS.
  useEffect(() => {
    if (router.isReady) {
      setValues({
        [ValueEnum.ON_SALE]: router?.query?.onSale === "true" ? true : false,
        [ValueEnum.PRICE]: Number(router.query.price) || 0,
        [ValueEnum.COUNTRY]: router?.query?.country as string,
        [ValueEnum.STATUS]: router?.query?.status as string,
      });
    }
  }, [router.isReady]);

  // USE-STATE TO FILTER OUT DATA
  useEffect(() => {
    if (
      !router.query.country &&
      !router.query.price &&
      !router.query.status &&
      !router.query.onSale
    ) {
      return setResult(Data);
    }
    const filterHouses = Data.filter((item) =>
      router.query.onSale ? item.onSale === Boolean(router.query.onSale) : true,
    )
      .filter((item) =>
        router.query.country ? item.country === router.query.country : true,
      )
      .filter((item) =>
        router.query.price ? item.price <= Number(router.query.price) : true,
      )
      .filter((item) =>
        router.query.status ? item.status === router.query.status : true,
      );
    setResult(filterHouses);
  }, [router.query, router.isReady]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let query: { [key: string]: string | string[] | number | boolean } = {};
    if (values.price) {
      query.price = values.price;
    }
    if (values.country) {
      query.country = values.country;
    }
    if (values.status) {
      query.status = values.status;
    }
    if (values.onSale) {
      query.onSale = values.onSale;
    }
    router.push(
      {
        pathname: "/",
        query: query,
      },
      undefined,
      { shallow: true },
    );
  };

  const handleValueshange = (key: string, value: Values[keyof Values]) => {
    setValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <section className="p-5 max-w-5xl mt-10 flex min-w-[400px] items-start bg-slate-200 rounded-md flex-col gap-5 justify-center">
        <FromHeading title="Form" />
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="w-full flex items-start justify-center gap-5 flex-col ">
          {/* INPUT FIELDS */}

          {/* SELECT INPUT */}
          {/* COUNTRY INPUT */}
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select a Country
            </label>
            <select
              name="country"
              value={
                values.country === undefined ? "Select Country" : values.country
              }
              onChange={({ target }) =>
                handleValueshange(
                  ValueEnum.COUNTRY,
                  target.value === "Select Country" ? undefined : target.value,
                )
              }
              className="bg-gray-50 border border-gray-300 min-w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {countryList.map((item, i) => {
                return <option key={i}>{item}</option>;
              })}
            </select>
          </div>

          {/* FOR RENT OR FOR SALE INPUT */}
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Status
            </label>
            <select
              name="status"
              value={
                values.status === undefined ? "Select Status" : values.status
              }
              onChange={({ target }) =>
                handleValueshange(
                  ValueEnum.STATUS,
                  target.value === "Select Status" ? undefined : target.value,
                )
              }
              className="bg-gray-50 border border-gray-300 min-w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {statusList.map((item, i) => {
                return <option key={i}>{item}</option>;
              })}
            </select>
          </div>

          {/* INPUT TYPE CHECKBOX -- ONSALE */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="onSale"
              checked={values.onSale === true ? true : false}
              onChange={(e) =>
                handleValueshange(ValueEnum.ON_SALE, e.target.checked)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              On Sale
            </label>
          </div>

          {/* PRICE INPUT */}
          <div className="w-full">
            <label
              htmlFor="minmax-range"
              className="block text-sm font-medium text-gray-900 dark:text-white">
              Price Range ({values.price})
            </label>
            <input
              type="range"
              name="price"
              min={0}
              max={98000}
              value={values.price}
              onChange={({ target }) =>
                handleValueshange(ValueEnum.PRICE, Number(target.value))
              }
              className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </section>
      {result && (
        <section className="w-[700px] mb-10 text-center p-4 rounded-md bg-slate-200">
          <DisplayResult values={result} />
        </section>
      )}
    </>
  );
};

export default index;

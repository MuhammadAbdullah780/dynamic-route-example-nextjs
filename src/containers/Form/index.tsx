import React, { useState } from "react";
// Components
import DisplayResult from "@/containers/DisplayResult";
import FromHeading from "@/common/components/FormHeading";
// Data imports
import Data from "@/Data";
import { useRouter } from "next/router";

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
  [ValueEnum.ON_SALE]: boolean | undefined;
  [ValueEnum.PRICE]: number | undefined;
  [ValueEnum.COUNTRY]: string | undefined;
  [ValueEnum.STATUS]: string | undefined;
};

type resultData = {
  [ValueEnum.ID]: string;
  [ValueEnum.ON_SALE]: boolean;
  [ValueEnum.PRICE]: number;
  [ValueEnum.COUNTRY]: string;
  [ValueEnum.STATUS]: string;
}[];

const index = () => {
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
  const  router = useRouter()

  // STATE VARIABLES
  const [result, setResult] = useState<resultData>();
  const [values, setValues] = useState<Values>({
    [ValueEnum.ON_SALE]: Boolean(router.query.onSale) || undefined,
    [ValueEnum.PRICE]: Number(router.query.price) || 0,
    [ValueEnum.COUNTRY]: router?.query?.country as string|| undefined,
    [ValueEnum.STATUS]: router?.query?.country  as string|| undefined,
  });


console.log(router.query.country)
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterHouses = Data.filter((item) =>
      values.onSale ? item.onSale === values.onSale : true
    )
      .filter((item) =>
        values.country ? item.country === values.country : true
      )
      .filter((item) => (values.price ? item.price <= values.price : true))
      .filter((item) => (values.status ? item.status === values.status : true));
    setResult(filterHouses);
    // e.target.reset()
    setValues({
      [ValueEnum.ON_SALE]: undefined,
      [ValueEnum.PRICE]: 0,
      [ValueEnum.COUNTRY]: undefined,
      [ValueEnum.STATUS]: undefined,
    })
  };

  const handleValuesChange = (key: string, value: Values[keyof Values]) => {
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
          className="w-full flex items-start justify-center gap-5 flex-col "
        >
          {/* INPUT FIELDS */}

          {/* SELECT INPUT */}
          {/* COUNTRY INPUT */}
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select a Country
            </label>
            <select
              name="country"
              value={values.country === undefined  ? "Select Country" : values.country  }
              onChange={({ target }) =>
                handleValuesChange(
                  ValueEnum.COUNTRY,
                  target.value === "Select Country" ? undefined : target.value
                )
              }
              className="bg-gray-50 border border-gray-300 min-w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
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
              value={values.status === undefined  ? "Select Status" : values.status  }
              onChange={({ target }) =>
                handleValuesChange(
                  ValueEnum.STATUS,
                  target.value === "Select Status" ? undefined : target.value
                )
              }
              className="bg-gray-50 border border-gray-300 min-w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
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
              checked={values.onSale}
              onChange={(e) =>
                handleValuesChange(ValueEnum.ON_SALE, e.target.checked)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              On Sale
            </label>
          </div>

          {/* PRICE INPUT */}
          <div className="w-full">
            <label
              htmlFor="minmax-range"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Price Range ({values.price})
            </label>
            <input
              type="range"
              name="price"
              min={0}
              max={98000}
              value={values.price}
              onChange={({ target }) =>
                handleValuesChange(ValueEnum.PRICE, Number(target.value))
              }
              className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
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

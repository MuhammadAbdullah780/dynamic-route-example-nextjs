import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Libraries
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Components
import DisplayResult from "@/containers/DisplayResult";
import FromHeading from "@/common/components/FormHeading";
import InputComponent from "@/common/components/InputComponent";
import SelectInput from "@/common/components/SelectInput";
// Utils
import Data from "@/Data";
import { schema } from "./schema";
import { countryList, statusList } from "./data";

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
  [ValueEnum.PRICE]: number;
  [ValueEnum.COUNTRY]: string;
  [ValueEnum.STATUS]: string;
};
type ResultData = {
  [ValueEnum.ID]: string;
  [ValueEnum.ON_SALE]: boolean;
  [ValueEnum.PRICE]: number;
  [ValueEnum.COUNTRY]: string;
  [ValueEnum.STATUS]: string;
}[];

const index = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [result, setResult] = useState<ResultData>();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [ValueEnum.ON_SALE]: false,
      [ValueEnum.PRICE]: 0,
      [ValueEnum.COUNTRY]: "",
      [ValueEnum.STATUS]: "",
    },
  });

  const { watch, handleSubmit, setValue } = form;

  const submitForm = (data: Values) => {
    let query: { [key: string]: string | string[] | number | boolean } = {};
    if (data[ValueEnum.PRICE]) {
      query[ValueEnum.PRICE] = data[ValueEnum.PRICE];
    }
    if (data[ValueEnum.COUNTRY]) {
      query[ValueEnum.COUNTRY] = data[ValueEnum.COUNTRY];
    }
    if (data[ValueEnum.STATUS]) {
      query[ValueEnum.STATUS] = data[ValueEnum.STATUS];
    }
    if (data[ValueEnum.ON_SALE]) {
      query[ValueEnum.ON_SALE] = data[ValueEnum.ON_SALE];
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

  useEffect(() => {
    if (router.isReady) {
      setValue(
        ValueEnum.ON_SALE,
        router.query[ValueEnum.ON_SALE] === "true" && true,
      );
      setValue(
        ValueEnum.PRICE,
        router.query[ValueEnum.PRICE]
          ? Number(router.query[ValueEnum.PRICE])
          : 0,
      );
      setValue(
        ValueEnum.COUNTRY,
        router.query[ValueEnum.COUNTRY]
          ? (router.query[ValueEnum.COUNTRY] as string)
          : "",
      );
      setValue(
        ValueEnum.STATUS,
        router.query[ValueEnum.STATUS]
          ? (router.query[ValueEnum.STATUS] as string)
          : "",
      );
      setShow(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (
      !router.query[ValueEnum.COUNTRY] &&
      !router.query[ValueEnum.PRICE] &&
      !router.query[ValueEnum.STATUS] &&
      !router.query[ValueEnum.ON_SALE]
    ) {
      return setResult(Data);
    }
    const filterHouses = Data.filter((item) =>
      router.query[ValueEnum.ON_SALE]
        ? item[ValueEnum.ON_SALE] === Boolean(router.query[ValueEnum.ON_SALE])
        : true,
    )
      .filter((item) =>
        router.query[ValueEnum.COUNTRY]
          ? item[ValueEnum.COUNTRY] === router.query[ValueEnum.COUNTRY]
          : true,
      )
      .filter((item) =>
        router.query[ValueEnum.PRICE]
          ? item[ValueEnum.PRICE] <= Number(router.query[ValueEnum.PRICE])
          : true,
      )
      .filter((item) =>
        router.query[ValueEnum.STATUS]
          ? item[ValueEnum.STATUS] === router.query[ValueEnum.STATUS]
          : true,
      );
    setResult(filterHouses);
  }, [router.query, router.isReady]);

  if (!show) {
    return <></>;
  }

  return (
    <>
      <section className="p-5 max-w-5xl mt-10 flex min-w-[400px] items-start bg-slate-200 rounded-md flex-col gap-5 justify-center">
        <FromHeading title="Form" />
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(submitForm)}
            noValidate
            className="w-full flex items-start justify-center gap-5 flex-col ">
            {/* COUNTRY INPUT */}
            <div className="w-full">
              <SelectInput
                id={ValueEnum.COUNTRY}
                label="Select a Country"
                list={countryList}
              />
            </div>
            {/* FOR RENT OR FOR SALE INPUT */}
            <div className="w-full">
              <SelectInput
                id={ValueEnum.STATUS}
                label="Select Status"
                list={statusList}
              />
            </div>
            {/* INPUT TYPE CHECKBOX -- ONSALE */}
            <div className="flex items-center">
              <InputComponent
                type="checkbox"
                id={ValueEnum.ON_SALE}
                label="On Sale"
              />
            </div>
            {/* PRICE INPUT */}
            <div className="w-full">
              <InputComponent
                type="range"
                id={ValueEnum.PRICE}
                label={`Price Range (${watch(ValueEnum.PRICE)})`}
              />
            </div>
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
          </form>
        </FormProvider>
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

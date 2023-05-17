import React from "react";
// Utils
import { ValueEnum } from "../Form";
// Types
type Props = {
  values:
    | {
        [ValueEnum.ID]: string;
        [ValueEnum.ON_SALE]: boolean;
        [ValueEnum.PRICE]: number;
        [ValueEnum.COUNTRY]: string;
        [ValueEnum.STATUS]: string;
      }[]
    | undefined;
};

const index = ({ values }: Props) => {
  const columnHeadings = [
    ValueEnum.ID,
    ValueEnum.COUNTRY,
    ValueEnum.PRICE,
    ValueEnum.ON_SALE,
    ValueEnum.STATUS,
  ];

  return (
    <>
      {values && values.length === 0 ? (
        <p>No items Found</p>
      ) : (
        values && (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columnHeadings?.map((item, i) => {
                    return (
                      <th scope="col" key={i} className="px-6 py-3">
                        {item.toLocaleUpperCase()}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {values.map((item) => {
                  return (
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.country}</td>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">
                        {item.onSale === true ? "true" : "false"}
                      </td>
                      <td className="px-6 py-4">{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}
    </>
  );
};

export default index;

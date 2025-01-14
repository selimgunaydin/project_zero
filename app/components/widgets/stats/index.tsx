import React from "react";

export default function StatsWidget({ data }: any) {
  console.log(data);
  return (
    <div className="bg-white pb-12 sm:py-4 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {data?.statData?.map((stat: any) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className={stat.nameClass}>{stat.name}</dt>
              <dd className={stat.valueClass}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

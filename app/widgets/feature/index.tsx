import React from "react";

export default function FeatureWidget({ data }: any) {
  console.log(data);
  return (
    <div className={data.container.className}>
      <div className={data.innerContainer.className}>
        <div className={data.content.gridContainer.className}>
          <div className={data.content.textContainer.className}>
            <div className={data.content.textContent.className}>
              <h2 className={data.content.textContent.subtitle.className}>
                {data.content.textContent.subtitle.text}
              </h2>
              <p className={data.content.textContent.title.className}>
                {data.content.textContent.title.text}
              </p>
              <p className={data.content.textContent.description.className}>
                {data.content.textContent.description.text}
              </p>
              <dl className={data.content.featureList.className}>
                {data.content.featureList.items.map((feature: any) => (
                  <div
                    key={feature.name}
                    className={feature.container.className}
                  >
                    <dt className={feature.title.className}>{feature.name}</dt>
                    <dd className={feature.description.className}>
                      {feature.description.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function PricingWidget({ data }: any) {
  return (
    <div className={data.container.className}>
      <div className={data.innerContainer.className}>
        <div className={data.content.header.className}>
          <h2 className={data.content.header.subtitle.className}>
            {data.content.header.subtitle.text}
          </h2>
          <p className={data.content.header.title.className}>
            {data.content.header.title.text}
          </p>
          <p className={data.content.header.description.className}>
            {data.content.header.description.text}
          </p>
        </div>
        <div className={data.content.plans.className}>
          {data.content.plans.items.map((plan: any) => (
            <div key={plan.name} className={plan.container.className}>
              <div className={plan.header.className}>
                <h3 className={plan.header.name.className}>{plan.name}</h3>
                <p className={plan.header.description.className}>
                  {plan.description}
                </p>
                <p className={plan.header.price.container.className}>
                  <span className={plan.header.price.amount.className}>
                    {plan.price}
                  </span>
                  <span className={plan.header.price.period.className}>
                    {plan.period}
                  </span>
                </p>
              </div>
              <ul role="list" className={plan.features.className}>
                {plan.features.items.map((feature: any) => (
                  <li key={feature.text} className={feature.container.className}>

                    {feature.text}
                  </li>
                ))}
              </ul>
              <a href={plan.cta.href} className={plan.cta.className}>
                {plan.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
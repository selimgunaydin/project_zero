import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function NewsletterWidget({ data }: any) {
  return (
    <div className={data?.container?.className}>
      <div className={data?.innerContainer?.className}>
        <div className={data?.content?.header?.className}>
          <h2 className={data?.content?.header?.title?.className}>
            {data?.content?.header?.title?.text}
          </h2>
          <p className={data?.content?.header?.description?.className}>
            {data?.content?.header?.description?.text}
          </p>
          <form className={data?.content?.form?.className}>
            <div className={data?.content?.form?.inputContainer?.className}>
              <label htmlFor="email" className={data?.content?.form?.label?.className}>
                {data?.content?.form?.label?.text}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={data?.content?.form?.input?.className}
                placeholder={data?.content?.form?.input?.placeholder}
              />
            </div>
            <Button type="submit" className={data?.content?.form?.button?.className}>
              {data?.content?.form?.button?.text}
            </Button>
          </form>
        </div>
        <dl className={data?.content?.features?.className}>
          {data?.content?.features?.items?.map((feature: any, index: number) => (
            <div key={index} className={feature?.container?.className}>
              <div className={feature?.icon?.container?.className}>
              </div>
              <dt className={feature?.title?.className}>{feature?.title?.text}</dt>
              <dd className={feature?.description?.className}>
                {feature?.description?.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 
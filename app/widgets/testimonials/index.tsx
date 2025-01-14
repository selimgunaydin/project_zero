import Image from "next/image";
import React from "react";

export default function TestimonialsWidget({ data }: any) {
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
        </div>
        <div className={data.content.testimonials.className}>
          {data.content.testimonials.items.map((testimonial: any, index: number) => (
            <div key={index} className={testimonial.container.className}>
              <figure className={testimonial.figure.className}>
                <blockquote className={testimonial.quote.className}>
                  <p>{testimonial.quote.text}</p>
                </blockquote>
                <figcaption className={testimonial.author.container.className}>
                  <Image
                    width={64}
                    height={64}
                    className={testimonial.author.image.className}
                    src={testimonial.author.image.src}
                    alt={testimonial.author.image.alt}
                  />
                  <div>
                    <div className={testimonial.author.name.className}>
                      {testimonial.author.name.text}
                    </div>
                    <div className={testimonial.author.role.className}>
                      {testimonial.author.role.text}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
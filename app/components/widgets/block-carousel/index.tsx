import React from "react";
import Image from "next/image";

export default function BlockCarouselWidget({ data }: any) {
  return (
    <div className={data.container.className}>
      <div className={data.innerContainer.className}>
        <h2 className={data.content.subtitle.className}>
          {data.content.subtitle.text}
        </h2>
        <p className={data.content.title.className}>
          {data.content.title.text}
        </p>
        <div className={data.content.blocks.className}>
          {data.content.blocks.items.map((block: any) => (
            <div key={block.title} className={block.container.className}>
              <div className={block.innerContainer.className}>
                <div className={block.content.className}>
                  <p className={block.content.title.className}>
                    {block.title}
                  </p>
                  <p className={block.content.description.className}>
                    {block.description}
                  </p>
                </div>
                <div className={block.imageContainer.className}>
                  <Image
                    width={block.image.width}
                    height={block.image.height}
                    className={block.image.className}
                    src={block.image.src}
                    alt={block.image.alt}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
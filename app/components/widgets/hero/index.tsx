interface HeroData {
  container?: {
    className?: string;
  };
  innerContainer?: {
    className?: string;
  };
  content?: {
    className?: string;
    announcementContainer?: {
      className?: string;
      announcement?: {
        className?: string;
        text?: string;
        link?: {
          href?: string;
          className?: string;
          text?: string;
          icon?: string;
        };
      };
    };
    title?: {
      className?: string;
      text?: string;
    };
    description?: {
      className?: string;
      text?: string;
    };
    actions?: {
      className?: string;
      ctaButton?: {
        href?: string;
        className?: string;
        text?: string;
      };
      learnMore?: {
        href?: string;
        className?: string;
        text?: string;
        icon?: string;
      };
    };
  };
}

const defaultData: HeroData = {
  container: {
    className: "relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32",
  },
  innerContainer: {
    className: "mx-auto max-w-7xl px-6 lg:px-8",
  },
  content: {
    className: "mx-auto max-w-2xl py-32 sm:py-48 lg:py-56",
    announcementContainer: {
      className: "hidden sm:mb-8 sm:flex sm:justify-center",
      announcement: {
        className: "relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20",
        text: "Announcing our next round of funding.",
        link: {
          href: "#",
          className: "font-semibold text-white",
          text: "Read more",
          icon: "→",
        },
      },
    },
    title: {
      className: "text-4xl font-bold tracking-tight text-white sm:text-6xl",
      text: "Data to enrich your online business",
    },
    description: {
      className: "mt-6 text-lg leading-8 text-gray-300",
      text: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
    },
    actions: {
      className: "mt-10 flex items-center justify-center gap-x-6",
      ctaButton: {
        href: "#",
        className: "rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
        text: "Get started",
      },
      learnMore: {
        href: "#",
        className: "text-sm font-semibold leading-6 text-white",
        text: "Learn more",
        icon: "→",
      },
    },
  },
};

export default function HeroWidget({ data = {} as HeroData }) {
  // Varsayılan değerlerle birleştir
  const mergedData = {
    container: { ...defaultData.container, ...data.container },
    innerContainer: { ...defaultData.innerContainer, ...data.innerContainer },
    content: {
      ...defaultData.content,
      ...data.content,
      announcementContainer: {
        ...defaultData.content?.announcementContainer,
        ...data.content?.announcementContainer,
        announcement: {
          ...defaultData.content?.announcementContainer?.announcement,
          ...data.content?.announcementContainer?.announcement,
          link: {
            ...defaultData.content?.announcementContainer?.announcement?.link,
            ...data.content?.announcementContainer?.announcement?.link,
          },
        },
      },
      title: {
        ...defaultData.content?.title,
        ...data.content?.title,
      },
      description: {
        ...defaultData.content?.description,
        ...data.content?.description,
      },
      actions: {
        ...defaultData.content?.actions,
        ...data.content?.actions,
        ctaButton: {
          ...defaultData.content?.actions?.ctaButton,
          ...data.content?.actions?.ctaButton,
        },
        learnMore: {
          ...defaultData.content?.actions?.learnMore,
          ...data.content?.actions?.learnMore,
        },
      },
    },
  };

  return (
    <div className={data?.container?.className}>
      <div className={data?.innerContainer?.className}>
    <div className={mergedData.container.className}>
      <div className={mergedData.innerContainer.className}>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className={data?.content?.className}>
          <div className={data?.content?.announcementContainer?.className}>
            <div
              className={
                data?.content?.announcementContainer?.announcement?.className
              }
            >
              {data?.content?.announcementContainer?.announcement?.text}{" "}
        <div className={mergedData.content.className}>
          <div className={mergedData.content.announcementContainer.className}>
            <div className={mergedData.content.announcementContainer.announcement.className}>
              {mergedData.content.announcementContainer.announcement.text}{" "}
              <a
                href={
                  data?.content?.announcementContainer?.announcement?.link?.href
                }
                className={
                  data?.content?.announcementContainer?.announcement?.link
                    ?.className
                }
                href={mergedData.content.announcementContainer.announcement.link.href}
                className={mergedData.content.announcementContainer.announcement.link.className}
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {
                  data?.content?.announcementContainer?.announcement?.link?.text
                }{" "}
                {mergedData.content.announcementContainer.announcement.link.text}{" "}
                <span aria-hidden="true">
                  {
                    data?.content?.announcementContainer?.announcement?.link
                      ?.icon
                  }
                  {mergedData.content.announcementContainer.announcement.link.icon}
                </span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className={data?.content?.title?.className}>
              {data?.content?.title?.text}
            <h1 className={mergedData.content.title.className}>
              {mergedData.content.title.text}
            </h1>
            <p className={data?.content?.description?.className}>
              {data?.content?.description?.text}
            <p className={mergedData.content.description.className}>
              {mergedData.content.description.text}
            </p>
            <div className={data?.content?.actions?.className}>
            <div className={mergedData.content.actions.className}>
              <a
                href={data?.content?.actions?.ctaButton?.href}
                className={data?.content?.actions?.ctaButton?.className}
                href={mergedData.content.actions.ctaButton.href}
                className={mergedData.content.actions.ctaButton.className}
              >
                {data?.content?.actions?.ctaButton?.text}
                {mergedData.content.actions.ctaButton.text}
              </a>
              <a
                href={data?.content?.actions?.learnMore?.href}
                className={data?.content?.actions?.learnMore?.className}
                href={mergedData.content.actions.learnMore.href}
                className={mergedData.content.actions.learnMore.className}
              >
                {data?.content?.actions?.learnMore?.text}{" "}
                {mergedData.content.actions.learnMore.text}{" "}
                <span aria-hidden="true">
                  {data?.content?.actions?.learnMore?.icon}
                  {mergedData.content.actions.learnMore.icon}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}

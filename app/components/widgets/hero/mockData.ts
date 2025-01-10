export const heroData = {
  container: {
    className: "bg-white"
  },
  innerContainer: {
    className: "relative isolate px-6 lg:px-8"
  },
  content: {
    className: "mx-auto max-w-2xl py-32 sm:py-24 lg:py-24",
    announcementContainer: {
      className: "hidden sm:mb-8 sm:flex sm:justify-center",
      announcement: {
        className: "relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20",
        text: "Announcing our next round of funding.",
        link: {
          href: "#",
          className: "font-semibold text-indigo-600",
          text: "Read more",
          icon: "→"
        }
      }
    },
    title: {
      className: "text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl",
      text: "Data to enrich your online business"
    },
    description: {
      className: "mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8",
      text: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat."
    },
    actions: {
      className: "mt-10 flex items-center justify-center gap-x-6",
      ctaButton: {
        href: "#",
        className: "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        text: "Get started"
      },
      learnMore: {
        href: "#",
        className: "text-sm/6 font-semibold text-gray-900",
        text: "Learn more",
        icon: "→"
      }
    }
  },
};
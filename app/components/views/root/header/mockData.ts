export const header_data = {
  //header types: default, spread,
  header_type: "default",
  brand: {
    logo: "/pz-logo.png",
    alt: "Brand-Logo",
    link: "/",
    width: 60,
    height: 60,
  },
  categories: [
    {
      id: 1,
      name: "Title",
      link: "#",
      dropdown: true,
      dropdown_items: [
        {
          id: 1,
          name: "Dropdown - 1",
          link: "#",
        },
        {
          id: 2,
          name: "Dropdown - 2",
          link: "#",
        },
        {
          id: 3,
          name: "Dropdown - 3",
          link: "#",
        },
        {
          id: 4,
          name: "Dropdown - 4",
          link: "#",
        },
        {
          id: 5,
          name: "Dropdown - 5",
          link: "#",
        },
      ],
    },
    {
      id: 2,
      name: "Title - 2",
      link: "#",
      dropdown: false,
    },
    {
      id: 3,
      name: "Title - 3",
      link: "#",
      dropdown: false,
    },
    {
      id: 4,
      name: "Title - 4",
      link: "#",
      dropdown: false,
    },
    {
      id: 5,
      name: "Title - 5",
      link: "#",
      dropdown: false,
    },
  ],
  category_styles: {
    className: "text-black cursor-pointer whitespace-nowrap",
    font_size: "text-base",
    font_weight: "font-semibold",
  },
  properties: {
    search: {
      placeholder: "Search",
      show: true,
    },
    cart: {
      show: true,
    },
    wishlist: {
      show: true,
    },
    notification: {
      show: true,
    },
    login: {
      show: true,
      title: "Login",
    },
    register: {
      show: true,
      title: "Register",
    },
    logout: {
      show: true,
      title: "Logout",
    },
    button: {
      title: "Button",
      show: true,
    },
  },
};

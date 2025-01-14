"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockData = void 0;
exports.mockData = {
    "container": {
        "className": "bg-white py-24 sm:py-32"
    },
    "innerContainer": {
        "className": "mx-auto max-w-7xl px-6 lg:px-8"
    },
    "content": {
        "header": {
            "className": "mx-auto max-w-4xl text-center",
            "subtitle": {
                "className": "text-base/7 font-semibold text-indigo-600",
                "text": "Pricing"
            },
            "title": {
                "className": "mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
                "text": "Pricing plans for teams of all sizes"
            },
            "description": {
                "className": "mt-6 text-lg/8 text-gray-600",
                "text": "Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales."
            }
        },
        "plans": {
            "className": "isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3",
            "items": [
                {
                    "name": "Hobby",
                    "description": "The essentials to provide your best work for clients.",
                    "price": "$15",
                    "period": "/month",
                    "container": {
                        "className": "rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10"
                    },
                    "header": {
                        "className": "flex flex-col gap-y-4",
                        "name": {
                            "className": "text-base/6 font-semibold text-gray-900"
                        },
                        "description": {
                            "className": "text-sm/6 text-gray-600"
                        },
                        "price": {
                            "container": {
                                "className": "flex items-baseline gap-x-1"
                            },
                            "amount": {
                                "className": "text-4xl/[3.5rem] font-bold tracking-tight text-gray-900"
                            },
                            "period": {
                                "className": "text-sm/6 text-gray-600"
                            }
                        }
                    },
                    "features": {
                        "className": "mt-8 space-y-3 text-sm/6 text-gray-600",
                        "items": [
                            {
                                "text": "5 products",
                                "container": {
                                    "className": "flex gap-x-3"
                                },
                                "icon": {
                                    "className": "size-5 flex-none text-indigo-600"
                                }
                            },
                            {
                                "text": "Up to 1,000 subscribers",
                                "container": {
                                    "className": "flex gap-x-3"
                                },
                                "icon": {
                                    "className": "size-5 flex-none text-indigo-600"
                                }
                            },
                            {
                                "text": "Basic analytics",
                                "container": {
                                    "className": "flex gap-x-3"
                                },
                                "icon": {
                                    "className": "size-5 flex-none text-indigo-600"
                                }
                            }
                        ]
                    },
                    "cta": {
                        "href": "#",
                        "className": "mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                        "text": "Get started today"
                    }
                },
                {
                    "name": "Team",
                    "description": "A plan that scales with your rapidly growing business.",
                    "price": "$60",
                    "period": "/month",
                    "container": {
                        "className": "rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10"
                    },
                    "header": {
                        "className": "flex flex-col gap-y-4",
                        "name": {
                            "className": "text-base/6 font-semibold text-gray-900"
                        },
                        "description": {
                            "className": "text-sm/6 text-gray-600"
                        },
                        "price": {
                            "container": {
                                "className": "flex items-baseline gap-x-1"
                            },
                            "amount": {
                                "className": "text-4xl/[3.5rem] font-bold tracking-tight text-gray-900"
                            },
                            "period": {
                                "className": "text-sm/6 text-gray-600"
                            }
                        }
                    },
                    "features": {
                        "className": "mt-8 space-y-3 text-sm/6 text-gray-600",
                        "items": [
                            {
                                "text": "Unlimited products",
                                "container": {
                                    "className": "flex gap-x-3"
                                },
                                "icon": {
                                    "className": "size-5 flex-none text-indigo-600"
                                }
                            },
                            {
                                "text": "Unlimited subscribers",
                                "container": {
                                    "className": "flex gap-x-3"
                                },
                                "icon": {
                                    "className": "size-5 flex-none text-indigo-600"
                                }
                            },
                            {
                                "text": "Advanced analytics",
                                "container": {
                                    "className": "flex gap-x-3"
                                },
                                "icon": {
                                    "className": "size-5 flex-none text-indigo-600"
                                }
                            }
                        ]
                    },
                    "cta": {
                        "href": "#",
                        "className": "mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                        "text": "Get started today"
                    }
                }
            ]
        }
    }
};

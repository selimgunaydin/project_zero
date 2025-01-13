"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterWidget = exports.BlockCarouselWidget = exports.PricingWidget = exports.TestimonialsWidget = exports.FeatureWidget = exports.StatsWidget = exports.HeroWidget = void 0;
var mongoose_1 = require("mongoose");
var baseWidgetSchema = new mongoose_1.Schema({
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});
// Hero Widget
var heroSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, content: {
        className: String,
        announcementContainer: {
            className: String,
            announcement: {
                className: String,
                text: String,
                link: {
                    href: String,
                    className: String,
                    text: String,
                    icon: String
                }
            }
        },
        title: {
            className: String,
            text: String
        },
        description: {
            className: String,
            text: String
        },
        actions: {
            className: String,
            ctaButton: {
                href: String,
                className: String,
                text: String
            },
            learnMore: {
                href: String,
                className: String,
                text: String,
                icon: String
            }
        }
    } }));
// Stats Widget
var statsSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, statData: [{
            id: Number,
            name: String,
            value: String,
            nameClass: String,
            valueClass: String
        }] }));
// Feature Widget
var featureSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, content: {
        gridContainer: {
            className: String
        },
        textContainer: {
            className: String
        },
        textContent: {
            className: String,
            subtitle: {
                className: String,
                text: String
            },
            title: {
                className: String,
                text: String
            },
            description: {
                className: String,
                text: String
            }
        },
        featureList: {
            className: String,
            items: [{
                    name: String,
                    description: {
                        className: String,
                        text: String
                    },
                    container: {
                        className: String
                    },
                    title: {
                        className: String
                    },
                    icon: {
                        className: String
                    }
                }]
        }
    } }));
// Testimonials Widget
var testimonialsSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, content: {
        header: {
            className: String,
            subtitle: {
                className: String,
                text: String
            },
            title: {
                className: String,
                text: String
            }
        },
        testimonials: {
            className: String,
            items: [{
                    container: {
                        className: String
                    },
                    figure: {
                        className: String
                    },
                    quote: {
                        className: String,
                        text: String
                    },
                    author: {
                        container: {
                            className: String
                        },
                        image: {
                            className: String,
                            src: String,
                            alt: String
                        },
                        name: {
                            className: String,
                            text: String
                        },
                        role: {
                            className: String,
                            text: String
                        }
                    }
                }]
        }
    } }));
// Pricing Widget
var pricingSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, content: {
        header: {
            className: String,
            subtitle: {
                className: String,
                text: String
            },
            title: {
                className: String,
                text: String
            },
            description: {
                className: String,
                text: String
            }
        },
        plans: {
            className: String,
            items: [{
                    name: String,
                    description: String,
                    price: String,
                    period: String,
                    container: {
                        className: String
                    },
                    header: {
                        className: String,
                        name: {
                            className: String
                        },
                        description: {
                            className: String
                        },
                        price: {
                            container: {
                                className: String
                            },
                            amount: {
                                className: String
                            },
                            period: {
                                className: String
                            }
                        }
                    },
                    features: {
                        className: String,
                        items: [{
                                text: String,
                                container: {
                                    className: String
                                },
                                icon: {
                                    className: String
                                }
                            }]
                    },
                    cta: {
                        href: String,
                        className: String,
                        text: String
                    }
                }]
        }
    } }));
// Block Carousel Widget
var blockCarouselSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, content: {
        subtitle: {
            className: String,
            text: String
        },
        title: {
            className: String,
            text: String
        },
        blocks: {
            className: String,
            items: [{
                    title: String,
                    description: String,
                    container: {
                        className: String
                    },
                    innerContainer: {
                        className: String
                    },
                    content: {
                        className: String,
                        title: {
                            className: String
                        },
                        description: {
                            className: String
                        }
                    },
                    imageContainer: {
                        className: String
                    },
                    image: {
                        width: Number,
                        height: Number,
                        className: String,
                        src: String,
                        alt: String
                    }
                }]
        }
    } }));
// Newsletter Widget
var newsletterSchema = new mongoose_1.Schema(__assign(__assign({}, baseWidgetSchema.obj), { container: {
        className: String
    }, innerContainer: {
        className: String
    }, content: {
        header: {
            className: String,
            title: {
                className: String,
                text: String
            },
            description: {
                className: String,
                text: String
            }
        },
        form: {
            className: String,
            inputContainer: {
                className: String,
                label: {
                    className: String,
                    text: String
                },
                input: {
                    className: String,
                    placeholder: String
                }
            },
            button: {
                className: String,
                text: String
            }
        },
        features: {
            className: String,
            items: [{
                    title: {
                        className: String,
                        text: String
                    },
                    description: {
                        className: String,
                        text: String
                    },
                    container: {
                        className: String
                    },
                    icon: {
                        container: {
                            className: String
                        },
                        className: String
                    }
                }]
        }
    } }));
exports.HeroWidget = mongoose_1.models.HeroWidget || (0, mongoose_1.model)('HeroWidget', heroSchema);
exports.StatsWidget = mongoose_1.models.StatsWidget || (0, mongoose_1.model)('StatsWidget', statsSchema);
exports.FeatureWidget = mongoose_1.models.FeatureWidget || (0, mongoose_1.model)('FeatureWidget', featureSchema);
exports.TestimonialsWidget = mongoose_1.models.TestimonialsWidget || (0, mongoose_1.model)('TestimonialsWidget', testimonialsSchema);
exports.PricingWidget = mongoose_1.models.PricingWidget || (0, mongoose_1.model)('PricingWidget', pricingSchema);
exports.BlockCarouselWidget = mongoose_1.models.BlockCarouselWidget || (0, mongoose_1.model)('BlockCarouselWidget', blockCarouselSchema);
exports.NewsletterWidget = mongoose_1.models.NewsletterWidget || (0, mongoose_1.model)('NewsletterWidget', newsletterSchema);

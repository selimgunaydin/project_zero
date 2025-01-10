"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Hero_1 = require("./app/models/Hero");
// Seed verileri
var heroSeed = { container: {
        className: "bg-white"
    },
    innerContainer: {
        className: "relative isolate px-6 lg:px-8"
    },
    blurEffectTop: {
        className: "absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80",
        div: {
            className: "relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]",
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        }
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
    blurEffectBottom: {
        className: "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]",
        div: {
            className: "relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]",
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        }
    } };
var seedDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                // MongoDB bağlantısı
                console.log('Başladı');
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://selimgunaydin:5jXD6jfStjovZp3G@cluster0.jlrvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')];
            case 1:
                _a.sent();
                console.log('MongoDB bağlantısı başarılı!');
                // Eski verileri temizleme
                return [4 /*yield*/, Hero_1.default.deleteMany({})];
            case 2:
                // Eski verileri temizleme
                _a.sent();
                console.log('Eski Hero verileri temizlendi.');
                // Yeni veriler ekleme
                return [4 /*yield*/, Hero_1.default.create(heroSeed)];
            case 3:
                // Yeni veriler ekleme
                _a.sent();
                console.log('Hero verisi başarıyla eklendi.');
                // Bağlantıyı kapatma
                mongoose_1.default.connection.close();
                console.log('MongoDB bağlantısı kapatıldı.');
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Veritabanı işlemi sırasında bir hata oluştu:', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Seed fonksiyonunu çağırma
seedDatabase();

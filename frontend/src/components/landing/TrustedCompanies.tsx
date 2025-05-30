import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "../../lib/utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Ejemplo de logos de empresas (puedes reemplazar las URLs por tus logos)
const companies = [
    { name: "Google", logo: "/assets/images/google.png" },
    { name: "Microsoft", logo: "/assets/images/microsoft.png" },
    { name: "Amazon", logo: "/assets/images/amazon.png" },
    { name: "Stripe", logo: "/assets/images/stripe.png" },
    { name: "Netflix", logo: "/assets/images/netflix.png" },
    { name: "Shopify", logo: "/assets/images/shopify.png" },
];

export default function TrustedCompanies() {
    const [current, setCurrent] = React.useState(0);
    const total = companies.length;

    // Autoplay
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 10000);
        return () => clearInterval(interval);
    }, [total]);

    const goTo = (idx: number) => setCurrent((idx + total) % total);

    return (
        <section className="py-20 bg-muted w-full min-h-[320px] flex flex-col items-center justify-center">
            <div className="container mx-auto text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Trusted by leading companies</h2>
                <p className="text-muted-foreground">Empresas que confían en nosotros</p>
            </div>
            <div className="max-w-3xl w-full mx-auto relative flex items-center justify-center min-h-[208px]">
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition ml-4"
                    onClick={() => goTo(current - 1)}
                    aria-label="Anterior"
                    type="button"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div className="w-full flex justify-center items-center">
                    <div className="w-full flex justify-center items-center min-h-[80px] relative overflow-hidden">
                        {companies.map((company, idx) => (
                            <img
                                key={company.name}
                                src={company.logo}
                                alt={company.name}
                                className={
                                    `h-20 w-40 object-contain grayscale hover:grayscale-0 transition-all duration-500 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ` +
                                    (idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 z-0 pointer-events-none')
                                }
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition mr-4"
                    onClick={() => goTo(current + 1)}
                    aria-label="Siguiente"
                    type="button"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </section>
    );
}
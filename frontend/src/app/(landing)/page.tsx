import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      
      <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 ">
        <div className="md:w-1/2 text-left">
          <h1 >
            <p className="text-6xl font-bold">
            Put an end to <br /> unpaid invoices.
            </p>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
          </p>
          <div className="mt-8 text-white ">
            <Button size="lg" className="w-[120px] rounded-full font-bold px-4 py-3  bg-[#B775F2]" asChild>
              <Link href="/login">Get started</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-end">
        <Image src="/assets/images/dashboard.jpg" alt="John Doe" width={400} height={400}/>
        </div>
      </section>
      

      <section className="bg-muted/50 py-24">
        <div className="container text-center">
          <div className="text-6xl font-bold text-foreground">More than 100k+ people are using our solution</div>
          <p className="mt-4 text-xl text-muted-foreground">
            Join thousands of happy customers who have streamlined their invoicing process.
          </p>
        </div>
      </section>


      <section className="container py-24 flex justify-center">
        <Card className="max-w-2xl p-8 text-left">
          <div className="flex items-center gap-4">
            <Image src="/assets/images/example.jpg" alt="John Doe" width={200} height={200}/>
            <div>
              <h3 className="font-semibold text-foreground">John Doe</h3>
              <p className="text-sm text-muted-foreground">Owner, Lavis Studio</p>
            </div>
          </div>
          <blockquote className="mt-4 text-lg italic text-muted-foreground">
            "This platform has completely transformed the way we handle invoices. It's seamless and efficient!"
          </blockquote>
        </Card>
      </section>
    </>
  );
}


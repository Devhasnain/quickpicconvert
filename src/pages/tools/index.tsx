import { Breadcrumb, Container } from "@/components";
import { toolCards } from "@/data";
import Link from "next/link";


export default function ToolsPage() {

  return (
    <>
      <section className={`bg-gray-100`}>
        <Container
          element="div"
          className={"text-center py-10 flex flex-col items-center"}
        >
          <Breadcrumb
            items={[
              {
                name: "Home",
                href: "/",
              },
              {
                name: "Tools",
                href: "/tools",
              },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Powerful Image Conveter Tool
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to convert, compress, resize, and edit your
            images. All tools work directly in your browser for maximum privacy
            and speed.
          </p>
        </Container>
      </section>

      <Container element="section" className="py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {toolCards.map((t, i) => (
            <Link key={i} href={t.slug} title={t.title}>
              <div className="p-5 bg-white rounded-lg space-y-3 hover:shadow-lg border border-gray-200">
                <div className="h-12 w-12 rounded-lg flex flex-col items-center justify-center bg-primary text-white">
                  {t.icon}
                </div>
                <h3 className="text-lg font-medium">{t.title}</h3>
                <p className="text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Accusamus sint aliquam sapiente, illo nostrum repellat.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}

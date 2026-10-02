import { Breadcrumb, Container, PageMeta } from "@/components";
import { socialLinks } from "@/data";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";


const Contact = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    setLoading(true)
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      await axios.post("/api/contact", payload);
      e?.currentTarget?.reset();
      toast.success("Message submitted successfully.");
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.message);
      setLoading(false);
    }
  };
  return (
    <>
      <PageMeta
        title="Contact Quick Pic Convert | Get Help With Image Conversion"
        description="Have a question or feedback about QuickPicConvert? Contact our team using the form and get help with our free JPG, PNG, and WebP image converter."
        pathname="about"
        ogType={"website"}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/Quick-pic-convert-og-image.webp`}
      />
      <section className="py-10 bg-gray-100">
        <Container
          element="section"
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <div>
            <Breadcrumb
              items={[
                {
                  name: "Home",
                  href: "/",
                },
                {
                  name: "Contact Us",
                  href: "/contact",
                },
              ]}
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
              Contact Quick Pic Convert
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Have a question, a bug to report, or an idea for a new tool? Fill
              out the form below and our team will get back to you as soon as
              possible. We love hearing from people who use our free image
              converter.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white w-10 h-10 rounded-lg bg-primary border border-primary flex items-center justify-center"
                  target="_blank"
                  rel="nofollow"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-8 space-y-5"
          >
            <div className="space-y-1 flex flex-col">
              <label className="text-sm" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                name="name"
                placeholder="Name"
                className="border border-gray-200 outline-none focus:border-gray-300 px-3 py-2.5 rounded-lg"
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                name="email"
                placeholder="Email"
                className="border border-gray-200 outline-none focus:border-gray-300 px-3 py-2.5 rounded-lg"
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <label className="text-sm" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                name="title"
                placeholder="Title"
                className="border border-gray-200 outline-none focus:border-gray-300 px-3 py-2.5 rounded-lg"
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <label className="text-sm" htmlFor="message">
                Message
              </label>
              <textarea
                rows={5}
                id="message"
                required
                name="message"
                placeholder="Message"
                className="border border-gray-200 outline-none focus:border-gray-300 px-3 py-2.5 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Contact;

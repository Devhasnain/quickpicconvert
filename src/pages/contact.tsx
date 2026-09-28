import { Breadcrumb, Container } from "@/components";
import { socialLinks } from "@/data";
import Link from "next/link";
import React from "react";


const Contact = () => {
  return (
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
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ex
            animi laudantium eligendi error inventore laborum tenetur tempore
            unde earum praesentium nihil atque incidunt explicabo, dolore,
            aliquid fugiat delectus illum? Vel soluta quos impedit fugit rem
            dignissimos quas voluptates possimus sed, eaque atque in unde nam
            assumenda repudiandae maxime odio.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-700 w-10 h-10 rounded-xl bg-background border border-gray-400 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                target="_blank"
                rel="nofollow"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
        <form className="bg-white rounded-lg p-8 space-y-5">
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
            <label className="text-sm" htmlFor="title">
              Title
            </label>
            <textarea
              rows={5}
              id="title"
              required
              name="title"
              placeholder="Title"
              className="border border-gray-200 outline-none focus:border-gray-300 px-3 py-2.5 rounded-lg"
            />
          </div>
          <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            Submit
          </button>
        </form>
      </Container>
    </section>
  );
};

export default Contact;

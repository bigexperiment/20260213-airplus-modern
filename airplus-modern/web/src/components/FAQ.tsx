"use client";
import * as Accordion from "@radix-ui/react-accordion";

export default function FAQ() {
  const items = [
    { q: "Do I need a guide?", a: "In most cases, yes, and for many travelers it makes the whole trip feel much easier. A good local guide helps with pace, route decisions, tea houses, and the small things that are hard to sort out on your own." },
    { q: "How fit do I need to be?", a: "That depends on the route, but you do not need to be an athlete for many popular treks. The better question is which trek matches your pace, walking habits, and comfort level, and we can help with that." },
    { q: "Is tap water safe to drink?", a: "It is better to drink boiled, filtered, or treated water on the trail. It is a simple habit that saves a lot of trouble during the trip." },
    { q: "Can I charge my phone and camera?", a: "Usually yes, especially in the more established trekking areas. Many tea houses charge a small extra fee, and carrying a power bank still makes life easier." },
  ];
  return (
    <Accordion.Root type="multiple" className="grid md:grid-cols-2 gap-3">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q} className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white">
          <Accordion.Header>
            <Accordion.Trigger className="w-full text-left px-4 py-3 hover:bg-muted">{item.q}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

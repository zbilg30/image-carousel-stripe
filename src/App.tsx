import { useEffect, useRef, useState } from "react";
import "./App.css";
import { persons } from "./persons";
import classNames from "classnames";

function App() {
  const [activeItem, setActiveItem] = useState(3);
  const wrapperRef = useRef<HTMLUListElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (!timerRef.current) return;

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    );
    timerRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeItem]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[1200px] max-w-full">
        <ul className="flex h-[640px] md:gap-[1.5%] group flex-col gap-3 md:flex-row">
          {persons.map((person, index) => (
            <li
              key={person.name}
              onClick={() => setActiveItem(index)}
              aria-current={index === activeItem}
              className={classNames(
                "md:w-[8%] md:first:w-[1%] relative md:last:w-[1%] transition-[width] overflow-hidden bg-[#c9c6c7] md:[&[aria-current='true']]:w-[48%] ",
                "before:hidden md:before:block before:absolute before:bg-white before:top-0 before:bottom- before:left-[-10px] before:right-[-10px]",
                "md:hover:w-[12%] md:[&:not(:hover),&:not(:last),&:not(:first)]:group-hover:w-[7%]",
                "md:[transition:width_var(--transition,200ms_ease-in)]",
                "first:pointer-events-none last:pointer-events-none rounded-2xl md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0"
              )}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl relative">
                <img
                  className="absolute right-0 top-1/2 h-auto w-24 max-w-none -translate-y-1/2 object-cover grayscale md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2"
                  src={person.img}
                  alt={person.name}
                  width={"590px"}
                  height={"640px"}
                />
                <div
                  className={classNames(
                    "inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity",
                    activeItem === index ? "md:opacity-25" : "md:opacity-0"
                  )}
                />
                <div
                  className={classNames(
                    "md:absolute top-8 left-8 transition-[transform,opacity]",
                    activeItem === index
                      ? "md:translate-x-0 md:opacity-100"
                      : "md:translate-x-4 md:opacity-0"
                  )}
                >
                  <p className="text-sm md:text-lg uppercase text-primary">
                    {person.title}
                  </p>
                  <p className="text-lg md:text-4xl font-bold">{person.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

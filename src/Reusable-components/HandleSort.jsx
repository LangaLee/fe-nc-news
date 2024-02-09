import { useState } from "react";
import Button from "./Button";

const ShowSortOptions = ({ sortParameter, setSortParameter }) => {
  const [open, setOpen] = useState(false);
  const sortOptions = [
    "votes",
    "comment_count",
    "created_at",
    "title",
    "topic",
    "author",
  ];

  return (
    <div className="flex">
      <p className="text-xl mt-5">Sort by </p>
      <div className="flex flex-col">
        <button
          className="rounded-md border-solid border-2 hover:bg-blue-900 m-4 text-xl p-1"
          onClick={() => setOpen((prev) => !prev)}
        >
          {`${sortParameter}↓`}
        </button>
        {open ? (
          <div className="flex flex-col overflow-visible bg-slate-950">
            {sortOptions.map((option) => (
              <button
                className=" p-2 hover:bg-white hover:text-slate-950"
                key={option}
                onClick={() => {
                  setSortParameter(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShowSortOptions;

import React from "react";

const fakeData = [
  {
    id: 1,
    title: "Nouveau like sur votre post",
    date: "Il y a 2 heures",
  },
  {
    id: 2,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 3 heures",
  },
  {
    id: 3,
    title: "Nouveau like sur votre post",
    date: "Il y a 4 heures",
  },
  {
    id: 4,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 5 heures",
  },
  {
    id: 5,
    title: "Nouveau like sur votre post",
    date: "Il y a 6 heures",
  },
  {
    id: 6,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 7 heures",
  },
  {
    id: 7,
    title: "Nouveau like sur votre post",
    date: "Il y a 8 heures",
  },
  {
    id: 8,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 9 heures",
  },
  {
    id: 9,
    title: "Nouveau like sur votre post",
    date: "Il y a 10 heures",
  },
  {
    id: 10,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 11 heures",
  },
  {
    id: 11,
    title: "Nouveau like sur votre post",
    date: "Il y a 12 heures",
  },
  {
    id: 12,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 13 heures",
  },
  {
    id: 13,
    title: "Nouveau like sur votre post",
    date: "Il y a 14 heures",
  },
  {
    id: 14,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 15 heures",
  },
  {
    id: 15,
    title: "Nouveau like sur votre post",
    date: "Il y a 16 heures",
  },
  {
    id: 16,
    title: "Nouveau commentaire sur votre post",
    date: "Il y a 17 heures",
  },
];
function LastActivity() {
  return (
    <div className="w-full h-1/2 p-4 overflow-y-auto rounded-lg">
      <h1 className="text-sm  text-center p-4 ">Dernières activités</h1>
      <div className="h-full  flex flex-col gap-4">
        {fakeData.map((data) => (
          <div
            key={data.id}
            className="p-4 bg-slate-50 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 w-8 h-8 rounded-full"></div>
              <p className="text-xs">{data.title}</p>
            </div>
            <p className="text-xs">{data.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastActivity;

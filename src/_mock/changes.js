import TeamComponent from "../components/pages-components/changes-page/datatable-components/TeamComponent";

export const changeCells = [
  {
    id: "team",
    label: "Team",
    type: "component",
    component: TeamComponent,
    sortable: true,
    dbName: "team",
  },
  {
    id: "impact",
    label: "Impact",
    type: "text",
    sortable: true,
    dbName: "impact",
  },
  {
    id: "date",
    label: "Date Planification",
    type: "date",
    sortable: true,
    dbName: "date",
  },
  {
    id: "description",
    label: "Description",
    type: "text",
    sortable: true,
    dbName: "description",
  },
];

export const changeData = [
  {
    id: "1",
    team: "team row1",
    impact: "impact row1",
    date: "2022-11-23",
    description: "desc row1",
  },
  {
    id: "2",
    team: "team row2",
    impact: "impact row2",
    date: "date row2",
    description: "desc row2",
  },
  {
    id: "3",
    team: "team row3",
    impact: "impact row3",
    date: "date row3",
    description: "desc row3",
  },
  {
    id: "4",
    team: "team row4",
    impact: "impact row4",
    date: "date row4",
    description: "desc row4",
  },
  {
    id: "5",
    team: "team row5",
    impact: "impact row5",
    date: "date row5",
    description: "desc row5",
  },
  {
    id: "6",
    team: "team row6",
    impact: "impact row6",
    date: "date row6",
    description: "desc row6",
  },
];

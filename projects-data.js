// ---------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------
// One object per project. Images display in the order listed —
// reorder the array to reorder the images. Put image files in the
// /project-photos folder. Click any image on the live page to open
// it full-size with next/previous arrows through that project's set.
//
// Fields:
//   id          - unique short string, used for the sidebar link
//                 anchor, e.g. "street-photography"
//   title       - project title, shown as the section heading
//   subtitle    - optional, shown in italics under the title (e.g.
//                 a date or date range). Can be "".
//   description - optional short line under the subtitle, can be ""
//   images      - ordered array of { file, caption } objects.
//                 caption is optional, can be "".
// ---------------------------------------------------------------

const projects = [
  {
    id: "example-project",
    title: "Example Project",
    subtitle: "September 2026",
    description: "A short line about what this project is.",
    images: [
      { file: "project-photos/example-1.jpg", caption: "" },
      { file: "project-photos/example-2.jpg", caption: "" }
    ]
  }
];

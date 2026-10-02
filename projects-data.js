// ---------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------
// One object per project. Images display in the order listed —
// reorder the array to reorder the images. Put image files in the
// /project-photos folder.
//
// Fields:
//   id          - unique short string, used for the sidebar link
//                 anchor, e.g. "street-photography"
//   title       - project title, shown as the section heading
//   description - optional short line under the title, can be ""
//   images      - ordered array of { file, caption } objects.
//                 caption is optional, can be "".
// ---------------------------------------------------------------

const projects = [
  {
    id: "miraclemile",
    title: "Miracle Mile, October 2025",
    description: "A collection of photographs of surviving motels and signage along the Historic Miracle Mile in Tucson, Arizona. Documented following the demolition of three historic motels by Pima County Community College in the Summer of 2025. 35mm film developed and scanned at the University of Arizona. Originally a project for ART 246.",
    images: [
      { file: "project-photos/hc3.jpg", caption: "" },
      { file: "project-photos/hc2.jpg", caption: "" },
      { file: "project-photos/hc1.jpg", caption: "" },
      { file: "project-photos/hc5.jpg", caption: "" },
      { file: "project-photos/hc4.jpg", caption: "" },
    ]
  }
];

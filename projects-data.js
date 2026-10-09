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
    id: "springbreak",
    title: "Big Sur",
    subtitle: "March 2026",
    description: "A collection of photographs from a road trip through Big Sur, overlaid with quotes from the epic poem <i>Sea</i> by Jack Kerouac. One of my favorite projects so far and something that holds a deep nostalgia for me.",
    images: [
      { file: "project-photos/1.jpg", caption: "" },
      { file: "project-photos/2.jpg", caption: "" },
      { file: "project-photos/3.jpg", caption: "" },
      { file: "project-photos/4.jpg", caption: "" },
      { file: "project-photos/5.jpg", caption: "" },
      { file: "project-photos/6.jpg", caption: "" },
      { file: "project-photos/9.jpg", caption: "" },
    ]
  },
  {
    id: "miraclemile",
    title: "Miracle Mile",
    subtitle: "October 2025",
    description: "A collection of photographs of surviving motels and signage along the Historic Miracle Mile in Tucson, Arizona. Documented following the demolition of three historic motels by Pima County Community College in the Summer of 2025. 35mm film developed and scanned at the University of Arizona. Originally a project for ART 246.",
    images: [
      { file: "project-photos/hc3.jpg", caption: "" },
      { file: "project-photos/hc2.jpg", caption: "" },
      { file: "project-photos/hc1.jpg", caption: "" },
      { file: "project-photos/hc4.jpg", caption: "" },
      { file: "project-photos/hc5.jpg", caption: "" },
    ]
  }
];

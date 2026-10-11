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
//   location    - where the project was made, used by the Map view:
//                 { name: "Place name", lat: 37.74, lng: -119.59 }
//                 Latitude/longitude in decimal degrees (right-click a
//                 spot in Google Maps and click the numbers to copy them).
//                 Projects close together share one pin automatically.
//                 Omit it and the project simply won't get a pin.
// ---------------------------------------------------------------

const projects = [
  {
    id: "yosemite",
    title: "Yosemite",
    subtitle: "March 2026",
    description: "A sunset progression of the Yosemite Valley taken during my Spring Break camping trip. Photos taken on the same dday between 4 and 7pm. Shot on Sigma DP2S.",
    location: { name: "Yosemite Valley, California", lat: 37.7459, lng: -119.5936 },
    images: [
      { file: "project-photos/yosemite1.jpg", caption: "" },
      { file: "project-photos/yosemite3.jpg", caption: "" },
      { file: "project-photos/yosemite4.jpg", caption: "" },
    ]
  },
    {
    id: "bigsur",
    title: "Big Sur",
    subtitle: "March 2026",
    description: "A collection of photographs from a road trip through Big Sur, overlaid with quotes from the epic poem <i>Sea</i> by Jack Kerouac. One of my favorite projects so far and something that holds a deep nostalgia for me.",
    location: { name: "Big Sur, California", lat: 36.2704, lng: -121.8081 },
    images: [
      { file: "project-photos/bigsur1.jpg", caption: "" },
      { file: "project-photos/bigsur2.jpg", caption: "" },
      { file: "project-photos/bigsur3.jpg", caption: "" },
      { file: "project-photos/bigsur4.jpg", caption: "" },
      { file: "project-photos/bigsur5.jpg", caption: "" },
      { file: "project-photos/bigsur6.jpg", caption: "" },
      { file: "project-photos/bigsur9.jpg", caption: "" },
    ]
  },
  {
    id: "miraclemile",
    title: "Miracle Mile",
    subtitle: "October 2025",
    description: "A collection of photographs of surviving motels and signage along the Historic Miracle Mile in Tucson, Arizona. Documented following the demolition of three historic motels by Pima County Community College in the Summer of 2025. 35mm film developed and scanned at the University of Arizona. Originally a project for ART 246.",
    location: { name: "Miracle Mile, Tucson, Arizona", lat: 32.2480, lng: -110.9920 },
    images: [
      { file: "project-photos/hc3.jpg", caption: "" },
      { file: "project-photos/hc2.jpg", caption: "" },
      { file: "project-photos/hc1.jpg", caption: "" },
      { file: "project-photos/hc4.jpg", caption: "" },
      { file: "project-photos/hc5.jpg", caption: "" },
    ]
  }
];

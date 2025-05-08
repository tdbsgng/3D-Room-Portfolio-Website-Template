export const aboutMeInfo = {
  firstName: "Howard",
  lastName: "Yu",
  aka: "游鈞皓",
  email: "howard89213@gmail.com",
  location: {
    city: "New Taipei, Taiwan",
    lat: 25.056806774247654,
    lng: 121.4341405681343,
  },
  link: {
    github: "https://github.com/tdbsgng",
    linkedin: "https://www.linkedin.com/in/chun-hau-yu-4b0527238/",
    instagram: "https://www.instagram.com/chun__haoooo/",
  },
  imagePath: {
    intro: "/assets/image/photo.jpg",
  },
  skills: [
    "/assets/icon/python.png",
    "/assets/icon/pytorch_texted.png",
    "/assets/icon/c.png",
    "/assets/icon/c++.png",
    "/assets/icon/csharp.png",
    "/assets/icon/react.png",
    "/assets/icon/github.svg",
    "/assets/icon/docker.png",
  ],
  content: {
    intro:
      "A motivated developer with a strong passion for learning new skills and a demonstrated ability to adapt to new roles and environments.",
    skills:
      "Proficient in Python, C, C++, C#, and JavaScript. Skilled in deep learning (PyTorch), with expertise in 3D reconstruction, diffusion models, and large language models (LLMs).",
  },
};

export const educationInfo = [
  {
    id: 1,
    name: "National Taiwan University",
    pos: "M.S. Computer Science & Information Engineering",
    duration: "Sep. 2022 - Aug. 2024",
    highlights: [
      "Research focuses on 3D human reconstruction, 3D generation, diffusion models, computer vision.",
      "Nominated as a member of the Phi Tau Phi Scholastic Honor Society, 2024.",
    ],
    gpa: "GPA: 4.30 / 4.30",
    icon: "/assets/icon/ntu.png",
  },
  {
    id: 2,
    name: "National Tsing Hua University",
    pos: "B.S. Industrial Engineering and Engineering Management",
    duration: "Sep. 2018 - Jun. 2022",
    highlights: ["Fall 2022 Academic Excellence Award.", "Industrial Engineering Excellent Project Award."],
    gpa: "CS-related GPA: 4.03 / 4.30",
    icon: "/assets/icon/nthu.png",
  },
];
export const projectsInfo = [
  {
    title: "CS-Agent - AI Computer Science Problem Solver",
    desc: "An innovative platform that aims to solve computer science problems through LLMs and a dedicated API.",
    duration: "Jan. 2024 - Present",
    highlights: [
      "Building a computation API and a web interface to tackle problems in algorithms, data structures, and linear algebra.",
      "Developed a matrix calculator supporting **20** matrix operations and matrix expressions calculations.",
    ],
    href: "https://github.com/tdbsgng/CS-Agent",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/icon/react.png",
      },
      {
        id: 2,
        name: "Python",
        path: "assets/icon/python.png",
      },
    ],
    mediaFiles: [
      "assets/projects/project1/project1-cover.png",
      "/assets/projects/project1/project1-1.png",
      "/assets/projects/project1/project1-2.png",
      "/assets/projects/project1/project1-3.png",
    ],
  },
  {
    title: "HARDER: 3D Human Avatar Reconstruction with Distillation and Explicit Representation",
    desc: "A novel framework for reconstructing a 3D human avatar from a single RGB image, integrating Score Distillation Sampling (SDS) and multimodal large language models (LLMs), implemented in PyTorch.",
    duration: "Feb. 2024 - Oct. 2024",
    highlights: [
      "Designed a new 3D human reconstruction system with a **1.9x** improvement in overall reconstruction quality.",
      "Optimized training strategies, achieving a **3.3x** acceleration in reconstruction time.",
      "Reduced GPU VRAM usage for reconstruction by **65.6%** through system optimization.",
    ],
    href: "https://docs.google.com/presentation/d/1neC3s4ECXWlLXIGWoWGnKYMfFHHLacJjnN6VWbmKE_g/edit?usp=sharing",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/icon/python.png",
      },
      {
        id: 2,
        name: "Pytorch",
        path: "assets/icon/pytorch.png",
      },
    ],
    mediaFiles: [
      "assets/projects/project2/project2-cover.gif",
      "/assets/projects/project2/project2-1.png",
      "/assets/projects/project2/project2-2.png",
      "/assets/projects/project2/project2-3.png",
    ],
  },
  {
    title: "3D AR Teleconference Application",
    desc: "An interactive multi-user 3D AR teleconference system featuring socket programming and multi-threading to enable real-time animation.",
    duration: "Sep. 2022 - Aug. 2024",

    highlights: [
      "Developed a multi-user 3D AR teleconference application based on a client-server architecture.",
      "Designed a new animation pipeline, reducing communication payload by **99%**.",
    ],
    href: "https://docs.google.com/presentation/d/1z1ucvVNz2SM4XwjK9swUH7b0e4rRTTm0BlkElwtZEZs/edit?usp=sharing",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/icon/python.png",
      },
      {
        id: 2,
        name: "C#",
        path: "/assets/icon/csharp.png",
      },
    ],
    mediaFiles: ["assets/projects/project3/project3-cover.mp4", "/assets/projects/project3/project3-1.png"],
  },
  {
    title: "3D Room Portfolio Website Template",
    desc: "A modern and interactive portfolio website template designed to showcase personal work in a 3D room environment, allowing users to easily input their own information and quickly generate a personalized website without coding.",
    duration: "Apr. 2025 - May. 2025",
    highlights: [
      "Developed three interactive components featuring different visual and interaction effects.",
      "Built a file-system-style interface to display user information intuitively.",
    ],
    href: "https://github.com/tdbsgng/3D-Room-Portfolio-Website-Template",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/icon/react.png",
      },
      {
        id: 2,
        name: "Three.js",
        path: "/assets/icon/three.png",
      },
    ],
    mediaFiles: ["assets/projects/project4/project4-cover.mp4"],
  },
];
export const experienceInfo = [
  {
    id: 1,
    name: "Jorjin Technologies Inc.",
    pos: "Academia-Industry Collaboration",
    duration: "Sep. 2022 - Aug. 2024",
    highlights: [
      "Developed a multi-user 3D AR teleconference application based on a client-server architecture.",
      "Designed a new animation pipeline, reducing communication payload by **99%**.",
    ],
    icon: "/assets/icon/jorjin.png",
  },
  {
    id: 2,
    name: "Intelligent Banking Division, E.Sun Commercial Bank",
    pos: "Machine Learning Engineer Intern",
    duration: "Jul. 2023 - Aug. 2023",
    highlights: [
      "Built a Traditional Chinese customer service chatbot using LLMs and RAG techniques.",
      "Developed 4 web crawler programs to collect the latest financial information.",
    ],
    icon: "/assets/icon/esun.png",
  },
];
export const horizontalPosterPath = ["/assets/image/fuji.jpg"];
export const verticalPosterPath = [
  "/assets/image/me.jpg",
  "/assets/image/skytree.jpg",
  "/assets/image/sakura.jpg",
  "/assets/image/wheel.jpg",
];

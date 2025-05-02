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
    techStack: "/assets/image/techStack.png",
  },
  content: {
    intro:
      "A developer with a strong passion for learning new skills, and excel at quickly adapting to new roles and environments.",
    techStack:
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
      "GPA: 4.30 / 4.30",
    ],
    icon: "/assets/icon/ntu.png",
  },
  {
    id: 2,
    name: "National Tsing Hua University",
    pos: "B.S. Industrial Engineering and Engineering Management",
    duration: "Sep. 2018 - Jun. 2022",
    highlights: [
      "Fall 2022 Academic Excellence Award.",
      "Industrial Engineering Excellent Project Award.",
      "Overall GPA: 3.68 / 4.30",
      "CS-related GPA: 4.03 / 4.30",
    ],
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
    href: "",
    texture: "/assets/project/project1.mp4",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
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
      "Reduced GPU VRAM usage for reconstruction by **65.6%** through system optimization."
    ],
    href: "",
    texture: "/assets/image/project/project2.mp4",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
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
    desc: "從相關技能寫",
    duration: "Sep. 2022 - Aug. 2024",

    highlights: [
      "Developed a multi-user 3D AR teleconference application based on a client-server architecture.",
      "Designed a new animation pipeline, reducing server communication payload by **99%**.",
    ],
    href: "",
    texture: "/assets/image/project/project3.mp4",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
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
      "Designed a new animation pipeline, reducing server communication payload by 99%.",
    ],
    icon: "/assets/icon/jorjin.png",
    animation: "clapping",
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
    animation: "salute",
  },
];

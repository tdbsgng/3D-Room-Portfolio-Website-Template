export const aboutMeInfo = {
  name: "Howard Yu ( 游鈞皓 )",
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
    desc: "CS-Agent is an innovative platform that aims to solve computer science problems through LLMs and a dedicated API. As team lead, I designed a system that effectively tackles challenges in algorithms, data structures, and linear algebra.",
    highlights: [],
    href: "",
    texture: "/assets/project/project1.mp4",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
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
  },
  {
    title: "3D Human Reconstruction System",
    desc: "This groundbreaking 3D human reconstruction system leverages Score Distillation Sampling to achieve 1.9x improvement in overall reconstruction quality. The project seamlessly integrates state-of-the-art technologies including Large Language Models and Diffusion Models.",
    href: "",
    texture: "/assets/image/project/project2.mp4",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight2.png",
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
  },
  {
    title: "3D AR Teleconference Application",
    desc: "An innovative multi-user 3D augmented reality teleconference platform developed for Jorjin Technologies. This client-server architecture solution enables immersive remote collaboration with real-time 3D human animations.",
    href: "",
    texture: "/assets/image/project/project3.mp4",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight3.png",
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
  {
    title: "Traditional Chinese Customer Service Chatbot",
    desc: "Developed during my time at E.Sun Commercial Bank, this advanced chatbot utilizes Large Language Models (LLMs) and Retrieval Augmented Generation (RAG) to provide accurate financial information and customer support in Traditional Chinese.",
    href: "",
    texture: "/assets/image/project/project4.mp4",
    logo: "/assets/project-logo4.png",
    logoStyle: {
      backgroundColor: "#0E1F38",
      border: "0.2px solid #0E2D58",
      boxShadow: "0px 0px 60px 0px #2F67B64D",
    },
    spotlight: "/assets/spotlight4.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/icon/python.png",
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

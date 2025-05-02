import { experienceInfo } from "../constants/info.js";

const Experience = () => {
  return (
    <section className="c-space h-fit flex items-center justify-center" id="experience">
      <div className="experience-container w-full text-white-600">
        <div className="experience-content">
          <div className="sm:py-10 py-5 px-5">
            {experienceInfo.map((item, index) => (
              <div key={index} className="experience-content-container group">
                <div className="flex flex-col h-full justify-start items-center py-2">
                  <div className="experience-content_logo">
                    <img className="w-full h-full" src={item.icon} alt="" />
                  </div>
                  <div className="experience-content_bar" />
                </div>
                <div className="sm:p-5 px-2.5 py-5 flex flex-col">
                  <p className="font-bold text-white-800">{item.name}</p>
                  <p className="text-sm">{item.pos}</p>
                  <p className="text-sm mb-5 ml-auto">{item.duration}</p>
                  <ul className="list-disc list-inside lg:group-hover:text-white transition-all ease-in-out duration-500 tracking-wide">
                    {item.highlights.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

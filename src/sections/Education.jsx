import { educationInfo } from "../constants/info.js";

const Education = () => {
  return (
    <section className="c-space h-fit flex items-center justify-center" id="education">
      <div className="education-container w-full text-white-600">
        <div className="education-content">
          <div className="sm:py-10 py-5 px-5">
            {educationInfo.map((item, index) => (
              <div key={index} className="education-content-container group">
                <div className="flex flex-col h-full justify-start items-center py-2">
                  <div className="education-content_logo">
                    <img className="w-full h-full" src={item.icon} alt="" />
                  </div>
                  <div className="education-content_bar" />
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

export default Education;

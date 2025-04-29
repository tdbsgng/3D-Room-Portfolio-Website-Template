import { educationInfo } from "../constants/info.js";

const Education = () => {
  return (
    <section className="c-space my-10" id="education">
      <div className="w-full text-white-600 ">
        <div className="education-container w-full">
          <div className="education-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {educationInfo.map((item, index) => (
                <div key={index} className="expeirence-content-container group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="education-content_logo">
                      <img className="w-full h-full" src={item.icon} alt="" />
                    </div>
                    <div className="education-content_bar" />
                  </div>
                  <div className="sm:p-5 px-2.5 py-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-white-800">{item.name}</p>
                        <p className="text-sm">{item.pos}</p>
                      </div>
                      <p className="text-sm text-right whitespace-nowrap">{item.duration}</p>
                    </div>
                    <ul className="list-disc list-inside mt-3 group-hover:text-white transition-all ease-in-out duration-500">
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
      </div>
    </section>
  );
};

export default Education;

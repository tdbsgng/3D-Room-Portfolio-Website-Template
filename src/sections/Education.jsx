import { educationInfo } from "../constants/Info.js";

const Education = () => {
  return (
    <section className="c-space h-fit flex items-center justify-center" id="education">
      <div className="education-container w-full text-white-600">
        <div className="education-content">
          <div className="p-5">
            {educationInfo.map((item, index) => (
              <div key={index} className="education-content-container group">
                <div className="flex flex-col h-full justify-start items-center py-2">
                  <div className="education-content_logo">
                    <img className="w-full h-full" src={item.icon} alt="" />
                  </div>
                  <div className="education-content_bar" />
                </div>
                <div className="px-2.5 flex flex-col">
                  <p className="font-bold text-white-800">{item.name}</p>
                  <p className="text-sm">{item.pos}</p>
                  <p className="text-sm mb-5 ml-auto">{item.duration}</p>
                  <ul className="list-disc list-inside lg:group-hover:text-white transition-all ease-in-out duration-500 tracking-wide">
                    {item.highlights.map((point, index) => (
                      <li
                        key={index}
                        className="animatedText tracking-wide"
                        dangerouslySetInnerHTML={{
                          __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
                        }}
                      />
                    ))}
                  </ul>
                  <strong className="text-sm mb-5 ml-auto text-white">{item.gpa}</strong>
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

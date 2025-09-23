import { Chip } from "@/app/experience/page";
import { Reveal } from "./Reveal";

export const ExperienceItem = ({
  title,
  position,
  time,
  location,
  description,
  tech,
  index,
}) => {
  return (
    <Reveal delay={index * 200}>
      <div className="relative group">
        <div className="absolute inset-0 bg-black/[0.02] rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

        <div className="relative bg-black/[0.02] backdrop-blur-xl border border-black/10 rounded-3xl p-10 mb-12 hover:bg-black/[0.04] hover:border-black/20 transition-all duration-500 group">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h3 className="text-4xl font-light text-black mb-3 tracking-tight group-hover:text-gray-700 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-xl text-gray-700 font-medium mb-2">
                {position}
              </p>
            </div>
            <div className="text-right ml-8">
              <p className="text-lg text-gray-600 font-medium mb-2">{time}</p>
              <p className="text-gray-500">{location}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wide text-gray-600 font-medium">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-3">
              {tech.map((item, techIndex) => (
                <div
                  key={item}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 200 + techIndex * 50}ms`,
                  }}
                >
                  <Chip>{item}</Chip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

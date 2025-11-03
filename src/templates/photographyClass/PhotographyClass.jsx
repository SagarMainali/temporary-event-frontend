import PhotographyClassView from "./components/PhotographyClassView";
import PhotographyClassEdit from "./components/PhotographyClassEdit";

export default function PhotographyClass({ data, mode }) {
  if (mode === "edit") return <PhotographyClassEdit initialSections={data.sections} />;
  return <PhotographyClassView sections={data.sections} />;
}

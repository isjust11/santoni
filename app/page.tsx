import { ContentData } from "./types";
import contentDataRaw from "../data/contentData.json";
import SantoniApp from "./components/SantoniApp";

export default function Home() {
  const data = contentDataRaw as ContentData;
  return <SantoniApp data={data} />;
}

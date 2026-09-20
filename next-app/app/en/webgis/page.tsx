import {redirect} from "next/navigation";

export default function EnglishRouteBootstrap(){
  redirect("/webgis?lang=en");
}

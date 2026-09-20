import {redirect} from "next/navigation";

export default function EnglishRouteBootstrap(){
  redirect("/kontakt?lang=en");
}

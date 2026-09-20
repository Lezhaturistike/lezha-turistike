import {redirect} from "next/navigation";

export default function EnglishRouteBootstrap(){
  redirect("/kulinari?lang=en");
}

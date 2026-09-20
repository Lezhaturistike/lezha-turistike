import {redirect} from "next/navigation";

export default function EnglishRouteBootstrap(){
  redirect("/galeri?lang=en");
}

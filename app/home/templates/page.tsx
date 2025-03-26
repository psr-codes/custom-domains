import { notFound, redirect } from "next/navigation";
import HomeNavbar from "@/components/home/HomeNavbar";
import TemplatesComp from "@/components/dashboard/TemplatesComp";
export default function Templates() {
    return (
        <div className=" ">
            {" "}
            <HomeNavbar />
            <div>
                <TemplatesComp />
            </div>
        </div>
    );
}

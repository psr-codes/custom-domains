import { ReactNode, Suspense } from "react";
// import Profile from "@/components/profile";
import Nav from "@/components/dashboard/Nav";
import Wrapper from "./Wrapper";
export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Nav>
                <Suspense fallback={<div>Loading...</div>}>
                    {/* <Profile /> */}
                </Suspense>
            </Nav>
            <Wrapper>{children}</Wrapper>
        </div>
    );
}

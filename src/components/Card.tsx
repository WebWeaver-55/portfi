import GrainImage from "@/assets/images/grain.jpg";
import { url } from "inspector";
import { twMerge } from "tailwind-merge";



export const Card = ({className , children}: {
    className?:string;
    children: React.ReactNode
}) =>{
    return (
        <div className={twMerge ("bg gray-850 rounded-3xl relaive z-0 overflow-hidden after:z-10 after:content-[''] after:outline after:inset-0 after:absolute after:outline-2 after:-outline-offset-2 after:rounded-3xl after:outline-white/20 px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 after:pointer-events-none", className)}>


            <div className="absolute inset-0 -z-10 opacity-5" style={{backgroundImage: `url(${GrainImage})`}}>

            </div>
{children}
        </div>
    )
}